const buttons = document.querySelectorAll('.btn');
const mealAPI = 'https://63c42e89a9085635753321cb.mockapi.io/Food';
const cardBox = document.getElementById('card-box')

function removeElementsByClass(className){
  const elements = document.getElementsByClassName(className);
  while(elements.length > 0){
      elements[0].parentNode.removeChild(elements[0]);
  }
}


function createCard(res){
    return text =
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
  </div>`;
}

async function fetchFoodJSON(){
  const response = await fetch(mealAPI);
  const food = await response.json();
  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }
  return food;
}


const handleClick = (event) => {
  const btnCategory = event.currentTarget.dataset.category;
  let insertTxt = '';

  removeElementsByClass('card'); // Remove old cards, before get new ones
  
  fetchFoodJSON()
  .then(food => {
    food.forEach(food =>{
      if (food.Category === btnCategory) {
        insertTxt += createCard(food);
      } else if (btnCategory === "All") {
        insertTxt += createCard(food);
      }
    })
    cardBox.insertAdjacentHTML('beforeend',insertTxt);
  })
} 

buttons.forEach(button => {
  button.addEventListener('click', handleClick)
});

