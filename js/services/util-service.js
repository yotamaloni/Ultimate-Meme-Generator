'use strict';

function toggleMenu() {
  document.body.classList.toggle('menu-open');
}


function strToFirstUpperCase(str) {
  const firstLetter = str.charAt(0).toUpperCase();
  return firstLetter + str.slice(1, str.length);
}



function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}
