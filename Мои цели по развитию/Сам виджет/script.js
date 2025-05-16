'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const showHide = (selector, exeClass) => {
        !selector.classList.contains(exeClass)
            ? selector.classList.add(exeClass)
            : selector.classList.remove(exeClass);
    }; // скрыть/показать элемент

    const contenteditableActions = (selector, type) => {
        const selectorType = {
            div: 'empty-div',
            pre: 'empty-pre',
        };

        selector.forEach(elem => {
            elem.addEventListener('focus', e => {
                e.target.classList.remove(selectorType[type]);
            });

            elem.addEventListener('blur', e => {
                if (e.target.textContent.trim() === '') {
                    e.target.textContent = '';
                    e.target.classList.add(selectorType[type]);
                }
            });
        });
    };

    const mainContent = document.querySelector('.main-content');

    //----- Мои цели по развитию -----//

    const myGoals = [
        {
            goal_id: `dsf34fh34h8934f34`,
            goal: `Улучшение навыков публичных выступлений. Цель заключается в повышении уверенности и эффективности в публичных выступлениях через освоение ключевых техник ораторского мастерства. Это позволит успешно презентовать идеи и проекты в профессиональной среде, а также улучшить навыки общения в повседневной жизни. Развитие ораторских навыков способствует карьерному росту и улучшению взаимодействия с коллегами и руководством. Освоение техник преодоления страха перед выступлением поможет чувствовать себя комфортнее в стрессовых ситуациях. Основные аспекты включают структуру речи, адаптацию под аудиторию и использование невербальной коммуникации.`,
            goal_status: true,
            model70: ``,
            model20: ``,
            model10: [
                ['Платное', 'Платное мероприятие 1'],
                ['Платное', 'Платное мероприятие 2'],
                ['Бесплатное', 'Бесплатное мероприятие 3'],
            ],
        },
        {
            goal_id: `hghgj38374`,
            goal: ``,
            goal_status: false,
            model70: ``,
            model20: ``,
            model10: [
                ['Бесплатное', 'Бесплатное мероприятие 1'],
                ['Бесплатное', 'Бесплатное мероприятие 2'],
                ['Другое', 'Комментарий другого мероприятия'],
            ],
        },
    ];

    if (Array.isArray(myGoals)) {
        const targetTable = mainContent.querySelector('#my-goals__table');

        const tBodies = myGoals.map((goal, index) => {
            index++;

            const goal_row = `<tr class="goal-row">
                <td colspan="4">
                    <div class="goal-wrapper">
                        <div class="checkbox-place">
                            <input class="goal-checkbox" id="goal-checkbox-${index}" type="checkbox" ${goal.goal_status ? 'checked' : ''}>
                            <label for="goal-checkbox-${index}"></label>
                        </div>
                        <div class="editable-goal-block ${goal.goal !== '' ? '' : 'empty-div'}" contenteditable="true" data-placeholder="Введите текст цели по развитию..." data-goal="${goal.goal_id}">${goal.goal}</div>
                        <button class="delete-table-row-btn" data-goal="${goal.goal_id}" type="button"></button>
                    </div>
                </td>
            </tr>`;

            const middle_header_row = `<tr class="middle-header-row">
                <td colspan="4">Мероприятия по развитию через 70-20-10</td>
            </tr>`;

            const model_header_row = `<tr class="model-header-row">
                <td class="model-col model70-col">
                    <div>
                        70
                        <span class="model-note" title="Статичное описание модели 70"></span>
                    </div>
                </td>
                <td class="model-col model20-col">
                    <div>
                        20
                        <span class="model-note" title="Статичное описание модели 20"></span>
                    </div>
                </td>
                <td class="model-col model10-col" colspan="2">
                    <div>
                        10
                        <span class="model-note" title="Статичное описание модели 10"></span>
                        <button class="add-model10-btn" data-goal="${goal.goal_id}" type="button"></button>
                    </div>
                </td>
            </tr>`;

            const micro_10_array = goal.model10.slice(1);

            const micro_10_rows = micro_10_array.map(row => `<tr class="micro-row">
                <td class="micro-row-left">${row[0]}</td>
                <td class="micro-row-right">${row[1]}</td>
            </tr>`);

            const rowSpan = micro_10_array.length + 1;

            const [micro10_1, micro10_2] = goal.model10.length > 0
                ? [goal.model10[0][0], goal.model10[0][1]]
                : ['', ''];

            const models_row = `<tr>
                <td class="model70-col pre-col" rowspan="${rowSpan}">
                    <pre class="editable-pre ${goal.model70 !== '' ? '' : 'empty-pre'}" contenteditable="true" data-placeholder="Введите текст...">${goal.model70}</pre>
                </td>
                <td class="model20-col pre-col" rowspan="${rowSpan}">
                    <pre class="editable-pre ${goal.model20 !== '' ? '' : 'empty-pre'}" contenteditable="true" data-placeholder="Введите текст...">${goal.model20}</pre>
                </td>
                <td>${micro10_1}</td>
                <td>${micro10_2}</td>
            </tr>
            ${micro_10_rows.join('')}`;

            const rowsCollection = [
                goal_row,
                middle_header_row,
                model_header_row,
                models_row
            ];

            return `<tbody class="showed">${rowsCollection.join('')}</tbody>`;
        });

        targetTable.insertAdjacentHTML('beforeend', tBodies.join(''));

        const editableGoalDiv = mainContent.querySelectorAll('.editable-goal-block');
        const editableModelPre = mainContent.querySelectorAll('.editable-pre');

        contenteditableActions(editableGoalDiv, 'div');
        contenteditableActions(editableModelPre, 'pre');

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

        const chevronBtn = mainContent.querySelector('#show-hide');
        chevronBtn.addEventListener('click', e => {
            const tbodies = mainContent.querySelectorAll('table tbody');
            tbodies.forEach(tbody => showHide(tbody, 'showed'));
            showHide(e.target, 'up');
        });
    }
});
