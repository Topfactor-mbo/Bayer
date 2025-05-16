'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.querySelector('.main-content');

    //----- Сильные стороны -----//

    const sides = {
        strong_sides: {
            worker_comment: ``,
            leader_comment: ``,
        },
        areas_of_development: {
            worker_comment: ``,
            leader_comment: ``,
        }
    }

    if (typeof sides === 'object') {
        const tbody = mainContent.querySelector('#strong-sides__table > tbody');

        const strong_sides_row = `<tr>
            <td class="title-col">Сильные стороны</td>
            <td class="worker-comment-col pre-col">
                <pre class="edited-pre ${sides.strong_sides.worker_comment !== '' ? sides.strong_sides.worker_comment : 'empty-pre'}" contenteditable="true" data-placeholder="Введите текст...">${sides.strong_sides.worker_comment}</pre>
            </td>
            <td class="leader-comment-col pre-col">
                <pre class="edited-pre ${sides.strong_sides.leader_comment !== '' ? sides.strong_sides.leader_comment : 'empty-pre'}" contenteditable="true" data-placeholder="Введите текст...">${sides.strong_sides.leader_comment}</pre>
            </td>
        </tr>`;

        const areas_of_development_row = `<tr>
            <td class="title-col">Области развития</td>
            <td class="worker-comment-col pre-col">
                <pre class="edited-pre ${sides.areas_of_development.leader_comment !== '' ? sides.areas_of_development.leader_comment : 'empty-pre'}" contenteditable="true" data-placeholder="Введите текст...">${sides.areas_of_development.worker_comment}</pre>
            </td>
            <td class="leader-comment-col pre-col">
                <pre class="edited-pre ${sides.areas_of_development.leader_comment !== '' ? sides.areas_of_development.leader_comment : 'empty-pre'}" contenteditable="true" data-placeholder="Введите текст...">${sides.areas_of_development.leader_comment}</pre>
            </td>
        </tr>`;

        tbody.insertAdjacentHTML('beforeend', [strong_sides_row, areas_of_development_row].join(''));

        const allPre = mainContent.querySelectorAll('.edited-pre');
        allPre.forEach(pre => {
            pre.addEventListener('focus', e => {
                e.target.classList.remove('empty-pre')

                requestAnimationFrame(() => {
                    const range = document.createRange();
                    const selection = window.getSelection();

                    range.selectNodeContents(e.target);
                    range.collapse(false);

                    selection.removeAllRanges();
                    selection.addRange(range);
                });
            });
            pre.addEventListener('blur', e => {
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
            });
        });
    }
});
