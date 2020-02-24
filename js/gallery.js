'use strict';

(function () {
  var MIN_COMMENTS_AVATAR_COUNT = 1;
  var MAX_COMMENTS_AVATAR_COUNT = 6;

  var pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');
  var commentsTemplate = document.querySelector('.social__comment').cloneNode(true);

  var removeAllChild = function (element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  };

  // Комментарии
  var getCommentElement = function (comment) {
    var commentElement = commentsTemplate.cloneNode(true);
    commentElement.querySelector('.social__picture').src = 'img/avatar-' + window.utils.getАrbitraryIntFromInterval(MIN_COMMENTS_AVATAR_COUNT, MAX_COMMENTS_AVATAR_COUNT) + '.svg';
    commentElement.querySelector('.social__text').textContent = comment;
    return commentElement;
  };
  var buildCommentsFragment = function (comments) {
    var commentElementList = document.createDocumentFragment();
    for (var i = 0; i < comments.length; i++) {
      commentElementList.appendChild(getCommentElement(comments[i]));
    }
    return commentElementList;
  };

  // Фотографии
  var getPictureElement = function (picture) {
    var pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
    pictureElement.addEventListener('click', function () {
      updateLargePictureData(picture);
      document.querySelector('.big-picture').classList.remove('hidden');
      document.addEventListener('keydown', window.closeOverlay.onLargePictureOverlayEscButtonPress);
    });
    return pictureElement;
  };
  var updateLargePictureData = function (data) {
    document.querySelector('.big-picture__img img').src = data.url;
    document.querySelector('.likes-count').textContent = data.likes;
    document.querySelector('.comments-count').textContent = data.comments.length;
    removeAllChild(document.querySelector('.social__comments'));
    document.querySelector('.social__comments').appendChild(buildCommentsFragment(data.comments));
    document.querySelector('.social__caption').textContent = data.description;
  };

  // Создание и вставка на страницу превью изображений
  var onLoad = function (data) {
    var photoElementsList = document.createDocumentFragment();
    data.forEach(function (item) {
      photoElementsList.appendChild(getPictureElement(item));
    });
    // for (var i = 0; i < window.data.NUMBER_OF_PHOTOS; i++) {
    // photoElementsList.appendChild(getPictureElement(window.data.photos[i]));
    // }
    document.querySelector('.pictures').appendChild(photoElementsList);
  };
  var onError = function (text) {
    var errorOverlayElement = window.overlay.getErrorOverlayElement();
    errorOverlayElement.querySelector('.error__title').innerText = text;
    errorOverlayElement.querySelector('error__button').addEventListener('click', function() {
      window.overlay.removeOverlayElement('.error');
      window.backend.downloadData(onLoad, onError);
    });
    errorOverlayElement.querySelector('.error__button:last-child').classList.add('hidden');
    document.querySelector('main').appendChild(errorOverlayElement);
  }

  window.backend.downloadData(onLoad);
  // Скрываю блоки счётчика комментариев и загрузки новых комментариев
  document.querySelector('.social__comment-count').classList.add('visally-hidden');
  document.querySelector('.comments-loader').classList.add('visally-hidden');
})();
