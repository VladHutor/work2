const tabsContainer = document.querySelector('.tabs');
const applicationFields = document.querySelector('.application-fields');
const deleteTabButton = document.querySelector('.delete-tab');
const applicationNumberInput = document.getElementById('application-number');
const clientNameInput = document.getElementById('client-name');
const clientInnInput = document.getElementById('client-inn');
const clientBgInput = document.getElementById('client-bg');
const commentsInput = document.getElementById('comments');

// Функция для создания новой вкладки
function createTab(tabName) {
    const tab = document.createElement('div');
    tab.className = 'tab';
    tab.textContent = tabName;

    // Добавляем функционал перетаскивания для вкладок
    tab.draggable = true;
    tab.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', tabName);
    });

    tabsContainer.appendChild(tab);
    return tab;
}

// Добавление новой вкладки
document.querySelector('.add-tab').addEventListener('click', () => {
    const tabName = `Заявка ${tabsContainer.children.length + 1}`;
    createTab(tabName);
});

// Удаление текущей вкладки
deleteTabButton.addEventListener('click', () => {
    const tabs = document.querySelectorAll('.tab');
    if (tabs.length > 0) {
        tabs[tabs.length - 1].remove(); // Удаляем последнюю вкладку
    }
});

// Перетаскивание банков между этапами
const banks = document.querySelectorAll('.bank');
const columns = document.querySelectorAll('.column');

banks.forEach(bank => {
    bank.draggable = true;

    bank.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', e.target.dataset.bank);
    });
});

columns.forEach(column => {
    column.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    column.addEventListener('drop', (e) => {
        e.preventDefault();
        const bankName = e.dataTransfer.getData('text/plain');
        const bankElement = document.querySelector(`.bank[data-bank="${bankName}"]`);

        // Проверяем, что банк можно переместить только один раз
        if (!column.querySelector(`.bank[data-bank="${bankName}"]`)) {
            column.appendChild(bankElement);

            // Под полем банка добавляем номер заявки и комиссию
            let bankDetails = document.createElement('div');
            bankDetails.innerHTML = `
                <label>Номер в банке: <input type="text" class="bank-application-number"></label>
                <label>Сумма комиссии: <input type="text" class="bank-commission"></label>
            `;
            bankElement.appendChild(bankDetails);
        }
    });
});

// Функция сохранения данных заявки в Google Sheets
function saveApplicationData() {
    const applicationNumber = applicationNumberInput.value;
    const clientName = clientNameInput.value;
    const inn = clientInnInput.value;
    const bg = clientBgInput.value;
    const comments = commentsInput.value;

    fetch('https://script.google.com/macros/s/AKfycbyQ4RCtpzf5174VNNJUiz-S5gYWLqsARvnvxapUmrw6g5l8aRQjaaBtYBRkbZMHysSpGg/exec', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            applicationNumber: applicationNumber,
            clientName: clientName,
            inn: inn,
            bg: bg,
            comments: comments,
        }),
    })
    .then(response => response.text())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

// Вызываем функцию сохранения при добавлении новой заявки
applicationNumberInput.addEventListener('input', saveApplicationData);
clientNameInput.addEventListener('input', saveApplicationData);
clientInnInput.addEventListener('input', saveApplicationData);
clientBgInput.addEventListener('input', saveApplicationData);
commentsInput.addEventListener('input', saveApplicationData);
