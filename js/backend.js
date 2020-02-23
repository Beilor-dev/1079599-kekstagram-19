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
    URL: 'https://js.dump.academy/kekstagram/data',
    requestType: 'POST',
    dataType: 'json',
    timeout: 10000
  }
 };

 var  xhrRequest = function (setting, onLoad, data) {
  var URL = setting.URL;
  var xhr = new XMLHttpRequest();

  xhr.responseType = setting.dataType;
  xhr.open(setting.requestType, URL);
  xhr.timeout = setting.timeout;

  xhr.addEvenListener('load', function () {
    if (xhr.status === 200) {
      onload(xhr.response);
    } else {
  }
 });

  xhr.send(data);
};

})();
