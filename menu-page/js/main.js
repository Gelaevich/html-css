const buttons = document.querySelectorAll('.btn');
const mealAPI = 'https://63c42e89a9085635753321cb.mockapi.io/Food';
const cardBox = document.getElementById('card-box')

function removeElementsByClass(className){
  const elements = document.getElementsByClassName(className);
  while(elements.length > 0){
      elements[0].parentNode.removeChild(elements[0]);
  }
}

function insertCard(where, res){
  return where.insertAdjacentHTML(
      'beforeend',
  `<div class="card">
    <div class="card__img">
        <img src="${res.image}" alt="${res.Title}">
    </div>
  <div class="card__content">
    <div class="card__heading">
        <h3 class="card__title">${res.Title}</h3>
        <h3 class="card__price">${res.Price}</h3>
      </div>
        <p class="card__text">${res.Text}</p>
    </div>  
  </div>`);
}

const handleClick = (event) => {
  const btnCategory = event.currentTarget.dataset.category;

  removeElementsByClass('card'); // Remove old cards, before get new ones

  fetch(mealAPI)
  .then(response => {
    if (response.ok){
      return response.json();
    } else {
      console.log("Error");
      throw Error;
    }
  })
  .then(meal => {
    meal.forEach(meal => {
      if (meal.Category === btnCategory) {
        insertCard(cardBox, meal);
      } else if (btnCategory === "All") {
        insertCard(cardBox, meal);
      }
    })
  })
} 

buttons.forEach(button => {
  button.addEventListener('click', handleClick)
});

