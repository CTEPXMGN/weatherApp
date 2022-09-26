import { UI_ELEMENTS } from "./view.js";

// Переключение табов
for (const item of UI_ELEMENTS.TABS) {
    item.addEventListener('click', switchTab);
}

function switchTab() {
    for (const item of UI_ELEMENTS.TABS) {
        item.classList.remove('active-tab');
    };
    this.classList.add('active-tab');
};

// Получение погоды
UI_ELEMENTS.FIND_FORM.addEventListener('submit', getWeather);

async function getWeather(event) {
    event.preventDefault();

    while(UI_ELEMENTS.TAB_NOW.firstChild){
        UI_ELEMENTS.TAB_NOW.removeChild(UI_ELEMENTS.TAB_NOW.firstChild);
    };

    const SERVER_URL = 'http://api.openweathermap.org/data/2.5/weather';
    const API_KEY = '0a8c506a0f09e19f0f5a48594460c570';
    const URL = `${SERVER_URL}?q=${UI_ELEMENTS.FIND_INPUT.value}&appid=${API_KEY}&units=metric&lang=ru`;
    
    let response = await fetch(URL);

    if (response.ok) {
        let dataWeather = await response.json();
        console.log(dataWeather);

        const SRC_IMG = `
        https://openweathermap.org/img/wn/${dataWeather.weather[0].icon}@4x.png
        `;
        renderNow(Math.round(dataWeather.main.temp) ,dataWeather.name, SRC_IMG);
    } else {
        alert('Ошибочка вышла: ' + response.status);
    }
    
    UI_ELEMENTS.FIND_INPUT.value = '';
}
// Отрисовка вкладки NOW
function renderNow(temp, city, icon) {

    const p1 = document.createElement('p');
    p1.classList.add('tab-now__temperature');
    p1.textContent = temp + '°';
    UI_ELEMENTS.TAB_NOW.appendChild(p1);

    const p2 = document.createElement('p');
    p2.classList.add('tab-now__city');
    p2.textContent = city;
    UI_ELEMENTS.TAB_NOW.appendChild(p2);

    const input = document.createElement('input');
    input.classList.add('tab-now__add');
    input.type = 'button';
    UI_ELEMENTS.TAB_NOW.appendChild(input);

    const img = document.createElement('img');
    img.classList.add('tab-now__img');
    img.src = icon;
    img.alt = 'weather icon';
    UI_ELEMENTS.TAB_NOW.appendChild(img);
};