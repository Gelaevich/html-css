//*********************
//Theme Switcher: Start
//*********************

const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');

function switchTheme(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark'); 
  }
  else {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light'); 
  }    
}

toggleSwitch.addEventListener('change', switchTheme, false);

const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);

    if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
    }
}

//*********************
//Theme Switcher: End
//*********************

//************************
//List of Countries: Start
//************************

const cardBox = document.querySelector('.card-box');
const searchInput = document.querySelector('.search-container input[type="search"]');
const regionSelect = document.querySelector('.search-container select');
const limit = 12; // количество стран на странице
let currentPage = 1; // текущая страница

async function getListOfCountries() {
  const start = (currentPage - 1) * limit;
  const end = start + limit;

  let url = 'https://restcountries.com/v3.1/all';
  if (searchInput.value) {
    url = `https://restcountries.com/v3.1/name/${searchInput.value}`;
  } else if (regionSelect.value) {
    url = `https://restcountries.com/v3.1/region/${regionSelect.value}`;
  }

  let res = []
  let res2 = []

  try {
    const ft = await fetch(`${url}`);
    const data = await ft.json();
    res2 = data
    // console.log(data); 
    res = data.slice(start, end); // Изменяем результат, чтобы в него попадали только страны на текущей странице
  } catch (error) {
    console.error(error);
  }


  // проверяем, что res имеет значение перед использованием
  if (res && res.length) {
    // очищаем содержимое контейнера
    cardBox.innerHTML = '';

    for (let i = 0; i < res.length; i++) {
      const name = res[i].name.common;
      const pop = res[i].population;
      const reg = res[i].region;
      const cap = res[i].capital ? res[i].capital[0] : 'N/A';

      cardBox.insertAdjacentHTML(
        'beforeend',
        `<div class="card">
          <img src="${res[i].flags.png}" alt="flag" class="flag">
          <div class="card-content">
            <h3 class="card-title">${name}</h3>
            <p class="card-text"><b>Population: </b>${pop}</p>
            <p class="card-text"><b>Region: </b>${reg}</p>
            <p class="card-text"><b>Capital: </b>${cap}</p>
          </div>
        </div>`
      )
    }

    // отображение пагинации
    const totalPages = Math.ceil(res2.length / limit);
    // console.log(totalPages)
    const pagination = document.createElement('div');
    pagination.classList.add('pagination');

    for (let i = 1; i <= totalPages; i++) {
      const button = document.createElement('button');
      button.innerText = i;
      if (i === currentPage) {
        button.classList.add('active');
      } else {
        button.addEventListener('click', () => {
          currentPage = i;
          getListOfCountries();
        });
      }
      pagination.appendChild(button);
    }

    cardBox.appendChild(pagination);
  }
}

// обработчики событий для поисковой строки и селекта регионов
searchInput.addEventListener('input', () => {
  currentPage = 1;
  getListOfCountries();
});

regionSelect.addEventListener('change', () => {
  currentPage = 1;
  getListOfCountries();
});

getListOfCountries();
