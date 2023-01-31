class Validation{
  constructor() {}

  isEmpty(value){
    return value.length ? false : true  
  }

  isEmail(value){
    return /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(String(value).toLowerCase());
  }

  isPassword(pass1, pass2 = null){
    if (pass1.length < 6) return false
    if (pass1 !== pass2) return false

    return true
  }
}

function formValidation() {
  const inputName = document.querySelector('#fname'),
        inputEmail = document.querySelector('#email'),
        inputPass1 = document.querySelector('#pwd'),
        inputPass2 = document.querySelector('#cpwd')

  const validation = new Validation()

  function formAddError(input) {
    input.classList.add('_invalid')
  }

  function formRemoveError(input) {
    input.classList.remove('_invalid')
  }

  formRemoveError(inputName)
  if (validation.isEmpty(inputName.value)) {
    formAddError(inputName)
  }

  formRemoveError(inputEmail)
  if (validation.isEmpty(inputEmail.value) || !validation.isEmail(inputEmail.value)) {
    formAddError(inputEmail)
  }
  
  formRemoveError(inputPass1)
  if (validation.isEmpty(inputPass1.value) || !validation.isPassword(inputPass1.value, inputPass2.value)) {
    formAddError(inputPass1)
  }
  
  formRemoveError(inputPass2)
  if (validation.isEmpty(inputPass2.value) || !validation.isPassword(inputPass1.value, inputPass2.value)) {
    formAddError(inputPass2)
  }

  if (validation.isEmpty(inputName.value)||
      validation.isEmpty(inputEmail.value)||
      validation.isEmpty(inputPass1.value)||
      validation.isEmpty(inputPass2.value)){
        alert('Заполните обязательные поля!')
  } else if (!validation.isEmail(inputEmail.value)){
    alert('Введите корректный Email адрес!')
  } else if (!validation.isPassword(inputPass1.value, inputPass2.value)){
    alert('Что-то с паролем!')
  } else {
    form.reset()
    alert('Отправлено!')
  }
}

const form = document.querySelector('.form')
form.addEventListener('submit', function(e){
  e.preventDefault()
})
form.addEventListener('submit', formValidation)

