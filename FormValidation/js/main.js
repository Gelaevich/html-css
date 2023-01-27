

document.addEventListener('DOMContentLoaded', function() {
  let form = document.querySelector('.form')
  form.addEventListener('submit', formSend)

  async function formSend(e){
    e.preventDefault() // запрещаем стандартную отправку формы

    let error = formValidate(form)
    let passErr = passValidate(form)

    if (error !== 0) {
      alert("Заполните обязательные поля")
    } else if( passErr !== 0 ) {
      alert("Пароли не совпадают!")
    } else {
      let response = await fetch ({
        method: 'POST'
      })
      form.reset()
      alert("Форма отправлена!")
    }
  }

  function formValidate(form){
    let error = 0

    let formReq = document.querySelectorAll('._req')
    

    for (let i = 0; i < formReq.length; i++) {
      const input = formReq[i];
      forRemoveError(input)

      if(input.classList.contains('input-email')){
        if(emailTest(input) || input.value === ''){
          formAddError(input)
          error++
        }
      } else {
        if (input.value === '') {
          formAddError(input)
          error++
        }
      }
    }

    return error
  }

  function passValidate(form) {
    let passErr = 0
    let password = document.querySelector('.input-password'),
        cPassword = document.querySelector('.input-cPassword');
    let formPass = document.querySelectorAll('.input-cPassword')
    for (let j = 0; j < formPass.length; j++) {
      
      const input = formPass[j];
      forRemoveError(input)
    
      if (password.value !== cPassword.value){
        formAddError(input)
        passErr++
      }
      return passErr
    }
  }

  function formAddError(input) {
      input.classList.add('_invalid')
  }

  function forRemoveError(input) {
    input.classList.remove('_invalid')
  }

  function emailTest(input) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(input).toLowerCase());
  }
  
})


class FormValidation {
  required = false
  
  constructor(param){
    this.required = param.required
  }



}

class FnameValidation extends FormValidation {
  firstName = fname.value;

  constructor(param){
    super(param)
    this.firstName = param.firstName
  }

  isNameValid(firstName){
    if(firstName == 'k'){
      alert('ok')
    }
  }
}

const emailValidation = new FormValidation({
  // if (inputEmail.value == "") {
  //   alert("ok");
  // }
})
