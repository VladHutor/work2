let draggedBank = null;

document.querySelectorAll('.bank-item').forEach(item => {
    item.addEventListener('dragstart', function () {
        draggedBank = this;
    });
});

document.querySelectorAll('.drop-area').forEach(area => {
    area.addEventListener('dragover', function (e) {
        e.preventDefault();
    });

    area.addEventListener('drop', function () {
        if (draggedBank) {
            this.appendChild(draggedBank);
            // После добавления банка, создаем поля для ввода номера и суммы
            const inputNumber = document.createElement('input');
            inputNumber.type = 'text';
            inputNumber.placeholder = 'Номер в банке';
            inputNumber.classList.add('bank-detail');

            const inputSum = document.createElement('input');
            inputSum.type = 'text';
            inputSum.placeholder = 'Сумма комиссии';
            inputSum.classList.add('bank-detail');

            this.appendChild(inputNumber);
            this.appendChild(inputSum);
        }
    });
});

// Логика для добавления новой вкладки
document.querySelector('.tab:last-child').addEventListener('click', function () {
    const newTab = document.createElement('div');
    newTab.classList.add('tab');
    newTab.textContent = 'Новая вкладка';
    document.querySelector('#tabs').appendChild(newTab);
});

// Логика для удаления вкладки
document.querySelector('#delete-tab').addEventListener('click', function () {
    const activeTab = document.querySelector('.tab.active');
    if (activeTab && activeTab.id !== 'tab-1') {
        activeTab.remove();
    }
});
