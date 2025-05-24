const dropdown = document.querySelector('.acc-dropdown');
const dropdownBtn = document.querySelector('.acc-dropdown-btn');
const dropdownBtnTab = dropdownBtn.querySelector('.acc-tab');
const dropdownItems = document.querySelectorAll('.acc-dropdown__item');
const allTabs = document.querySelectorAll('.acc-tab:not(.acc-dropdown-btn .acc-tab)');
const contentContainers = document.querySelectorAll('.account_content-container [data-content]');
const orderMoreButtons = document.querySelectorAll('.btn_order_more');
const backToOrdersButton = document.querySelector('.btn_close-page_order');

// Переменная для хранения предыдущей вкладки
let previousTab = '0';

// Обработчик для мобильного выпадающего списка
dropdownBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    dropdown.classList.toggle('open');
});

// Обработчик для элементов выпадающего списка
dropdownItems.forEach(item => {
    item.addEventListener('click', function () {
        const tab = this.querySelector('.acc-tab');
        const tabContent = tab.innerHTML;
        const tabIndex = tab.getAttribute('data-tab');

        // Обновляем кнопку
        dropdownBtnTab.innerHTML = tabContent;
        dropdownBtnTab.setAttribute('data-tab', tabIndex);
        dropdown.classList.remove('open');

        // Активируем соответствующий таб
        activateTab(tabIndex);
    });
});

// Обработчик для всех табов (десктоп и мобильные)
allTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const tabIndex = tab.getAttribute('data-tab');
        // Сохраняем текущую вкладку как предыдущую перед переключением
        previousTab = document.querySelector('.acc-tab.active').getAttribute('data-tab');
        activateTab(tabIndex);

        // Если это клик по десктопному табу, обновляем кнопку
        if (tab.closest('.acc-tabs-desktop')) {
            dropdownBtnTab.innerHTML = tab.innerHTML;
            dropdownBtnTab.setAttribute('data-tab', tabIndex);
        }

        // Если это клик по мобильному табу, обновляем кнопку
        if (tab.closest('.acc-dropdown-content')) {
            dropdownBtnTab.innerHTML = tab.innerHTML;
            dropdownBtnTab.setAttribute('data-tab', tabIndex);
            dropdown.classList.remove('open');
        }
    });
});

// Обработчик для кнопок "Подробнее о заказе"
orderMoreButtons.forEach(button => {
    button.addEventListener('click', function () {
        // Сохраняем текущую активную вкладку как предыдущую
        previousTab = document.querySelector('.acc-tab.active').getAttribute('data-tab');

        // Скрываем все контейнеры контента
        contentContainers.forEach(container => {
            container.classList.remove('open');
        });

        // Показываем контейнер с информацией о заказе
        const orderInfoContainer = document.querySelector('[data-content="page-order"]');
        if (orderInfoContainer) {
            orderInfoContainer.classList.add('open');
        }
    });
});

// Обработчик для кнопки "К списку заказов"
backToOrdersButton.addEventListener('click', function () {
    // Скрываем контейнер с информацией о заказе
    const orderInfoContainer = document.querySelector('[data-content="page-order"]');
    if (orderInfoContainer) {
        orderInfoContainer.classList.remove('open');
    }

    // Возвращаемся на предыдущую вкладку
    activateTab(previousTab);

    // Обновляем кнопку выпадающего списка
    const activeTab = document.querySelector(`.acc-tab.active:not(.acc-dropdown-btn .acc-tab)`);
    if (activeTab) {
        dropdownBtnTab.innerHTML = activeTab.innerHTML;
        dropdownBtnTab.setAttribute('data-tab', activeTab.getAttribute('data-tab'));
    }
});

// Закрытие выпадающего списка при клике вне его
document.addEventListener('click', function (e) {
    if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('open');
    }
});

// Функция для активации таба по индексу
function activateTab(tabIndex) {
    // Удаляем активный класс у всех табов (кроме таба в кнопке)
    allTabs.forEach(tab => {
        tab.classList.remove('active');
    });

    // Добавляем активный класс к выбранному табу (всех версиях, кроме кнопки)
    allTabs.forEach(tab => {
        if (tab.getAttribute('data-tab') === tabIndex) {
            tab.classList.add('active');
        }
    });

    // Скрываем все контейнеры контента
    contentContainers.forEach(container => {
        container.classList.remove('open');
    });

    // Показываем соответствующий контейнер контента
    const activeContent = document.querySelector(`[data-content="${tabIndex}"]`);
    if (activeContent) {
        activeContent.classList.add('open');
    }
}

// Инициализация - активируем первый таб при загрузке
activateTab('4');

    const historyItems = document.querySelectorAll('.personal_bonus__history__item');
    const showMoreBtn = document.querySelector('.btn_more_history_bonus');
    const step = 4; // Показывать по 4 элемента за раз
    let visibleCount = 0; // Счетчик видимых элементов

    // Показываем первые 4 элемента при загрузке
    function init() {
        visibleCount = Math.min(step, historyItems.length);
        for (let i = 0; i < visibleCount; i++) {
            historyItems[i].classList.add('visible');
        }
        updateButtonText();
    }

    // Обновляем текст кнопки
    function updateButtonText() {
        if (visibleCount >= historyItems.length) {
            showMoreBtn.textContent = 'Скрыть все';
            showMoreBtn.classList.add('active');
        } else {
            showMoreBtn.textContent = 'Показать еще';
            showMoreBtn.classList.remove('active');
        }

        // Скрываем кнопку, если все элементы видны или их меньше step
        if (historyItems.length <= step) {
            showMoreBtn.style.display = 'none';
        } else {
            showMoreBtn.style.display = 'flex';
        }
    }

    // Обработчик клика
    showMoreBtn.addEventListener('click', function() {
        // Если все элементы уже показаны - скрываем лишние
        if (visibleCount >= historyItems.length) {
            for (let i = step; i < historyItems.length; i++) {
                historyItems[i].classList.remove('visible');
            }
            visibleCount = step;
        } 
        // Иначе показываем +4 элемента
        else {
            const nextItems = Math.min(visibleCount + step, historyItems.length);
            for (let i = visibleCount; i < nextItems; i++) {
                historyItems[i].classList.add('visible');
            }
            visibleCount = nextItems;
        }
        
        updateButtonText();
    });

    // Инициализация
    init();