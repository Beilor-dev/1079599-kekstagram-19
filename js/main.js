'use strict'

var MOCK_COMMENTS = [
'Все отлично!',
'В целом все не плохо.Но не все.',
'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

// var MOCK_COMMENTS [
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

var commentsTemplate = document.querySelector('.social_comment').cloneNode(true);
