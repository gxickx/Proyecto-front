// POPUP GALLERY
document.querySelectorAll('.gallery-img-section img').forEach(image =>{
  image.onclick = () => {
    document.querySelector('.popup-img').style.display = 'block';
    document.querySelector('.popup-img img').src = image.getAttribute('src');
}
});

document.querySelector('.popup-img span').onclick = () => {
  document.querySelector('.popup-img').style.display = 'none';
}

// SLIDER
const eventosSlider = document.querySelector(".eventos-slider");
let eventosSliderSection = document.querySelectorAll(".eventos-img");
let eventosSliderSectionLast = eventosSliderSection[eventosSliderSection.length - 1];

const eventosBtnLeft = document.querySelector("#eventos-btn-left");
const eventosBtnRight = document.querySelector("#eventos-btn-right");

eventosSlider.insertAdjacentElement('afterbegin', eventosSliderSectionLast);

function eventosNext() {
    let eventosSliderSectionFirst = document.querySelectorAll(".eventos-img")[0];
    eventosSlider.style.marginLeft = "-200%";
    eventosSlider.style.transition = "all .38s ease";
    setTimeout(() => {
        eventosSlider.style.transition = "none";
        eventosSlider.insertAdjacentElement("beforeend", eventosSliderSectionFirst);
        eventosSlider.style.marginLeft = "-100%"
    }, 380);
}

function eventosPrev() {
    let eventosSliderSection = document.querySelectorAll(".eventos-img");
    let eventosSliderSectionLast = eventosSliderSection[eventosSliderSection.length - 1];
    eventosSlider.style.marginLeft = "0%";
    eventosSlider.style.transition = "all .38s ease";
    setTimeout(() => {
        eventosSlider.style.transition = "none";
        eventosSlider.insertAdjacentElement("afterbegin", eventosSliderSectionLast);
        eventosSlider.style.marginLeft = "-100%"
    }, 380);
}

eventosBtnRight.addEventListener("click", function(){
    eventosNext();
})
eventosBtnLeft.addEventListener("click", function(){
    eventosPrev();
})

// CONTACTO 
const formulario = document.getElementById('form');
const userNombre = document.getElementById('userNombre');
const userEmail = document.getElementById('userEmail');

const alertNombre = document.getElementById('alertNombre');
const alertEmail = document.getElementById('alertEmail');
const alertSuccess = document.getElementById('alertSuccess');

const regUserNombre = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
const regUserEmail =
  /^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$/;

const successMsg = () => {
  alertSuccess.classList.remove('d-none');
  alertSuccess.textContent = 'Consulta enviada con exito';
};

const errorMsg = errors => {
  errors.forEach(item => {
    item.tipo.classList.remove('d-none');
    item.tipo.textContent = item.msg;
  });
};

formulario.addEventListener('submit', e => {
  e.preventDefault();

  alertSuccess.classList.add('d-none');

  const errors = [];

  if (!regUserNombre.test(userNombre.value) || !userNombre.value.trim()) {
    userNombre.classList.remove('is-valid');
    userNombre.classList.add('is-invalid');
    errors.push({
      tipo: alertNombre,
      msg: 'Formato no valido en el campo nombre, solo letras',
    });
  } else {
    userNombre.classList.remove('is-invalid');
    userNombre.classList.add('is-valid');
    alertNombre.classList.add('d-none');
  }

  if (!regUserEmail.test(userEmail.value) || !userEmail.value.trim()) {
    userEmail.classList.remove('is-valid');
    userEmail.classList.add('is-invalid');
    errors.push({
      tipo: alertEmail,
      msg: 'Escriba un correo valido',
    });
  } else {
    userEmail.classList.remove('is-invalid');
    userEmail.classList.add('is-valid');
    alertEmail.classList.add('d-none');
  }

  if (errors.length !== 0) {
    errorMsg(errors);
    return;
  }

  successMsg();
  console.log('Formulario Enviado');
});
