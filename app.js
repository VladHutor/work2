let currentTabId = 0;
let tabsData = {};

// Создание новой вкладки
function createTab() {
    currentTabId++;
    const newTab = document.createElement('div');
    newTab.className = 'tab';
    newTab.id = `tab-${currentTabId}`;
    newTab.textContent = currentTabId;
    newTab.addEventListener('click', () => selectTab(currentTabId));
    document.getElementById('tabs').appendChild(newTab);

    // Создаем данные для новой вкладки
    tabsData[currentTabId] = {
        number: '',
        name: '',
        inn: '',
        bg: '',
        comments: '',
        banks: {}
    };

    selectTab(currentTabId);
}

function selectTab(tabId) {
    currentTabId = tabId;
    const data = tabsData[tabId];

    document.getElementById('tab-number').value = data.number;
    document.getElementById('tab-name').value = data.name;
    document.getElementById('tab-inn').value = data.inn;
    document.getElementById('tab-bg').value = data.bg;
    document.getElementById('tab-comments').value = data.comments;
}

// Перетаскивание банков
document.querySelectorAll('.bank').forEach(bank => {
    bank.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', e.target.dataset.bank);
    });
});

document.querySelectorAll('.column').forEach(column => {
    column.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    column.addEventListener('drop', (e) => {
        const bankName = e.dataTransfer.getData('text/plain');
        const bankElement = document.createElement('div');
        bankElement.className = 'bank';
        bankElement.textContent = bankName;

        const numberInput = document.createElement('input');
        numberInput.placeholder = 'Номер в банке';

        const sumInput = document.createElement('input');
        sumInput.placeholder = 'Сумма комиссии';

        bankElement.appendChild(numberInput);
        bankElement.appendChild(sumInput);

        column.appendChild(bankElement);

        // Сохраняем данные банка во вкладке
        if (!tabsData[currentTabId].banks[bankName]) {
            tabsData[currentTabId].banks[bankName] = { stage: column.dataset.stage, number: '', sum: '' };
        }

        numberInput.addEventListener('input', (e) => {
            tabsData[currentTabId].banks[bankName].number = e.target.value;
        });

        sumInput.addEventListener('input', (e) => {
            tabsData[currentTabId].banks[bankName].sum = e.target.value;
        });
    });
});

document.getElementById('add-tab').addEventListener('click', createTab);
document.getElementById('delete-tab').addEventListener('click', () => {
    delete tabsData[currentTabId];
    document.getElementById(`tab-${currentTabId}`).remove();
});

// Инициализация первой вкладки
createTab();
