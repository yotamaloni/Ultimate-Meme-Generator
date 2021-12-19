'use-strict';
const NUM_OF_IMG = 18;
var gCurrImgId;
var gCurrImgId = getRandomIntInclusive(0, 17);
var gCanvasSize = { width: null, height: null };
var gKeywords = ['all', 'funny', 'sad', 'sport', 'movie', 'politics'];
const EMOJIS = [
  ['😀', '😁', '🤩', '💥'],
  ['🌈', '🧑', '👿', '🤣'],
  ['🖖', '👀', '👨‍❤️‍💋‍👨', '👽'],
  ['🐣', '🍄', '🌍', '😰'],
];
var gKeywordMap = {};

var gFilterBy = '';
var gImgs = [];
var gNextId = 0;
_createImgs();
_createMapOfKey();

function _createMapOfKey() {
  gKeywords.forEach((keyword) => (gKeywordMap[keyword] = 1));
}

function setKeywordMap(keyToUpdate) {
  gKeywordMap[keyToUpdate]++;
}

function getKeywordsMap() {
  return gKeywordMap;
}

var gMeme = {
  selectedImgId: 17,
  selectedLineId: null,
  lines: [],
};

function getEmojis() {
  return EMOJIS;
}

function getImgId() {
  return gMeme.selectedImgId;
}

function setFilterBy(filterBy) {
  if (filterBy === 'all') filterBy = '';
  gFilterBy = filterBy;
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

function setLineCoordByAlign(align) {
  const line = getLineById(gMeme.selectedLineId);
  const lineLength = line.lineLength;
  const coord = line.cornerCoord;
  switch (align) {
    case 'left':
      coord.xStart = 0;
      break;
    case 'center':
      coord.xStart = gCanvasSize.width / 2 - lineLength / 2;
      break;
    case 'right':
      coord.xStart = gCanvasSize.width - lineLength;
      break;
  }
}

function _creatLine() {
  const line = {
    id: gNextId++,
    txt: 'Text..',
    size: 50,
    align: 'left',
    color: '#FF0000',
    font: 'impact',
    lineLength: 103.369140625,
    cornerCoord: { xStart: 0, yStart: 0, xEnd: 103.369140625, yEnd: 50 },
    isDrag: false,
  };

  return line;
}

function _createImg(id) {
  const img = {
    id,
    url: `img/${id + 1}.jpg`,
    keywords: ['sport'],
  };
  img.keywords = _getRandomKeywords();
  return img;
}

function _getRandomKeywords() {
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

function _getNumOfLines() {
  return gMeme.lines.length;
}

function setLineColor(color) {
  const line = getLineById(gMeme.selectedLineId);
  line.color = color;
}

function setLineTxt(txt) {
  if (!gMeme.lines.length) return;
  const line = getLineById(gMeme.selectedLineId);
  line.txt = txt;
}

function setLineSize(diff) {
  const line = getLineById(gMeme.selectedLineId);
  line.size += diff;
}

function getLineHeight(id) {
  const line = getLineById(id);
  return line.size;
}

function setImgId(id) {
  gMeme.selectedImgId = id;
}

function getImages() {
  const sortedImgs = gImgs.filter((img) => _isKeywordIn(img));
  return sortedImgs;
}

function _isKeywordIn(img) {
  var filterKey = gFilterBy.toLowerCase();
  var isInclude = false;
  img.keywords.find(function (keyword) {
    if (keyword.includes(filterKey)) isInclude = true;
    return true;
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

function getSelectedLineId() {
  return gMeme.selectedLineId;
}

function addLine() {
  gMeme.lines.push(_creatLine());
  gMeme.selectedLineId = gMeme.lines[gMeme.lines.length - 1].id;
}

function deleteLine() {
  if (!gMeme.lines.length) return;
  const idx = gMeme.lines.findIndex((line) => line.id === gMeme.selectedLineId);
  gMeme.lines.splice(idx, 1);
  gMeme.selectedLineId = null;
}

function setFontFamily(fontFamily) {
  const line = getLineById(gMeme.selectedLineId);
  line.font = fontFamily;
}

function getLineById(id) {
  const line = gMeme.lines.find((line) => line.id === id);
  return line;
}

function setFocus(pos) {
  const line = getLineClicked(pos);
  if (!line) {
    gMeme.selectedLineId = null;
    return;
  }
  gMeme.selectedLineId = line.id;
}

function getLineClicked(pos) {
  const lines = gMeme.lines;
  const line = lines.find(function (line) {
    return _isInLine(line, pos);
  });
  if (!line) return false;
  return line;
}

function _isInLine(line, pos) {
  const { xStart, yStart, xEnd, yEnd } = line.cornerCoord;
  if (pos.x > xStart && pos.x < xEnd && pos.y > yStart && pos.y < yEnd) {
    return true;
  }
  return false;
}

function setLineDrag(line) {
  if (line) {
    line.isDrag = true;
    return;
  }
  const draggedLine = gMeme.lines.find((line) => line.isDrag);
  if (!draggedLine) return;
  draggedLine.isDrag = false;
}

function getDragLine() {
  const line = gMeme.lines.find(function (line) {
    return line.isDrag;
  });
  if (line) return line;
  return false;
}

function getLineLength(id) {
  const line = getLineById(id);
  return line.lineLength;
}

function getLineCornerCoords(id) {
  return gMeme.lines.find((line) => line.id === id).cornerCoord;
}

function setLineCornerCoords(id, lineLength, size) {
  const line = gMeme.lines.find((line) => line.id === id);
  line.cornerCoord.xEnd = line.cornerCoord.xStart + lineLength;
  line.cornerCoord.yEnd = line.cornerCoord.yStart + size;
  line.lineLength = lineLength;
}

function moveLine(line, dx, dy) {
  if (!_isInCanvas(line, dx, dy)) return;
  line.cornerCoord.xStart += dx;
  line.cornerCoord.xEnd += dx;
  line.cornerCoord.yStart += dy;
  line.cornerCoord.yEnd += dy;
}

function _isInCanvas(line, dx, dy) {
  return (
    line.cornerCoord.xStart + dx + line.lineLength < gCanvasSize.width ||
    line.cornerCoord.yStart + dy + line.size < gCanvasSize.height ||
    line.cornerCoord.xStart + dx + line.lineLength > line.lineLength ||
    line.cornerCoord.yStart + dy + line.size > line.size
  );
}
