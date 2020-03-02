'use strict';

(function () {
  var MIN_COMMENTS_AVATAR_COUNT = 1;
  var MAX_COMMENTS_AVATAR_COUNT = 6;
  // var SHOW_GROUP_COMMENTS = 5;
  var pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');
  var commentsTemplate = document.querySelector('.social__comment').cloneNode(true);

  var removeAllChild = function (elements) {
    elements.forEach(function (elem) {
      elem.remove();
    });
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
  // var displayCommentsGroup = function (comments) {
  //   var groupSize = (comments.length <= SHOW_GROUP_COMMENTS) ? comments.length : SHOW_GROUP_COMMENTS;
  //   var ShowMoreClick = function () {
  //     document.querySelector('.comments-loader').removeEventListener('click', ShowMoreClick);
  //     displayCommentsGroup(comments);
  //   };
  // };

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

  var addGalleryData = function (data) {
    var photoElementsList = document.createDocumentFragment();
    data.forEach(function (item) {
      photoElementsList.appendChild(getPictureElement(item));
    });
    document.querySelector('.pictures').appendChild(photoElementsList);
  };

  var attachEventToImgSortingButton = function (data) {
    var onImgSortingClick = function (evt) {
      var target = evt.target;
      if (!target.classList.contains('img-filters__button--active') && target.classList.contains('img-filters__button')) {
        document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
        target.classList.add('img-filters__button--active');
        var newData = data;
        if (target.id === 'filter-random') {
          newData = window.sorting.arbitary(data);
        } else if (target.id === 'filter-discussed') {
          newData = window.sorting.onComments(data)
        }
        window.debounce(function () {
          removeAllChild(document.querySelectorAll('.container.pictures a.picture'));
          addGalleryData(newData);
        });
      }
    };
    document.querySelector('.img-filters__form').addEventListener('click', onImgSortingClick);
  };

  // Создание и вставка на страницу превью изображений
  var onLoad = function (data) {
    addGalleryData(data);
    document.querySelector('.img-filters--inactive').classList.remove('img-filters--inactive');
    attachEventToImgSortingButton(data);
    // var photoElementsList = document.createDocumentFragment();
    // data.forEach(function (item) {
    //   photoElementsList.appendChild(getPictureElement(item));
    // });
    // // for (var i = 0; i < window.data.NUMBER_OF_PHOTOS; i++) {
    // // photoElementsList.appendChild(getPictureElement(window.data.photos[i]));
    // // }
    // document.querySelector('.pictures').appendChild(photoElementsList);
  };
  var onError = function (text) {
    var errorOverlayUnit = window.overlay.getErrorOverlayUnit();
    errorOverlayUnit.querySelector('.error__title').innerText = text;
    errorOverlayUnit.querySelector('.error__button').addEventListener('click', function () {
      window.overlay.deleteOverlayUnit('.error');
      window.backend.download(onLoad, onError);
    });
    errorOverlayUnit.querySelector('.error__button').classList.add('hidden');
    document.querySelector('main').appendChild(errorOverlayUnit);
  };

  window.backend.downloadData(onLoad, onError);
  // Скрываю блоки счётчика комментариев и загрузки новых комментариев
  document.querySelector('.social__comment-count').classList.add('visally-hidden');
  document.querySelector('.comments-loader').classList.add('visally-hidden');
})();
