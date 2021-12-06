import $ from 'jquery';
window.$ = window.jQuery = $;
import 'jquery.maskedinput/src/jquery.maskedinput.js'
import 'swiper/css/bundle';
require('lightbox2/dist/js/lightbox.min.js');
import Swiper, { Navigation, Pagination } from 'swiper';

$(document).ready(function() {

  let IS_MOBILE = true,
      IS_OPEN_MODAL = false;

  if ($( window ).width() > 767) {
    IS_MOBILE = false;
  }

  $(window).on('mouseleave', function(e) {
    if (e.clientY < 0 && !IS_OPEN_MODAL) {
      $('[data-modal="callback" ]').first().trigger('click');
      $('#popup-title').text('Не нашли то что нужно? Оставьте заявку и мы с вами свяжемся!')
    }
  })

  $('[data-js-action="open-modal"]').on("click", function(e) {
    IS_OPEN_MODAL = true;
    e.preventDefault();
    const modalId = $(this).data('modal'),
          popup = $('[data-js-action="modal"]'),
          currentModal = popup.find(`[data-modal="${modalId}"]`),
          triggerTitle = $(this).data('title');

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

  // ajax form

  $(window).on('ajaxInvalidField', function(event, fieldElement, fieldName, errorMsg, isFirst) {
    $(fieldElement).addClass('form__field_error');
  });

  $(document).on('ajaxPromise', '[data-request]', function() {
    $(this).find('.form__field').removeClass('form__field_error');
  });

  $('.ajax-form').on('ajaxSuccess', function(event) {
    event.currentTarget.reset();

    if ($(this).hasClass("quiz-form")) {
      $(this).parents(".calc").slideUp();
    }

    setTimeout(() => {

      const popup = $('[data-js-action="modal"]');
      const currentModal = popup.find(`[data-modal="success"]`)

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
      loop: true,
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
      const prevSlide = slider.slides[slider.previousIndex],
            video = $(prevSlide).find('[data-js="slider-video-src"]'),
            videoSrc = video.prop('src');

      if (videoSrc.indexOf('&autoplay=1') !== -1) {
        const newVideoSrc = videoSrc.replace('&autoplay=1', '');
        video.data('src',newVideoSrc);
        video.prop('src', '');
        $(prevSlide).find('.video__box').removeClass('video__container_play');
      }

    })

    playVideo('video__container_play', '[data-js="slider-video-src"]', '[data-js="slider-video-play"]');
  }

  function playVideo(classname, video, trigger) {

    $(trigger).each(function( index, btn ) {
      $(btn).on('click', function() {
        const parentEl = $(btn).parent($('video__content')).parent($('video__container')),
              videoEl = parentEl.find($(video));

        let videoURL = videoEl.data('src');
        videoURL += "&autoplay=1";

        parentEl.addClass(classname);
        videoEl.prop('src',videoURL);

      })
    });
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