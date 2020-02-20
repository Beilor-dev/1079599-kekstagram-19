'use strict';

(function () {
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
  window.utils = {
    intervalPercentageCalculation: intervalPercentageCalculation,
    getАrbitraryIntFromInterval: getАrbitraryIntFromInterval,
    getАrbitraryFromArray: getАrbitraryFromArray,
    buildItemsArrayWithGenerator: buildItemsArrayWithGenerator
  };
})();


