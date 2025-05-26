function updateInputState(input) {
    input.classList.toggle('filled', input.value.trim() !== '');
}

document.addEventListener('input', function (e) {
    const input = e.target;
    if (input.closest('.modal__form') && input.classList.contains('form__input')) {
        updateInputState(input);
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const forms = document.querySelectorAll('.modal__form');
    forms.forEach(form => {
        const inputs = form.querySelectorAll('.form__input');
        inputs.forEach(input => updateInputState(input));

    });
});

const modalAuth = document.querySelector('.modal-auth');
const modalAuthContent = modalAuth.querySelector('.modal__content');
const btnCloseModalAuth = modalAuth.querySelector('.modal__form-close');
const formAuth = modalAuth.querySelector('.form_auth');
const btnOpenRegist = modalAuth.querySelector('.open_registration');



btnOpenRegist.addEventListener('click', () => {
    closeModalAuth();
    openmodalRegist();
})

modalAuth.addEventListener('click', (e) => {
    if (!modalAuthContent.contains(e.target)) {
        closeModalAuth()
    }
})

const btnAccountUser = document.querySelectorAll('.btn_account');
btnAccountUser.forEach(btn => {
    btn.addEventListener('click', ()=> {
        openModalAuth();
         headerMenu.classList.remove('open');
         btnMenu.classList.remove('active');
})
});

btnCloseModalAuth.addEventListener('click', closeModalAuth);

function openModalAuth() {
    modalAuth.classList.add('open');
    toggleScroll(false)
}
function closeModalAuth() {
    modalAuth.classList.remove('open');
    toggleScroll(true)
};

const authPass = '1234';
formAuth.addEventListener('submit', (e) => {
    e.preventDefault();
    let password = formAuth.querySelector('.form__input[type="password"]').value;
    if (password === authPass) {
        formAuth.querySelector('.label_password').classList.remove('error');
        document.querySelector('.header').classList.add('auth')
        closeModalAuth()
    } else {
        formAuth.querySelector('.label_password').classList.add('error')
    }
})

const modalRegist = document.querySelector('.modal-regist');
const modalRegistContent = modalRegist.querySelector('.modal__content');
const btnClosemodalRegist = modalRegist.querySelector('.modal__form-close');
const formRegist = modalRegist.querySelector('.form_regist');
const btnOpenAuth = modalRegist.querySelector('.open_auth');



btnOpenAuth.addEventListener('click', () => {
    closemodalRegist();
    openModalAuth();
})

modalRegist.addEventListener('click', (e) => {
    if (!modalRegistContent.contains(e.target)) {
        closemodalRegist()
    }
})



btnClosemodalRegist.addEventListener('click', closemodalRegist);

function openmodalRegist() {
    modalRegist.classList.add('open');
    toggleScroll(false)
}
function closemodalRegist() {
    modalRegist.classList.remove('open');
    toggleScroll(true)
};


modalRegist.addEventListener('submit', (e) => {
    e.preventDefault();
    closemodalRegist();
    openmodalAlert();
    document.querySelector('.header').classList.add('auth');


});

const modalAlert = document.querySelector('.modal-alert');
const btnClosemodalAlert = modalAlert.querySelector('.modal__form-close');
const modalAlertContent = modalAlert.querySelector('.modal__content');

btnClosemodalAlert.addEventListener('click', closemodalAlert);

modalAlert.addEventListener('click', (e) => {
    if (!modalAlertContent.contains(e.target)) {
        closemodalAlert();
         
    }
})

function openmodalAlert() {
    modalAlert.classList.add('open');
    toggleScroll(false)
}
function closemodalAlert() {
    modalAlert.classList.remove('open');
    toggleScroll(true);
};