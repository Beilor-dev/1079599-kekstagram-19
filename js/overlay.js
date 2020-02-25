'use strict';

(function () {
  var ESCAPE_KEYCODE = 27;
  // Действия на странице
  var closeOverlayElement = function (className) {
    document.querySelector(className).classList.add('hidden');
  };

  // var deleteOverlayElement = function (className) {
  //   document.querySelector('main').removeChild(document.querySelector(className));
  // };

  // var errorOverlayTemplate = document.querySelector('#error')
  //   .content
  //   .querySelector('.error');

  // var successOverlayTemplate = document.querySelector('#success')
  //   .content
  //   .querySelector('.success');

  // var onErrorOverlayEscButtonPress = function (evt) {
  //   if (evt.keyCode === ESCAPE_KEYCODE) {
  //     deleteOverlayElement('.error');
  //     document.removeEventListener('keydown', onErrorOverlayEscButtonPress);
  //   }
  // };

  // var onSuccessOverlayEscButtonPress = function (evt) {
  //   if (evt.keyCode === ESCAPE_KEYCODE) {
  //     deleteOverlayElement('.success');
  //     document.removeEventListener('keydown', onSuccessOverlayEscButtonPress);
  //   }
  // };

  // var onErrorOverlayClick = function (evt) {
  //   var target = evt.target;
  //   if (target === document.querySelector('.error')) {
  //     deleteOverlayElement('.error');
  //     document.removeEventListener('keydown', onSuccessOverlayEscButtonPress);
  //   }
  // };

  var onLargePictureOverlayEscButtonPress = function (evt) {
    if (evt.keyCode === ESCAPE_KEYCODE) {
      closeOverlayElement('.big-picture');
      document.removeEventListener('keydown', onLargePictureOverlayEscButtonPress);
    }
  };

  var onImgUploadOverlayEscButtonPress = function (evt) {
    if (evt.keyCode === ESCAPE_KEYCODE) {
      closeOverlayElement('.img-upload__overlay');
      document.querySelector('#upload-file').value = '';
      document.removeEventListener('keydown', onImgUploadOverlayEscButtonPress);
    }
  };

  // События
  document.querySelector('.big-picture__cancel').addEventListener('click', function () {
    closeOverlayElement('.big-picture');
    document.removeEventListener('keydown', onLargePictureOverlayEscButtonPress);
  });

  document.querySelector('.img-upload__cancel').addEventListener('click', function () {
    closeOverlayElement('.img-upload__overlay');
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
  window.closeOverlay = {
    onLargePictureOverlayEscButtonPress: onLargePictureOverlayEscButtonPress,
    onImgUploadOverlayEscButtonPress: onImgUploadOverlayEscButtonPress,
    // deleteOverlayElement: deleteOverlayElement,
    // closeOverlayElement: closeOverlayElement
  };
})();
