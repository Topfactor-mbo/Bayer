'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.querySelector('.main-content');

    const records = [
        {
            row_id: `jj0g45g54g-45g54g`,
            events_type: 'Бесплатно',
            events_name: 'Бесплатное мероприятия 1',
        },
        {
            row_id: `jj55g4sdfdsf3f34-45g54g`,
            events_type: 'Другое',
            events_name: '',
        },
        {
            row_id: `jj55g4sdfdsf3f34-45g54g`,
            events_type: 'Платно',
            events_name: 'Платное мероприятия 1',
        },
    ];

    if (Array.isArray(records)) {
        const tbodyRows = records.map(row => `<tr id="${row.row_id}">
            <td class="ready-to-move-col">
                <span>${row.events_type}</span>
            </td>
            <td class="event-name-col">
                <span class="editable-span ${row.events_name !== '' ? '' : 'empty-span'}" contenteditable="true" data-placeholder="Введите текст...">${row.events_name}</span>
            </td>
            <td class="delete-btn-col">
                <button class="delete-btn" data-row-id="${row.row_id}" type="button"></button>
            </td>
        </tr>`);

        const targetTable = mainContent.querySelector('#mobility-changer__table > tbody');
        targetTable.insertAdjacentHTML('beforeend', tbodyRows.join(''));

        const comments = mainContent.querySelectorAll('.editable-span');
        comments.forEach(comment => {
            comment.addEventListener('focus', e => {
                e.target.classList.remove('empty-span');
            });

            comment.addEventListener('blur', e => {
                if (e.target.textContent.trim() === '') {
                    e.target.textContent = '';
                    e.target.classList.add('empty-span');
                }
            });
        });

        const preCols = mainContent.querySelectorAll('.event-name-col');
        preCols.forEach(col => {
            col.addEventListener('click', e => {
                const childPre = e.target.children[0];
                setTimeout(() => childPre.focus(), 0);

                requestAnimationFrame(() => {
                    const range = document.createRange();
                    const selection = window.getSelection();

                    range.selectNodeContents(childPre);
                    range.collapse(false);

                    selection.removeAllRanges();
                    selection.addRange(range);
                });
            });
        });
    }
});
