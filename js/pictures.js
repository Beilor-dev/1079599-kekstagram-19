'use strict';

(function () {
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
  var SCALE_EFFECT_STEP = 25;
  var SCALE_EFFECT_DEFAULT = 100;
  var SCALE_EFFECT_MIN = 25;
  var SCALE_EFFECT_MAX = 100;

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

  // Маштабирование
  var setupScaleEffectLevel = function (level) {
    document.querySelector('.scale__control--value').value = level + '%';
    document.querySelector('.img-upload__preview img').style.transform = 'scale(' + level / 100 + ')';
  };

  var onScaleEffectLevel = function (evt) {
    var level = parseInt(document.querySelector('.scale__control--value').value, 10);
    var target = evt.target;
    if (target.classList.contains('scale__control--smaller')) {
      level -= SCALE_EFFECT_STEP;
      if (level <= SCALE_EFFECT_MIN) {
        level = SCALE_EFFECT_MIN;
      }
    } else if (target.classList.contains('scale__control--bigger')) {
      level += SCALE_EFFECT_STEP;
      if (level >= SCALE_EFFECT_MAX) {
        level = SCALE_EFFECT_MAX;
      }
    }
    setupScaleEffectLevel(level);
  };

  document.querySelector('.img-upload__scale').addEventListener('click', onScaleEffectLevel);
  var getCurrentFilterStyle = function (level, nameEffect) {
    return (nameEffect === 'none') ? 'none' :
      EFFECTS_PREVIEW_SETTINGS[nameEffect].name + '(' +
    window.utils.intervalPercentageCalculation(level, EFFECTS_PREVIEW_SETTINGS[nameEffect].min, EFFECTS_PREVIEW_SETTINGS[nameEffect].max) +
    EFFECTS_PREVIEW_SETTINGS[nameEffect].dimension + ')';
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

  // Хэш-теги:
  var onHashTagCheck = function (evt) {
    var target = evt.target;
    var hashTags = target.value.split(' ');
    target.setCustomValidity('');
    if (hashTags.length > 5) {
      target.setCustomValidity('Нельзя указывать больше пяти хэш-тегов;');
    } else {
      for (var a = 0; a < hashTags.length; a++) {
        if (hashTags[a][0] !== '#') {
          target.setCustomValidity('Хэш-тег должен начинаться с символа # (решётка);');
          break;
        } else if (hashTags[a].length < 2) {
          target.setCustomValidity('Хэш-тег не может состоять только из одной решётки;');
          break;
        } else if (hashTags[a].length > 20) {
          target.setCustomValidity('Максимальная длина хэш-тега 20 символов, включая решётку;');
          break;
        } else if (hashTags[a].match('#[a-zA-Zа-яА-Я0-9]*')[0] !== hashTags[a]) {
          target.setCustomValidity('Хэштэг должен содержать только буквы и числа;');
        } else {
          for (var j = a + 1; j < hashTags.length; j++) {
            if (hashTags[a].toLowerCase() === hashTags[j].toLowerCase()) {
              target.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды, теги нечувствительны к регистру;');
              break;
            }
          }
        }
      }
    }
  };
  document.querySelector('.text__hashtags').addEventListener('input', onHashTagCheck);

  document.querySelector('#upload-file').addEventListener('change', function () {
    document.querySelector('.img-upload__overlay').classList.remove('hidden');
    document.querySelector('.text__hashtags').value = '';
    document.querySelector('.text__description').value = '';
    onFilterEffectChange();
    setupScaleEffectLevel(SCALE_EFFECT_DEFAULT);
    document.addEventListener('keydown', window.overlay.onImgUploadOverlayEscButtonPress);
  });

  document.querySelector('.effects__list').addEventListener('change', onFilterEffectChange);

   var onLoad = function () {
    window.overlay.closeOverlayUnit('.img-upload__overlay');
    document.querySelector('#upload-file').value = '';
    document.removeEventListener('keydown', window.overlay.onImgUploadOverlayEscButtonPress);
    var successOverlayUnit = window.overlay.getSuccessOverlayUnit();
    document.querySelector('main').appendChild(successOverlayUnit);
  };

  var onError = function (text) {
    var errorOverlayUnit = window.overlay.getErrorOverlayUnit();
    errorOverlayUnit.querySelector('.error__title').innerText = text;

    window.overlay.closeOverlayUnit('.img-upload__overlay');
    document.querySelector('#upload-file').value = '';
    document.removeEventListener('keydown', window.overlay.onImgUploadOverlayEscButtonPress);

    errorOverlayUnit.querySelectorAll('.error__button').forEach(function (elem) {
      elem.addEventListener('click', function () {
        window.overlay.deleteOverlayUnit('.error');
      });
    });
    document.querySelector('main').appendChild(errorOverlayUnit); 
  };

  var onSubmitButtonClick = function (evt) {
    evt.preventDefault();
    window.backend.uploadData(new FormData(evt.target), onLoad, onError);
  };
  document.querySelector('#upload-select-image').addEventListener('submit', onSubmitButtonClick);
})();
