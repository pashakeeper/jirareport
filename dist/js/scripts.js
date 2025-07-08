$(document).ready(function () {

    // Бургер-меню
    $(".burger").click(function () {
        $(".menu_box").toggleClass("active");
        $(this).toggleClass("active");
    });

    // Табы
    $('.tab-btn').on('click', function () {
        $('.tab-btn').removeClass('active');
        $(this).addClass('active');

        const tabId = $(this).data('tab');
        $('.tab-content').removeClass('active');
        $('#' + tabId).addClass('active');
        Fancybox.bind('[data-fancybox="gallery"]', {});
    });
    Fancybox.bind('[data-fancybox="gallery"]', {
        // Your custom options for a specific gallery
    });
    const swiper = new Swiper(".services_slider", {
        direction: "horizontal",        // или 'vertical'
        loop: false,                     // зацикливание
        effect: "slide",           // или 'fade', 'cube', 'flip', 'slide'
        slidesPerView: 4,              // количество слайдов
        spaceBetween: 62,              // отступ между слайдами
        initialSlide: 1,
        // autoplay: {
        //     delay: 3000,
        //     disableOnInteraction: false,
        // },
        //
        // speed: 600,                    // скорость анимации
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        keyboard: {
            enabled: true,
            onlyInViewport: true,
        },
        mousewheel: {
            forceToAxis: true,
        },
        grabCursor: true,
        centeredSlides: false,
        breakpoints: {
            640: {
                slidesPerView: 1,
            },
            768: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 4,
            },
        },
    });


    const swiper2 = new Swiper(".logos-slider", {
        slidesPerView: 'auto',
        loop: true,
        speed: 3000, // чем больше, тем медленнее
        autoplay: {
            delay: 0,
            disableOnInteraction: false,
        },
        allowTouchMove: false, // отключить прокрутку пользователем
    });
});
