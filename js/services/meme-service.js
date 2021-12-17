'use-strict';
const NUM_OF_IMG = 18;
var gCurrImgId;
var gCurrImgId = getRandomIntInclusive(0, 17);
var gCanvasSize = { width: null, height: null };
var gKeywordSearchCountMap = { funny: 12, cat: 16, baby: 2 };
var gImgs = [];
_createImgs();

var gMeme = {
  selectedImgId: 17,
  selectedLineIdx: null,
  rectCoords: { xStart: null, yStart: null, xEnd: null, yEnd: null },
  lines: [],
};

function setCanvasSize(width, height) {
  gCanvasSize = { width, height };
}

function getMeme() {
  return gMeme;
}

function _createImgs() {
  for (let i = 0; i < NUM_OF_IMG; i++) {
    gImgs.push(_createImg(i));
  }
}

function _createImg(id) {
  const img = {
    id,
    url: `img/${id + 1}.jpg`,
    keywords: ['funny', 'cat'],
  };
  return img;
}

function setLineColor(color) {
  gMeme.lines[gMeme.selectedLineIdx].color = color;
}

function setLineTxt(txt) {
  if (!gMeme.lines.length) return;
  gMeme.lines[gMeme.selectedLineIdx].txt = txt;
}

function setLineSize(diff) {
  gMeme.lines[gMeme.selectedLineIdx].size += diff;
}

function getLineSize() {
  return gMeme.lines[gMeme.selectedLineIdx].size;
}

function setImgId(id) {
  gMeme.selectedImgId = id;
}

function getImages() {
  return gImgs;
}

function setLineIdx() {
  const numOfLines = gMeme.lines.length;
  const lineIdx = gMeme.selectedLineIdx;
  if (lineIdx === numOfLines - 1) {
    gMeme.selectedLineIdx = 0;
    return;
  }
  gMeme.selectedLineIdx++;
}

function getLineIdx() {
  return gMeme.selectedLineIdx;
}

function addLine() {
  if (gMeme.lines.length === 3) return;
  gMeme.lines.push(_creatLine());
  gMeme.selectedLineIdx = gMeme.lines.length - 1;
}

function deleteLine() {
  if (!gMeme.lines.length) return;
  var selectedIdx = gMeme.selectedLineIdx;
  gMeme.lines.splice(gMeme.selectedLineIdx, 1);
  if (!gMeme.lines.length || gMeme.lines.length === 1) {
    gMeme.selectedLineIdx = 0;
    return;
  }
  selectedIdx = gMeme.lines[0].heightIdx;
  gMeme.selectedLineIdx = selectedIdx;
}

function setFontFamily(fontFamily) {
  const lineIdx = gMeme.selectedLineIdx;
  gMeme.lines[lineIdx].font = fontFamily;
}

function setTxtAlign(align) {
  const lineIdx = gMeme.selectedLineIdx;
  gMeme.lines[lineIdx].align = align;
}

function _creatLine() {
  const heightIdx = _getHeightIdx();
  const line = {
    txt: 'Text..',
    size: 50,
    align: 'center',
    color: '#FF0000',
    font: 'impact',
    lineLength: 103.369140625,
    cornerCoord: { xStart: null, yStart: null, xEnd: null, yEnd: null },
    heightIdx: heightIdx,
  };

  return line;
}

function _getHeightIdx() {
  var heightIdx = 0;
  if (gMeme.lines.length === 0) return heightIdx;
  for (var i = 0; i < 3; i++) {
    heightIdx = i;
    gMeme.lines.forEach(function (line) {
      if (i === line.heightIdx) {
        heightIdx = null;
      }
    });
    if (heightIdx !== null) return heightIdx;
  }
}

/******************************************************************************************** */

function getRectCoords() {
  const idx = gMeme.selectedLineIdx;
  const lineLength = gMeme.lines[idx].lineLength;
  const heightIdx = gMeme.lines[idx].heightIdx;
  const align = gMeme.lines[idx].align;
  const lineSize = gMeme.lines[idx].size;
  const txtCoords = gMeme.lines[idx].cornerCoord;
  const canvasWidth = gCanvasSize.width;
  const canvasHeight = gCanvasSize.height;
  const margin = 20;

  switch (align) {
    case 'left':
      gMeme.rectCoords.xStart = txtCoords.xStart;
      break;
    case 'right':
      gMeme.rectCoords.xStart = canvasWidth - lineLength - 10;
      break;
    case 'center':
      gMeme.rectCoords.xStart = canvasWidth / 2 - lineLength / 2;
      break;
  }
  switch (heightIdx) {
    case 0:
      gMeme.rectCoords.yStart = margin / 2;
      break;
    case 1:
      gMeme.rectCoords.yStart = canvasHeight - lineSize - margin;
      break;
    case 2:
      gMeme.rectCoords.yStart = canvasHeight / 2 - lineSize / 2 - margin / 3;
      break;
  }

  return gMeme.rectCoords;
}

function setLineLength(lineLength) {
  gMeme.lines[gMeme.selectedLineIdx].lineLength = lineLength;
}

function getLineLength(idx) {
  return gMeme.lines[idx].lineLength;
}

// function isLineClicked(pos) {
//   console.log('pos', pos);
// }

function getLineCornerCoords(idx) {
  return gMeme.lines[idx].cornerCoord;
}

function setLineCornerCoords(idx, align, size) {
  var lineLength = gMeme.lines[idx].lineLength;
  var heightIdx = gMeme.lines[idx].heightIdx;
  var borderCoord = {
    xStart: null,
    yStart: null,
    xEnd: null,
    yEnd: null,
  };
  const margin = 10;

  switch (heightIdx) {
    case 0:
      borderCoord.yStart = 0 + margin;
      break;
    case 1:
      borderCoord.yStart = gCanvasSize.height - size - 1.5 * margin;
      break;
      '';
    case 2:
      borderCoord.yStart = gCanvasSize.height / 2 - size / 2;
      break;
  }
  borderCoord.yEnd = borderCoord.yStart + size;

  switch (align) {
    case 'left':
      borderCoord.xStart = 0 + margin;
      break;
    case 'right':
      borderCoord.xStart = gCanvasSize.width - margin;
      break;
    case 'center':
      borderCoord.xStart = gCanvasSize.width / 2;
      break;
  }

  borderCoord.xEnd = borderCoord.xStart + lineLength;
  gMeme.lines[idx].cornerCoord = borderCoord;
}
