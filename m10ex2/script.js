const btn = document.querySelector('.btn_cool');
let myWidth;
  let myHeight;


btn.addEventListener('click', () =>
{
  myWidth = window.screen.width;
  myHeight = window.screen.height;
  alert(`Параметры вашего экрана: 
  Ширина - ${myWidth} px, 
  Высота - ${myHeight} px.`);

  
})