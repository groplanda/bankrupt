import $ from 'jquery';
window.$ = window.jQuery = $;
import 'jquery.maskedinput/src/jquery.maskedinput.js'
import 'swiper/css/bundle';
require('lightbox2/dist/js/lightbox.min.js');
import Swiper, { Navigation, Pagination } from 'swiper';
import { SelectCity } from './plugins/SelectCity';

$(document).ready(function() {


  const selectcity = new SelectCity();

  const checkCookie = async () => {
    try {
      const result = await selectcity.checkCookies();
      if (typeof result !== 'string') {
        $('[data-modal="address" ]').first().trigger('click');
      }
    } catch(e) {
      console.log(e);
      throw new Error(e.message)

    }
  }

  checkCookie();

  let IS_MOBILE = true,
      IS_OPEN_MODAL = false;

  if ($( window ).width() > 767) {
    IS_MOBILE = false;
  }

  $(window).on('mouseleave', function(e) {
    if (e.clientY < 0 && !IS_OPEN_MODAL) {
      const firstButton = $('[data-modal="callback" ]').first();
      const currentModal = firstButton.data('modal');
      firstButton.trigger('click');
      const form = $(`[data-modal="${currentModal}"]`).find('form');
      $(form).attr('data-yandex-target', 'pop-ap');
      $('#popup-title').text('Не нашли то что нужно? Оставьте заявку и мы с вами свяжемся!')
    }
  })

  $('[data-js-action="open-modal"]').on("click", function(e) {
    IS_OPEN_MODAL = true;
    e.preventDefault();
    const modalId = $(this).data('modal'),
          popup = $('[data-js-action="modal"]'),
          currentModal = popup.find(`[data-modal="${modalId}"]`),
          triggerTitle = $(this).data('title'),
          yandexTarget = $(this).data('yandex-target') || null;

    if (currentModal.length) {

      popup.find('.popup__modal').each(function() {
        $(this).hide();
      })
      if (triggerTitle) {
        $('#popup-title').text(triggerTitle);
      }
      const bodyOffset = getScrollBarWith();
      popup.addClass('popup_active');
      popup.fadeIn();
      $(document.body).addClass('modal-open');
      setOffset(document.body, bodyOffset);
      currentModal.fadeIn();

      if (yandexTarget) {
        currentModal.find('form').attr('data-yandex-target', yandexTarget);
      }

    }

  })

  function getScrollBarWith() {
    const documentWidth = parseInt(document.documentElement.clientWidth);
    const windowsWidth = parseInt(window.innerWidth);
    return windowsWidth - documentWidth;
  }

  function setOffset(elem, width) {
    elem.style.paddingRight = `${width}px`;

    if ($(".header").hasClass("header_fixed")) {
      $('[data-js-action="header"]').css({'margin-right': width + 'px'});
    }

    if ($(".button-up").hasClass("button-up_active")) {
      $('.button-up').css({'margin-right': width + 'px'});
    }

  }

  $('[data-js-action="close-modal"]').on("click", function() {
    const popup = $('[data-js-action="modal"]');

    popup.find('.popup__modal').each(function() {
      $(this).fadeOut();
    })
    popup.removeClass('popup_active');
    popup.fadeOut();
    $(document.body).removeClass('modal-open');
    setOffset(document.body, 0);
  })

  // header

  if (!IS_MOBILE) {
    const offsetTop = $('.intro').offset().top;
    $(window).on('scroll', function() {

      if ($(this).scrollTop() > offsetTop) {
        $('.header').addClass("header_fixed")
      } else {
        $('.header').removeClass("header_fixed")
      }

    })
  }

  // spoiler

  $('[data-spoiler="head"]').mouseenter(function () {

    $(this).addClass("intro__list-head_active");
    $(this).next('[data-spoiler="body"]').removeClass("hidden");
  });

  $('[data-spoiler="head"]').mouseleave(function () {
    $(this).removeClass("intro__list-head_active");
    $(this).next('[data-spoiler="body"]').addClass("hidden");
    }
  ).mouseleave();

  $('[data-js-action="confirm-checkbox"]').on("change", function() {
    if($(this).is(':checked')) {
      $('[data-js-action="confirm-btn"]').prop('disabled', false);
    } else {
      $('[data-js-action="confirm-btn"]').prop('disabled', true);
    }
  })

  // hurry tabs

  hurryTabs();

  function hurryTabs() {
    let stepIndex = 0;
    const tabs = $('[data-hurry="tab"]');
    const prev = $('[data-hurry="prev"]');
    const next = $('[data-hurry="next"]');
    const send = $('[data-hurry="send"]');
    const slideText = $('[data-hurry="current"]');

    next.on('click', nextTab);
    prev.on('click', prevTab);

    function nextTab() {
      stepIndex++;
      checkStep(stepIndex);
      tabs.each(function(_, tab) {
        $(tab).removeClass("hurry__tab_active");
      })
      $(tabs[stepIndex]).addClass("hurry__tab_active");
      slideText.text(stepIndex + 1)
    }

    function prevTab() {
      stepIndex--;
      checkStep(stepIndex);
      tabs.each(function(_, tab) {
        $(tab).removeClass("hurry__tab_active");
      })
      $(tabs[stepIndex]).addClass("hurry__tab_active");
      slideText.text(stepIndex + 1)
    }

    function checkStep(index) {
      if (index >= tabs.length - 1) {
        next.prop('disabled', true).addClass("hurry__btn_hide");
        prev.prop('disabled', true).addClass("hurry__btn_hide");
        send.prop('disabled', false).removeClass("hurry__btn_hide");
      }
      else if (index === 0) {
        prev.prop('disabled', true);
      }
      else {
        prev.prop('disabled', false);
        next.prop('disabled', false).removeClass("hurry__btn_hide");
        send.prop('disabled', true).addClass("hurry__btn_hide");
      }
    }
  }

  // questions

  $('[data-question="head"]').on("click", toggleQuestion);

  function toggleQuestion() {
    const activeClass = "questions__list-head_active";
    $('[data-question="head"]').not(this).removeClass(activeClass).next('[data-question="body"]').slideUp();

    $(this).toggleClass(activeClass);

    if ($(this).hasClass(activeClass)) {
      $(this).next('[data-question="body"]').slideDown();
    } else {
      $(this).next('[data-question="body"]').slideUp();
    }
  }

  // phone mask
  $(".phone-mask").mask("+7(999)999-99-99");
  $(".birthday-mask").mask("99/99/9999");

  // ajax form

  $(window).on('ajaxInvalidField', function(event, fieldElement, fieldName, errorMsg, isFirst) {
    $(fieldElement).addClass('form__field_error');
  });

  $(document).on('ajaxPromise', '[data-request]', function() {
    $(this).find('.form__field').removeClass('form__field_error');
  });

  $('.ajax-form').on('ajaxSuccess', function(event) {
    event.currentTarget.reset();

    const isQuiz = $(this).hasClass("quiz-form");

    if (isQuiz) {
      $(this).parents(".calc").slideUp();
    }

    const yandexTarget = $(this).attr('data-yandex-target');

    if (yandexTarget) {
      ym(73274563, 'reachGoal', yandexTarget);
    }

    setTimeout(() => {

      const popup = $('[data-js-action="modal"]');
      const currentModal = isQuiz ? popup.find(`[data-modal="download"]`) : popup.find(`[data-modal="success"]`)

      if (currentModal.length) {
        popup.find('.popup__modal').each(function() {
          $(this).hide();
        })

        popup.addClass('popup_active');
        popup.fadeIn();
        $(document.body).addClass('modal-open')
        currentModal.fadeIn();
      }
    }, 1500)

  });

  // mobile menu

  $('[data-js-action="toggle-menu"]').on("click", function() {
    $('[data-js-action="mobile-menu"]').toggleClass("mobile-nav_active");
    $(document.body).toggleClass('modal-open')
  })

  // slider video

  if($('[data-js-slider="video"]').length) {

    Swiper.use([Navigation, Pagination]);

    const slider = new Swiper('[data-js-slider="video"]', {
      loop: false,
      slidesPerView: 1,
      spaceBetween: 0,
      slideClass: 'slider__item',
      slideActiveClass: 'slider__item_active',
      navigation: {
        nextEl: '.slider__arrow_next',
        prevEl: '.slider__arrow_prev',
      },
      pagination: {
        el: '.slider__pagination',
        dynamicBullets: false,
        bulletClass: 'slider__bullet',
        bulletActiveClass: 'slider__bullet_active',
        currentClass: 'slider__bullet_current',
        clickable: true
      },
    })

    slider.on('slideChange', function() {
      const parentEl = slider.el.querySelectorAll('[data-js="slider-video-container"]'),
            classname = "video__container_play";

      if (parentEl) {
        parentEl.forEach(parent => {
          const videoEl = parent.querySelector('[data-js="slider-video-src"]');
          videoEl.pause();
          parent.classList.remove(classname);
        })
      }
    })

    playVideo('[data-js-slider="video"]');
  }

  function playVideo(trigger) {

    const videoEl = document.querySelector(trigger);

    if (videoEl) {

      videoEl.addEventListener("click", (e) => {
        const target = e.target;
        if (target && target.dataset.js === "slider-video-play") {
          toggleVideo(target, true);
        }
        if (target && target.dataset.js === "slider-video-time") {
          setTime(e);
        }
      })
    }
  }

  function toggleVideo(target, play = true) {
    const parentEl = target.closest('[data-js="slider-video-container"]'),
          videoEl = parentEl.querySelector('[data-js="slider-video-src"]'),
          classname = "video__container_play";
    if (play) {
      videoEl.play();
      parentEl.classList.add(classname);
    } else {
      videoEl.pause();
      parentEl.classList.remove(classname);
    }
  }

  function setTime (event) {
    const video = event.target.previousElementSibling,
          pos = 100 * event.offsetX / (video.offsetWidth - 40);

    video.currentTime = video.duration / 100 * pos;
  }

  const videoEl = document.querySelectorAll('[data-js="slider-video-src"]');

  if (videoEl) {
    videoEl.forEach(video => {
      video.addEventListener('pause', (e) => {
        toggleVideo(video, false)
      });
      video.addEventListener('timeupdate', e => {
        const target = e.target;
        const timeline = target.nextElementSibling.firstElementChild;
        const percent = target.currentTime / target.duration * 100;
        if (percent && timeline) {
          timeline.style.width = percent + '%';
        }
      })
    })
  }
  // cases

  if($('[data-js-slider="cases"]').length) {
    new Swiper('[data-js-slider="cases"]', {
      loop: false,
      slidesPerView: 3,
      spaceBetween: 30,
      slideClass: 'cases__item',
      slideActiveClass: 'cases__item_active',
      navigation: {
        nextEl: '.cases__arrow_next',
        prevEl: '.cases__arrow_prev',
      },
      pagination: {
        el: '.cases__pagination',
        dynamicBullets: false,
        bulletClass: 'cases__bullet',
        bulletActiveClass: 'cases__bullet_active',
        currentClass: 'cases__bullet_current',
        clickable: true
      },
      breakpoints: {
        320: {
          slidesPerView: 1.2,
          spaceBetween: 15,
        },
        576: {
          slidesPerView: 1.7,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 20
        },
        992: {
          slidesPerView: 3,
          spaceBetween: 20
        },
        1200: {
          slidesPerView: 3,
          spaceBetween: 30
        }
      }
    })
  }

  // anchors

  const anchors = document.querySelectorAll('[data-js="scroll-to"]')

  for (let anchor of anchors) {
    anchor.addEventListener('click', function (e) {
      e.preventDefault()

      if (e.target.closest('[data-js-action="mobile-menu"]')) {
        $('[data-js-action="mobile-menu"]').removeClass("mobile-nav_active");
        $(document.body).removeClass('modal-open');
      }

      const blockID = anchor.getAttribute('href')

      document.querySelector(blockID).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    })
  }

  // up btn

  function showScrollBtn($selector) {
    const button = document.getElementById($selector),
          activeClass = "button-up_active";
    if (button) {
      window.addEventListener('scroll', function() {
        if (window.pageYOffset > 600) {
          button.classList.add(activeClass);
        } else {
          button.classList.remove(activeClass);
        }
      });
    }
  }

  function scrollToUp($selector) {
    const button = document.getElementById($selector);

    if (button) {
      button.addEventListener("click", () => {
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
      })
    }
  }

  showScrollBtn("button-up");
  scrollToUp("button-up");

});
