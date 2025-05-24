document.addEventListener('DOMContentLoaded', function () {
  // Элементы DOM
  const tabs = document.querySelectorAll('.order__tab');
  const contents = document.querySelectorAll('[data-content]');
  const prevBtn = document.querySelector('.order_nav_btn__prev');
  const nextBtn = document.querySelector('.order_nav_btn__next');
  const orderBtn = document.querySelector('.btn_promocode');
  const errorMessage = document.querySelector('.order-error-message');
  const cashPayment = document.querySelector('.pay_item:first-child');
  const cardPayment = document.querySelector('.pay_item:last-child');

  // Переключение между физическим и юридическим лицом
  document.querySelectorAll('.js-radio-label').forEach(label => {
    const radio = label.querySelector('input[type="radio"]');
    const dataPers = document.querySelector('.order-data__content_pers');
    const dataLegal = document.querySelector('.order-data__content_legal');

    radio.addEventListener('change', () => {
      document.querySelectorAll('.js-radio-label').forEach(l => l.classList.remove('is-checked'));
      label.classList.add('is-checked');

      dataLegal.style.display = 'none';
      dataPers.style.display = 'none';

      if (radio.value === 'person') {
        dataPers.style.display = 'grid';
      } else {
        dataLegal.style.display = 'grid';
      }
    });

    if (radio.checked) {
      label.classList.add('is-checked');
    }
  });

  // Обновление состояния заполненности инпутов
  function updateInputState(input) {
    input.classList.toggle('filled', input.value.trim() !== '');
  }

  document.addEventListener('input', function (e) {
    const input = e.target;
    if (input.classList.contains('form__input')) {
      updateInputState(input);
    }
  });

  // Переключение между способами доставки
  const deliveryItems = document.querySelectorAll('.delivery__item');
  deliveryItems.forEach(item => {
    item.addEventListener('click', () => {
      deliveryItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');

      // Обновляем доступные способы оплаты
      updatePaymentMethods(item.textContent.includes('Самовывоз'));
    });
  });

  // Обновление доступных способов оплаты
  function updatePaymentMethods(isPickup) {
    if (!isPickup) {
      cashPayment.style.display = 'none';
      cardPayment.style.display = 'flex';
    } else {
      cashPayment.style.display = 'flex';
      cardPayment.style.display = 'flex';
    }
  }

  // Переключение между способами оплаты
  const payItems = document.querySelectorAll('.pay_item');
  payItems.forEach(item => {
    item.addEventListener('click', () => {
      if (item.style.display !== 'none') {
        payItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
      }
    });
  });

  // Валидация адресов доставки
  const validAddresses = [
    'ул. Петра Романова',
    'ул. Петра Романова 22',
    'ул. Петра Романова 2',
    'ул. Ленина',
    'ул. Ленина 10',
    'пр. Мира',
    'пр. Мира 15'
  ];

  const addressInputs = document.querySelectorAll('.input_map');
  let isAddressValid = false;

  addressInputs.forEach(input => {
    const label = input.closest('.form__label');
    const errorElement = label.querySelector('.input_err');
    const suggestionsContainer = input.closest('.map_input').querySelector('.map_input-suggestions');

    if (!suggestionsContainer) return;

    const updateFilledState = () => {
      input.classList.toggle('filled', input.value.trim().length > 0);
    };

    const validateAddress = () => {
      const value = input.value.trim();
      if (value.length > 0 && validAddresses.includes(value)) {
        label.classList.remove('error');
        errorElement.style.display = 'none';
        isAddressValid = true;
      } else if (value.length > 0) {
        label.classList.add('error');
        errorElement.style.display = 'block';
        isAddressValid = false;
      } else {
        label.classList.remove('error');
        errorElement.style.display = 'none';
        isAddressValid = false;
      }
      return isAddressValid;
    };

    input.addEventListener('input', function (e) {
      updateFilledState();
      const value = e.target.value.trim();

      if (value.length > 0) {
        const filteredSuggestions = validAddresses.filter(addr =>
          addr.toLowerCase().includes(value.toLowerCase())
        );

        suggestionsContainer.innerHTML = '';
        filteredSuggestions.forEach(addr => {
          const suggestionItem = document.createElement('div');
          suggestionItem.classList.add('map_input-suggestions_item');
          suggestionItem.textContent = addr;

          suggestionItem.addEventListener('click', function () {
            input.value = addr;
            updateFilledState();
            validateAddress();
            suggestionsContainer.style.display = 'none';
          });

          suggestionsContainer.appendChild(suggestionItem);
        });

        suggestionsContainer.style.display = filteredSuggestions.length ? 'block' : 'none';
      } else {
        suggestionsContainer.style.display = 'none';
      }
    });

    input.addEventListener('blur', function () {
      setTimeout(() => {
        suggestionsContainer.style.display = 'none';
        updateFilledState();
        validateAddress();
      }, 200);
    });

    input.addEventListener('focus', function () {
      const value = input.value.trim();
      if (value.length > 0) {
        suggestionsContainer.style.display = 'block';
      }
    });

    updateFilledState();
  });

  // Текущая активная вкладка
  let currentTab = 0;

  // Показать вкладку
function showTab(index) {
    // Скрыть все вкладки
    contents.forEach(content => content.classList.remove('open'));
    window.scrollTo(
      {
        top:0,
         behavior: 'smooth'
      }
    )

    // Показать текущую вкладку
    contents[index].classList.add('open');

    // Обновить активные табы
    tabs.forEach((tab, i) => {
        tab.classList.toggle('active', i === index);
    });

    // Прокрутить к активному табу
    const tabsContainer = document.querySelector('.order__tabs'); // ваш контейнер с табами
    const activeTab = tabs[index];
    
    // Вычисляем позицию для прокрутки
    const containerWidth = tabsContainer.offsetWidth;
    const tabOffset = activeTab.offsetLeft;
    const tabWidth = activeTab.offsetWidth;
    
    // Центрируем активный таб
    tabsContainer.scrollTo({
        left: tabOffset - (containerWidth / 2) + (tabWidth / 2),
        behavior: 'smooth'
    });

    // Обновить видимость кнопок
    prevBtn.style.display = index === 0 ? 'none' : 'flex';
    nextBtn.style.display = index === tabs.length - 1 ? 'none' : 'flex';

    currentTab = index;
}

  // Инициализация - показать первую вкладку
  showTab(0);
  // Инициализация способов оплаты
  updatePaymentMethods(false);

  // Обработчики кнопок "Назад" и "Далее"
  prevBtn.addEventListener('click', () => {
    if (currentTab > 0) {
      showTab(currentTab - 1);
      errorMessage.style.display = 'none';
    }
  });

  nextBtn.addEventListener('click', () => {
    if (validateCurrentTab()) {
      showTab(currentTab + 1);
      errorMessage.style.display = 'none';
    }
  });

  // Клик по табам - можно переключаться свободно
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      showTab(index);
      errorMessage.style.display = 'none';
    });
  });

  // Валидация текущей вкладки
  function validateCurrentTab() {
    let isValid = true;

    switch (currentTab) {
      case 0: // Состав заказа
        const products = document.querySelectorAll('.basket_page__product-item');
        if (products.length === 0) {
          isValid = false;
          showError('Добавьте товары в заказ');
        }
        break;

      case 1: // Доставка
        const deliverySelected = document.querySelector('.delivery__item.active');
        if (!deliverySelected) {
          isValid = false;
          showError('Пожалуйста, выберите способ доставки');
        } else if (!deliverySelected.textContent.includes('Самовывоз')) {
          if (!isAddressValid) {
            isValid = false;
            showError('Пожалуйста, укажите корректный адрес доставки');
          }
        }
        break;

      case 2: // Оплата
        const paySelected = document.querySelector('.pay_item.active');
        if (!paySelected) {
          isValid = false;
          showError('Пожалуйста, выберите способ оплаты');
        }
        break;

      case 3: // Данные покупателя
        const isPerson = document.querySelector('input[name="data-order"][value="person"]').checked;
        const requiredInputs = isPerson
          ? document.querySelectorAll('.order-data__content_pers [required]')
          : document.querySelectorAll('.order-data__content_legal [required]');

        requiredInputs.forEach(input => {
          if (!input.value.trim()) {
            input.closest('.form__label').classList.add('error');
            isValid = false;
          } else {
            input.closest('.form__label').classList.remove('error');
          }
        });

        if (!isValid) {
          showError('Пожалуйста, заполните все обязательные поля');
        }
        break;
    }

    return isValid;
  }

  // Проверка всех вкладок перед оформлением заказа
  function validateAllTabs() {
    let isValid = true;

    // Проверяем все вкладки по очереди
    for (let i = 0; i < tabs.length; i++) {
      showTab(i);
      if (!validateCurrentTab()) {
        isValid = false;
        break;
      }
    }

    if (!isValid) {
      errorMessage.style.display = 'block';
    } else {
      errorMessage.style.display = 'none';
      // Здесь можно отправить форму
      alert('Заказ успешно оформлен!');
    }

    return isValid;
  }

  // Показать ошибку
  function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
  }

  // Обработчик кнопки оформления заказа
  orderBtn.addEventListener('click', validateAllTabs);

  // При изменении данных на последней вкладке проверяем валидность
  document.querySelector('.order-data__content').addEventListener('input', function (e) {
    if (currentTab === 3 && e.target.hasAttribute('required')) {
      const label = e.target.closest('.form__label');
      if (e.target.value.trim()) {
        label.classList.remove('error');
      }
    }
  });

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
});