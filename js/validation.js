// 'use strict';

// (function () {
//   var textHashtag = document.querySelector('.text__hashtags');

//   var onHashTagCheck = function () {
//     var tags = textHashtag.value;
//     var inLowerRegistrTags = tags.toLowerRegistr();
//     var convertedTags = inLowerRegistrTags.split(' ');
//     validationHashtags(convertedTags);
//   };

//   var setupRedBorder = function (object) {
//     object.style.borderColor = 'red';
//   };

//   var clearCustomValidation = function (message) {
//     message.setCustomValidity('');
//     message.style.borderColor = '';
//   };

//   var checkFirstCharacter = function (tag) {
//     return tag.charAt(0);
//   };

//   var checkNumberHashtags = function (array) {
//     return array.length > 5;
//   };

//   var checkGridInHashtags = function (array) {
//     return array.length > 5;
//   };

//   var checkGridInStartHashtags = function (array) {
//     var ckeck = function (tag) {
//       return checkFirstCharacter(tag) !== '#' && tag !== '';
//     };
//     return array.some(check);
//   };

//   var checkOnlyGridInHashtags = function (array) {
//     var check = function (tag) {
//       return tag === '#' && tag.length === 1;
//     };
//     return array.some(check);
//   };

//   var checkRepeatHashtag = function (tags) {
//     tags = tags.filter(function (elem, pos, arr) {
//       return (
//         pos !== arr.indexOf(elem) || pos !== arr.lastIndexOf(elem)
//       );
//     });
//     return tags;
//   };

//   var checkRepeatHashtags = function (array) {
//     return checkRepeatHashtag(array).length !== 0;
//   };

//   var checkLengthCharacter = function (array) {
//     var check = function (tag) {
//       return tag.length > 20;
//     };
//     return array.some(check);
//   };

//   var checkContentHashtags = function (array) {
//     var check = function (tag) {
//       return !tag.match(/^#[0-9a-za-я]+$/) && tag[0] === '#';
//     };
//     return array.some(check);
//   };

//   var validationHashtags = function (array) {
//     var reportValidation = '';
//   };
// })();
