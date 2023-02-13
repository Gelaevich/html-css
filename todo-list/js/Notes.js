export class Note {

  _name = ''
  _done = false
  

  constructor(container, name = '', done = false, id) {
    this.name = name
    this.done = done
    this.container = container
    this.id = id

    let template = `<div class="list-item" id="${id}">
                        <p class="item-text">${name}</p>
                        <div class="btn-box">
                          <a class="done"><i class="fa-check fa-solid"></i></a>
                          <a class="edit"><i class="fa-solid fa-pen"></i></a>
                          <a class="delete"><i class="fa-solid fa-ban"></i></a>
                        </div>
                      </div>`
    
    container.insertAdjacentHTML("beforeend", template)

    this.item = document.getElementById(`${id}`)
    this.nameParagraph = this.item.querySelector('.item-text')
    this.doneBtn = this.item.querySelector('.done')
    this.deleteBtn = this.item.querySelector('.delete')
    this.editButton = this.item.querySelector('.edit')

    this.doneBtn.addEventListener('click', () => {
      this.done = !this.done
      this.changeCookieDoneStatus()

      if(this.done){
        this.nameParagraph.classList.add('li-done')
        this.doneBtn.classList.add('done-active')
      } else {
        this.nameParagraph.classList.remove('li-done')
        this.doneBtn.classList.remove('done-active')
      }
    })

    this.deleteBtn.addEventListener('click', () => {
      if(confirm('Are you sure you want to delete this note?')){
        this.delete()
        this.removeCookie()
      }
    })

    this.editButton.addEventListener("click", () => {
      this.edit()
    });

  }

  set name(value){
    this._name = value
  }

  get name(){
    return this._name
  }

  edit() {
    const newName = prompt("Enter new name", this.name);
    if (newName.trim() == '') {
      alert('You should enter something')
    } else {
      if (newName) {
        this.name = newName.trim();
        this.nameParagraph.textContent = newName.trim();
        this.changeCookieName(newName);
      }
    }
  }

  delete(){
    this.item.remove()
  }

  checkDone(){
    if(this.done){
        this.nameParagraph.classList.add('li-done')
        this.doneBtn.classList.add('done-active')
      } else {
        this.nameParagraph.classList.remove('li-done')
        this.doneBtn.classList.remove('done-active')
      }
  }

  changeCookieName(newName) {
    const name = this.id + "="
    const cDecoded = decodeURIComponent(document.cookie)
    const cArr = cDecoded.split('; ')
    let res
    cArr.forEach(val => {
      if (val.indexOf(name) === 0) res = val.substring(0);
    })

    document.cookie = this.id + '=' + newName + "done: " + this.done + '; expires=' + new Date(Date.now() + 86400e3) + '; path=/'
  }

  changeCookieDoneStatus() {
    const name = this.id + "="
    const cDecoded = decodeURIComponent(document.cookie)
    const cArr = cDecoded .split('; ')
    let res
    cArr.forEach(val => {
      if (val.indexOf(name) === 0) res = val.substring(0);
    })

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
  
}
