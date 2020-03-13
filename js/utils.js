'use strict';

(function () {
  var getАrbitraryIntFromInterval = function (min, max) {
    return Math.floor(Math.random() * (max + 1 - min) + min);
  };

  window.utils = {
    getАrbitraryIntFromInterval: getАrbitraryIntFromInterval,
  };
})();


