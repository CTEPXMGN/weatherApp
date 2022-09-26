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
    
    try {
        let response = await fetch(URL);

        if (response.ok) {
            let dataWeather = await response.json();
            console.log(dataWeather);
    
            const SRC_IMG = `
            https://openweathermap.org/img/wn/${dataWeather.weather[0].icon}@4x.png
            `;
            renderNow(Math.round(dataWeather.main.temp) ,dataWeather.name, SRC_IMG);
            renderDetails(dataWeather);
        } else {
            alert('Ошибочка вышла: ' + response.status);
        }
    } catch (error) {
        alert(error.stack);
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

// Отрисовка вкладки DETAILS
function renderDetails(data) {

    const dateInMs = data.sys.sunrise;
    const minutes = new Date(dateInMs).getMinutes();
    const seconds = new Date(dateInMs).getSeconds();
    const arrData = [
        `Temperature: ${Math.round(data.main.temp)}°`,
        `Feels like: ${Math.round(data.main.feels_like)}°`,
        `Weather: ${data.weather[0].main}`,
        `Sunrise: ${minutes}:${seconds}`,
    ];

    const p = document.createElement('p');
    p.classList.add('tab-details__city');
    p.textContent = data.name;
    UI_ELEMENTS.TAB_DETAILS.appendChild(p);

    const ul = document.createElement('ul');
    ul.classList.add('tab-details__list');
    
    for (const item of arrData) {
        const li = document.createElement('li');
        li.classList.add('tab-details__item');
        li.textContent = item;
        ul.appendChild(li);
    }


    UI_ELEMENTS.TAB_DETAILS.appendChild(ul);
};