document.addEventListener('DOMContentLoaded', function () {
  var popBtn = document.querySelector('.pop-btn');
  var lightbox = document.getElementById('lightbox');
  var closeButton = document.querySelector('.close-btn');

  popBtn.addEventListener('click', function () {
    lightbox.style.display = 'block';
  });

  lightbox.addEventListener('click', function (event) {
    if (event.target === lightbox) {
      lightbox.style.display = 'none';
    }
  });

  closeButton.addEventListener('click', function () {
    lightbox.style.display = 'none';
  });
});
