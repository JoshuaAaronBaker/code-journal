var $photoUrl = document.querySelector('#photo-url');
var $image = document.querySelector('#entry-img');

function updateImgSrc(event) {
  $image.setAttribute('src', event.target.value);
}
$photoUrl.addEventListener('input', updateImgSrc);
