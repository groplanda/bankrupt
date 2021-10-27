let currentStep = 0;
let error = true;
const answers = [];
const steps = document.querySelectorAll('[data-calc-step]');
const step_number = document.querySelector('[data-calc-id="step"]');
const next_step = document.querySelector('[data-calc-button="next"]');
const prev_step = document.querySelector('[data-calc-button="prev"]');
const send_btn = document.querySelector('[data-calc-button="send"]');
const inputs = document.querySelectorAll('[data-calc-input]');
const error_text = document.querySelector('[data-calc-error]');
const close_modal = document.querySelector('[data-js-action="close-calc"]');

next_step.addEventListener('click', nextStep)
prev_step.addEventListener('click', prevStep)
close_modal.addEventListener('click', backOnCalc)

inputs.forEach(input => {
  input.addEventListener('change', function(){
    error = false;
    error_text.classList.remove('calc__error_show');
  })
})

function nextStep() {
  if (currentStep < steps.length - 1) {
    if(validate()) {
      currentStep++;
      checkButtons();
      removeActiveClass();
      changeStep(currentStep);
      error = true;
    }
  }
}

function prevStep() {
  if (currentStep > 0) {
    currentStep--;
    checkButtons();
    removeActiveClass();
    changeStep(currentStep);
    removePrevStep(currentStep);
  }
}

function changeStep(index) {
  if (currentStep === steps.length - 1) {
    openModal(steps[index]);
  } else {
    step_number.textContent = index + 1;
    steps[index].classList.add('calc__tab_active');
  }
}


function validate() {
  if(!error) return true;
  error_text.classList.add('calc__error_show');
  return false;
}

function checkButtons() {
  if (currentStep === steps.length - 1) {
    next_step.classList.add('calc__btn_hide');
    send_btn.classList.remove('calc__btn_hide');
  }
  if (currentStep < 1) {
    prev_step.disabled = true;
  }
  if (currentStep > 0 && currentStep < steps.length - 1) {
    prev_step.disabled = false;
    send_btn.classList.add('calc__btn_hide');
    next_step.classList.remove('calc__btn_hide');
  }
}

function removePrevStep(index) {
  const elems = document.querySelectorAll(`[data-calc-input="input-${index + 1}"]`);
  elems.forEach(el => el.checked = false);
}

function removeActiveClass() {
  steps.forEach(s => s.classList.remove('calc__tab_active'));
}

function openModal(popup) {
  popup.classList.add('popup_active');
  popup.style.display = "block";
  document.body.classList.add("modal-open");

  setTimeout(() => {
    const loading = popup.querySelector('[data-calc="calc-loading"]'),
          resultMessage = popup.querySelector('[data-calc="calc-result"]');
          loading.classList.add("popup__heading_hide");
          resultMessage.classList.remove("popup__heading_hide");

  }, 4500);

}

function backOnCalc() {
  const popup = this.closest('[data-calc-step]');
  popup.classList.remove('popup_active');
  popup.style.display = "none";
  document.body.classList.remove("modal-open");

  currentStep = steps.length - 2;
  removeActiveClass();
  changeStep(currentStep);
  removePrevStep(currentStep);
  checkButtons();
  setBackLoadingModal(popup);
}

function setBackLoadingModal(popup) {
  const loading = popup.querySelector('[data-calc="calc-loading"]'),
        resultMessage = popup.querySelector('[data-calc="calc-result"]');
        loading.classList.remove("popup__heading_hide");
        resultMessage.classList.add("popup__heading_hide");
}