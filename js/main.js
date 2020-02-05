'use strict'

var MOCK_COMMENTS = [
'Все отлично!',
'В целом все не плохо.Но не все.',
'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

// var MOCK_DESCRIPTIONS [
// ];

var NUMBER_OF_PHOTOS = 25;
var MIN_LIKES = 15;
var MAX_LIKES = 200;
var MIN_COMMENTS_COUNT = 0;
var MAX_COMMENTS_COUNT = 25;
var MIN_COMMENTS_AVATAR_COUNT = 1;
var MAX_COMMENTS_AVATAR_COUNT = 6;

var pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

var commentsTemplate = document.querySelector('.social__comment').cloneNode(true);

var getАrbitraryIntFromInterval = function (min, max) {
	return Math.floor(Math.random() * (max + 1 - min) + min);
};

var getАrbitraryFromArray = function (array) {
	return array[getАrbitraryIntFromInterval(0, array.length - 1)];
};

var getАrbitraryComment = function () {
	return (getАrbitraryIntFromInterval(1, 2) === 1) ? getАrbitraryFromArray(MOCK_COMMENTS) : getАrbitraryFromArray(MOCK_COMMENTS) + '' + getАrbitraryFromArray(MOCK_COMMENTS);
};

var buildItemsArrayWithGenerator = function (length, itemGenerator) {
	var itemsArray = [];
	for (var i = 0; i < length; i++) {
		itemsArray[i]=itemGenerator(i)
	}
	return itemsArray;
};

var getАrbitraryPhoto = function (photoCounter) {
	return {
		url: 'photos/' + (photoCounter + 1) + '.jpg',
		likes: getАrbitraryIntFromInterval(MIN_LIKES, MAX_LIKES),
		comments: buildItemsArrayWithGenerator(getАrbitraryIntFromInterval(MIN_COMMENTS_COUNT, MAX_COMMENTS_COUNT), getАrbitraryComment),
	};
};

var getPictureElement = function (picture) {
  var pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
  return pictureElement;
};


// Создание MOCK данных
var photos = buildItemsArrayWithGenerator(NUMBER_OF_PHOTOS, getАrbitraryPhoto);

// Создание и вставка на страницу превью изображений
var photoElementsList = document.createDocumentFragment();
for (var i = 0; i < NUMBER_OF_PHOTOS; i++) {
  photoElementsList.appendChild(getPictureElement(photos[i]));
}
document.querySelector('.pictures').appendChild(photoElementsList);

