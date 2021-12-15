'use-strict'




// const DEFAULT_LANG = 'en';
// const STORAGE__LANG_KEY = 'langDB';
// // localStorage.clear();
// var gCurrLang = DEFAULT_LANG;

// var gTrans = {
//   UNKNOWN: {
//     en: 'UNKNOWN',
//     he: 'לא הוגדר',
//   },
//   'header-title': {
//     en: 'Book shop',
//     he: 'חנות הספרים',
//   },
//   'close-add-book-modal': {
//     en: 'close',
//     he: 'סגור',
//   },
//   read: {
//     en: 'RAED',
//     he: 'קרא עוד ',
//   },
//   lang: {
//     en: 'En',
//     he: 'עב ',
//   },
//   'add-book-quest': {
//     en: "Please enter book's details",
//     he: 'אנא הכנס את פרטי הספר',
//   },
//   'enter-title-here': {
//     en: "Please enter book's title...",
//     he: 'אנא הכנס את שם הספר',
//   },
//   'enter-price-here': {
//     en: "Please enter book's price...",
//     he: 'אנא הכנס את מחיר הספר',
//   },
//   'add-book': {
//     en: 'Add book',
//     he: 'הוסף ספר',
//   },
//   create: {
//     en: 'Create book',
//     he: 'צור ספר',
//   },
//   id: {
//     en: 'ID',
//     he: 'תז',
//   },
//   title: {
//     en: 'Title',
//     he: 'שם הספר',
//   },
//   price: {
//     en: 'Price',
//     he: 'מחיר',
//   },
//   action: {
//     en: 'Action',
//     he: 'פעולה',
//   },
//   update: {
//     en: 'UPDATE',
//     he: 'עדכן',
//   },
//   delete: {
//     en: 'DELETE',
//     he: 'הסר',
//   },
// };

// // _setCurrLangFromLocalMemory();

// function getTrans(transKey) {
//   const tranLangsMap = gTrans[transKey];
//   if (!tranLangsMap) return gTrans['UNKNOWN'][gCurrLang];

//   const word = tranLangsMap[gCurrLang];
//   if (!word) return tranLangsMap[DEFAULT_LANG];
//   return word;
// }

// function doTrans() {
//   var els = document.querySelectorAll('[data-trans]');
//   els.forEach((el) => {
//     var transKey = el.dataset.trans;
//     if (el.nodeName === 'INPUT') {
//       el.placeholder = getTrans(transKey);
//     } else {
//       el.innerText = getTrans(transKey);
//     }
//   });
// }

// // function saveLangToLocalStorage() {
// //   saveToStorage(STORAGE__LANG_KEY, gCurrLang);
// // }

// // function _setCurrLangFromLocalMemory() {
// //   var lang = loadFromStorage(STORAGE__LANG_KEY);
// //   if (!lang) lang = DEFAULT_LANG;
// //   gCurrLang = lang;
// // }

// function updateCurrLang(lang) {
//   gCurrLang = lang;
//   //   saveLangToLocalStorage();
// }
