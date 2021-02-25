import $ from 'jquery';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'lightbox2/dist/js/lightbox.min.js'
import 'jquery.maskedinput/src/jquery.maskedinput.js'
window.$ = window.jQuery = $;

window.onload = () => {

  $('[data-input="phone"]').mask("+7(999)999-99-99");

  $(window).on('ajaxInvalidField', function(event, fieldElement, fieldName, errorMsg, isFirst) {
    $(fieldElement).addClass('is-invalid');
  });

  $(document).on('ajaxPromise', '[data-request]', function() {
    $(this).closest('form').find('.form-control.is-invalid').removeClass('is-invalid');
  });

  $('form').on('ajaxSuccess', function(event) {
    event.currentTarget.reset();
  });

  $('[data-checkbox="confirm"]').on('change', function() {
    $(this).is(':checked')
    ? $('[data-button="send"]').removeAttr( 'disabled' ).removeClass('disabled')
    : $('[data-button="send"]').attr( 'disabled', true ).addClass('disabled');
  })

  $(window).scroll(function(){
    if($(this).scrollTop()>120){
        $('[data-header="fixed"]').addClass('header__bottom_fixed');
    }
    else if ($(this).scrollTop()<120){
        $('[data-header="fixed"]').removeClass('header__bottom_fixed');
    }
  });

  const $page = $('html, body');

  $('a[href*="#"]').click(function() {
    $page.animate({
        scrollTop: $($.attr(this, 'href')).offset().top
    }, 400);
    return false;
  });


}