import { UI_ELEMENTS } from "./view.js";

const tabs = document.querySelectorAll('.tab');

// Переключение табов
for (const item of tabs) {
    item.addEventListener('click', switchTab);
}

function switchTab() {
    for (const item of tabs) {
        item.classList.remove('active-tab');
    };
    this.classList.add('active-tab');
};

UI_ELEMENTS.FIND_CITY.addEventListener('click', function(event) {
    event.preventDefault();
});