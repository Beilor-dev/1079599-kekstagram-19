'use strict';

(function () {

  var COMMENTS_MAXIMUM_LENGTH = 140;
  var HASHTAGS_MINIMUM_SYMBOLS_NUMBER = 2;
  var HASHTAGS_MINIMUM_NUMBER = 5;
  var HASHTAGS_MAXIMUM_NUMBER = 20;
  var textHashtag = document.querySelector('.text__hashtags');
  var textComment = document.querySelector('.text__description');

  var findMatchingElements = function (elements) {
    var matchingExist = false;
    var standard = '';
    if (elements.length > 1) {
      for (var i = 0; i < elements.length; i++) {
        standard = elements[i];
        for (var j = i + 1; j < elements.length; j++) {
          if (standard === elements[j]) {
            matchingExist = true;
          }
        }
      }
    }
    return matchingExist;
  };

  var setupRedBorder = function (evt) {
    evt.target.style.borderColor = 'red';
  };

  textComment.addEventListener('input', function (evt) {
    var commentsArray = evt.target.value.toLowerCase().split(' ');

    commentsArray.forEach(function () {
      if (textComment.value.length > COMMENTS_MAXIMUM_LENGTH) {
        evt.target.setCustomValidity('Длина комментария не может составлять больше 140 символов');
        setupRedBorder(evt);
        return;
      }
      evt.target.setCustomValidity('');
      evt.target.style.border = '';
    });
  });
  textHashtag.addEventListener('input', function (evt) {
    var hashtagsArray = evt.target.value.trim().replace(/\s+/g,' ').toLowerCase().split(' ');

    hashtagsArray.forEach(function (item) {
      var hashtag = item;
      if (!hashtag.startsWith('#')) {
        evt.target.setCustomValidity('Хэш-тег начинается с символа # (решётка)');
        setupRedBorder(evt);
        return;
      }
      if (!hashtag.match(/^#[0-9a-zа-я]+$/)) {
        evt.target.setCustomValidity('Строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т.п.), символы пунктуации (тире, дефис, запятая и т.п.), эмодзи и т.д.');
        setupRedBorder(evt);
        return;
      }
      if (hashtag.length < HASHTAGS_MINIMUM_SYMBOLS_NUMBER) {
        evt.target.setCustomValidity('Хэш-тег не может состоять только из одной решётки');
        setupRedBorder(evt);
        return;
      }
      if (hashtag.length > HASHTAGS_MAXIMUM_NUMBER) {
        evt.target.setCustomValidity('Хэш-тег не должен быть длинее 20 символов');
        setupRedBorder(evt);
        return;
      }
      if (findMatchingElements(hashtagsArray)) {
        evt.target.setCustomValidity('Один хештег не может быть использован дважды');
        setupRedBorder(evt);
        return;
      }
      if (hashtagsArray.length > HASHTAGS_MINIMUM_NUMBER) {
        evt.target.setCustomValidity('Нельзя указывать больше пяти хэш-тегов!');
        setupRedBorder(evt);
        return;
      }
      evt.target.setCustomValidity('');
      evt.target.style.border = '';
    });
  });

  var clearStringHashtagsComment = function () {
    textHashtag.value = '';
    textComment.value = '';
  };

  window.validation = {
    clearStringHashtagsComment: clearStringHashtagsComment
  };
})();
