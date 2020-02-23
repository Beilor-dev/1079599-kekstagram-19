'use strict';

(function () {
  var INQUIRY_SETTINGS = {
    get: {
      URL: 'https://js.dump.academy/kekstagram/data',
      requestType: 'GET',
      dataType: 'json',
      timeout: 10000
    },
    post: {
      URL: 'https://js.dump.academy/kekstagram',
      requestType: 'POST',
      dataType: 'json',
      timeout: 10000
    }
  };

  var xhrRequest = function (setting, onLoad, data) {
    var URL = setting.URL;
    var xhr = new XMLHttpRequest();

    xhr.responseType = setting.dataType;
    xhr.open(setting.requestType, URL);
    xhr.timeout = setting.timeout;

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      // } else {
      }
    });

    xhr.send(data);
  };

  var downloadData = function (onLoad) {
    xhrRequest(INQUIRY_SETTINGS.get, onLoad);
  };
  var uploadData = function (data, onLoad) {
    xhrRequest(INQUIRY_SETTINGS.post, onLoad, data);
  };

  window.backend = {
    downloadData: downloadData,
    uploadData: uploadData
  };
})();
