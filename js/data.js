'use strict';

(function () {
  var MOCK_COMMENTS = [
  'Все отлично!',
  'В целом все не плохо.Но не все.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];
  var MOCK_DESCRIPTIONS = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'
  ];
  var MIN_LIKES = 15;
  var MAX_LIKES = 200;
  var NUMBER_OF_PHOTOS = 25;
  var MIN_COMMENTS_COUNT = 0;
  var MAX_COMMENTS_COUNT = 25;

// // Создание MOCK данных
//   var photos = buildItemsArrayWithGenerator(NUMBER_OF_PHOTOS, getАrbitraryPhoto);

  var getАrbitraryPhoto = function (photoCounter) {
    return {
      url: 'photos/' + (photoCounter + 1) + '.jpg',
      likes: window.utils.getАrbitraryIntFromInterval(MIN_LIKES, MAX_LIKES),
      comments: window.utils.buildItemsArrayWithGenerator(window.utils.getАrbitraryIntFromInterval(MIN_COMMENTS_COUNT, MAX_COMMENTS_COUNT), getАrbitraryComment),
      description: window.utils.getАrbitraryFromArray(MOCK_DESCRIPTIONS)
    };
  };

  var getАrbitraryComment = function () {
    return (window.utils.getАrbitraryIntFromInterval(1, 2) === 1) ? window.utils.getАrbitraryFromArray(MOCK_COMMENTS) : window.utils.getАrbitraryFromArray(MOCK_COMMENTS) + '' + window.utils.getАrbitraryFromArray(MOCK_COMMENTS);
  };

  window.data = {
    NUMBER_OF_PHOTOS: NUMBER_OF_PHOTOS,
    photos: window.utils.buildItemsArrayWithGenerator(NUMBER_OF_PHOTOS, getАrbitraryPhoto)
  };
})();