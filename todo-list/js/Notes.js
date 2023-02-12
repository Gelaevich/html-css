export class Note {

  _name = ''
  _done = false
  

  constructor(container, name = '', done = false, id){
    this.item = document.createElement('div')
    this.btnGroup = document.createElement('div')
    this.nameParagraph = document.createElement('p')
    this.doneBtn = document.createElement('a')
    this.doneBtnIcon = document.createElement('i')
    this.deleteBtn = document.createElement('a')
    this.deleteBtnIcon = document.createElement('i')

    this.item.classList.add('list-item')
    this.btnGroup.classList.add('btn-box')
    this.nameParagraph.classList.add('item-text')
    this.doneBtn.classList.add('done')
    this.doneBtnIcon.classList.add('fa-solid', 'fa-check')
    this.deleteBtn.classList.add('delete')
    this.deleteBtnIcon.classList.add('fa-solid', 'fa-ban')

    this.doneBtn.addEventListener('click', () => {
      this.done = !this.done
      this.changeCookieDoneStatus()
      console.log(document.cookie)
    })

    this.deleteBtn.addEventListener('click', () => {
      if(confirm('Are you sure you want to delete this note?')){
        this.delete()
        this.removeCookie()
        console.log(document.cookie)
      }
    })

    this.doneBtn.append(this.doneBtnIcon)
    this.deleteBtn.append(this.deleteBtnIcon)
    this.btnGroup.append(this.doneBtn)
    this.btnGroup.append(this.deleteBtn)
    this.item.append(this.nameParagraph)
    this.item.append(this.btnGroup)

    this.name = name
    this.done = done
    this.container = container
    this.id = id

    container.append(this.item)
  }

  set name(value){
    this._name = value
    this.nameParagraph.textContent = value
  }

  get name(){
    return this._name
  }

  set done(value){
    this._done = value

    if(value){
      this.nameParagraph.classList.add('li-done')
      this.doneBtn.classList.add('done-active')
      this.doneBtnIcon.classList.remove('fa-solid', 'fa-check') 
      this.doneBtnIcon.classList.add('fa-solid', 'fa-backward')  
    } else {
      this.nameParagraph.classList.remove('li-done')
      this.doneBtn.classList.remove('done-active')
      this.doneBtnIcon.classList.remove('fa-solid', 'fa-backward')
      this.doneBtnIcon.classList.add('fa-solid', 'fa-check') 
    }
  }

  get done(){
    return this._done
  }

  delete(){
    this.item.remove()
  }

  changeCookieDoneStatus() {
    const name = this.id + "="
    const cDecoded = decodeURIComponent(document.cookie)
    const cArr = cDecoded .split('; ')
    let res
    cArr.forEach(val => {
      if (val.indexOf(name) === 0) res = val.substring(0);
    })
    // console.log(res)

    const regex1 = 'done: false'
    const regex2 = 'done: true'

    if(res.includes('done: true')){
      document.cookie = this.id + '=' + this.name + " " + regex1 + '; expires=' + new Date(Date.now() + 86400e3) + '; path=/'
    } else {
      document.cookie = this.id + '=' + this.name + " " + regex2 + '; expires=' + new Date(Date.now() + 86400e3) + '; path=/'
    }
  }

  setCookie() {
    let date = new Date(Date.now() + 86400e3)
    date = date.toUTCString();
    let expires = '; expires=' + date

    document.cookie = this.id + '=' + this.name + " " + "done: " + this.done + expires + '; path=/'
  }

 
  removeCookie() {
    document.cookie = this.id + '=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
  }
  

  // static add() {
  //   id++
  //   const newNote = new Note(document.querySelector('.list'), prompt('What do you want to do?'), false)
  //   Note.id = id
  //   console.log(newNote)
  // }

  // static setId(){
  //   id++
  // }

  // static getId(){
  //   return this.id
  // }
}
