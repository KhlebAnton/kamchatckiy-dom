document.addEventListener('DOMContentLoaded', function() {
  // Находим все карточки продуктов
  const productCards = document.querySelectorAll('.card-product');
  
  // Для каждой карточки
  productCards.forEach(card => {
    // Элементы карточки
    const addToCartBtn = card.querySelector('.btn_card_basket');
    const counterGroup = card.querySelector('.btn_card_basket_counter');
    const minusBtn = card.querySelector('.btn_card_basket_counter_minus');
    const plusBtn = card.querySelector('.btn_card_basket_counter_plus');
    const countDisplay = card.querySelector('.btn_card_basket_counter_count');
    
    // Изначально скрываем счетчик
    counterGroup.style.display = 'none';
    
    // Обработчик клика на кнопку "В корзину"
    addToCartBtn.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Показываем счетчик, скрываем кнопку
      counterGroup.style.display = 'flex';
      addToCartBtn.style.display = 'none';
      
      // Устанавливаем начальное значение 1
      countDisplay.textContent = '1';
      
      // Активируем минус (но он будет работать только при значении > 1)
      updateMinusButton();
    });
    
    // Обработчик клика на плюс
    plusBtn.addEventListener('click', function() {
      let count = parseInt(countDisplay.textContent);
      count++;
      countDisplay.textContent = count;
      
      updateMinusButton();
    });
    
    // Обработчик клика на минус
    minusBtn.addEventListener('click', function() {
      let count = parseInt(countDisplay.textContent);
      
      if (count > 1) {
        count--;
        countDisplay.textContent = count;
        
        // Если стало 1, меняем минус на корзину
        if (count === 1) {
          updateMinusButton();
        }
      } else {
        // Если было 1 - скрываем счетчик, показываем кнопку
        counterGroup.style.display = 'none';
        addToCartBtn.style.display = 'flex';
      }
    });
    
    // Функция для обновления вида кнопки минус
    function updateMinusButton() {
      const count = parseInt(countDisplay.textContent);
      
      if (count === 1) {
        // Если 1 товар - минус становится иконкой корзины
        minusBtn.classList.add('card_trash')
       
      } else {
        // Если больше 1 - обычный минус
         minusBtn.classList.remove('card_trash')
      }
    }
  });
});