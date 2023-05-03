class Modal {
  constructor() {
    this.modalBackground = document.querySelector('.bground');
    this.modalButton = document.querySelectorAll('.modal-btn');
    this.formSubmitButton = document.querySelector('.btn-submit');
    this.closeModalButtons = document.querySelectorAll('.close');


    // Regex for email validation (RFC 5322 Official Standard)
    this.emailRegex =
      /^((\w\w+)[.\-]?)+@(([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // Regex for quantity validation (1 to 99), only numbers
    this.quantityRegex = /^[0-9]{1,2}$/;
  }

  async initApp() {

    // Toggle modal display
    const openModal = () => (this.modalBackground.style.display = 'block');
    this.modalButton.forEach((btn) => btn.addEventListener('click', openModal));

    const closeModal = () => (this.modalBackground.style.display = 'none');
    this.closeModalButtons.forEach((btn) =>
      btn.addEventListener('click', closeModal)
    );

    //  Responsive navigation
    const editNav = () => {
      const x = document.getElementById('myTopnav');
      if (x.className === 'topnav') {
        x.className += ' responsive';
      } else {
        x.className = 'topnav';
      }
    };

    this.formSubmitButton.addEventListener('click', (event) => {
      event.preventDefault();

      formValidation();
    });

    const formValidation = () => {

      // Remove previous error if they exist
      const errors = document.querySelectorAll('.error');
      errors.forEach((error) => error.remove());

      // Function to display error message in DOM
      const showError = (sibling, message) => {
        const newElement = document.createElement('p');
        newElement.classList.add('error');
        newElement.textContent = `${message}`;
        sibling.insertAdjacentElement('afterend', newElement);
      };

      // Create array of inputs && radio button to check
      const inputs = [
        { id: '#first', text: 'le prénom' },
        { id: '#last', text: 'le nom' },
        { id: '#email', text: "l'email" },
        { id: '#birthdate', text: 'la date de naissance' },
        { id: '#quantity', text: 'le nombre de tournois' },
      ];
      const locations = [
        { id: '#location1', town: 'Paris' },
        { id: '#location2', town: 'Marseille' },
        { id: '#location3', town: 'Lyon' },
        { id: '#location4', town: 'Toulouse' },
        { id: '#location5', town: 'Nice' },
        { id: '#location6', town: 'Nantes' },
      ];

      // Check if inputs are empty or if email/quantity format is incorrect. If so, display error message
      inputs.forEach((element) => {
        const inputEl = document.querySelector(element.id);
        const inputValue = inputEl.value.trim();
        if (inputValue === '') {
          showError(
            inputEl.parentElement,
            `Veuillez renseigner ${element.text}`
          );
        } else if (
          (element.id === '#email' && !this.emailRegex.test(inputValue)) ||
          (element.id === '#quantity' && !this.quantityRegex.test(inputValue))
        ) {
          showError(
            inputEl.parentElement,
            `Le format de ${element.text} est incorrect`
          );
        }
      });

      // Check if at least one location is checked. If so, display error message
      const locationsChecked = locations.filter((element) => {
        const locationEl = document.querySelector(element.id);
        return locationEl.checked;
      });

      if (locationsChecked.length === 0) {
        showError(
          document.querySelector('.checkbox-input'),
          `Veuillez choisir au moins une ville`
        );
      }
    };

    // init functions
    editNav();
  }
}

const modal = new Modal();
modal.initApp();
