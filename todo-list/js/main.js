import { Note } from "./Notes.js"

let id = 0

document.getElementById('add-btn').addEventListener('click', () => {
  let newId = id
    while (document.getElementById(`${newId}`)) {
    newId++
  }
  id = newId
  let getName = prompt('What do you want to do?').trim()
  if(getName.length == 0) return alert('You should enter something')
  const newNote = new Note(document.querySelector('.list'), getName, false, id)
  newNote.setCookie()
})

document.addEventListener("DOMContentLoaded", getNotesFromCookie());

function getNotesFromCookie()  {
  let cId = 0
  let cName = ''

  const cDecoded = decodeURIComponent(document.cookie)
  const cArr = cDecoded .split('; ')
  
  cArr.forEach(val => {
    if (cArr == '') {
      return
    } else {
      let idLength = val.indexOf('=')
      cId = val.slice(0, idLength)
  
      let nameLength = val.indexOf('done: ')
      cName = val.slice(idLength+1, nameLength)
  
      let cDone = val.slice(nameLength + 6, val.length)
      let bDone = (cDone === 'true')
  
      const note = new Note(document.querySelector('.list'), cName, bDone, cId)
      note.checkDone()
      id++
    }
  })
}
