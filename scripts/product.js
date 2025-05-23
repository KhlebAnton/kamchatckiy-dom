document.addEventListener('DOMContentLoaded', function () {
    const swiperCardProduct = new Swiper('.card-product_page_swiper-container', {
        slidesPerView: 'auto',
        direction: 'horizontal',
        mousewheel: true,
        spaceBetween: 8,
        navigation: {
            nextEl: '.card-product_page_swiper-next',
            prevEl: '.card-product_page_swiper-prev',
        },
        breakpoints: {
            1220: {
                slidesPerView: 'auto',
                direction: 'vertical',
                spaceBetween: 16
            },
            1000: {
                direction: 'vertical',
                slidesPerView: 'auto',
                spaceBetween: 16
            }
        },
    });

    window.addEventListener('resize', function() {
        swiperCardProduct.update();
    });

    const mediaContainer = document.querySelector('.product_card__media');
    const previewSlides = document.querySelectorAll('.swiper-slide .card-product__preview');
    let currentSlideIndex = 0;
    let touchStartX = 0;
    let touchEndX = 0;

    // Добавляем обработчики свайпа
    mediaContainer.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, false);

    mediaContainer.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);

    function handleSwipe() {
        const swipeThreshold = 50; // Минимальное расстояние свайпа для срабатывания
        
        if (touchEndX < touchStartX - swipeThreshold) {
            // Свайп влево - следующий слайд
            navigateMedia(1);
        } else if (touchEndX > touchStartX + swipeThreshold) {
            // Свайп вправо - предыдущий слайд
            navigateMedia(-1);
        }
    }

    function updateMediaContent(index) {
        previewSlides.forEach(slide => {
            slide.classList.remove('active-preview');
        });

        previewSlides[index].classList.add('active-preview');

        mediaContainer.innerHTML = '';

        const clickedPreview = previewSlides[index];
        const video = clickedPreview.querySelector('video');
        const img = clickedPreview.querySelector('img');

        if (video) {
            const newVideo = document.createElement('video');
            newVideo.src = video.src;
            newVideo.autoplay = true;
            newVideo.controls = false;
            newVideo.muted = true;
            newVideo.loop = true;
            newVideo.playsInline = true;
            mediaContainer.appendChild(newVideo);
        } else if (img) {
            const newImg = document.createElement('img');
            newImg.src = img.src;
            newImg.alt = img.alt;
            mediaContainer.appendChild(newImg);
        }

        currentSlideIndex = index;
        swiperCardProduct.slideTo(index);
        addMediaNavigation();
    }

    function addMediaNavigation() {
        const navContainer = document.createElement('div');
        navContainer.className = 'media-navigation-container';

        const prevBtn = document.createElement('div');
        prevBtn.className = 'media-nav-btn media-prev-btn';

        const counter = document.createElement('div');
        counter.className = 'media-slide-counter';
        counter.textContent = currentSlideIndex + 1;

        const nextBtn = document.createElement('div');
        nextBtn.className = 'media-nav-btn media-next-btn';

        navContainer.appendChild(prevBtn);
        navContainer.appendChild(counter);
        navContainer.appendChild(nextBtn);

        mediaContainer.appendChild(navContainer);

        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            navigateMedia(-1);
        });

        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            navigateMedia(1);
        });
    }

    function navigateMedia(direction) {
        let newIndex = currentSlideIndex + direction;

        if (newIndex < 0) {
            newIndex = previewSlides.length - 1;
        } else if (newIndex >= previewSlides.length) {
            newIndex = 0;
        }

        updateMediaContent(newIndex);
    }

    previewSlides.forEach((preview, index) => {
        preview.addEventListener('click', function (e) {
            e.stopPropagation();
            updateMediaContent(index);
        });
    });

    if (previewSlides.length > 0) {
        updateMediaContent(0);
    }

    // Находим все счетчики на странице
    const counters = document.querySelectorAll('.card-product_page__counter');

    // Обрабатываем каждый счетчик
    counters.forEach(counter => {
        const minusBtn = counter.querySelector('.card-product_page__counter_minus');
        const plusBtn = counter.querySelector('.card-product_page__counter_plus');
        const countDisplay = counter.querySelector('.card-product_page__counter_count');

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
});