let form = document.querySelector('.form')
const formElement = document.getElementById('form1')
formElement.addEventListener('submit', (e) => {
  e.preventDefault()
  const formData = new FormData(formElement)

  const user = new User(formData)
  
  // console.log(user.hi())
  let err = user.isReq()
  let passErr = user.passValidate()
  let emailVal = user.emailTest(user.email)

  if (err !== 0) {
      alert("Заполните обязательные поля")
    } else if(!emailVal){
      alert("Электронная почта не является корректной")
    } else if( passErr !== 0 ) {
       alert("Пароли не совпадают!")
    } else {
       form.reset()
       alert("Форма отправлена!")
    }

})


class User {
  constructor(param){
    this.fname = param.get('fname')
    this.email = param.get('email')
    this.pass = param.get('pwd')
    this.cpass = param.get('cpwd')
  }

  hi(){
    console.log(this.fname + " hi")
  }

  formAddError(input) {
    input.classList.add('_invalid')
  }

  formRemoveError(input) {
    input.classList.remove('_invalid')
  }

  isReq(){
    let error = 0
    let formReq = document.querySelectorAll('._req')
    
    for (let i = 0; i < formReq.length; i++) {
      const input = formReq[i];
      this.formRemoveError(input);
        if (input.value === '') {
          this.formAddError(input)
          error++
        }
      }
    return error  
  }

  emailTest(input) {
    let re = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/,
        e = document.querySelector('.input-email');

      e.classList.remove('_invalid');
      if (!re.test(String(input))){
        e.classList.add('_invalid')
      }

    return re.test(String(input).toLowerCase());

  }

  passValidate(form) {
    let passErr = 0,
        password = document.querySelector('.input-password'),
        cPassword = document.querySelector('.input-cPassword'),
        formPass = document.querySelectorAll('.pass')
    for (let j = 0; j < formPass.length; j++) {
      
      const input = formPass[j];
      this.formRemoveError(input)
    
      if (password.value !== cPassword.value){
        this.formAddError(input)
        passErr++
      }
      return passErr
    }
  }
}