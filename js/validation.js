'use strict';

(function () {
  var textComment = document.querySelector('.text__description');
  var onCommentInputLength = function () {
    if (textComment.value.length > 140) {
      textComment.setCustomValidity('Длина комментария не может составлять больше 140 символов');
      setupRedBorder(textComment);
    } else {
      clearCustomValidation(textComment);
    }
  };

  var textHashtag = document.querySelector('.text__hashtags');
  var onHashTagCheck = function () {
    var tags = textHashtag.value;
    var toLowerCaseTags = tags.toLowerCase();
    var transformedTags = toLowerCaseTags.split(' ');
    validationHashtags(transformedTags);
  };

  var setupRedBorder = function (object) {
    object.style.borderColor = 'red';
  };

  var clearCustomValidation = function (message) {
    message.setCustomValidity('');
    message.style.borderColor = '';
  };

  var checkFirstCharacter = function (tag) {
    return tag.charAt(0);
  };

  var checkNumberHashtags = function (array) {
    return array.length > 5;
  };

  var checkGridInStartHashtags = function (array) {
    var check = function (tag) {
      return checkFirstCharacter(tag) !== '#' && tag !== '';
    };
    return array.some(check);
  };

  var checkOnlyGridInHashtags = function (array) {
    var check = function (tag) {
      return tag === '#' && tag.length === 1;
    };
    return array.some(check);
  };

  var checkRepeatHashtag = function (tags) {
    tags = tags.filter(function (elem, pos, arr) {
      return (
        pos !== arr.indexOf(elem) || pos !== arr.lastIndexOf(elem)
      );
    });
    return tags;
  };

  var checkRepeatHashtags = function (array) {
    return checkRepeatHashtag(array).length !== 0;
  };


  var checkLengthCharacter = function (array) {
    var check = function (tag) {
      return tag.length > 20;
    };
    return array.some(check);
  };

  var checkContentHashtags = function (array) {
    var check = function (tag) {
      return !tag.match(/^#[0-9a-zа-я]+$/) && tag[0] === '#';
    };
    return array.some(check);
  };

  var validationHashtags = function (array) {
    var validationErrorMessage = '';
    if (checkNumberHashtags(array)) {
      validationErrorMessage = 'Нельзя указывать больше пяти хэш-тегов';
      setupRedBorder(textHashtag);
    } else if (checkRepeatHashtags(array)) {
      validationErrorMessage = 'Один и тот же хэш-тег не может быть использован дважды';
      setupRedBorder(textHashtag);
    } else if (checkOnlyGridInHashtags(array)) {
      validationErrorMessage = 'Хеш-тег не может состоять только из одной решётки';
      setupRedBorder(textHashtag);
    } else if (checkContentHashtags(array)) {
      validationErrorMessage = 'Хэштэг должен содержать только буквы и числа';
      setupRedBorder(textHashtag);
    } else if (checkLengthCharacter(array)) {
      validationErrorMessage = 'Максимальная длина одного хэш-тега 20 символов, включая решётку';
      setupRedBorder(textHashtag);
    } else if (checkGridInStartHashtags(array)) {
      validationErrorMessage = 'Хэш-тег начинается с символа # (решётка);';
      setupRedBorder(textHashtag);
    } else {
      clearCustomValidation(textHashtag);
    }
    textHashtag.setCustomValidity(validationErrorMessage);
  };
  textComment.addEventListener('input', onCommentInputLength);

  textHashtag.addEventListener('input', onHashTagCheck);

  var clearStringHashtagsComment = function () {
    textHashtag.value = '';
    textComment.value = '';
  };

  window.validation = {
    clearStringHashtagsComment: clearStringHashtagsComment
  };
})();
