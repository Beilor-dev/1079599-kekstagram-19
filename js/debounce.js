'use strict';
(function () {
  var DEBONCE_TEST = 500;

  var finalTimeout;
  window.debounce = function (deb) {
    if (finalTimeout) {
      window.clearTimeout(finalTimeout);
    }
    finalTimeout = window.setTimeout(deb, DEBONCE_TEST);
  };
})();
