'use strict';

(function () {
  var ARBITARY_COUNT = 10;

  var sortArbitary = function (data) {
    var total = [];
    var localData = data.slice(0);
    for (var i = 0; i < ARBITARY_COUNT; i++) {
      total = total.concat(localData.splice(window.utils.getАrbitraryIntFromInterval(0, localData.length), 1));
    }
    return total;
  };

  var sortOnComments = function (data) {
    var localData = data.slice(0);
    return localData.sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
  };

  window.sorting = {
    arbitary: sortArbitary,
    onComments: sortOnComments,
  };
})();
