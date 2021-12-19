'use-strict';
function onInitGallery() {
  renderGallery();
  renderKeywords();
}

function renderGallery() {
  const images = getImages();

  strHtml = images
    .map(
      (img, idx) =>
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
      keywordToDisplay = strToFirstUpperCase(keyword);

      return `<a class="clean-link"  href=# onclick="onUpdateKeyMap(this.dataset)" data-keyword="${keyword}"> ${keywordToDisplay}</a>`;
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
  setFilterBy(ev.target.value);
  renderGallery();
}

function moveToSection(classToShow, classToHide) {
  const elSectionToShow = document.querySelector(`.${classToShow}`);
  elSectionToShow.classList.remove('hidden');
  const elSectionToHide = document.querySelector(`.${classToHide}`);
  elSectionToHide.classList.add('hidden');
  if (classToShow === 'meme-editor') onInitMeme();
}

function onUpdateKeyMap(data) {
  selectedKeyword = data.keyword;

  setKeywordMap(selectedKeyword);
  setFilterBy(selectedKeyword);
  setFontSizeOfKeyword();
  renderGallery();
}
function setFontSizeOfKeyword() {
  const keywordMap = getKeywordsMap();
  var sum = 0;
  for (var key in keywordMap) {
    sum += keywordMap[key];
  }
  const elKeywords = document.querySelectorAll('[data-keyword]');
  var count = 0;
  for (var key in keywordMap) {
    const ratio = keywordMap[key] / sum;
    var fontSize = ratio * 5;
    if (fontSize > 2) fontSize = 2;
    else if (fontSize < 0.75) fontSize = 0.75;
    elKeyword = elKeywords[count];
    elKeyword.style.fontSize = fontSize + 'em';
    count++;
  }
}
