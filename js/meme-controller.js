'use-strict';

var gElCanvas;
var gCtx;
var gStartPos;
var gDx;
var gDy;
const gTouchEvs = ['touchstart', 'touchmove', 'touchend'];

function onInitMeme() {
  gElCanvas = document.querySelector('canvas');
  const imgId = getImgId();
  const src = `img/${imgId + 1}.jpg`;
  gElCanvas.style.background = `url(${src})`;
  gElCanvas.style.backgroundRepeat = 'no-repeat';
  gElCanvas.style.backgroundSize = 'cover';
  gCtx = gElCanvas.getContext('2d');
  addListeners();
  resizeCanvas();
  renderMeme();
}

function renderMeme() {
  const meme = getMeme();
  clearCanvas();
  if (!meme.lines.length) return;
  meme.lines.forEach(function (line, idx) {
    const { lines } = meme;
    const { txt, size, color, font, id } = lines[idx];
    drawText(txt, size, color, font, id);
  });
}

function drawText(txt, size, color, font, id) {
  font = strToFirstUpperCase(font);
  gCtx.font = `${size}px ${font}`;
  const length = gCtx.measureText(txt).width;
  setLineCornerCoords(id, length, size);
  var startPos = getLineCornerCoords(id);
  focusOnLine(id);
  gCtx.fillStyle = `${color}`;
  gCtx.fillText(txt, startPos.xStart, startPos.yStart + size);
  gCtx.lineWidth = size / 30;
  gCtx.strokeStyle = 'black';
  gCtx.strokeText(txt, startPos.xStart, startPos.yStart + size);
}

function focusOnLine(id) {
  if (id !== getSelectedLineId()) {
    return;
  }
  const lineLength = getLineLength(id);
  const lineHeight = getLineHeight(id);
  const { xStart, yStart } = getLineCornerCoords(id);
  drawRect(xStart, yStart, lineLength, lineHeight);
}

function drawRect(xStart, yStart, lineLength, lineHeight) {
  gCtx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  gCtx.fillRect(xStart, yStart, lineLength + 20, lineHeight + 20);
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
  if (!_getNumOfLines()) return;
  if (getSelectedLineId() === null) return;
  setLineSize(diff);
  renderMeme();
}

function onAddLine() {
  addLine();
  renderMeme();
}

function onDeleteLine() {
  if (!_getNumOfLines()) return;
  if (getSelectedLineId() === null) return;
  deleteLine();
  renderMeme();
}

function onUpdateFontFamily(fontFamily) {
  if (!_getNumOfLines()) return;
  if (getSelectedLineId() === null) return;
  setFontFamily(fontFamily);
  renderMeme();
}

function onUpdateColorInstant() {
  if (!_getNumOfLines()) return;
  if (getSelectedLineId() === null) return;
  setLineColor(event.target.value);
  renderMeme();
}
function onUpdateTxtInstant(event) {
  if (!_getNumOfLines()) return;
  if (getSelectedLineId() === null) return;
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

/*******************LISTENERS**************************************************/

function addListeners() {
  addMouseListeners();
  addTouchListeners();
}
function addMouseListeners() {
  gElCanvas.addEventListener('dblclick', onFocus);
  gElCanvas.addEventListener('mousemove', onMove);
  gElCanvas.addEventListener('mousedown', onDown);
  gElCanvas.addEventListener('mouseup', onUp);
  gElCanvas.addEventListener('mouseout', onUp);
}

function addTouchListeners() {
  gElCanvas.addEventListener('touchmove', onMove);
  gElCanvas.addEventListener('touchstart', onDown);
  gElCanvas.addEventListener('touchend', onUp);
}

function onFocus(ev) {
  ev.preventDefault();
  const pos = getEvPos(ev);
  if (!_getNumOfLines()) return;
  setFocus(pos);
  renderMeme();
}

function onDown(ev) {
  const pos = getEvPos(ev);
  const line = getLineClicked(pos);
  if (!line) return;
  setLineDrag(line);
  gStartPos = pos;
  document.body.style.cursor = 'grabbing';
}

function onMove(ev) {
  if (!_getNumOfLines()) return;
  const line = getDragLine();
  if (!line) return;
  document.body.style.cursor = 'grabbing';
  const pos = getEvPos(ev);
  dx = pos.x - gStartPos.x;
  dy = pos.y - gStartPos.y;
  moveLine(line, dx, dy);
  gStartPos = pos;
  renderMeme();
}

function onUp() {
  setLineDrag(null);
  document.body.style.cursor = 'default';
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
