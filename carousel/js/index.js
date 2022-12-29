//Инициализируем слайдер
new Swiper(".image-slider", {
  // стрелки
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  //Навигация
  //Буллеты, текущее положение, прогрессбар
  pagination: {
    el: ".swiper-pagination",
    //буллеты
    clickable: true,
    // динамические буллеты
    dynamicBullets: true,
  },
  // скролл
  scrollbar: {
    el: ".swiper-scrollbar",
    draggable: true,
  },
});
