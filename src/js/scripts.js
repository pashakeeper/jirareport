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
    // ===== Активный блок один раз =====
    const $contentBlock = $('<div class="strategic_card_active_block col-lg-12"></div>');
    $('#strategic_card_section .row').prepend($contentBlock);

    let isAnimating = false;
    let pendingCard = null;

// ===== Утилиты =====
    function getCardId($card) {
  // Лучше иметь data-card-id на карточке
      return $card.data('card-id') || $card.find('h3 a').first().text().trim();
  }
  function isSameCard($card, $activeBlock) {
  // Сравниваем по ID (или заголовку как фолбэк)
      const id1 = getCardId($card);
      const id2 = getCardId($activeBlock.find('.strategic_card'));
      return id1 === id2;
  }
  function resetAllIcons() {
      $('.strategic_card:not(.strategic_card_active_block .strategic_card) h3 a i')
      .removeClass('fa-angle-up')
      .addClass('fa-angle-down');
  }

// ===== Открытие карточки =====
  function openCard($card) {
      isAnimating = true;
      const currentScroll = $(window).scrollTop();

  // Вставляем всю карточку (outerHTML) в активный блок
      const outer = $card.prop('outerHTML');
      $contentBlock.html(outer).addClass('active');

  // Стрелка вверх для активной карточки
      resetAllIcons();
      $contentBlock.find('h3 a i').removeClass('fa-angle-down').addClass('fa-angle-up');

  // Реинициализация CF7 внутри активного блока
      setTimeout(function() {
        if (window.wpcf7) {
          if (typeof window.wpcf7.init === 'function') {
            $contentBlock.find('.wpcf7 > form').each(function() { window.wpcf7.init(this); });
        } else if (typeof window.wpcf7.initForm === 'function') {
            $contentBlock.find('form.wpcf7-form').each(function() { window.wpcf7.initForm(this); });
        }
    }
}, 0);

  // Скролл к активному блоку
      setTimeout(function() {
        const target = Math.max(0, $contentBlock.offset().top - 150);
        if (Math.abs(target - currentScroll) > 100) {
          $('html, body').animate({ scrollTop: target }, {
            duration: 300,
            easing: 'linear',
            complete: () => { isAnimating = false; }
        });
      } else {
          isAnimating = false;
      }
  }, 20);
  }

// ===== Закрытие активного блока =====
  function closeActiveBlock() {
      isAnimating = true;

      $contentBlock.removeClass('active').empty();
      resetAllIcons();

      setTimeout(function() {
        isAnimating = false;

        if (pendingCard) {
      // Переключаемся на новую карточку
          $('.strategic_card').removeClass('clicked');
          pendingCard.addClass('clicked');
          openCard(pendingCard);
          pendingCard = null;
      } else {
      // Если просто закрыли — очищаем clicked
          $('.strategic_card').removeClass('clicked');
      }
  }, 150);
  }

// ===== Клик по стрелочке в карточке (открытие/переключение) =====
  $(document).on('click', '.strategic_card h3 a i', function(e) {
      e.preventDefault();
      e.stopPropagation();
      if (isAnimating) return;

      const $card = $(this).closest('.strategic_card');

  // НЕЛЬЗЯ повторно нажать на активную (клик просто игнорируем)
      if ($contentBlock.hasClass('active') && isSameCard($card, $contentBlock)) {
    // Заодно убеждаемся, что у активной есть класс clicked в гриде
        const id = getCardId($card);
        $('.strategic_card').each(function() {
          const $c = $(this);
          $c.toggleClass('clicked', getCardId($c) === id);
      });
        return;
    }

  // Если открыта другая — переключаемся
    if ($contentBlock.hasClass('active') && !isSameCard($card, $contentBlock)) {
        pendingCard = $card;
    // помечаем новую «кликнутой», старую — снимаем
        $('.strategic_card').removeClass('clicked');
        $card.addClass('clicked');
        closeActiveBlock();
        return;
    }

  // Если ничего не открыто — открываем
    if (!$contentBlock.hasClass('active')) {
        $('.strategic_card').removeClass('clicked');
        $card.addClass('clicked');
        openCard($card);
    }
});

// ===== Download: делегирование + скролл к .form-title =====
  $(document).on('click', '.strategic_card_content .btn_group .sec_btn', function(e) {
      const $btn = $(this);
      const isDownload = $btn.text().toLowerCase().includes('download');
      if (!isDownload) return;

      e.preventDefault();

  // область — либо карточка в гриде, либо активный блок
      const $scope = $btn.closest('.strategic_card').length
      ? $btn.closest('.strategic_card')
      : $btn.closest('.strategic_card_active_block');

      const $form = $scope.find('.right_side');
      const $formTitle = $form.find('.form-title');
      if (!$form.length || !$formTitle.length) return;

  // если активный блок не открыт этой карточкой — открыть
      if (!$contentBlock.hasClass('active') || !isSameCard($scope, $contentBlock)) {
    // находим оригинал по ID/заголовку
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

  // скроллим к заголовку формы
  setTimeout(function() {
    const target = Math.max(0, $formTitle.offset().top - 150);
    $('html, body').animate({ scrollTop: target }, { duration: 900, easing: 'swing' });
    $formTitle.addClass('highlight-form');
    setTimeout(() => { $formTitle.removeClass('highlight-form'); }, 2000);
}, 300);
});

// ===== CF7: успешная отправка → скачать файл =====
  $(document).on('wpcf7mailsent', function(event) {
      const $form = $(event.target);
      const $scope = $form.closest('.strategic_card').length
      ? $form.closest('.strategic_card')
      : $form.closest('.strategic_card_active_block');

      const $downloadBtn = $scope.find('.strategic_card_content .btn_group .sec_btn');
      if (!$downloadBtn.length) return;

      if ($downloadBtn.text().toLowerCase().includes('download')) {
        const downloadUrl = $downloadBtn.data('download-url') || $downloadBtn.attr('href');
        if (!downloadUrl) return;

        $scope.find('.right_side').append(
          '<div class="download-success-message" style="color:#28a745;margin-top:15px;font-weight:bold;">Thank you! Download will start automatically...</div>'
          );

        setTimeout(function() {
          const link = document.createElement('a');
          link.href = downloadUrl;
          link.setAttribute('download', '');
          link.style.display = 'none';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

      // fallback для Safari
          setTimeout(function() { window.location.href = downloadUrl; }, 500);

          setTimeout(function() {
            $scope.find('.download-success-message').fadeOut(500, function() { $(this).remove(); });
        }, 3000);
      }, 1000);
    }
});

// ===== Вне карточек / ESC — закрыть =====
  $(document).on('click', function(e) {
      if (isAnimating) return;
      const $t = $(e.target);
      if (!$t.closest('.strategic_card, .strategic_card_active_block').length) {
        closeActiveBlock();
    }
});
  $(document).on('keydown', function(e) {
      if (isAnimating) return;
      if (e.key === 'Escape' || e.keyCode === 27) {
        closeActiveBlock();
    }
});

// ===== Стрелка внутри активного блока — закрыть =====
  $(document).on('click', '.strategic_card_active_block h3 a i', function(e) {
      e.preventDefault();
      e.stopPropagation();
      closeActiveBlock();
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
    const $playBtn = $box.find('.play');
    const videoSrc = $iframe.data('src') || ($video.length ? $video.find('source').attr('src') : '');

    if (!videoSrc) return;

    // Скрываем плейсхолдер и кнопку только один раз
    $placeholder.hide();
    $playBtn.hide();

    if (videoSrc.includes('youtube.com') || videoSrc.includes('youtu.be')) {
        let embedUrl = getYouTubeEmbedUrl(videoSrc);
        if ($iframe.attr('src') !== embedUrl) {
            $iframe.attr('src', embedUrl);
        }
        $iframe.show();
        $video.hide();

    } else if (videoSrc.includes('vimeo.com')) {
        let embedUrl = getVimeoEmbedUrl(videoSrc);
        if ($iframe.attr('src') !== embedUrl) {
            $iframe.attr('src', embedUrl);
        }
        $iframe.show();
        $video.hide();

    } else {
        // Локальное видео
        if ($video.length) {
            $video.show();
            $video.prop('muted', true);
            $video[0].play().catch(err => {
                console.warn('Автозапуск не сработал:', err);
            });
        }
        $iframe.hide();
    }
}

// Пауза без мигания
function pauseVideo($iframe, $video) {
    // iframe не трогаем (не сбрасываем src)
    if ($video.length && !$video[0].paused) {
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