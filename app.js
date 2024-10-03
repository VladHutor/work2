// URL-адрес Google Apps Script API (вставь свой URL сюда)
const scriptURL = 'ВСТАВЬ_СВОЙ_URL_СЮДА';

// Функция для отправки данных в Google Sheets
function saveToGoogleSheets(tabData) {
  fetch(scriptURL, {
    method: 'POST',
    body: JSON.stringify(tabData),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

// Функция для загрузки данных из Google Sheets
function loadFromGoogleSheets() {
  fetch(scriptURL)
    .then(response => response.json())
    .then(data => {
      console.log('Loaded data:', data);
      // Обработай данные здесь, чтобы отобразить их на сайте
      renderLoadedData(data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

// Пример рендера загруженных данных (адаптируй под свою логику)
function renderLoadedData(data) {
  data.forEach((row, index) => {
    const tabNumber = row[0];
    const tabName = row[1];
    const tabInn = row[2];
    const tabBg = row[3];
    const comments = row[4];

    // Создай элементы вкладок и добавь их на страницу (адаптируй этот код)
    const tabElement = document.createElement('div');
    tabElement.className = 'tab';
    tabElement.innerHTML = `
      <p>Номер вкладки: ${tabNumber}</p>
      <p>Название: ${tabName}</p>
      <p>ИНН: ${tabInn}</p>
      <p>БГ: ${tabBg}</p>
      <p>Комментарии: ${comments}</p>
    `;
    document.body.appendChild(tabElement);
  });
}

// Сохранение данных по нажатию кнопки
const saveButton = document.getElementById('save-tab');
saveButton.addEventListener('click', () => {
  const tabNumber = document.getElementById('tab-number').value;
  const tabName = document.getElementById('tab-name').value;
  const tabInn = document.getElementById('tab-inn').value;
  const tabBg = document.getElementById('tab-bg').value;
  const comments = document.getElementById('comments').value;

  const tabData = [tabNumber, tabName, tabInn, tabBg, comments];
  saveToGoogleSheets(tabData);
});

// Загрузка данных при загрузке страницы
window.onload = loadFromGoogleSheets;
