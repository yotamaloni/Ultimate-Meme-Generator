'use-strict';

var gElCanvas;
var gCtx;
var gStartPos;
const gTouchEvs = ['touchstart', 'touchmove', 'touchend'];

function onInitMeme() {
  gElCanvas = document.querySelector('canvas');
  gCtx = gElCanvas.getContext('2d');
  addListeners();
  resizeCanvas();
  renderMeme();
}

function renderMeme() {
  const meme = getMeme();
  clearCanvas();
  drawImgFromLocal(meme.selectedImgId);
  if (!meme.lines.length) return;
  meme.lines.forEach(function (line, idx) {
    const { lines } = meme;
    const { txt, size, align, color, font } = lines[idx];
    setTimeout(function () {
      drawText(txt, size, align, color, font, idx);
    }, 50);
  });
}

function drawText(txt, size, align, color, font, lineIdx) {
  setLineCornerCoords(lineIdx, align, size);
  var startPos = getLineCornerCoords(lineIdx);
  font = strToFirstUpperCase(font);
  gCtx.font = `${size}px ${font}`;
  gCtx.textAlign = `${align}`;
  setLineLength(gCtx.measureText(txt).width);
  focusOnLine(lineIdx);
  gCtx.fillStyle = `${color}`;
  gCtx.fillText(txt, startPos.xStart, startPos.yStart + size);
  gCtx.lineWidth = size / 30;
  gCtx.strokeStyle = 'black';
  gCtx.strokeText(txt, startPos.xStart, startPos.yStart + size);
}

function focusOnLine(idx) {
  if (idx !== getLineIdx()) {
    return;
  }
  const { xStart, yStart } = getRectCoords();
  lingLength = getLineLength(idx);
  lineSize = getLineSize();
  drawRect(xStart, yStart, lingLength + 10, lineSize + 20);
}

function drawRect(xStart, yStart, lineLength, lineHeight) {
  gCtx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  gCtx.fillRect(xStart, yStart, lineLength, lineHeight);
}

function drawImgFromLocal(imgId) {
  var img = new Image();
  img.src = `img/${imgId + 1}.jpg`;
  img.onload = () => {
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
  };
}

/*******************ON-ACTIONS**************************************************/

function onUpdateSize(event, elSize, diff) {
  if (!getNumOfLines()) return;
  if (getLineIdx() === null) return;
  setLineSize(diff);
  renderMeme();
}

function onSwitchLine() {
  if (!getNumOfLines()) return;
  setLineIdx();
  renderMeme();
}

function onRemoveFocus(event) {
  event.preventDefault();
  if (!getNumOfLines()) return;
  setRemoveFocus();
  renderMeme();
}

function onAddLine() {
  if (getNumOfLines() === 3) return;
  addLine();
  renderMeme();
}

function onDeleteLine() {
  if (!getNumOfLines()) return;
  if (getLineIdx() === null) return;
  deleteLine();
  renderMeme();
}

function onUpdateFontFamily(fontFamily) {
  if (!getNumOfLines()) return;
  if (getLineIdx() === null) return;
  setFontFamily(fontFamily);
  renderMeme();
}

function onTxtAlign(align) {
  if (!getNumOfLines()) return;
  if (getLineIdx() === null) return;
  setTxtAlign(align);
  renderMeme();
}

function onUpdateColorInstant() {
  if (!getNumOfLines()) return;
  if (getLineIdx() === null) return;
  setLineColor(event.target.value);
  renderMeme();
}
function onUpdateTxtInstant(event) {
  if (!getNumOfLines()) return;
  if (getLineIdx() === null) return;
  setLineTxt(event.target.value);

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
  }
  gElCanvas.height = size;
  gElCanvas.width = gElCanvas.height;
  setCanvasSize(gElCanvas.width, gElCanvas.height);
}

function clearCanvas() {
  gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
}

function getEvPos(ev) {
  var pos = {
    x: ev.offsetX,
    y: ev.offsetY,
  };
  if (gTouchEvs.includes(ev.type)) {
    ev.preventDefault();
    ev = ev.changedTouches[0];
    pos = {
      x: ev.pageX - ev.target.offsetLeft,
      y: ev.pageY - ev.target.offsetTop,
    };
  }
  return pos;
}

/*******************UPLOAD DOWNLOAD**************************************************/

function onDownloadImg(elLink) {
  var imgContent = gElCanvas.toDataURL('image/jpeg');
  elLink.href = imgContent;
}

/*******************DRAG & DROP**************************************************/

function onMove(ev) {}
function onDown(ev) {
  const pos = getEvPos(ev);
  if (!isLineClicked(pos)) return;
}
function onUp(ev) {}

/*******************LISTENERS**************************************************/

function addListeners() {
  addMouseListeners();
  // addTouchListeners();
  // window.addEventListener('resize', () => {
  //   resizeCanvas();
  //   isLoadingImg = false;
  //   clearCanvas();
  //   renderMeme();
  // });
}
function addMouseListeners() {
  gElCanvas.addEventListener('dblclick', onRemoveFocus);
  // gElCanvas.addEventListener('mousemove', onMove);
  // gElCanvas.addEventListener('mousedown', onDown);
  // gElCanvas.addEventListener('mouseup', onUp);
}

// function addTouchListeners() {
//   gElCanvas.addEventListener('touchmove', onMove);
//   gElCanvas.addEventListener('touchstart', onDown);
//   gElCanvas.addEventListener('touchend', onUp);
// }
