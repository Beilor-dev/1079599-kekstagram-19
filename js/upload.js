'use strict';

(function () {
  var FILE_TYPES = ['jpg', 'jpeg', 'png', 'png', 'gif', 'webp'];

  var imgUploadFile = document.querySelector('#upload-file');
  var previewUploadFile = document.querySelector('.img-upload__preview img');

  imgUploadFile.addEventListener('change', function () {
    var file = imgUploadFile.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        previewUploadFile.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  });
  // document.querySelector('#upload-file').addEventListener('change', function (evt) {
  //  var file = evt.target.files[0];
  //   var reader = new FileReader();
  //   reader.addEventListener('load', function () {
  //     document.querySelector('.img-upload__preview img').src = reader.result;
  //   });
  //   reader.readAsDataURL(file);
  // });
})();


