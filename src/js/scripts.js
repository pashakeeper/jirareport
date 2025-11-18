$(document).ready(function () {
  // Бургер-меню
  $(".burger").click(function (e) {
    e.stopPropagation(); // чтобы не сработал общий клик по document
    $(".menu_box").toggleClass("active");
    $(this).toggleClass("active");
  });

  $('a[href^="#"]').on("click", function (e) {
    e.preventDefault();

    let href = this.getAttribute("href");
    if (!href || href === "#") return;

    let target = document.querySelector(href);
    if (target) {
      let headerHeight = $("header").outerHeight() || 110;
      let targetPos =
        target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: targetPos,
        behavior: "smooth",
      });
    }
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
  $(".tab-btn").on("click", function () {
    $(".tab-btn").removeClass("active");
    $(this).addClass("active");

    const tabId = $(this).data("tab");
    $(".tab-content").removeClass("active");
    $("#" + tabId).addClass("active");
    Fancybox.bind('[data-fancybox="gallery"]', {});
  });

  Fancybox.bind('[data-fancybox="gallery"]', {
    // кастомные опции если нужно
  });

  // ===== Swiper =====
  window._swipers = window._swipers || {};

  function initSwipers() {
    // Сносим прежние экземпляры, если есть
    ["services", "logos", "review"].forEach(function (key) {
      var inst = window._swipers[key];
      if (inst && !inst.destroyed) {
        try {
          inst.destroy(true, true);
        } catch (e) {}
      }
    });

    // Services
    window._swipers.services = new Swiper(".services_slider", {
      direction: "horizontal",
      loop: false,
      effect: "slide",
      slidesPerView: 4,
      spaceBetween: 62,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      keyboard: { enabled: true, onlyInViewport: true },
      mousewheel: { forceToAxis: true },
      grabCursor: true,
      centeredSlides: false,
      breakpoints: {
        0: { slidesPerView: 2, spaceBetween: 17 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 4 },
      },
    });

    // Logos (бесконечная дорожка)
    window._swipers.logos = new Swiper(".logos-slider", {
      speed: 4000,
      autoplay: {
        delay: 1,
        disableOnInteraction: false,
        pauseOnMouseEnter: false,
      },
      loop: true,
      slidesPerView: "auto",
      allowTouchMove: false,
      spaceBetween: 0,
      centeredSlides: true,
    });

    // Review
    window._swipers.review = new Swiper(".review_slider", {
      direction: "horizontal",
      slidesPerView: 2.2,
      centeredSlides: true,
      loop: true,
      spaceBetween: 40,
      slidesPerGroup: 1,
      centeredSlidesBounds: true,
      loopAdditionalSlides: 5,
      grabCursor: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        0: { loop: true, autoHeight: true, slidesPerView: 1 },
        991: { autoHeight: false },
      },
    });

    whenImagesLoaded($(".logos-slider"), function () {
      if (window._swipers.logos && !window._swipers.logos.destroyed) {
        try {
          window._swipers.logos.destroy(true, true);
        } catch (e) {}
      }
      window._swipers.logos = new Swiper(".logos-slider", {
        loop: true,
        slidesPerView: "auto",
        allowTouchMove: false,
        centeredSlides: true,
        speed: 5000,
        freeMode: true,
        freeModeMomentum: false,
        autoplay: {
          delay: 1,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        },
      });
    });
  }

  function whenImagesLoaded($root, cb) {
    var $imgs = $root.find("img");
    if (!$imgs.length) return cb();
    var left = $imgs.length;
    $imgs.each(function () {
      if (this.complete) {
        if (--left === 0) cb();
      } else
        $(this).one("load error", function () {
          if (--left === 0) cb();
        });
    });
  }

  // Первая инициализация
  $(function () {
    initSwipers();
  });

  $(document).on("mousedown touchstart click", ".logos-slider", function () {
    var s = window._swipers && window._swipers.logos;
    if (s && !s.destroyed && s.autoplay) {
      try {
        s.autoplay.start();
      } catch (_) {}
    }
  });

  // Возврат со страницы (Safari bfcache)
  $(window).on("pageshow", function (e) {
    var ev = e.originalEvent;
    if (ev && ev.persisted) {
      if (!window._swipers.logos || window._swipers.logos.destroyed) {
        initSwipers();
      } else {
        try {
          $.each(window._swipers, function (_, sw) {
            if (sw && !sw.destroyed) {
              sw.update();
              if (sw.params.autoplay && sw.autoplay) sw.autoplay.start();
            }
          });
        } catch (_) {}
      }
    }
  });

  // Уход со страницы — подчистить
  $(window).on("pagehide", function () {
    if (!window._swipers) return;
    $.each(window._swipers, function (_, sw) {
      try {
        sw && !sw.destroyed && sw.destroy(true, true);
      } catch (_) {}
    });
  });

  // При возврате из background — восстановить автоплей
  $(document).on("visibilitychange", function () {
    var s = window._swipers;
    if (!s) return;
    if (document.hidden) {
      try {
        s.logos && s.logos.autoplay && s.logos.autoplay.stop();
      } catch (_) {}
    } else {
      try {
        if (s.logos && !s.logos.destroyed) {
          s.logos.update();
          s.logos.autoplay && s.logos.autoplay.start();
        }
      } catch (_) {}
    }
  });

  // Скролл хедера
  let ticking = false;
  $(window).on("scroll", function () {
    if (!ticking) {
      requestAnimationFrame(function () {
        if ($(window).scrollTop() > 90) {
          $(".header").addClass("scrolled");
        } else {
          $(".header").removeClass("scrolled");
        }
        ticking = false;
      });
      ticking = true;
    }
  });

  // FAQ
  $(".faq-question").on("click", function () {
    const $faqItem = $(this).closest(".faq-item");
    const $answer = $faqItem.find(".faq-answer");

    if ($faqItem.hasClass("active")) {
      $faqItem.removeClass("active");
      $answer.slideUp(300);
    } else {
      $faqItem.addClass("active");
      $answer.slideDown(300);
    }
  });
  $(".faq-item:first-child .faq-question").trigger("click");

  // Видео-табы
  $(".video_tab").on("click", function () {
    const tab_id = $(this).data("tab");
    $(".video_tab").removeClass("active");
    $(this).addClass("active");
    $(".video_content").removeClass("active");
    $("#" + tab_id).addClass("active");
  });

  // ===== Настройки для карточек
  const SCROLL_PAD = 150;
  const HEADER_SEL = "header";

  const $contentBlock = $(
    '<div class="strategic_card_active_block col-lg-12" aria-live="polite"></div>'
  );
  $("#strategic_card_section .row").prepend($contentBlock);

  let isAnimating = false;
  let pendingCard = null;

  function getHeaderHeight() {
    const $h = $(HEADER_SEL);
    return $h.length ? $h.outerHeight() : 0;
  }

  function scrollToY(y) {
    window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
  }

  function getCardId($card) {
    return $card.data("card-id") || $card.find("h3 a").first().text().trim();
  }

  function isSameCard($card, $activeBlock) {
    const id1 = getCardId($card);
    const id2 = getCardId($activeBlock.find(".strategic_card"));
    return id1 === id2;
  }

  function resetAllIcons() {
    $(
      ".strategic_card:not(.strategic_card_active_block .strategic_card) h3 a i"
    )
      .removeClass("fa-angle-up")
      .addClass("fa-angle-down");
  }

  function scrollToFormTitleInActiveBlock() {
    const $formTitle = $contentBlock.find(".right_side .form-title");
    if (!$formTitle.length) return;
    const offsetTop = $formTitle.offset().top - getHeaderHeight() - SCROLL_PAD;
    scrollToY(offsetTop);
    $formTitle.addClass("highlight-form");
    setTimeout(() => $formTitle.removeClass("highlight-form"), 2000);
  }

  function reinitCF7In($root) {
    if (!window.wpcf7) return;
    const $forms = $root.find(".wpcf7 > form, form.wpcf7-form");
    if (!$forms.length) return;
    if (typeof window.wpcf7.init === "function") {
      $forms.each(function () {
        window.wpcf7.init(this);
      });
    } else if (typeof window.wpcf7.initForm === "function") {
      $forms.each(function () {
        window.wpcf7.initForm(this);
      });
    } else {
      $forms.each(function () {
        this.dispatchEvent(new Event("wpcf7init"));
      });
    }
  }

  let CURRENT_RESOURCE_ID = null;

  function openCard($card) {
    if (isAnimating) return;
    isAnimating = true;

    CURRENT_RESOURCE_ID = $card.data("resource-id") || null;

    const $clone = $($card.prop("outerHTML"));
    $contentBlock.html($clone).addClass("active");

    resetAllIcons();
    $contentBlock
      .find("h3 a i")
      .removeClass("fa-angle-down")
      .addClass("fa-angle-up");

    const $cf7form = $contentBlock.find(".wpcf7 form.wpcf7-form");
    if ($cf7form.length && CURRENT_RESOURCE_ID) {
      let $hidden = $cf7form.find('input[name="resource_id"]');
      if (!$hidden.length) {
        $hidden = $('<input type="hidden" name="resource_id">').appendTo(
          $cf7form
        );
      }
      $hidden.val(CURRENT_RESOURCE_ID);
    }

    reinitCF7In($contentBlock);

    const y = $contentBlock.offset().top - getHeaderHeight() - SCROLL_PAD;
    if (Math.abs(window.pageYOffset - y) > 20) {
      scrollToY(y);
      requestAnimationFrame(() => {
        isAnimating = false;
      });
    } else {
      isAnimating = false;
    }
  }

  function closeActiveBlock() {
    if (isAnimating || !$contentBlock.hasClass("active")) return;
    isAnimating = true;

    const activeHeight = $contentBlock.outerHeight(true) || 0;
    const mb = $contentBlock.css("margin-bottom");
    const $spacer = $('<div class="strategic_active_spacer"></div>').css({
      height: activeHeight,
      marginBottom: mb,
      transition: "height 180ms linear",
    });

    $contentBlock.after($spacer);
    $contentBlock.removeClass("active").empty();
    resetAllIcons();

    requestAnimationFrame(() => {
      $spacer.css("height", 0);
      $spacer.one("transitionend", () => {
        $spacer.remove();
        isAnimating = false;

        if (pendingCard) {
          const $next = pendingCard;
          pendingCard = null;
          $(".strategic_card").removeClass("clicked");
          $next.addClass("clicked");
          openCard($next);
        } else {
          $(".strategic_card").removeClass("clicked");
        }
      });
    });
  }

  // Клик по стрелке в карточке (в гриде)
  $(document).on("click", ".strategic_card h3 a i", function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (isAnimating) return;

    const $card = $(this).closest(".strategic_card");

    if ($contentBlock.hasClass("active") && isSameCard($card, $contentBlock)) {
      const id = getCardId($card);
      $(".strategic_card").each(function () {
        $(this).toggleClass("clicked", getCardId($(this)) === id);
      });
      scrollToFormTitleInActiveBlock();
      return;
    }

    if ($contentBlock.hasClass("active") && !isSameCard($card, $contentBlock)) {
      pendingCard = $card;
      $(".strategic_card").removeClass("clicked");
      $card.addClass("clicked");
      closeActiveBlock();
      return;
    }

    if (!$contentBlock.hasClass("active")) {
      $(".strategic_card").removeClass("clicked");
      $card.addClass("clicked");
      openCard($card);
    }
  });

  // Клик по карточке (кроме интерактивных элементов)
  $(document).on("click", ".strategic_card, .strategic_card h3", function (e) {
    if (
      $(e.target).closest(
        "a, button, .btn, .sec_btn, input, select, textarea, label, .wpcf7, .wpcf7-form"
      ).length
    )
      return;
    if (isAnimating) return;

    const $card = $(e.target).closest(".strategic_card");

    if ($contentBlock.hasClass("active") && isSameCard($card, $contentBlock)) {
      const id = getCardId($card);
      $(".strategic_card").each(function () {
        $(this).toggleClass("clicked", getCardId($(this)) === id);
      });
      scrollToFormTitleInActiveBlock();
      return;
    }

    if ($contentBlock.hasClass("active") && !isSameCard($card, $contentBlock)) {
      pendingCard = $card;
      $(".strategic_card").removeClass("clicked");
      $card.addClass("clicked");
      closeActiveBlock();
      return;
    }

    if (!$contentBlock.hasClass("active")) {
      $(".strategic_card").removeClass("clicked");
      $card.addClass("clicked");
      openCard($card);
    }
  });

  // Повторный клик по .clicked
  $(document).on("click", ".strategic_card.clicked", function (e) {
    if (
      $(e.target).closest(
        "a, button, .btn, .sec_btn, input, select, textarea, label, .wpcf7, .wpcf7-form"
      ).length
    )
      return;
    if (isAnimating) return;
    if (
      $contentBlock.hasClass("active") &&
      isSameCard($(this), $contentBlock)
    ) {
      scrollToFormTitleInActiveBlock();
    }
  });

  // Вне карточек / ESC — закрыть
  $(document).on("click", function (e) {
    if (isAnimating) return;
    if (
      !$(e.target).closest(".strategic_card, .strategic_card_active_block")
        .length
    ) {
      closeActiveBlock();
    }
  });

  $(document).on("keydown", function (e) {
    if (isAnimating) return;
    if (e.key === "Escape" || e.keyCode === 27) {
      closeActiveBlock();
    }
  });

  // Стрелка внутри активного блока — закрыть
  $(document).on("click", ".strategic_card_active_block h3 a i", function (e) {
    e.preventDefault();
    e.stopPropagation();
    closeActiveBlock();
  });

  // Клик по кнопке Download
  $(document).on(
    "click",
    ".strategic_card_content .btn_group .download-btn, .strategic_card_content .btn_group .sec_btn.download-btn",
    function (e) {
      e.preventDefault();

      const $btn = $(this);
      const downloadUrl = $btn.data("download-url") || $btn.attr("href");
      const isGated = String($btn.data("gated")).toLowerCase() === "true";

      const $scope = $btn.closest(".strategic_card").length
        ? $btn.closest(".strategic_card")
        : $btn.closest(".strategic_card_active_block").find(".strategic_card");

      if (!isGated) {
        if (downloadUrl) {
          window.open(downloadUrl, "_blank", "noopener");
        }
        return;
      }

      if (
        !$contentBlock.hasClass("active") ||
        !isSameCard($scope, $contentBlock)
      ) {
        const id = getCardId($scope);
        const $original = $(".strategic_card")
          .filter(function () {
            return getCardId($(this)) === id;
          })
          .first();

        if ($original.length) {
          $(".strategic_card").removeClass("clicked");
          $original.addClass("clicked");
          openCard($original);
        }
      }

      requestAnimationFrame(() => {
        scrollToFormTitleInActiveBlock();
        const $firstInput = $contentBlock
          .find(
            ".wpcf7 form.wpcf7-form input, .wpcf7 form.wpcf7-form textarea, .wpcf7 form.wpcf7-form select"
          )
          .filter(":visible:enabled")
          .first();
        if ($firstInput.length) $firstInput.trigger("focus");
      });

      if (downloadUrl) {
        $contentBlock.data("pending-download-url", downloadUrl);
      }
    }
  );

  function isIOSSafari() {
    var ua = navigator.userAgent;
    var iOS =
      /iP(hone|ad|od)/.test(navigator.platform) ||
      (/Macintosh/.test(ua) && "ontouchend" in document);
    var safari = /Safari/.test(ua) && !/Chrome|CriOS|FxiOS|EdgiOS/.test(ua);
    return iOS && safari;
  }

  // CF7: успешная отправка — запускаем загрузку
  $(document).on("wpcf7mailsent", function (event) {
    var $form = $(event.target);
    var $block = $form.closest(".strategic_card_active_block");
    if (!$block.length) return;

    var sentResourceId = $form.find('input[name="resource_id"]').val();
    if (
      window.CURRENT_RESOURCE_ID &&
      sentResourceId &&
      String(sentResourceId) !== String(window.CURRENT_RESOURCE_ID)
    )
      return;

    var downloadUrl =
      $block.data("pending-download-url") ||
      $block
        .find(".strategic_card_content .btn_group .download-btn")
        .data("download-url") ||
      $block
        .find(".strategic_card_content .btn_group .download-btn")
        .attr("href");

    if (!downloadUrl) return;

    if (isIOSSafari()) {
      try {
        window.location.href = downloadUrl;
        return;
      } catch (e) {}
    }

    var opened = null;
    try {
      opened = window.open(downloadUrl, "_blank", "noopener");
    } catch (e) {}
    if (opened) return;

    try {
      var ifr = document.createElement("iframe");
      ifr.style.display = "none";
      ifr.onload = function () {
        setTimeout(function () {
          ifr.remove();
        }, 10000);
      };
      ifr.src = downloadUrl;
      document.body.appendChild(ifr);
    } catch (e) {}
  });

  // mobile обрезка текста
  if ($(window).width() < 991) {
    $(".text").each(function () {
      const words = $(this).text().trim().split(" ");
      const shortText = words.slice(0, 6).join(" ");
      $(this).text(shortText);
    });
  }
});

// === Управление плеерами во фреймах ===
function pauseIframe($iframe) {
  if (!$iframe || !$iframe.length) return;
  const src = $iframe.attr("src") || "";
  try {
    if (src.includes("youtube.com")) {
      $iframe[0].contentWindow.postMessage(
        JSON.stringify({
          event: "command",
          func: "pauseVideo",
          args: [],
        }),
        "*"
      );
    } else if (src.includes("player.vimeo.com")) {
      $iframe[0].contentWindow.postMessage({ method: "pause" }, "*");
    }
  } catch (e) {}
}

function playIframe($iframe) {
  if (!$iframe || !$iframe.length) return;
  const src = $iframe.attr("src") || "";
  try {
    if (src.includes("youtube.com")) {
      $iframe[0].contentWindow.postMessage(
        JSON.stringify({
          event: "command",
          func: "playVideo",
          args: [],
        }),
        "*"
      );
    } else if (src.includes("player.vimeo.com")) {
      $iframe[0].contentWindow.postMessage({ method: "play" }, "*");
    }
  } catch (e) {}
}

const isMobile = window.matchMedia("(max-width: 768px)").matches;

const videoObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const $box = $(entry.target);
      const $iframe = $box.find("iframe");
      const $video = $box.find("video");

      if (entry.isIntersecting) {
        startVideo($box, $iframe, $video);
      } else {
        pauseVideo($iframe, $video);
      }
    });
  },
  {
    threshold: isMobile ? 0.3 : 0.7,
    rootMargin: isMobile ? "150px 0px" : "100px 0px",
  }
);

function startVideo($box, $iframe, $video) {
  const $placeholder = $box.find(".video_placeholder");
  const $playBtn = $box.find("button.play, .play");
  const videoSrc =
    $iframe.data("src") ||
    ($video.length ? $video.find("source").attr("src") : "");

  if (!videoSrc) return;

  $placeholder.hide();
  $playBtn.hide();

  if (videoSrc.includes("youtube.com") || videoSrc.includes("youtu.be")) {
    if ($iframe.attr("src")) {
      $iframe.show();
      $video.hide();
      playIframe($iframe);
      return;
    }
    const embedUrl = getYouTubeEmbedUrl(videoSrc);
    $iframe.attr("src", embedUrl).show();
    $video.hide();
  } else if (videoSrc.includes("vimeo.com")) {
    if ($iframe.attr("src")) {
      $iframe.show();
      $video.hide();
      playIframe($iframe);
      return;
    }
    const embedUrl = getVimeoEmbedUrl(videoSrc);
    $iframe.attr("src", embedUrl).show();
    $video.hide();
  } else {
    if ($video.length) {
      $video.show();
      $video.prop("muted", true);
      $video[0].play().catch(() => {});
    }
    $iframe.hide();
  }
}

function pauseVideo($iframe, $video) {
  if ($iframe && $iframe.length && $iframe.attr("src")) {
    pauseIframe($iframe);
  }
  if ($video && $video.length && !$video[0].paused) {
    $video[0].pause();
  }
}

function stopVideo($box, $iframe, $video, $placeholder, $playBtn) {
  $placeholder.show();
  $playBtn.show();

  if ($iframe.length && $iframe.attr("src")) {
    $iframe.attr("src", "").hide();
  }

  if ($video.length && !$video[0].paused) {
    $video[0].pause();
    $video[0].currentTime = 0;
    $video.hide();
  }
}

function getYouTubeEmbedUrl(videoSrc) {
  let id = "";
  if (videoSrc.includes("watch?v=")) {
    id = videoSrc.split("watch?v=")[1].split("&")[0];
  } else if (videoSrc.includes("youtu.be/")) {
    id = videoSrc.split("youtu.be/")[1].split("?")[0];
  } else if (videoSrc.includes("/embed/")) {
    id = videoSrc.split("/embed/")[1].split(/[?&]/)[0];
  }
  const base = `https://www.youtube.com/embed/${id}`;
  const params = "autoplay=1&mute=1&rel=0&enablejsapi=1&playsinline=1";
  return `${base}?${params}`;
}

function getVimeoEmbedUrl(videoSrc) {
  let id = "";
  if (videoSrc.includes("vimeo.com/") && !videoSrc.includes("/embed/")) {
    id = videoSrc.split("vimeo.com/")[1].split("/")[0];
  } else if (videoSrc.includes("/video/")) {
    id = videoSrc.split("/video/")[1].split(/[?&]/)[0];
  }
  const base = `https://player.vimeo.com/video/${id}`;
  const params = "autoplay=1&muted=1&background=0";
  return `${base}?${params}`;
}

$(document).ready(function () {
  $(".video_box").each(function () {
    videoObserver.observe(this);
  });

  $(".video_box .play").on("click", function (e) {
    e.preventDefault();
    const $box = $(this).closest(".video_box");
    const $iframe = $box.find("iframe");
    const $video = $box.find("video");
    const $placeholder = $box.find(".video_placeholder");
    const $playBtn = $box.find(".play");

    startVideo($box, $iframe, $video, $placeholder, $playBtn);
  });

  $(".form-floating input, .form-floating textarea").each(function () {
    if ($(this).val().trim() !== "") {
      $(this).closest(".form-floating").find("label").hide();
    }
  });

  $(".form-floating input, .form-floating textarea").on("focus", function () {
    $(this).closest(".form-floating").find("label").fadeOut(200);
  });

  $(".form-floating input, .form-floating textarea").on("blur", function () {
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
          block: "center",
        });
      }
    }
  });
});


