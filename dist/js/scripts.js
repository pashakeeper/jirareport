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
            0: {
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
        speed: 6000,
        autoplay: {
            delay: 1,
        },
        loop: true,
        slidesPerView:'auto',
        allowTouchMove: false,
        disableOnInteraction: false,
        spaceBetween: 0,
        centeredSlides: true,
    });

    $('.video_box .play').on('click', function (e) {
        e.preventDefault();
        const $box = $(this).closest('.video_box');
        const $iframe = $box.find('iframe');
        const videoSrc = $iframe.data('src');

        // Скрываем плейсхолдер и кнопку
        $box.find('.video_placeholder, .play').hide();

        // Подставляем src и показываем iframe
        $iframe.attr('src', videoSrc).show();
    });

    $(window).on('scroll', function() {
        if ($(this).scrollTop() > 90) {
            $('.header').addClass('scrolled');
        } else {
            $('.header').removeClass('scrolled');
        }
    });
    const swiper3 = new Swiper(".review_slider", {
        direction: "horizontal",        // или 'vertical'
        slidesPerView: "auto",
        centeredSlides: true,
        loop: true,
        spaceBetween: 40,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });
    $('.faq-question').on('click', function() {
                const $faqItem = $(this).closest('.faq-item');
                const $answer = $faqItem.find('.faq-answer');
                
                // Если текущий элемент уже активен
                if ($faqItem.hasClass('active')) {
                    // Закрываем его
                    $faqItem.removeClass('active');
                    $answer.slideUp(300);
                } else {
                    // Закрываем все остальные
                    $('.faq-item.active').removeClass('active');
                    $('.faq-answer').slideUp(300);
                    
                    // Открываем текущий
                    $faqItem.addClass('active');
                    $answer.slideDown(300);
                }
            });
    $('.faq-item:first-child .faq-question').trigger('click');

    // Обработчик клика на табы
    $('.video_tab').on('click', function() {
        const tab_id = $(this).data('tab');
        $('.video_tab').removeClass('active');
        $(this).addClass('active');
        $('.video_content').removeClass('active');
        $('#' + tab_id).addClass('active');
    });
});
