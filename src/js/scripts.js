$(document).ready(function () {

    // Бургер-меню
    $(".burger").click(function (e) {
        e.stopPropagation(); // чтобы не сработал общий клик по document
        $(".menu_box").toggleClass("active");
        $(this).toggleClass("active");
    });

// Закрытие при клике вне меню и бургера
    $(document).click(function (e) {
        if (
            !$(e.target).closest(".menu_box").length &&
            !$(e.target).closest(".burger").length
        ) {
            $(".menu_box").removeClass("active");
            $(".burger").removeClass("active");
        }
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
                slidesPerView: 2,
                spaceBetween: 17
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
            delay: 0,
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
    $('.faq-question').on('click', function () {
        const $faqItem = $(this).closest('.faq-item');
        const $answer = $faqItem.find('.faq-answer');

        if ($faqItem.hasClass('active')) {
            // Если уже открыт — закрываем
            $faqItem.removeClass('active');
            $answer.slideUp(300);
        } else {
            // Если закрыт — открываем
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
    // Клик по карточке
    $('.strategic_card').on('click', function (e) {
        e.stopPropagation(); // предотвращаем всплытие, чтобы клик вне работал отдельно

        const $clickedCard = $(this);
        const $clickedContainer = $clickedCard.parent();

        // Если карточка уже активна, не делаем ничего
        if ($clickedCard.hasClass('active')) {
            return;
        }

        // Убираем классы у всех
        $('.strategic_card').removeClass('active');
        $('.strategic_card').parent().removeClass('active col-lg-12');

        // Добавляем классы текущей
        $clickedCard.addClass('active');
        $clickedContainer.addClass('active col-lg-12');

        // Ждем завершения CSS анимации (если есть), затем прокручиваем
        setTimeout(function() {
            // Вычисляем позицию активной карточки
            const cardOffset = $clickedContainer.offset().top;
            const windowHeight = $(window).height();
            const cardHeight = $clickedContainer.outerHeight();

            // Вычисляем оптимальную позицию для прокрутки
            // Размещаем карточку в верхней трети экрана
            const targetScroll = cardOffset - (windowHeight * 0.2);

            // Альтернативный вариант: центрируем карточку на экране
            // const targetScroll = cardOffset - (windowHeight / 2) + (cardHeight / 2);

            $('html, body').animate({
                scrollTop: Math.max(0, targetScroll) // не позволяем прокрутить выше начала страницы
            }, {
                duration: 600,
                easing: 'swing' // можно заменить на 'linear' или использовать jQuery UI easing
            });
        }, 100); // небольшая задержка для завершения DOM изменений
    });

// Клик вне карточек
    $(document).on('click', function (e) {
        // Проверяем, что клик произошел не внутри карточки или связанных элементов
        if (!$(e.target).closest('.strategic_card, .right_side').length) {
            $('.strategic_card').removeClass('active');
            $('.strategic_card').parent().removeClass('active col-lg-12');
        }
    });

// Дополнительно: обработка нажатия Escape для сброса активного состояния
    $(document).on('keydown', function(e) {
        if (e.key === 'Escape' || e.keyCode === 27) {
            $('.strategic_card').removeClass('active');
            $('.strategic_card').parent().removeClass('active col-lg-12');
        }
    });

// Альтернативный вариант с более плавной прокруткой и проверкой видимости
    /*
    $('.strategic_card').on('click', function (e) {
        e.stopPropagation();

        const $clickedCard = $(this);
        const $clickedContainer = $clickedCard.parent();

        if ($clickedCard.hasClass('active')) {
            return;
        }

        $('.strategic_card').removeClass('active');
        $('.strategic_card').parent().removeClass('active col-lg-12');

        $clickedCard.addClass('active');
        $clickedContainer.addClass('active col-lg-12');

        setTimeout(function() {
            const cardOffset = $clickedContainer.offset().top;
            const cardHeight = $clickedContainer.outerHeight();
            const windowHeight = $(window).height();
            const currentScroll = $(window).scrollTop();

            // Проверяем, виден ли весь элемент на экране
            const cardBottom = cardOffset + cardHeight;
            const viewportBottom = currentScroll + windowHeight;

            let targetScroll;

            if (cardOffset < currentScroll) {
                // Карточка выше видимой области - прокручиваем к верху карточки
                targetScroll = cardOffset - 100;
            } else if (cardBottom > viewportBottom) {
                // Карточка ниже видимой области - прокручиваем так, чтобы она была видна
                targetScroll = cardBottom - windowHeight + 100;
            } else {
                // Карточка уже видна, но можем улучшить позицию
                targetScroll = cardOffset - (windowHeight * 0.2);
            }

            $('html, body').animate({
                scrollTop: Math.max(0, targetScroll)
            }, {
                duration: 800,
                easing: 'swing'
            });
        }, 150);
    });
    */

});
