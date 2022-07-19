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

function renderEntry(entry) {
  var $listItem = document.createElement('li');
  $listItem.setAttribute('data-entry-id', entry.entryId);

  var $row = document.createElement('div');
  $row.setAttribute('class', 'row');
  $listItem.appendChild($row);

  var $colHalfImg = document.createElement('div');
  $colHalfImg.setAttribute('class', 'column-half');
  $row.appendChild($colHalfImg);

  var $img = document.createElement('img');
  $img.setAttribute('src', entry.photoUrl);
  $colHalfImg.appendChild($img);

  var $colHalfEntry = document.createElement('div');
  $colHalfEntry.setAttribute('class', 'column-half');
  $row.appendChild($colHalfEntry);

  var $entryH2 = document.createElement('h2');
  $entryH2.textContent = entry.title;
  $colHalfEntry.appendChild($entryH2);

}

var $ul = document.querySelector('ul');

function addEntry(entry) {
  for (var i = 0; i < data.entries.length; i++) {
    var totalEntries = renderEntry(data.entries[i]);
    $ul.appendChild(totalEntries);
  }

}
window.addEventListener('DOMContentLoaded', addEntry);
