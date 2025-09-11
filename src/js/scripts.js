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
        if (!href || href === '#') return;

        let target = document.querySelector(href);
        if (target) {
            let headerHeight = $('header').outerHeight() || 110;
            let targetPos = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

            window.scrollTo({
                top: targetPos,
                behavior: 'smooth' // ← плавно
            });
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
        grabCursor: true,
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
                autoHeight: false
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

    // ===== Настройки
const SCROLL_PAD = 150;
const HEADER_SEL = 'header';

// ===== Активный блок один на секцию
const $contentBlock = $('<div class="strategic_card_active_block col-lg-12" aria-live="polite"></div>');
$('#strategic_card_section .row').prepend($contentBlock);

let isAnimating = false;
let pendingCard = null;

// ===== Утилиты
function getHeaderHeight() {
  const $h = $(HEADER_SEL);
  return $h.length ? $h.outerHeight() : 0;
}
function scrollToY(y) {
  window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
}
function getCardId($card) {
  return $card.data('card-id') || $card.find('h3 a').first().text().trim();
}
function isSameCard($card, $activeBlock) {
  const id1 = getCardId($card);
  const id2 = getCardId($activeBlock.find('.strategic_card'));
  return id1 === id2;
}
function resetAllIcons() {
  $('.strategic_card:not(.strategic_card_active_block .strategic_card) h3 a i')
    .removeClass('fa-angle-up')
    .addClass('fa-angle-down');
}

// ===== Скролл к форме в активном блоке
function scrollToFormTitleInActiveBlock() {
  const $formTitle = $contentBlock.find('.right_side .form-title');
  if (!$formTitle.length) return;
  const offsetTop = $formTitle.offset().top - getHeaderHeight() - SCROLL_PAD;
  scrollToY(offsetTop);
  $formTitle.addClass('highlight-form');
  setTimeout(() => $formTitle.removeClass('highlight-form'), 2000);
}

// ===== Инициализация CF7 в активном блоке (без таймаутов)
function reinitCF7In($root) {
  if (!window.wpcf7) return;
  const $forms = $root.find('.wpcf7 > form, form.wpcf7-form');
  if (!$forms.length) return;
  if (typeof window.wpcf7.init === 'function') {
    $forms.each(function() { window.wpcf7.init(this); });
  } else if (typeof window.wpcf7.initForm === 'function') {
    $forms.each(function() { window.wpcf7.initForm(this); });
  } else {
    // форс-событие, если требуется
    $forms.each(function() { this.dispatchEvent(new Event('wpcf7init')); });
  }
}

// ===== Открытие карточки
function openCard($card) {
  if (isAnimating) return;
  isAnimating = true;

  // Вставляем клон карточки
  const $clone = $($card.prop('outerHTML'));
  $contentBlock.html($clone).addClass('active');

  // Обновляем иконку
  resetAllIcons();
  $contentBlock.find('h3 a i').removeClass('fa-angle-down').addClass('fa-angle-up');

  // Переинициализация форм
  reinitCF7In($contentBlock);

  // Скролл к верху активного блока — без задержек
  const y = $contentBlock.offset().top - getHeaderHeight() - SCROLL_PAD;
  // Скроллим только если нужно заметно сдвинуться
  if (Math.abs(window.pageYOffset - y) > 20) {
    scrollToY(y);
    // даём браузеру начать скролл, но не ставим таймеров
    requestAnimationFrame(() => { isAnimating = false; });
  } else {
    isAnimating = false;
  }
}

// ===== Закрытие активного блока без «прыжка»
function closeActiveBlock() {
  if (isAnimating || !$contentBlock.hasClass('active')) return;
  isAnimating = true;

  // Spacer той же высоты → плавно схлопываем
  const activeHeight = $contentBlock.outerHeight(true) || 0;
  const mb = $contentBlock.css('margin-bottom');
  const $spacer = $('<div class="strategic_active_spacer"></div>').css({
    height: activeHeight,
    marginBottom: mb,
    transition: 'height 180ms linear'
  });

  $contentBlock.after($spacer);
  $contentBlock.removeClass('active').empty();
  resetAllIcons();

  // Запуск схлопывания без таймаутов — через rAF
  requestAnimationFrame(() => {
    $spacer.css('height', 0);

    // Один раз слушаем окончание перехода
    $spacer.one('transitionend', () => {
      $spacer.remove();
      isAnimating = false;

      if (pendingCard) {
        const $next = pendingCard;
        pendingCard = null;
        $('.strategic_card').removeClass('clicked');
        $next.addClass('clicked');
        openCard($next);
      } else {
        $('.strategic_card').removeClass('clicked');
      }
    });
  });
}

// ===== Клики по стрелке в карточке (в гриде)
$(document).on('click', '.strategic_card h3 a i', function(e) {
  e.preventDefault();
  e.stopPropagation();
  if (isAnimating) return;

  const $card = $(this).closest('.strategic_card');

  if ($contentBlock.hasClass('active') && isSameCard($card, $contentBlock)) {
    const id = getCardId($card);
    $('.strategic_card').each(function() {
      $(this).toggleClass('clicked', getCardId($(this)) === id);
    });
    scrollToFormTitleInActiveBlock();
    return;
  }

  if ($contentBlock.hasClass('active') && !isSameCard($card, $contentBlock)) {
    pendingCard = $card;
    $('.strategic_card').removeClass('clicked');
    $card.addClass('clicked');
    closeActiveBlock();
    return;
  }

  if (!$contentBlock.hasClass('active')) {
    $('.strategic_card').removeClass('clicked');
    $card.addClass('clicked');
    openCard($card);
  }
});

// ===== Клик по карточке (кроме интерактивных элементов)
$(document).on('click', '.strategic_card, .strategic_card h3', function(e) {
  if ($(e.target).closest('a, button, .btn, .sec_btn, input, select, textarea, label, .wpcf7, .wpcf7-form').length) return;
  if (isAnimating) return;

  const $card = $(e.target).closest('.strategic_card');

  if ($contentBlock.hasClass('active') && isSameCard($card, $contentBlock)) {
    const id = getCardId($card);
    $('.strategic_card').each(function() {
      $(this).toggleClass('clicked', getCardId($(this)) === id);
    });
    scrollToFormTitleInActiveBlock();
    return;
  }

  if ($contentBlock.hasClass('active') && !isSameCard($card, $contentBlock)) {
    pendingCard = $card;
    $('.strategic_card').removeClass('clicked');
    $card.addClass('clicked');
    closeActiveBlock();
    return;
  }

  if (!$contentBlock.hasClass('active')) {
    $('.strategic_card').removeClass('clicked');
    $card.addClass('clicked');
    openCard($card);
  }
});

// ===== Повторный клик по .clicked
$(document).on('click', '.strategic_card.clicked', function(e) {
  if ($(e.target).closest('a, button, .btn, .sec_btn, input, select, textarea, label, .wpcf7, .wpcf7-form').length) return;
  if (isAnimating) return;
  if ($contentBlock.hasClass('active') && isSameCard($(this), $contentBlock)) {
    scrollToFormTitleInActiveBlock();
  }
});

// ===== Вне карточек / ESC — закрыть
$(document).on('click', function(e) {
  if (isAnimating) return;
  if (!$(e.target).closest('.strategic_card, .strategic_card_active_block').length) {
    closeActiveBlock();
  }
});
$(document).on('keydown', function(e) {
  if (isAnimating) return;
  if (e.key === 'Escape' || e.keyCode === 27) {
    closeActiveBlock();
  }
});

// ===== Стрелка внутри активного блока — закрыть
$(document).on('click', '.strategic_card_active_block h3 a i', function(e) {
  e.preventDefault();
  e.stopPropagation();
  closeActiveBlock();
});

    let CURRENT_RESOURCE_ID = null;

    // дополни openCard:
    function openCard($card) {
        if (isAnimating) return;
        isAnimating = true;

        // Запоминаем id ресурса
        CURRENT_RESOURCE_ID = $card.data('resource-id') || null;

        const $clone = $($card.prop('outerHTML'));
        $contentBlock.html($clone).addClass('active');

        resetAllIcons();
        $contentBlock.find('h3 a i').removeClass('fa-angle-down').addClass('fa-angle-up');

        // Вставим hidden поле в CF7 с resource_id (если формы есть)
        const $cf7form = $contentBlock.find('.wpcf7 form.wpcf7-form');
        if ($cf7form.length && CURRENT_RESOURCE_ID) {
            // если у тебя в CF7 сделано поле [hidden resource_id] – просто заполним его
            let $hidden = $cf7form.find('input[name="resource_id"]');
            if (!$hidden.length) {
                $hidden = $('<input type="hidden" name="resource_id">').appendTo($cf7form);
            }
            $hidden.val(CURRENT_RESOURCE_ID);
        }

        reinitCF7In($contentBlock);

        const y = $contentBlock.offset().top - getHeaderHeight() - SCROLL_PAD;
        if (Math.abs(window.pageYOffset - y) > 20) {
            scrollToY(y);
            requestAnimationFrame(() => { isAnimating = false; });
        } else {
            isAnimating = false;
        }
    }

    // Клик по кнопке Download в карточке/активном блоке
    $(document).on('click', '.strategic_card_content .btn_group .download-btn, .strategic_card_content .btn_group .sec_btn.download-btn', function(e) {
        e.preventDefault();

        const $btn = $(this);
        const downloadUrl = $btn.data('download-url') || $btn.attr('href');
        const isGated = String($btn.data('gated')).toLowerCase() === 'true';

        // Область карточки (оригинал в гриде или активная копия)
        const $scope = $btn.closest('.strategic_card').length ?
            $btn.closest('.strategic_card') :
            $btn.closest('.strategic_card_active_block').find('.strategic_card');

        // Если не требуется форма — сразу открыть в новой вкладке
        if (!isGated) {
            if (downloadUrl) {
                window.open(downloadUrl, '_blank', 'noopener');
            }
            return;
        }

        // Если gated: убедиться, что активен нужный ресурс и открыта его форма
        // 1) если активен другой — переключаемся
        if (!$contentBlock.hasClass('active') || !isSameCard($scope, $contentBlock)) {
            const id = getCardId($scope);
            const $original = $('.strategic_card').filter(function() {
                return getCardId($(this)) === id;
            }).first();

            if ($original.length) {
                $('.strategic_card').removeClass('clicked');
                $original.addClass('clicked');
                openCard($original);
            }
        }

        // 2) проскроллить к заголовку формы и сфокусировать первый инпут
        requestAnimationFrame(() => {
            scrollToFormTitleInActiveBlock();
            const $firstInput = $contentBlock.find('.wpcf7 form.wpcf7-form input, .wpcf7 form.wpcf7-form textarea, .wpcf7 form.wpcf7-form select').filter(':visible:enabled').first();
            if ($firstInput.length) $firstInput.trigger('focus');
        });

        // 3) Сохраним URL в data активного блока, чтобы потом забрать при mailsent
        if (downloadUrl) {
            $contentBlock.data('pending-download-url', downloadUrl);
        }
    });
    // CF7: успешная отправка — открыть download в новой вкладке
    $(document).on('wpcf7mailsent', function(event) {
        // событие отдаётся на form element
        const $form = $(event.target);

        // Проверим, действительно ли это форма в нашем активном блоке
        if (!$form.closest($contentBlock).length) return;

        // Если есть hidden resource_id – сверим
        const sentResourceId = $form.find('input[name="resource_id"]').val();
        if (CURRENT_RESOURCE_ID && sentResourceId && String(sentResourceId) !== String(CURRENT_RESOURCE_ID)) {
            return; // чужая форма — игнор
        }

        // Достаём URL
        const downloadUrl = $contentBlock.data('pending-download-url') ||
            $contentBlock.find('.strategic_card_content .btn_group .download-btn').data('download-url') ||
            $contentBlock.find('.strategic_card_content .btn_group .download-btn').attr('href');

        if (downloadUrl) {
            // Сообщение пользователю (опционально)
            const $msg = $('<div class="download-success-message" style="color:#28a745;margin-top:15px;font-weight:bold;">Thank you! Your download will open in a new tab...</div>');
            $contentBlock.find('.right_side').append($msg);

            // Открываем в новой вкладке
            window.open(downloadUrl, '_blank', 'noopener');

            // Уберём сообщение через 3 сек.
            setTimeout(() => $msg.fadeOut(400, () => $msg.remove()), 3000);

            // Сбросим запомненный URL
            $contentBlock.removeData('pending-download-url');
        }
    });


    // ====== mobile обрезка текста (как было) ======
    if ($(window).width() < 991) {
        $('.text').each(function() {
            const words = $(this).text().trim().split(' ');
            const shortText = words.slice(0, 6).join(' ');
            $(this).text(shortText);
        });
    }

});

// === Управление плеерами во фреймах ===
function pauseIframe($iframe) {
  if (!$iframe || !$iframe.length) return;
  const src = $iframe.attr('src') || '';
  try {
    if (src.includes('youtube.com')) {
      $iframe[0].contentWindow.postMessage(JSON.stringify({
        event: 'command',
        func: 'pauseVideo',
        args: []
      }), '*');
    } else if (src.includes('player.vimeo.com')) {
      $iframe[0].contentWindow.postMessage({ method: 'pause' }, '*');
    }
  } catch (e) { /* ignore */ }
}

function playIframe($iframe) {
  if (!$iframe || !$iframe.length) return;
  const src = $iframe.attr('src') || '';
  try {
    if (src.includes('youtube.com')) {
      $iframe[0].contentWindow.postMessage(JSON.stringify({
        event: 'command',
        func: 'playVideo',
        args: []
      }), '*');
    } else if (src.includes('player.vimeo.com')) {
      $iframe[0].contentWindow.postMessage({ method: 'play' }, '*');
    }
  } catch (e) { /* ignore */ }
}

// Определяем мобильное устройство
const isMobile = window.matchMedia("(max-width: 768px)").matches;

// Настройки для observer
const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const $box = $(entry.target);
        const $iframe = $box.find('iframe');
        const $video = $box.find('video');

        if (entry.isIntersecting) {
            startVideo($box, $iframe, $video);
        } else {
            pauseVideo($iframe, $video); // только пауза, без плейсхолдера
        }
    });
}, {
    threshold: isMobile ? 0.3 : 0.7, // мягче на мобилке
    rootMargin: isMobile ? '150px 0px' : '100px 0px'
});

// Функция запуска видео
function startVideo($box, $iframe, $video) {
  const $placeholder = $box.find('.video_placeholder');
  const $playBtn = $box.find('button.play, .play'); // кнопку не удаляем
  const videoSrc = $iframe.data('src') || ($video.length ? $video.find('source').attr('src') : '');

  if (!videoSrc) return;

  // Прячем плейсхолдер только один раз
  $placeholder.hide();
  $playBtn.hide();

  if (videoSrc.includes('youtube.com') || videoSrc.includes('youtu.be')) {
    // Если src уже стоит → просто play
    if ($iframe.attr('src')) {
      $iframe.show();
      $video.hide();
      playIframe($iframe);
      return;
    }
    // Иначе задаём embed и показываем
    const embedUrl = getYouTubeEmbedUrl(videoSrc);
    $iframe.attr('src', embedUrl).show();
    $video.hide();

  } else if (videoSrc.includes('vimeo.com')) {
    if ($iframe.attr('src')) {
      $iframe.show();
      $video.hide();
      playIframe($iframe);
      return;
    }
    const embedUrl = getVimeoEmbedUrl(videoSrc);
    $iframe.attr('src', embedUrl).show();
    $video.hide();

  } else {
    // Локальное видео
    if ($video.length) {
      $video.show();
      $video.prop('muted', true);
      $video[0].play().catch(() => {});
    }
    $iframe.hide();
  }
}


// Пауза без мигания
function pauseVideo($iframe, $video) {
  // Останавливаем iframe (YouTube/Vimeo) без мигания
  if ($iframe && $iframe.length && $iframe.attr('src')) {
    pauseIframe($iframe);
  }
  // Ставим на паузу локальное видео
  if ($video && $video.length && !$video[0].paused) {
    $video[0].pause();
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
  let id = '';
  if (videoSrc.includes('watch?v=')) {
    id = videoSrc.split('watch?v=')[1].split('&')[0];
  } else if (videoSrc.includes('youtu.be/')) {
    id = videoSrc.split('youtu.be/')[1].split('?')[0];
  } else if (videoSrc.includes('/embed/')) {
    // уже embed — вытащим id как есть
    id = videoSrc.split('/embed/')[1].split(/[?&]/)[0];
  }
  const base = `https://www.youtube.com/embed/${id}`;
  // enablejsapi=1 — чтобы pause/play через postMessage работал
  const params = 'autoplay=1&mute=1&rel=0&enablejsapi=1&playsinline=1';
  return `${base}?${params}`;
}
function getVimeoEmbedUrl(videoSrc) {
  let id = '';
  if (videoSrc.includes('vimeo.com/') && !videoSrc.includes('/embed/')) {
    id = videoSrc.split('vimeo.com/')[1].split('/')[0];
  } else if (videoSrc.includes('/video/')) {
    id = videoSrc.split('/video/')[1].split(/[?&]/)[0];
  }
  const base = `https://player.vimeo.com/video/${id}`;
  // controls API работает по postMessage без доп. параметров,
  // но добавим полезные по умолчанию
  const params = 'autoplay=1&muted=1&background=0';
  return `${base}?${params}`;
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
    window.addEventListener("load", () => {
        if (window.location.hash) {
            const el = document.querySelector(window.location.hash);
            if (el) {
                el.scrollIntoView({
                    behavior: "smooth",
                    block: "center" // <-- именно по центру экрана
                });
            }
        }
    });

});