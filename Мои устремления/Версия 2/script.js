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
        next_stage: [
            ['Этап 1', 'Подразделение 1', `Комментарий 1`],
            ['Этап 2', 'Подразделение 2', `Комментарий 2`],
            ['Этап 3', 'Подразделение 3', `Комментарий 3`],
        ],
        roles: [
            ['Роль 1', 'Срок планирования 1', `Комментарий 1`],
            ['Роль 2', 'Срок планирования 2', `Комментарий 2`],
            ['Роль 3', 'Срок планирования 3', `Комментарий 3`],
        ],
        mobility: [
            ['Предпочтительное место 1', `Комментарий 1`],
            ['Предпочтительное место 2', `Комментарий 2`],
            ['Предпочтительное место 3', `Комментарий 3`],
        ],
    };

    if (typeof myAmbitions === 'object') {
        const myAmbitionsTableBody = mainContent.querySelector('#my-professional-ambitions__table tbody'); // получение тела таблицы

        const maxRows = Math.max(myAmbitions.roles.length, myAmbitions.next_stage.length, myAmbitions.mobility.length); // определение количества итераций для цикла

        let rows = [];

        for (let i = 0; i < maxRows; i++) {
            const stagesCondition = i <= myAmbitions.next_stage.length;
            const rolesCondition = i <= myAmbitions.roles.length;
            const mobilityCondition = i <= myAmbitions.mobility.length;

            const row = `<tr>
                <td class="stage-col">
                    <span>${stagesCondition ? myAmbitions.next_stage[i][0] : ''}</span>
                </td>
                <td class="unit-col">
                    <span>${stagesCondition ? myAmbitions.next_stage[i][1] : ''}</span>
                </td>
                <td class="stage-comment-col">
                    <span>${stagesCondition ? myAmbitions.next_stage[i][2] : ''}</span>
                </td>
                <td class="role-col">
                    <span>${rolesCondition ? myAmbitions.roles[i][0] : ''}</span>
                </td>
                <td class="period-col">
                    <span>${rolesCondition ? myAmbitions.roles[i][1] : ''}</span>
                </td>
                <td class="role-comment-col">
                    <span>${rolesCondition ? myAmbitions.roles[i][2] : ''}</span>
                </td>
                <td class="preferred-position-col">
                    <span>${mobilityCondition ? myAmbitions.mobility[i][0] : ''}</span>
                </td>
                <td class="mobility-comment-col">
                    <span>${mobilityCondition ? myAmbitions.mobility[i][1] : ''}</span>
                </td>
            </tr>`;

            rows.push(row);
        }

        myAmbitionsTableBody.insertAdjacentHTML('beforeend', rows.join('')); // вставка построенных строк в тело таблицы

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
