document.addEventListener('DOMContentLoaded', function () {
    const swiperHome = new Swiper('.home_swiper-container', {
        slidesPerView: 'auto',
        spaceBetween: 16,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },

    });

    const swiperNewProduct = new Swiper('.new-product_swiper-container', {
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
    const swiperNews = new Swiper('.news_home_swiper-container', {
        slidesPerView: 'auto',
        spaceBetween: 16,
        breakpoints: {
            1220: {
                slidesPerView: 'auto',
                spaceBetween: 32
            },
             
        },

    });
});