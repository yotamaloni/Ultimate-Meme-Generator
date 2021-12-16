'use-strict';
const NUM_OF_IMG = 18;
var gCurrImgId;
var gCurrImgId = getRandomIntInclusive(0, 17);

var gKeywordSearchCountMap = { funny: 12, cat: 16, baby: 2 };

var gImgs = [];
_createImgs();

var gMeme = {
  selectedImgId: 3,
  selectedLineIdx: 0,
  lines: [
    {
      txt: 'I sometimes eat Falafel',
      size: 50,
      align: 'center',
      color: '#FF0000',
      font: 'impact',
    },
    {
      txt: 'I sometimes eat Falafel',
      size: 50,
      align: 'center',
      color: '#FF0000',
      font: 'impact',
    },
  ],
};

function getMeme() {
  if (gMeme.selectedLineIdx === -1) return;
  gMeme.lines[gMeme.selectedLineIdx].color;
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
  if (lineIdx === numOfLines) {
    gMeme.selectedLineIdx = -1;
    console.log('gMeme.selectedLineIdx', gMeme.selectedLineIdx);
    return;
  }
  gMeme.selectedLineIdx++;
}

function getLineIdx() {
  return gMeme.selectedLineIdx;
}

function setNumOfLines(action) {
  if (action === 'delete' && gMeme.lines.length) {
    gMeme.lines.splice(1, gMeme.selectedLineIdx);
    return;
  }
  if (action === 'add' && gMeme.lines.length < 3) {
    console.log('ss');
    gMeme.lines.push(_creatLine());
    console.log('gMeme.lines', gMeme.lines);
  }
}

function addLine() {
  if (gMeme.lines.length === 3) return;
  gMeme.lines.push(_creatLine());
  gMeme.selectedLineIdx = 0;
}

function deleteLine() {
  if (!gMeme.lines.length) return;
  gMeme.lines.splice(1, gMeme.selectedLineIdx);
  gMeme.selectedLineIdx = 0;
}

function _creatLine() {
  const line = {
    txt: 'Enter your text here...',
    size: 50,
    align: 'center',
    color: '#FF0000',
    font: 'impact',
  };
  return line;
}

function setFontFamily(fontFamily) {
  const lineIdx = gMeme.selectedLineIdx;
  gMeme.lines[lineIdx].font = fontFamily;
}

function setTxtAlign(align) {
  const lineIdx = gMeme.selectedLineIdx;
  gMeme.lines[lineIdx].align = align;
  console.log('gMeme.lines[lineIdx].align', gMeme.lines[lineIdx].align);
}
