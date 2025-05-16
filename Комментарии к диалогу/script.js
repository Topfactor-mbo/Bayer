'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.querySelector('.main-content');

    const comments = {
        worker_comment: ``,
        leader_comment: ``,
    };

    if (typeof comments === 'object') {
        const tbodyContent = `<tr>
            <td class="worker-comment-col pre-col">
                <pre class="editable-pre ${comments.worker_comment !== '' ? '' : 'empty-pre'}" contenteditable="true" data-placeholder="Введите текст...">${comments.worker_comment}</pre>
            </td>
            <td class="leader-comment-col pre-col">
                <pre class="editable-pre ${comments.leader_comment !== '' ? '' : 'empty-pre'}" contenteditable="true" data-placeholder="Введите текст...">${comments.leader_comment}</pre>
            </td>
        </tr>`;

        const tbody = mainContent.querySelector('#dialogs-comments__table > tbody');
        tbody.insertAdjacentHTML('beforeend', tbodyContent);

        const commentsPre = mainContent.querySelectorAll('.editable-pre');
        commentsPre.forEach(comment => {
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
    }
});
