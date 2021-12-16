'use-strict';

function onInitGallery() {
  renderGallery();
}

function renderGallery() {
  const images = getImages();

  strHtml = images
    .map(
      (img, idx) =>
        `<div onclick= "onImgSelect(${idx})" class="item item1"><img src="img/${
          idx + 1
        }.jpg"></div>\n`
    )
    .join('');
  const elImgGrid = document.querySelector('.grid-container');
  elImgGrid.innerHTML = strHtml;
}

function onImgSelect(id) {
  setImgId(id);
  moveToSection('meme-editor', 'about', 'gallery');
  console.log('d');
  onInitMeme();
}

function moveToSection(classToShow, classToHide1, classToHide2) {
  const elSectionToShow = document.querySelector(`.${classToShow}`);
  elSectionToShow.classList.remove('hidden');
  var elSectionToHide = document.querySelector(`.${classToHide1}`);
  elSectionToHide.classList.add('hidden');
  elSectionToHide = document.querySelector(`.${classToHide2}`);
  elSectionToHide.classList.add('hidden');
  if (classToShow === 'meme-editor') onInitMeme();
}
