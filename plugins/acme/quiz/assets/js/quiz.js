let currentStep = 0;
let error = true;
const answers = [];
const steps = document.querySelectorAll('[data-calc-step]');
const step_number = document.querySelector('[data-calc-id="step"]');
const next_step = document.querySelector('[data-calc-button="next"]');
const prev_step = document.querySelector('[data-calc-button="prev"]');
const send_btn = document.querySelector('[data-calc-button="send"]');
const inputs = document.querySelectorAll('[data-calc-input]');
const percent = document.querySelector('[data-calc-percent]');
const error_text = document.querySelector('[data-calc-error]');

next_step.addEventListener('click', nextStep)
prev_step.addEventListener('click', prevStep)

inputs.forEach(input => {
  input.addEventListener('change', function(){
    error = false;
    error_text.classList.remove('calc__error-text_show');
  })
})

function nextStep() {
  if (currentStep < steps.length - 1) {
    if(validate()) {
      currentStep++;
      checkButtons();
      removeActiveClass();
      changeStep(currentStep);
      setPercent(currentStep);
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
    setPercent(currentStep);
    removePrevStep(currentStep);
  }
}

function changeStep(index) {
  steps[index].classList.add('calc__step_active');
  step_number.textContent = index + 1;
}

function setPercent(index) {
  const val = (index / (steps.length - 1)) * 100;
  percent.style.width = val + '%';
  percent.dataset.ariaValuenow = val;
}

function validate() {
  if(!error) return true;
  error_text.classList.add('calc__error-text_show');
  return false;
}

function checkButtons() {
  if (currentStep === steps.length - 1) {
    next_step.classList.add('calc__btn_hide');
    send_btn.classList.add('calc__submit_show');
  }
  if (currentStep < 1) {
    prev_step.disabled = true;
  }
  if (currentStep > 0 && currentStep < steps.length - 1) {
    prev_step.disabled = false;
    send_btn.classList.remove('calc__submit_show');
    next_step.classList.remove('calc__btn_hide');
  }
}

function removePrevStep(index) {
  const elems = document.querySelectorAll(`[data-calc-input="input-${index + 1}"]`);
  elems.forEach(el => el.checked = false);
}

function removeActiveClass() {
  steps.forEach(s => s.classList.remove('calc__step_active'));
}

