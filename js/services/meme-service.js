'use-strict';
const NUM_OF_IMG = 18;
var gCurrImgId;
var gCurrImgId = getRandomIntInclusive(0, 17);
var gCanvasSize = { width: null, height: null };
var gKeywords = ['funny', 'sad', 'sport', 'movie', 'politics'];
var gSortBy = '';
var gImgs = [];
_createImgs();

var gMeme = {
  selectedImgId: 17,
  selectedLineIdx: null,
  rectCoords: { xStart: null, yStart: null, xEnd: null, yEnd: null },
  lines: [],
};

function setSortBy(sortBy) {
  gSortBy = sortBy;
}

function getKeywords() {
  return gKeywords;
}

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
    keywords: ['sport'],
  };
  img.keywords = getRandomKeywords();
  return img;
}

function getRandomKeywords() {
  var keywords = [...gKeywords];
  var NewKeywords = [];
  for (var i = 0; i < 3; i++) {
    var radomInt = getRandomIntInclusive(0, keywords.length - 1);
    var keyword = keywords[radomInt];
    NewKeywords.push(keyword);
    keywords.splice(radomInt, 1);
  }
  return NewKeywords;
}

function getNumOfLines() {
  return gMeme.lines.length;
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
  const sortedImgs = gImgs.filter((img) => isKeywordIn(img));
  return sortedImgs;
}

function isKeywordIn(img) {
  var sortKey = gSortBy.toLowerCase();
  var isInclude = false;
  img.keywords.forEach(function (keyword) {
    if (keyword.includes(sortKey)) isInclude = true;
  });
  return isInclude;
}

function setLineIdx() {
  const numOfLines = gMeme.lines.length;
  const lineIdx = gMeme.selectedLineIdx;
  if (lineIdx === numOfLines - 1 || lineIdx === null) {
    gMeme.selectedLineIdx = 0;
    return;
  }
  gMeme.selectedLineIdx++;
}

function setRemoveFocus() {
  gMeme.selectedLineIdx = null;
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
  const { lineLength, heightIdx, align, cornerCoord, size } = gMeme.lines[idx];
  const canvasWidth = gCanvasSize.width;
  const canvasHeight = gCanvasSize.height;
  const margin = 20;

  switch (align) {
    case 'left':
      gMeme.rectCoords.xStart = cornerCoord.xStart;
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
      gMeme.rectCoords.yStart = canvasHeight - size - margin;
      break;
    case 2:
      gMeme.rectCoords.yStart = canvasHeight / 2 - size / 2 - margin / 3;
      break;
  }

  return gMeme.rectCoords;
}

function setLineLength(lineLength) {
  if (gMeme.selectedLineIdx === null) return;
  gMeme.lines[gMeme.selectedLineIdx].lineLength = lineLength;
}

function getLineLength(idx) {
  return gMeme.lines[idx].lineLength;
}

function getLineCornerCoords(idx) {
  return gMeme.lines[idx].cornerCoord;
}

function setLineCornerCoords(idx, align, size) {
  const { lineLength, heightIdx } = gMeme.lines[idx];
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
