var $photoUrl = document.querySelector('#photo-url');
var $image = document.querySelector('#entry-img');
var $title = document.querySelector('#title');
var $notes = document.querySelector('#notes');
var $formInputs = document.getElementById('inputs');

function updateImgSrc(event) {
  $image.setAttribute('src', event.target.value);
}
$photoUrl.addEventListener('input', updateImgSrc);

function saveEntry(event) {
  event.preventDefault();
  var entryData = {
    title: $title.value,
    photoUrl: $photoUrl.value,
    notes: $notes.value
  };
  entryData.entryId = data.nextEntryId;
  data.nextEntryId++;
  data.entries.unshift(entryData);
  $image.setAttribute('src', '/images/placeholder-image-square.jpg');
  $formInputs.reset();
}

$formInputs.addEventListener('submit', saveEntry);
