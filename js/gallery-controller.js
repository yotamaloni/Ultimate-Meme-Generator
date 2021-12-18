'use-strict';

function onInitGallery() {
  renderGallery();
  renderKeywords();
}

function renderGallery() {
  const images = getImages();
  console.log('images', images);

  strHtml = images
    .map(
      (img) =>
        `<div onclick= "onImgSelect(${
          img.id
        })" class="item item1"><img src="img/${img.id + 1}.jpg"></div>\n`
    )
    .join('');
  const elImgGrid = document.querySelector('.grid-container');
  elImgGrid.innerHTML = strHtml;
}

function renderKeywords() {
  var keywords = getKeywords();
  strHtml = keywords
    .map((keyword) => {
      keyword = strToFirstUpperCase(keyword);
      return keyword;
    })
    .join(' , ');
  const elImgGrid = document.querySelector('.keywords');
  elImgGrid.innerHTML = strHtml;
}

function onImgSelect(id) {
  setImgId(id);
  moveToSection('meme-editor', 'gallery');
}

function onSort(ev) {
  setSortBy(ev.target.value);
  renderGallery();
}

function moveToSection(classToShow, classToHide) {
  const elSectionToShow = document.querySelector(`.${classToShow}`);
  elSectionToShow.classList.remove('hidden');
  const elSectionToHide = document.querySelector(`.${classToHide}`);
  elSectionToHide.classList.add('hidden');
  if (classToShow === 'meme-editor') onInitMeme();
}
