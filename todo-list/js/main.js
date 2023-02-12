import { Note } from "./Notes.js"

let id = 0

document.getElementById('add-btn').addEventListener('click', () => {
  const newNote = new Note(document.querySelector('.list'), prompt('What do you want to do?'))
  newNote.id = id+1
  newNote.setCookie()
  id++
})

document.addEventListener("DOMContentLoaded", getNotesFromCookie());

function getNotesFromCookie() {
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
      console.log(cDone)
      console.log(typeof(cDone))

      const newNote = new Note(document.querySelector('.list'), cName, bDone, cId)
      id++
    }
  })
}

