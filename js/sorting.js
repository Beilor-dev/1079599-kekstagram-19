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


  window.sorting = {
    arbitary: sortArbitary,
  };
})();
