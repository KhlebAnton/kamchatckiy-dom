
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

  // Обработчик промокода
  const promoForm = document.querySelector('.form_promo');
  const promoInput = promoForm.querySelector('input');
  const promoBtn = promoForm.querySelector('.promo_btn');
  const promoError = promoForm.querySelector('.promocode_err-msg');
  const promoSaleBlock = document.querySelector('.promocode_sale');

  // Флаг для отслеживания состояния промокода
  let isPromoApplied = false;

  promoForm.addEventListener('submit', function (e) {
    e.preventDefault();

    if (isPromoApplied) {
      resetPromo();
    } else {
      const promoValue = promoInput.value.trim();

      if (promoValue === '') {
        showErrorPromo('Введите промокод');
      } else if (!isValidPromoCode(promoValue)) {
        showErrorPromo('Неверный промокод');
      } else {
        applyPromo();
      }
    }
  });

  function showErrorPromo(message) {
    promoError.textContent = message;
    promoError.style.display = 'block';
  }

  function isValidPromoCode(code) {

    const validCodes = ['КАМЧАТКА', 'SALE20', 'SPECIAL'];
    return validCodes.includes(code.toUpperCase());
  }

  function applyPromo() {
    promoError.style.display = 'none';
    promoSaleBlock.style.display = 'flex';
    promoInput.disabled = true;
    promoBtn.classList.add('promo_btn_reset');
    isPromoApplied = true;
  }

  function resetPromo() {
    promoInput.value = '';
    promoInput.disabled = false;
    promoBtn.classList.remove('promo_btn_reset');
    promoSaleBlock.style.display = 'none';
    isPromoApplied = false;
  }