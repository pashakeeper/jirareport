$(document).ready(function() {

    // Бургер-меню
    $(".burger").click(function(e) {
        e.stopPropagation(); // чтобы не сработал общий клик по document
        $(".menu_box").toggleClass("active");
        $(this).toggleClass("active");
    });
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();

        let href = this.getAttribute('href');

        // Пропускаем пустой или просто "#"
        if (!href || href === '#') return;

        let target = $(href);
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top
            }, 800);
        }
    });

    // Закрытие при клике вне меню и бургера
    $(document).click(function(e) {
        if (
            !$(e.target).closest(".menu_box").length &&
            !$(e.target).closest(".burger").length
        ) {
            $(".menu_box").removeClass("active");
            $(".burger").removeClass("active");
        }
    });

    // Табы
    $('.tab-btn').on('click', function() {
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
        direction: "horizontal", // или 'vertical'
        loop: false, // зацикливание
        effect: "slide", // или 'fade', 'cube', 'flip', 'slide'
        slidesPerView: 4, // количество слайдов
        spaceBetween: 62, // отступ между слайдами
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
        speed: 4000,
        autoplay: {
            delay: 0,
        },
        loop: true,
        slidesPerView: 'auto',
        allowTouchMove: false,
        disableOnInteraction: false,
        spaceBetween: 0,
        centeredSlides: true,
    });


    // Скролл хедера с улучшениями для macOS
    let ticking = false;
    $(window).on('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                if ($(window).scrollTop() > 90) {
                    $('.header').addClass('scrolled');
                } else {
                    $('.header').removeClass('scrolled');
                }
                ticking = false;
            });
            ticking = true;
        }
    });
    const swiper3 = new Swiper(".review_slider", {
        direction: "horizontal", // или 'vertical'
        slidesPerView: "auto",
        centeredSlides: true,
        loop: true,
        spaceBetween: 40,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        breakpoints: {
            0: {
                loop: true,
                autoHeight: true,
            },
            991: {
               autoHeight: false, 
            }

        },
    });
    $('.faq-question').on('click', function() {
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
    // Клик по стрелочке - сворачивание/разворачивание
    $('.strategic_card h3 a i').on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();

        const $card = $(this).closest('.strategic_card');
        const $container = $card.parent();
        const $icon = $(this).find('.fa');

        if ($card.hasClass('active')) {
            // Сворачиваем карточку
            $card.removeClass('active');
            $container.removeClass('active col-lg-12');
            $icon.removeClass('fa-angle-up').addClass('fa-angle-down');
        } else {
            // Разворачиваем карточку
            // Сначала сворачиваем все остальные
            $('.strategic_card').removeClass('active');
            $('.strategic_card').parent().removeClass('active col-lg-12');
            $('.strategic_card .fa').removeClass('fa-angle-up').addClass('fa-angle-down');

            // Разворачиваем текущую
            $card.addClass('active');
            $container.addClass('active col-lg-12');
            $icon.removeClass('fa-angle-down').addClass('fa-angle-up');

            // Прокручиваем к верху карточки + 300px
            setTimeout(function() {
                const $target = $('.col-lg-12:has(h2:contains("Latest Insights and Practical Guides"))');
                if ($target.length) {
                    const targetOffset = $target.offset().top;

                    $('html, body').animate({
                        scrollTop: Math.max(0, targetOffset - 150) // отступ сверху, можно регулировать
                    }, {
                        duration: 600,
                        easing: 'swing'
                    });
                }
            }, 50);
        }
    });

    // Клик по кнопке Download - скролл к форме
    $('.strategic_card_content .btn_group .sec_btn').on('click', function(e) {
        const $button = $(this);
        const buttonText = $button.text().toLowerCase();

        // Проверяем, является ли это кнопкой Download
        if (buttonText.includes('download')) {
            e.preventDefault();

            const $card = $(this).closest('.strategic_card');
            const $form = $card.find('.right_side');

            if ($form.length) {
                // Убеждаемся, что карточка развернута
                if (!$card.hasClass('active')) {
                    $card.addClass('active');
                    $card.parent().addClass('active col-lg-12');
                    $card.find('.fa-angle-down').removeClass('fa-angle-down').addClass('fa-angle-up');
                }

                // Скроллим к форме
                setTimeout(function() {
                    const formOffset = $form.offset().top;
                    const targetScroll = formOffset - 300; // Изменено с windowHeight * 0.3 на 300px

                    $('html, body').animate({
                        scrollTop: Math.max(0, targetScroll)
                    }, {
                        duration: 800,
                        easing: 'swing'
                    });

                    // Добавляем визуальный акцент на форму
                    $form.addClass('highlight-form');
                    setTimeout(function() {
                        $form.removeClass('highlight-form');
                    }, 2000);

                }, 200);
            }
        }
    });

    // Обработка отправки формы Contact Form 7
    $(document).on('wpcf7mailsent', function(event) {
        // Находим карточку, которая содержит отправленную форму
        const $form = $(event.target);
        const $card = $form.closest('.strategic_card');
        const $downloadBtn = $card.find('.strategic_card_content .btn_group .sec_btn');

        if ($downloadBtn.text().toLowerCase().includes('download')) {
            // Получаем ссылку на файл из data-атрибута или href
            const downloadUrl = $downloadBtn.data('download-url') || $downloadBtn.attr('href');

            if (downloadUrl) {
                // Показываем сообщение об успешной отправке
                $card.find('.right_side').append('<div class="download-success-message" style="color: #28a745; margin-top: 15px; font-weight: bold;">Thank you! Download will start automatically...</div>');

                // Запускаем скачивание через небольшую задержку
                setTimeout(function() {
                    window.open(downloadUrl, '_blank');

                    // Убираем сообщение через несколько секунд
                    setTimeout(function() {
                        $card.find('.download-success-message').fadeOut(500, function() {
                            $(this).remove();
                        });
                    }, 3000);
                }, 1000);
            }
        }
    });

    // Клик вне карточек
    $(document).on('click', function(e) {
        if (!$(e.target).closest('.strategic_card, .right_side').length) {
            $('.strategic_card').removeClass('active');
            $('.strategic_card').parent().removeClass('active col-lg-12');
            $('.strategic_card .fa').removeClass('fa-angle-up').addClass('fa-angle-down');
        }
    });

    // Обработка нажатия Escape
    $(document).on('keydown', function(e) {
        if (e.key === 'Escape' || e.keyCode === 27) {
            $('.strategic_card').removeClass('active');
            $('.strategic_card').parent().removeClass('active col-lg-12');
            $('.strategic_card .fa').removeClass('fa-angle-up').addClass('fa-angle-down');
        }
    });

    // Обрезка текста для мобильных устройств
    if ($(window).width() < 991) {
        $('.text').each(function() {
            const words = $(this).text().trim().split(' ');
            const shortText = words.slice(0, 6).join(' ');
            $(this).text(shortText);
        });
    }

});


// Создаём наблюдатель за видео при скролле
const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const $box = $(entry.target);
        const $iframe = $box.find('iframe');
        const $video = $box.find('video');
        const $placeholder = $box.find('.video_placeholder');
        const $playBtn = $box.find('.play');

        if (entry.isIntersecting) {
            // Видео попало в поле зрения - запускаем
            startVideo($box, $iframe, $video, $placeholder, $playBtn);
        } else {
            // Видео ушло из поля зрения - останавливаем
            stopVideo($box, $iframe, $video, $placeholder, $playBtn);
        }
    });
}, {
    threshold: .9,
    rootMargin: '100px 0px'
});

// Функция запуска видео
function startVideo($box, $iframe, $video, $placeholder, $playBtn) {
    const videoSrc = $iframe.data('src') || ($video.length ? $video.find('source').attr('src') : '');

    if (!videoSrc) return;

    // Скрываем плейсхолдер и кнопку
    $placeholder.hide();
    $playBtn.hide();

    if (videoSrc.includes('youtube.com') || videoSrc.includes('youtu.be')) {
        let embedUrl = getYouTubeEmbedUrl(videoSrc);
        $iframe.attr('src', embedUrl).show();
        $video.hide();

    } else if (videoSrc.includes('vimeo.com')) {
        let embedUrl = getVimeoEmbedUrl(videoSrc);
        $iframe.attr('src', embedUrl).show();
        $video.hide();

    } else {
        // Локальное видео
        if ($video.length) {
            $video.show();
            $video.prop('muted', true); // <<< ОБЯЗАТЕЛЬНО
            $video[0].play().catch(err => {
                console.warn('Автозапуск не сработал, ждём клик:', err);
            });
        }
        $iframe.hide();
    }
}

// Функция остановки видео
function stopVideo($box, $iframe, $video, $placeholder, $playBtn) {
    // Показываем плейсхолдер и кнопку обратно
    $placeholder.show();
    $playBtn.show();

    // Останавливаем iframe (YouTube/Vimeo)
    if ($iframe.length && $iframe.attr('src')) {
        $iframe.attr('src', '').hide();
    }

    // Останавливаем локальное видео
    if ($video.length && !$video[0].paused) {
        $video[0].pause();
        $video[0].currentTime = 0;
        $video.hide();
    }
}

// Вспомогательные функции для URL
function getYouTubeEmbedUrl(videoSrc) {
    if (videoSrc.includes('watch?v=')) {
        const videoId = videoSrc.split('watch?v=')[1].split('&')[0];
        return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&mute=1`;
    } else if (videoSrc.includes('youtu.be/')) {
        const videoId = videoSrc.split('youtu.be/')[1].split('?')[0];
        return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&mute=1`;
    }
    return videoSrc + (videoSrc.includes('?') ? '&' : '?') + 'autoplay=1&mute=1';
}

function getVimeoEmbedUrl(videoSrc) {
    if (videoSrc.includes('vimeo.com/') && !videoSrc.includes('/embed/')) {
        const videoId = videoSrc.split('vimeo.com/')[1].split('/')[0];
        return `https://player.vimeo.com/video/${videoId}?autoplay=1&muted=1`;
    }
    return videoSrc + (videoSrc.includes('?') ? '&' : '?') + 'autoplay=1&muted=1';
}

// Инициализация при загрузке страницы
$(document).ready(function() {
    // Добавляем все видео в наблюдатель
    $('.video_box').each(function() {
        videoObserver.observe(this);
    });

    // Оставляем старый обработчик клика для ручного запуска
    $('.video_box .play').on('click', function(e) {
        e.preventDefault();
        const $box = $(this).closest('.video_box');
        const $iframe = $box.find('iframe');
        const $video = $box.find('video');
        const $placeholder = $box.find('.video_placeholder');
        const $playBtn = $box.find('.play');

        startVideo($box, $iframe, $video, $placeholder, $playBtn);
    });
    // Проверка на заполненные поля при загрузке (например, автозаполнение)
    $(".form-floating input, .form-floating textarea").each(function() {
        if ($(this).val().trim() !== "") {
            $(this).closest(".form-floating").find("label").hide();
        }
    });

    // Фокус → прячем label
    $(".form-floating input, .form-floating textarea").on("focus", function() {
        $(this).closest(".form-floating").find("label").fadeOut(200);
    });

    // Потеря фокуса → показываем label, если пусто
    $(".form-floating input, .form-floating textarea").on("blur", function() {
        if ($(this).val().trim() === "") {
            $(this).closest(".form-floating").find("label").fadeIn(200);
        }
    });
    // Проверяем ширину окна (мобилка условно < 992px)
    // навешиваем клик на стрелочку (a с подменю)

});