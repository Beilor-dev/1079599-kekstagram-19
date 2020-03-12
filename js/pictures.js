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
    document.querySelector('.img-upload__preview').style.transform = 'scale(' + level / 100 + ')';
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

  var intervalPercentageCalculation = function (percent, min, max) {
    return (percent / 100) * (max - min) + min;
  };

  document.querySelector('.img-upload__scale').addEventListener('click', onScaleEffectLevel);
  var getCurrentFilterStyle = function (level, nameEffect) {
    return (nameEffect === 'none') ? 'none' :
      EFFECTS_PREVIEW_SETTINGS[nameEffect].name + '(' +
    intervalPercentageCalculation(level, EFFECTS_PREVIEW_SETTINGS[nameEffect].min, EFFECTS_PREVIEW_SETTINGS[nameEffect].max) +
    EFFECTS_PREVIEW_SETTINGS[nameEffect].dimension + ')';
  };

  // Перетаскивание
  document.querySelector('.effect-level__pin').addEventListener('mousedown', function () {
    var width = document.querySelector('.effect-level__line').offsetWidth;
    var unitX = document.querySelector('.effect-level__line').getBoundingClientRect().left;
    var nameEffect = document.querySelector('.effects__radio:checked').value;
    var changeEffectLevel = function (evtX) {
      var position = evtX - unitX;
      if (evtX < unitX) {
        position = 0;
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

  document.querySelector('#upload-file').addEventListener('change', function () {
    document.querySelector('.effects__radio').checked = true;
    document.querySelector('.scale__control--value').value = '100%';
    onFilterEffectChange();
    setupScaleEffectLevel(SCALE_EFFECT_DEFAULT);
    document.addEventListener('keydown', window.overlay.onImgUploadEscButtonPress);

    document.querySelector('.img-upload__overlay').classList.remove('hidden');
  });

  document.querySelector('.effects__list').addEventListener('change', onFilterEffectChange);

  var onLoad = function () {
    window.overlay.closeUnit('.img-upload__overlay');
    document.querySelector('#upload-file').value = '';
    document.removeEventListener('keydown', window.overlay.onImgUploadEscButtonPress);
    var successOverlayUnit = window.overlay.getSuccessUnit();
    document.querySelector('main').appendChild(successOverlayUnit);
  };

  var onError = function (text) {
    var errorOverlayUnit = window.overlay.getErrorUnit();
    errorOverlayUnit.querySelector('.error__title').innerText = text;

    window.overlay.closeUnit('.img-upload__overlay');
    document.querySelector('#upload-file').value = '';
    document.removeEventListener('keydown', window.overlay.onImgUploadEscButtonPress);

    errorOverlayUnit.querySelectorAll('.error__button').forEach(function (elem) {
      elem.addEventListener('click', function () {
        window.overlay.deleteUnit('.error');
      });
    });
    document.querySelector('main').appendChild(errorOverlayUnit);
  };

  var onSubmitButtonClick = function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(evt.target), onLoad, onError);
  };
  document.querySelector('#upload-select-image').addEventListener('submit', onSubmitButtonClick);
})();
