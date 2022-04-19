export class SelectCity {
  constructor() {
    this.city = document.querySelectorAll('[data-address="city"]');
    this.street = document.querySelectorAll('[data-address="street"]');
    this.post_code = document.querySelectorAll('[data-address="post_code"]');
    this.phone = document.querySelectorAll('[data-address="phone"]');
    this.email = document.querySelectorAll('[data-address="email"]');
    this.open = document.querySelectorAll('[data-address="open"]');
    this.open_sm = document.querySelectorAll('[data-address="open_sm"]');
    this.map = document.querySelectorAll('[data-address="map"]');

    this.triggers = document.querySelectorAll('[data-js-action="select-city"]');
    this.activeClass = "contact-modal__name_active";

    this.init()
  }

  init() {
    if (this.triggers.length) {
      const self = this;
      this.triggers.forEach(trigger => {
        trigger.addEventListener("click", this.selectCurrentCity.bind(self))
      });
    }
  }

 fetchCity(id) {
    const data = new FormData();
    data.append('city_id', id);
    fetch("/api/select-city", {
      method: "POST",
      body: data
    }).then(() => {
      window.location.reload();
    });
  }

  async getCityById(id) {
    return await fetch(`/api/get-city/${id}`)
          .then(data => data.json())
          .then(res => res)
          .catch(e => e)
  }

  selectCurrentCity(event) {
    const target = event.target;

    if (target) {
      this.removeActiveTriggers();
      target.classList.add(this.activeClass);
      const cityId = target.dataset.cityId;
      this.fetchCity(cityId)
    }
  }

  fillData(address) {
    Object.keys(address).forEach(key => {
      if (key === 'phone') {

      } else if (key === 'email') {
        this.fillEmail(key, address[key]);
      } else {
        this.fillElement(key, address[key]);
      }
    })
  }

  fillEmail(key, email) {
    this[key].forEach(element => {
      element.href = `mailto:${email}`
      element.textContent = email;
    });
  }

  fillElement(key, value) {
    if (!this[key]) {
      return;
    }
    this[key].forEach(element => {
      element.innerHTML = value;
    });
  }

  removeActiveTriggers() {
    this.triggers.forEach(t => t.classList.remove(this.activeClass));
  }
}
