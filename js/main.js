'use strict';

var MOCK_COMMENTS = [
  'Все отлично!',
  'В целом все не плохо.Но не все.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var MOCK_DESCRIPTIONS = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'
];

var NUMBER_OF_PHOTOS = 25;
var MIN_LIKES = 15;
var MAX_LIKES = 200;
var MIN_COMMENTS_COUNT = 0;
var MAX_COMMENTS_COUNT = 25;
var MIN_COMMENTS_AVATAR_COUNT = 1;
var MAX_COMMENTS_AVATAR_COUNT = 6;
var ESCAPE_KEYCODE = 27;
var EFFECTS_PREVIEW_SETTINGS = {
  'chrome': {
    name: 'grayscale',
    min: 0,
    max: 1,
    dimension: '',
    className: 'effects__preview--chrome'
  },
  'sepia': {
    name: 'sepia',
    min: 0,
    max: 1,
    dimension: '',
    className: 'effects__preview--sepia'
  },
  'marvin': {
    name: 'invert',
    min: 0,
    max: 100,
    dimension: '%',
    className: 'effects__preview--marvin'
  },
  'phobos': {
    name: 'blur',
    min: 0,
    max: 3,
    dimension: 'px',
    className: 'effects__preview--phobos'
  },
  'heat': {
    name: 'brightness',
    min: 1,
    max: 3,
    dimension: '',
    className: 'effects__preview--heat'
  }
};
var FILTER_EFFECT_DEFAULT = 100;
// var SCALE_EFFECT_STEP = 25;
var SCALE_EFFECT_DEFAULT = 100;
// var SCALE_EFFECT_MIN = 25;
// var SCALE_EFFECT_MAX = 100;

var pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

var commentsTemplate = document.querySelector('.social__comment').cloneNode(true);

// Утилиты
var intervalPercentageCalculation = function (percent, min, max) {
  return (percent / 100) * (max - min) + min;
};

var getАrbitraryIntFromInterval = function (min, max) {
  return Math.floor(Math.random() * (max + 1 - min) + min);
};

var getАrbitraryFromArray = function (array) {
  return array[getАrbitraryIntFromInterval(0, array.length - 1)];
};

var buildItemsArrayWithGenerator = function (length, itemGenerator) {
  var itemsArray = [];
  for (var i = 0; i < length; i++) {
    itemsArray[i] = itemGenerator(i);
  }
  return itemsArray;
};

var removeAllChild = function (element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};

// Фотографии
var getАrbitraryPhoto = function (photoCounter) {
  return {
    url: 'photos/' + (photoCounter + 1) + '.jpg',
    likes: getАrbitraryIntFromInterval(MIN_LIKES, MAX_LIKES),
    comments: buildItemsArrayWithGenerator(getАrbitraryIntFromInterval(MIN_COMMENTS_COUNT, MAX_COMMENTS_COUNT), getАrbitraryComment),
    description: getАrbitraryFromArray(MOCK_DESCRIPTIONS)
  };
};

var getPictureElement = function (picture) {
  var pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
  pictureElement.addEventListener('click', function () {
    updateLargePictureData(picture);
    document.querySelector('.big-picture').classList.remove('hidden');
    document.addEventListener('keydown', onLargePictureOverlayEscButtonPress);
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

// Комментарии
var getАrbitraryComment = function () {
  return (getАrbitraryIntFromInterval(1, 2) === 1) ? getАrbitraryFromArray(MOCK_COMMENTS) : getАrbitraryFromArray(MOCK_COMMENTS) + '' + getАrbitraryFromArray(MOCK_COMMENTS);
};

var getCommentElement = function (comment) {
  var commentElement = commentsTemplate.cloneNode(true);
  commentElement.querySelector('.social__picture').src = 'img/avatar-' + getАrbitraryIntFromInterval(MIN_COMMENTS_AVATAR_COUNT, MAX_COMMENTS_AVATAR_COUNT) + '.svg';
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

// Действия на странице
var closeOverlayElement = function (className) {
  document.querySelector(className).classList.add('hidden');
};

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

var getCurrentFilterStyle = function (level, nameEffect) {
  return (nameEffect === 'none') ? 'none' :
    EFFECTS_PREVIEW_SETTINGS[nameEffect].name + '(' +
    intervalPercentageCalculation(level, EFFECTS_PREVIEW_SETTINGS[nameEffect].min, EFFECTS_PREVIEW_SETTINGS[nameEffect].max) +
    EFFECTS_PREVIEW_SETTINGS[nameEffect].dimension + ')';
};

var setupFilterEffectClass = function (nameEffect) {
  if (nameEffect === 'none') {
    document.querySelector('.img-upload__effect-level').classList.add('hidden');
    var onFilterFromNoneChange = function () {
      document.querySelector('.img-upload__effect-level').classList.remove('hidden');
      document.querySelector('.effects__list').removeEventListener('change', onFilterFromNoneChange);
    };
    document.querySelector('.effects__list').addEventListener('change', onFilterFromNoneChange);
  } else {
    document.querySelector('.img-upload__preview').classList.add(EFFECTS_PREVIEW_SETTINGS[nameEffect].className);
    var onEffectFilterChange = function () {
      document.querySelector('.img-upload__preview').classList.remove(EFFECTS_PREVIEW_SETTINGS[nameEffect].className);
      document.querySelector('.effects__list').removeEventListener('change', onEffectFilterChange);
    };
    document.querySelector('.effects__list').addEventListener('change', onEffectFilterChange);
  }
};

var setupEffectLevelLine = function (level) {
  document.querySelector('.effect-level__pin').style.left = level + '%';
  document.querySelector('.effect-level__depth').style.width = level + '%';
};

var setupEffectLevelLargePicture = function (level, nameEffect) {
  document.querySelector('.img-upload__preview').style.filter = getCurrentFilterStyle(level, nameEffect);
};

var onFilterEffectChange = function () {
  var nameEffect = document.querySelector('.effects__radio:checked').value;
  document.querySelector('.effect-level__value').value = FILTER_EFFECT_DEFAULT;
  setupFilterEffectClass(nameEffect);
  setupEffectLevelLine(FILTER_EFFECT_DEFAULT);
  setupEffectLevelLargePicture(FILTER_EFFECT_DEFAULT, nameEffect);
};

var setupScaleEffectLevel = function (level) {
  document.querySelector('.scale__control--value').value = level + '%';
  document.querySelector('.img-upload__preview img').style.transform = 'scale(' + level / 100 + ')';
};

// Перетаскивание
document.querySelector('.effect-level__pin').addEventListener('mousedown', function () {
  var width = document.querySelector('.effect-level__line').offsetWidth;
  var unitX = document.querySelector('.effect-level__line').getBoundingClientRect().x;
  var nameEffect = document.querySelector('.effects__radio:checked').value;
  var changeEffectLevel = function (evtX) {
    var position = evtX - unitX;
    if (evtX < unitX) {
      position = unitX;
    } else if (evtX > (width + unitX)) {
      position = width;
    }
    var level = position / width * 100;
    setupEffectLevelLine(level);
    setupEffectLevelLargePicture(level, nameEffect);
  };

  var onEffectLevelTagMove = function (evt) {
    changeEffectLevel(evt.clientX);
  };

  var onEffectLevelTagMouseUp = function () {
    document.removeEventListener('mousemove', onEffectLevelTagMove);
    document.removeEventListener('mouseup', onEffectLevelTagMouseUp);
  };
  document.addEventListener('mousemove', onEffectLevelTagMove);
  document.addEventListener('mouseup', onEffectLevelTagMouseUp);
});

// Создание MOCK данных
var photos = buildItemsArrayWithGenerator(NUMBER_OF_PHOTOS, getАrbitraryPhoto);

// Создание и вставка на страницу превью изображений
var photoElementsList = document.createDocumentFragment();
for (var i = 0; i < NUMBER_OF_PHOTOS; i++) {
  photoElementsList.appendChild(getPictureElement(photos[i]));
}
document.querySelector('.pictures').appendChild(photoElementsList);

// Скрываю блоки счётчика комментариев и загрузки новых комментариев
document.querySelector('.social__comment-count').classList.add('visally-hidden');
document.querySelector('.comments-loader').classList.add('visally-hidden');

// События
document.querySelector('.big-picture__cancel').addEventListener('click', function () {
  closeOverlayElement('.big-picture');
  document.removeEventListener('keydown', onLargePictureOverlayEscButtonPress);
});

document.querySelector('.img-upload__cancel').addEventListener('click', function () {
  closeOverlayElement('.img-upload__overlay');
  document.removeEventListener('keydown', onImgUploadOverlayEscButtonPress);
});

document.querySelector('#upload-file').addEventListener('change', function () {
  document.querySelector('.img-upload__overlay').classList.remove('hidden');
  onFilterEffectChange();
  // setupScaleEffectLevel(SCALE_EFFECT_DEFAULT);
  document.addEventListener('keydown', onImgUploadOverlayEscButtonPress);
});

document.querySelector('.effects__list').addEventListener('change', onFilterEffectChange);

// Хэш-теги:
var onHashTagCheck = function (evt) {
  var target = evt.target;
  var hashTags = target.value.split(' ');
  target.setCustomValidity('');
  if (hashTags.length > 5) {
    target.setCustomValidity('Нельзя указывать больше пяти хэш-тегов;');
  } else {
    for (var i = 0; i < hashTags.length; i++) {
      if (hashTags[i][0] !== '#') {
        target.setCustomValidity('Хэш-тег должен начинаться с символа # (решётка);');
        break;
      } else if (hashTags[i].length < 2) {
        target.setCustomValidity('Хэш-тег не может состоять только из одной решётки;');
        break;
      } else if (hashTags[i].length > 20) {
        target.setCustomValidity('Максимальная длина хэш-тега 20 символов, включая решётку;');
        break;
      } else {
        for (var j = i + 1; j < hashTags.length; j++) {
          if (hashTags[i].toLowerCase() === hashTags[j].toLowerCase()) {
            target.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды, теги нечувствительны к регистру;');
            break;
          }
        }
      }
    }
  }
};
document.querySelector('.text__hashtags').addEventListener('input', onHashTagCheck);

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
