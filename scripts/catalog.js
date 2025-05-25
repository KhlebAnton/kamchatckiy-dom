document.addEventListener('DOMContentLoaded', function () {
    const dropdown = document.querySelector('.sort-dropdown');
    const dropdownBtn = document.querySelector('.sort-dropdown-btn');
    const dropdownItems = document.querySelectorAll('.sort-dropdown__item');

    if (dropdownBtn) {
        dropdownBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            dropdown.classList.toggle('open');
        });

        dropdownItems.forEach(item => {
            item.addEventListener('click', function () {
                dropdownBtn.textContent = this.textContent;
                dropdown.classList.remove('open');
            });
        });

        document.addEventListener('click', function (e) {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove('open');
            }
        });
    }



    // Элементы диапазона цен
    const rangeMin = document.getElementById('rangeMin');
    const rangeMax = document.getElementById('rangeMax');
    const minPrice = document.getElementById('minPrice');
    const maxPrice = document.getElementById('maxPrice');
    const priceProgress = document.getElementById('priceProgress');

    // Установка начальных значений
    minPrice.value = rangeMin.value;
    maxPrice.value = rangeMax.value;

    // Обновление прогресс-бара
    function updateProgress() {
        const minVal = parseInt(rangeMin.value);
        const maxVal = parseInt(rangeMax.value);
        priceProgress.style.left = (minVal / rangeMin.max) * 100 + "%";
        priceProgress.style.right = 100 - (maxVal / rangeMax.max) * 100 + "%";
    }

    // Синхронизация ползунков и полей ввода
    function syncInputs() {
        minPrice.value = rangeMin.value;
        maxPrice.value = rangeMax.value;
        updateProgress();
    }

    // Обработчики событий для ползунков
    rangeMin.addEventListener('input', function () {
        if (parseInt(rangeMin.value) > parseInt(rangeMax.value)) {
            rangeMin.value = rangeMax.value;
        }
        syncInputs();
    });

    rangeMax.addEventListener('input', function () {
        if (parseInt(rangeMax.value) < parseInt(rangeMin.value)) {
            rangeMax.value = rangeMin.value;
        }
        syncInputs();
    });

    // Обработчики событий для полей ввода
    minPrice.addEventListener('input', function () {
        if (parseInt(minPrice.value) > parseInt(maxPrice.value)) {
            minPrice.value = maxPrice.value;
        }
        rangeMin.value = minPrice.value || 0;
        updateProgress();
    });

    maxPrice.addEventListener('input', function () {
        if (parseInt(maxPrice.value) < parseInt(minPrice.value)) {
            maxPrice.value = minPrice.value;
        }
        rangeMax.value = maxPrice.value || rangeMax.max;
        updateProgress();
    });

    // Инициализация прогресс-бара
    updateProgress();

    // Кнопки фильтра
    const applyBtn = document.querySelector('.filter__button--apply');
    const resetBtn = document.querySelector('.filter__button--reset');



    resetBtn.addEventListener('click', function () {
        // Сброс всех фильтров
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = false;
        });

        // Сброс диапазона цен
        rangeMin.value = 0;
        rangeMax.value = 5000;
        minPrice.value = '';
        maxPrice.value = '';
        updateProgress();
    });

    const filterSectionArr = document.querySelectorAll('.filter__section');

    filterSectionArr.forEach(section => {
        let title = section.querySelector('.filter__title');
        title.addEventListener('click', () => {
            section.classList.toggle('open')
        })
    })

    const btnFilter = document.querySelector('.btn_filter_mobile');
    const filterMenu = document.querySelector('.catalog__filter');
    const btnCloseFilter = filterMenu.querySelector('.filter__close');

    if (btnFilter) {
        btnFilter.addEventListener('click', () => {
            filterMenu.classList.add('open');
            toggleScroll(false)

        })

        btnCloseFilter.addEventListener('click', () => {
            filterMenu.classList.remove('open');
            toggleScroll(true)

        })
        applyBtn.addEventListener('click', () => {
            filterMenu.classList.remove('open');
            toggleScroll(true)

        })
    }

});