'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const showHide = (selector, exeClass) => {
        !selector.classList.contains(exeClass)
            ? selector.classList.add(exeClass)
            : selector.classList.remove(exeClass);
    }; // скрыть/показать элемент

    const criteria = {
        0: 'Нет оценки',
        1: 'Плохо',
        2: 'Удовлетворительно',
        3: 'Хорошо',
        4: 'Отлично'
    }; // критерии оценки

    const stars = (value, groupNumber, rowNumber, property) => {
        const stars = [];
        value = value !== '' ? value : 0;

        for (let i = 4; i >= 1; i--) {
            const star = `<input class="radio-star" id="star-${property}-${groupNumber}-${rowNumber}-${i}" name="star-${property}-${groupNumber}-${rowNumber}" value="${i}" ${i === value ? 'checked' : ''} type="radio">
                                <label for="star-${property}-${groupNumber}-${rowNumber}-${i}"></label>`;

            stars.push(star);
        }

        return `<div class="stars-keeper">
                    ${stars.join('')}
                    <span class="star-note" title="${criteria[value]}"></span>
                </div>`;
    } // шаблон звездного рейтинга

    const mainContent = document.querySelector('.main-content');

    //----- Оценка компетенций -----//

    const competencies = [
        {
            group_name: 'Группа компетенций 1',
            group_rows: [
                {
                    competencies_name: 'Компетенция 1',
                    competencies_description: 'Подробное описание компетенции 1',
                    worker_evaluation: 2,
                    leader_evaluation: 4,
                    focus: true,
                },
                {
                    competencies_name: 'Компетенция 2',
                    competencies_description: 'Подробное описание компетенции 2',
                    worker_evaluation: 1,
                    leader_evaluation: 1,
                    focus: true,
                },
                {
                    competencies_name: 'Компетенция 3',
                    competencies_description: 'Подробное описание компетенции 3',
                    worker_evaluation: 4,
                    leader_evaluation: 3,
                    focus: true,
                },
            ]
        },
        {
            group_name: 'Группа компетенций 2',
            group_rows: [
                {
                    competencies_name: 'Компетенция 1',
                    competencies_description: 'Подробное описание компетенции 1',
                    worker_evaluation: 2,
                    leader_evaluation: 4,
                    focus: true,
                },
                {
                    competencies_name: 'Компетенция 2',
                    competencies_description: 'Подробное описание компетенции 2',
                    worker_evaluation: 1,
                    leader_evaluation: 1,
                    focus: true,
                },
                {
                    competencies_name: 'Компетенция 3',
                    competencies_description: 'Подробное описание компетенции 3',
                    worker_evaluation: 4,
                    leader_evaluation: 3,
                    focus: true,
                },
            ]
        },
    ]; // компетенции

    if (Array.isArray(competencies)) {
        const targetTable = mainContent.querySelector('#assessment-of-competencies__table');

        const fullGroups = competencies.map((group, index_group) => {
            const groupTbody = `<tbody class="group-tbody">
                <td class="assessment-of-competencies-col">${group.group_name}</td>
                <td class="worker-evaluation-col"></td>
                <td class="leader-evaluation-col"></td>
                <td class="focus-col">
                    <button class="chevron up" type="button"></button>
                </td>
            </tbody>`;

            index_group++;

            const groupRows = Object.values(group.group_rows).map((row, index_row) => {
                index_row++;
                return `<tr>
                    <td class="assessment-of-competencies-col">
                        <div>
                            <span class="competencies-note" title="${row.competencies_description}"></span>
                            ${row.competencies_name}
                        </div>
                    </td>
                    <td class="worker-evaluation-col">
                        <div>${stars(row.worker_evaluation, index_group, index_row, 'worker')}</div>
                    </td>
                    <td class="leader-evaluation-col">
                        <div>${stars(row.leader_evaluation, index_group, index_row, 'leader')}</div>
                    </td>
                    <td class="focus-col">
                        <div>
                            <div class="checkbox-keeper">
                                <input class="focus-checkbox" id="focus-${index_group}-${index_row}" type="checkbox">
                                <label for="focus-${index_group}-${index_row}"></label>
                            </div>
                        </div>
                    </td>
                </tr>`;
            });

            return `${groupTbody}<tbody class="tbody-show">${groupRows.join('')}</tbody>`;
        });

        targetTable.insertAdjacentHTML('beforeend', fullGroups.join(''));

        const chevrons = mainContent.querySelectorAll('.chevron');
        chevrons.forEach(btn => {
            btn.addEventListener('click', e => {
                const parentTbody = e.target.closest('tbody');
                const nextTbody = parentTbody.nextElementSibling;
                showHide(nextTbody, 'tbody-show');
                showHide(e.target, 'up');
            });
        });
    }
});
