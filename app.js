// Динамическое добавление вкладок
const addTabButton = document.getElementById('add-tab');
let tabCounter = 5436;

addTabButton.addEventListener('click', () => {
  const newTab = document.createElement('div');
  newTab.classList.add('tab');
  newTab.innerText = tabCounter++;
  document.getElementById('tabs').insertBefore(newTab, addTabButton);
});

// Перетаскивание банков в разделы
const banks = document.querySelectorAll('.bank');
const stages = document.querySelectorAll('.stage');

banks.forEach(bank => {
  bank.setAttribute('draggable', true);

  bank.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', e.target.id);
  });
});

stages.forEach(stage => {
  stage.addEventListener('dragover', (e) => {
    e.preventDefault();
  });

  stage.addEventListener('drop', (e) => {
    const bankId = e.dataTransfer.getData('text');
    const bankElement = document.getElementById(bankId);
    stage.appendChild(bankElement);
    // Добавление полей для номера и суммы
    if (!bankElement.querySelector('.bank-info')) {
      const bankInfo = document.createElement('div');
      bankInfo.classList.add('bank-info');
      const numberInput = document.createElement('input');
      numberInput.placeholder = 'Номер в банке';
      const sumInput = document.createElement('input');
      sumInput.placeholder = 'Сумма комиссии';
      bankInfo.appendChild(numberInput);
      bankInfo.appendChild(sumInput);
      bankElement.appendChild(bankInfo);
    }
  });
});
