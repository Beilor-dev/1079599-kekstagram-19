'use strict';

(function () {
  var ESCAPE_KEYCODE = 27;
  // Действия на странице
  var closeOverlayUnit = function (className) {
    document.querySelector(className).classList.add('hidden');
  };

  var deleteOverlayUnit = function (className) {
    document.querySelector('main').removeChild(document.querySelector(className));
  };

  var errorOverlayTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');

  var successOverlayTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');

  var onErrorOverlayEscButtonPress = function (evt) {
    if (evt.keyCode === ESCAPE_KEYCODE) {
      deleteOverlayUnit('.error');
      document.removeEventListener('keydown', onErrorOverlayEscButtonPress);
    }
  };

  var onSuccessOverlayEscButtonPress = function (evt) {
    if (evt.keyCode === ESCAPE_KEYCODE) {
      deleteOverlayUnit('.success');
      document.removeEventListener('keydown', onSuccessOverlayEscButtonPress);
    }
  };

  var onErrorOverlayClick = function (evt) {
    var target = evt.target;
    if (target === document.querySelector('.error')) {
      deleteOverlayUnit('.error');
      document.removeEventListener('keydown', onErrorOverlayEscButtonPress);
    }
  };

  var onSuccessOverlayClick = function (evt) {
    var target = evt.target;
    if ((target === document.querySelector('.success')) || (target === document.querySelector('.success__button'))) {
      deleteOverlayUnit('.success');
      document.removeEventListener('keydown', onSuccessOverlayEscButtonPress);
    }
  };

  var getErrorOverlayUnit = function () {
    var errorOverlayUnit = errorOverlayTemplate.cloneNode(true);
    errorOverlayUnit.addEventListener('click', onErrorOverlayClick);
    document.addEventListener('keydown', onErrorOverlayEscButtonPress);
    return errorOverlayUnit;
  };

  var getSuccessOverlayUnit = function () {
    var successOverlayUnit = successOverlayTemplate.cloneNode(true);
    successOverlayUnit.addEventListener('click', onSuccessOverlayClick);
    document.addEventListener('keydown', onSuccessOverlayEscButtonPress);
    return successOverlayUnit;
  };

  var onLargePictureOverlayEscButtonPress = function (evt) {
    if (evt.keyCode === ESCAPE_KEYCODE) {
      closeOverlayUnit('.big-picture');
      document.removeEventListener('keydown', onLargePictureOverlayEscButtonPress);
    }
  };

  var onImgUploadOverlayEscButtonPress = function (evt) {
    if (evt.keyCode === ESCAPE_KEYCODE) {
      closeOverlayUnit('.img-upload__overlay');
      document.querySelector('#upload-file').value = '';
      document.removeEventListener('keydown', onImgUploadOverlayEscButtonPress);
    }
  };

  // События
  document.querySelector('.big-picture__cancel').addEventListener('click', function () {
    closeOverlayUnit('.big-picture');
    document.removeEventListener('keydown', onLargePictureOverlayEscButtonPress);
  });

  document.querySelector('.img-upload__cancel').addEventListener('click', function () {
    closeOverlayUnit('.img-upload__overlay');
    document.removeEventListener('keydown', onImgUploadOverlayEscButtonPress);
  });

  var onImgUploadOverlayTxtInputFocus = function () {
    document.removeEventListener('keydown', onImgUploadOverlayEscButtonPress);
  };
  var onImgUploadOverlayTxtInputBlot = function () {
    document.addEventListener('keydown', onImgUploadOverlayEscButtonPress);
  };
  document.querySelector('.text__hashtags').addEventListener('focus', onImgUploadOverlayTxtInputFocus);
  document.querySelector('.text__hashtags').addEventListener('blur', onImgUploadOverlayTxtInputBlot);
  document.querySelector('.text__description').addEventListener('focus', onImgUploadOverlayTxtInputFocus);
  document.querySelector('.text__description').addEventListener('blur', onImgUploadOverlayTxtInputBlot);
  window.overlay = {
    onLargePictureEscButtonPress: onLargePictureOverlayEscButtonPress,
    onImgUploadEscButtonPress: onImgUploadOverlayEscButtonPress,
    deleteUnit: deleteOverlayUnit,
    closeUnit: closeOverlayUnit,
    getErrorUnit: getErrorOverlayUnit,
    getSuccessUnit: getSuccessOverlayUnit
  };
})();
