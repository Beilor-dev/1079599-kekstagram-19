'use strict';

(function () {
  var xhrParameters = {
    LINK_LOAD: 'https://js.dump.academy/kekstagram/data',
    LINK_SAVE: 'https://js.dump.academy/kekstagram',
    SUCCESS_CODE: 200,
  };

  var getParamsXhr = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === xhrParameters.SUCCESS_CODE) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа:' + xhr.status + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    return xhr;
  };

  window.backend = {
    load: function (onLoad, onError) {
      var xhr = getParamsXhr(onLoad, onError);
      xhr.open('GET', xhrParameters.LINK_LOAD);
      xhr.send();
    },
    save: function (data, onLoad, onError) {
      var xhr = getParamsXhr(onLoad, onError);
      xhr.open('POST', xhrParameters.LINK_SAVE);
      xhr.send(data);
    }
  };
})();
