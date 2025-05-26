document.addEventListener('DOMContentLoaded', function() {
        // Инициализация основного слайдера
        const gallerySwiper = new Swiper('.gallery-swiper', {
            loop: true,
            spaceBetween: 10,
            slidesPerView: 'auto',
            navigation: {
                nextEl: '.swiper-button-custom-next',
                prevEl: '.swiper-button-custom-prev',
            },
            thumbs: {
                swiper: {
                    el: '.thumbs-swiper',
                    slidesPerView: 'auto',
                    spaceBetween: 10,
                    freeMode: true,
                    watchSlidesProgress: true,
                }
            }
        });

        // Добавляем обработчики кликов для миниатюр
        const thumbSlides = document.querySelectorAll('.thumbs-swiper .swiper-slide');
        thumbSlides.forEach((slide, index) => {
            slide.addEventListener('click', () => {
                gallerySwiper.slideTo(index);
            });
        });
    });