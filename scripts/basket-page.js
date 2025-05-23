
// Находим все счетчики на странице
const counters = document.querySelectorAll('.card-product__counter');

// Обрабатываем каждый счетчик
counters.forEach(counter => {
    const minusBtn = counter.querySelector('.card-product__counter_minus');
    const plusBtn = counter.querySelector('.card-product__counter_plus');
    const countDisplay = counter.querySelector('.card-product__counter_count');

    // Определяем тип счетчика (шт или масса)
    const isMassCounter = counter.classList.contains('counter_mass');

    // Назначаем обработчики кликов
    minusBtn.addEventListener('click', () => {
        updateCounter(countDisplay, isMassCounter, -1);
    });

    plusBtn.addEventListener('click', () => {
        updateCounter(countDisplay, isMassCounter, 1);
    });
});

// Функция обновления счетчика
function updateCounter(display, isMass, change) {
    let value = parseFloat(display.textContent);

    if (isMass) {
        // Для массы: шаг 0.05, минимум 0.05
        value += change * 0.05;
        value = Math.max(0.05, Math.round(value * 100) / 100);
        display.textContent = value.toFixed(2);
    } else {
        // Для количества: шаг 1, минимум 1
        value = Math.max(1, value + change);
        display.textContent = Math.round(value);
    }
}