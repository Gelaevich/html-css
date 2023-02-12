const now = new Date();

const noteDay = document.querySelector('.day'),
      noteMonth = document.querySelector('.month'),
      noteYear = document.querySelector('.year'),
      noteWeek = document.querySelector('.day-of-the-week')

const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

noteDay.innerHTML = now.toString().slice(7, 10)
noteMonth.innerHTML = now.toString().slice(3, 7)
noteYear.innerHTML = now.getFullYear()
noteWeek.innerHTML = weekday[now.getDay()]