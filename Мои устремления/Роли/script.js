'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.querySelector('.main-content');

    const records = [
        {
            row_id: `jj0g45g54g-45g54g`,
            role: 0,
            period: 0,
            comment: ``,
        },
        {
            row_id: `jj55g4sdfdsf3f34-45g54g`,
            role: 1,
            period: 1,
            comment: ``,
        },
    ];

    const rolesObj = {
        0: 'Роль 1',
        1: 'Роль 2'
    };

    const periodsObj = {
        0: '3 месяца',
        1: '1 год',
    };

    const createList = (list, value) => `<div class="padding-wrapper">
        <div class="list-wrapper">
            <span class="current-item" data-value="${list[value]}">${list[value]}</span>
            <div class="hidden-list">
                <ul>
                    ${Object.values(list).map((item, index) => `<li class="list-item" data-value="${list[index]}">${item}</li>`).join('')}
                </ul>
            </div>
        </div>
    </div>`

    if (Array.isArray(records)) {
        const tbodyRows = records.map(row => `<tr id="${row.row_id}">
            <td class="ready-to-move-col">
                ${createList(rolesObj, row.role)}
            </td>
            <td class="preferred-location-col">
                ${createList(periodsObj, row.period)}
            </td>
            <td class="comment-col pre-col">
                <pre class="editable-pre ${row.comment !== '' ? '' : 'empty-pre'}" contenteditable="true" data-placeholder="Введите текст...">${row.comment}</pre>
            </td>
            <td class="delete-btn-col">
                <button class="delete-btn" data-row-id="${row.row_id}" type="button"></button>
            </td>
        </tr>`);

        const targetTable = mainContent.querySelector('#mobility-changer__table > tbody');
        targetTable.insertAdjacentHTML('beforeend', tbodyRows.join(''));

        const currentItemDrop = mainContent.querySelectorAll('.current-item');
        currentItemDrop.forEach((item, _, arr) => {
            item.addEventListener('click', e => {
                e.stopPropagation();
                arr.forEach(list => list.nextElementSibling.classList.remove('showed'));
                e.target.nextElementSibling.classList.add('showed');
            });
        });

        const comments = mainContent.querySelectorAll('.editable-pre');
        comments.forEach(comment => {
            comment.addEventListener('focus', e => {
                e.target.classList.remove('empty-pre');
            });

            comment.addEventListener('blur', e => {
                if (e.target.textContent.trim() === '') {
                    e.target.textContent = '';
                    e.target.classList.add('empty-pre');
                }
            });
        });

        const preCols = mainContent.querySelectorAll('.pre-col');
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

        const selects = mainContent.querySelectorAll('.list-item');
        selects.forEach(elem => {
            elem.addEventListener('click', e => {
                const listParent = elem.closest('.list-wrapper');
                const currentItem = listParent.children[0];
                currentItem.textContent = e.target.dataset.value;
                currentItem.setAttribute('data-value', e.target.dataset.value);
                const list = listParent.children[1];
                list.classList.remove('showed');
            });
        });

        document.addEventListener('click', e => {
            const path = e.composedPath();
            const showedList = mainContent.querySelector('.showed');

            if (!path.includes(showedList)) {
                try {
                    showedList.classList.remove('showed');
                } catch (err) {
                    // Не требует обработки
                }
            }
        });
    }
});
