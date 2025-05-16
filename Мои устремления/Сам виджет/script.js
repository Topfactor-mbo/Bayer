'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const showHide = (selector, exeClass) => {
        !selector.classList.contains(exeClass)
            ? selector.classList.add(exeClass)
            : selector.classList.remove(exeClass);
    }; // скрыть/показать элемент

    const mainContent = document.querySelector('.main-content');

    //----- Мои устремления -----//

    const myAmbitions = {
        ambitions: `Крутейший коммент`,
        next_stage: [
            ['Этап 1', 'Подразделение 1', `Комментарий 1`],
            ['Этап 2', 'Подразделение 2', `Комментарий 2`],
            ['Этап 3', 'Подразделение 3', `Комментарий 3`],
        ],
        mobility: [
            ['Предпочтительное место 1', `Комментарий 1`],
            ['Предпочтительное место 2', `Комментарий 2`],
            ['Предпочтительное место 3', `Комментарий 3`],
        ],
    };

    if (typeof myAmbitions === 'object') {
        const myAmbitionsTableBody = mainContent.querySelector('#my-professional-ambitions__table tbody'); // получение тела таблицы

        const remainNextStageArray = myAmbitions.next_stage.slice(1); // получение массива строк "этапы" без первого элемента
        const remainMobilityArray = myAmbitions.mobility.slice(1); // получение массива строк "мобильность" без первого элемента

        const rowSpan = Math.max(myAmbitions.next_stage.length, myAmbitions.mobility.length); // определение на сколько по вертикали объединять строку
        const remainMicroRowsLength = Math.max(remainNextStageArray.length, remainMobilityArray.length); // определение количества итераций для цикла

        const microRows = []; // будущий массив с микростроками

        const remainNextLength = remainNextStageArray.length - 1;
        const remainMobileLength = remainMobilityArray.length - 1;

        for (let i = 0; i < remainMicroRowsLength; i++) {
            const condition1 = i <= remainNextLength;
            const condition2 = i <= remainMobileLength;

            const microRow = `<tr>
                <td class="stage-col">
                    <span>${condition1 ? remainNextStageArray[i][0] : ''}</span>
                </td>
                <td class="unit-col">
                    <span>${condition1 ? remainNextStageArray[i][1] : ''}</span>
                </td>
                <td class="stage-comment-col">
                    <span>${condition1 ? remainNextStageArray[i][2] : ''}</span>
                </td>
                <td class="preferred-position-col">
                    <span>${condition2 ? remainMobilityArray[i][0] : ''}</span>
                </td>
                <td class="mobility-comment-col">
                    <span>${condition2 ? remainMobilityArray[i][1] : ''}</span>
                </td>
            </tr>`;

            microRows.push(microRow);
        }

        const [stage, unit, stage_comment] = myAmbitions.next_stage.length > 0
            ? [myAmbitions.next_stage[0][0], myAmbitions.next_stage[0][1], myAmbitions.next_stage[0][2]]
            : ['', '', '']; // деструктуризация для удобства

        const [preferred_position, mobility_comment] = myAmbitions.mobility.length > 0
            ? [myAmbitions.mobility[0][0], myAmbitions.mobility[0][1]]
            : ['', '']; // деструктуризация для удобства

        const myAmbitionsTableRow = `<tr>
            <td class="my-professional-ambitions-col pre-col" rowspan="${rowSpan}" colspan="3">
                <pre class="${myAmbitions.ambitions !== '' ? '' : 'empty-pre'}" contenteditable="true" data-placeholder="Введите текст...">${myAmbitions.ambitions}</pre>
            </td>
            <td class="stage-col">
                <span>${stage}</span>
            </td>
            <td class="unit-col">
                <span>${unit}</span>
            </td>
            <td class="stage-comment-col">
                <pre>${stage_comment}</pre>
            </td>
            <td class="preferred-position-col">
                <span>${preferred_position}</span>
            </td>
            <td class="mobility-comment-col">
                <pre>${mobility_comment}</pre>
            </td>
        </tr>
        ${microRows.join('')}`;

        myAmbitionsTableBody.insertAdjacentHTML('beforeend', myAmbitionsTableRow); // вставка построенных строк в тело таблицы

        const preCol = mainContent.querySelectorAll('.pre-col');
        preCol.forEach(col => {
            col.addEventListener('click', e => {
                const thisPre = e.currentTarget.children[0];
                setTimeout(() => thisPre.focus(), 0);
            });
        });

        const editedPre = mainContent.querySelectorAll('.pre-col > pre');
        editedPre.forEach(pre => {
            pre.addEventListener('focus', e => {
                e.target.classList.remove('empty-pre');

                requestAnimationFrame(() => {
                    if (pre.textContent.length > 0) {
                        const range = document.createRange();
                        const selection = window.getSelection();

                        range.selectNodeContents(pre);
                        range.collapse(false);

                        selection.removeAllRanges();
                        selection.addRange(range);
                    }
                });
            });

            pre.addEventListener('blur', e => {
                if (e.target.textContent === '') {
                    e.target.classList.add('empty-pre');
                }
            });
        });

        //----- Chevron -----//

        const chevron = mainContent.querySelector('#chevron');
        chevron.addEventListener('click', e => {
            const thead = e.target.closest('thead');
            const tbody = thead.nextElementSibling;
            showHide(tbody, 'tbody-show');
            showHide(e.target, 'up');
        });
    }
});
