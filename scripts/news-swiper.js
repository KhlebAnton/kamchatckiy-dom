document.addEventListener('DOMContentLoaded', function () {

    const swiperNews = new Swiper('.news_swiper_swiper-container', {
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