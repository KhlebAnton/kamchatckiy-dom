document.addEventListener('DOMContentLoaded', function() {
    const swiper = new Swiper('.home_swiper-container', {
        slidesPerView: 'auto', // По умолчанию 1 слайд
        spaceBetween: 16,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        
    });
});