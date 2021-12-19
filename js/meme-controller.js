'use-strict';

var gElCanvas;
var gCtx;
var gStartPos;
var gDx;
var gDy;
var gIsAlreadyInitMeme;
const gTouchEvs = ['touchstart', 'touchmove', 'touchend'];

function onInitMeme() {
  gElCanvas = document.querySelector('canvas');
  gCtx = gElCanvas.getContext('2d');
  addListeners();
  resizeCanvas();
  setCanvasSize(gElCanvas.width, gElCanvas.height);
  renderEmojis();
  renderMeme();
}

function renderEmojis() {
  const emojisMat = getEmojis();
  const elEmoji = document.querySelector('.emoji-container');
  var strHtml = `<table>`;
  for (var i = 0; i < emojisMat.length; i++) {
    strHtml += `<tr>`;
    for (var j = 0; j < emojisMat[0].length; j++) {
      strHtml += `<td><button onclick="onAddEmoji(${i},${j})" class="emoji-${i}-${j}">${emojisMat[i][j]}</button></td>`;
    }
    `</tr>`;
  }

  strHtml += `</table>`;
  elEmoji.innerHTML = strHtml;
}

function renderMeme() {
  const meme = getMeme();
  clearCanvas();
  drawOnCanvas(meme);
}

function drawOnCanvas(meme) {
  const imgId = meme.selectedImgId;
  var img = new Image();
  img.src = `img/${imgId + 1}.jpg`;
  // img.onload = () => {
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
    if (!meme.lines.length) return;
    meme.lines.forEach(function (line, idx) {
      const { lines } = meme;
      const { txt, size, color, font, id } = lines[idx];
      drawText(txt, size, color, font, id);
    });
  // };
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
  gCtx.fillRect(xStart, yStart, lineLength + 10, lineHeight + 10);
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

function onTxtAlign(align) {
  if (!_getNumOfLines()) return;
  if (getSelectedLineId() === null) return;
  setLineCoordByAlign(align);
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

function onAddEmoji(i, j) {
  if (!_getNumOfLines()) return;
  if (getSelectedLineId() === null) return;
  const emojisMat = getEmojis();
  const emoji = emojisMat[i][j];
  setLineTxt(emoji);
  renderMeme();
}

function updateTxtBox() {
  const id = getSelectedLineId();
  const elTxtBox = document.querySelector('#text-input');
  if (!_getNumOfLines() || id === null) {
    elTxtBox.value = '';
    return;
  }
  const line = getLineById(id);
  elTxtBox.value = line.txt;
}

/*******************GENERAL**************************************************/

function resizeCanvas() {
  const bodyWidth = document.body.offsetWidth;
  const elConfig = document.querySelector('.configuration');
  if (bodyWidth <= 780) {
    size = 300;
  } else if (bodyWidth <= 980) {
    size = 500;
  } else {
    size = 600;
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
  window.addEventListener('resize', () => {
    resizeCanvas();
    renderMeme();
  });
}
function addMouseListeners() {
  gElCanvas.removeEventListener('dblclick', onFocus);
  gElCanvas.removeEventListener('mousemove', onMove);
  gElCanvas.removeEventListener('mousedown', onDown);
  gElCanvas.removeEventListener('mouseup', onUp);
  gElCanvas.removeEventListener('mouseout', onUp);
  gElCanvas.addEventListener('dblclick', onFocus);
  gElCanvas.addEventListener('mousemove', onMove);
  gElCanvas.addEventListener('mousedown', onDown);
  gElCanvas.addEventListener('mouseup', onUp);
  gElCanvas.addEventListener('mouseout', onUp);
}

function addTouchListeners() {
  gElCanvas.removeEventListener('touchmove', onMove);
  gElCanvas.removeEventListener('touchstart', onDown);
  gElCanvas.removeEventListener('touchend', onUp);
  gElCanvas.addEventListener('touchmove', onMove);
  gElCanvas.addEventListener('touchstart', onDown);
  gElCanvas.addEventListener('touchend', onUp);
}

function onFocus(ev) {
  ev.preventDefault();
  const pos = getEvPos(ev);
  if (!_getNumOfLines()) return;
  setFocus(pos);
  updateTxtBox();
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
