'use-strict';

var gElCanvas;
var gCtx;
var gStartPos;
const gTouchEvs = ['touchstart', 'touchmove', 'touchend'];

function onInitMeme() {
  isLoadingImg = true;
  gElCanvas = document.querySelector('canvas');
  gCtx = gElCanvas.getContext('2d');
  addListeners();
  resizeCanvas();
  renderMeme();
}

function renderMeme() {
  const meme = getMeme();
  clearCanvas();
  meme.lines.forEach(function (line, idx) {
    const { lines } = meme;
    const { txt, size, align, color, font } = lines[idx];
    drawImgFromLocal(meme.selectedImgId);
    setTimeout(function () {
      drawText(txt, size, align, color, font, idx);
      focusOnLine();
    }, 50);
  });
}

function focusOnLine() {
  const lineIdx = getLineIdx();
  const lineSize = getLineSize();
  const startPos = getStartPos(undefined, lineIdx, lineSize, undefined);

  drawRect(0, startPos.y, gElCanvas.width, lineSize + 10);
}

function drawRect(xStart, yStart, xEnd, yEnd) {
  gCtx.beginPath();
  gCtx.rect(xStart, yStart, xEnd, yEnd);
  gCtx.stroke();
}

function drawImgFromLocal(imgId) {
  var img = new Image();
  img.src = `img/${imgId + 1}.jpg`;
  img.onload = () => {
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
  };
}

function drawText(txt, size, align, color, font, lineIdx) {
  const startPos = getStartPos(align, lineIdx, size);
  font = strToFirstUpperCase(font);
  gCtx.font = `${size}px ${font}`;
  gCtx.fillStyle = `${color}`;
  gCtx.strokeStyle = 'black';
  gCtx.textAlign = `${align}`;
  gCtx.fillText(txt, startPos.x, `${startPos.y + size}`);
  gCtx.lineWidth = size / 20;
  gCtx.strokeText(txt, startPos.x, `${startPos.y + size}`);
}

function getStartPos(align = 'center', lineIdx, size, margin = 10) {
  let startPoint = { x: null, y: null };
  switch (align) {
    case 'left':
      startPoint.x = 0 + 10;
      break;
    case 'right':
      startPoint.x = gElCanvas.width - margin;
      break;
    case 'center':
      startPoint.x = gElCanvas.width / 2;
      break;
  }
  switch (lineIdx) {
    case 0:
      startPoint.y = 0 + margin;
      break;
    case 1:
      startPoint.y = gElCanvas.height - size - margin;
      break;
    case 2:
      startPoint.y = gElCanvas.height / 2;
      break;
  }

  return startPoint;
}

/*******************LISTENERS**************************************************/

function addListeners() {
  // addMouseListeners();
  // addTouchListeners();
  window.addEventListener('resize', () => {
    resizeCanvas();
    isLoadingImg = false;
    clearCanvas();
    renderMeme();
  });
}

/*******************ON-ACTIONS**************************************************/

function onUpdateColorInstant(event) {
  event.preventDefault();
  setLineColor(event.target.value);
  renderMeme();
}
function onUpdateTxtInstant(event) {
  event.preventDefault();
  setLineTxt(event.target.value);

  renderMeme();
}

function onUpdateSize(event, elSize, diff) {
  event.preventDefault();
  setLineSize(diff);
  elSize.closest('.config').querySelector('span').innerText =
    getLineSize() + ' px';

  renderMeme();
}

function onSwitchLine() {
  setLineIdx();
  renderMeme();
}

function onAddLine() {
  addLine();
  renderMeme();
}

function onDeleteLine() {
  deleteLine();
  renderMeme();
}

function onUpdateFontFamily(fontFamily) {
  setFontFamily(fontFamily);
  renderMeme();
}

function onTxtAlign(align) {
  setTxtAlign(align);
  renderMeme();
}

/*******************GENERAL**************************************************/

function resizeCanvas() {
  const elMain = document.querySelector('.main-editor');
  const elContainer = document.querySelector('.canvas-container');
  var size;
  if (elMain.offsetWidth <= 780) {
    size = 300;
    elContainer.offsetWidth = size;
    elContainer.offsetHeight = size;
  } else {
    size = Math.min(elContainer.offsetWidth, elContainer.offsetHeight);
    // size = elContainer.offsetWidth;
  }
  gElCanvas.height = size;
  gElCanvas.width = gElCanvas.height;
  // resizeConfigBoxContainer();
}

// function resizeConfigBoxContainer() {
//   const elMain = document.querySelector('.main-editor');
//   if (elMain.offsetWidth > 780) {
//     var size = gElCanvas.height;
//   } else {
//     var size = 300;
//   }

//   elMainConfig = document.querySelector('.configuration');
//   elMainConfig.style.height = size + 'px';
// }

function clearCanvas() {
  gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
}

/*******************UPLOAD DOWNLOAD**************************************************/

function onDownloadImg(elLink) {
  var imgContent = gElCanvas.toDataURL('image/jpeg');
  elLink.href = imgContent;
}
