document.addEventListener('DOMContentLoaded', function () {
     const swiperRecProduct = new Swiper('.rec-product_swiper-container', {
        slidesPerView: 'auto',
        spaceBetween: 16,
        navigation: {
            nextEl: '.swiper-button-custom-next',
            prevEl: '.swiper-button-custom-prev',
        },
        breakpoints: {
            1220: {
                slidesPerView: 'auto',
                spaceBetween: 32
            },
             780: {
                slidesPerView: 'auto',
                spaceBetween: 26
            }
        },

    });
})