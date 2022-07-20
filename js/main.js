var $photoUrl = document.querySelector('#photo-url');
var $image = document.querySelector('#entry-img');
var $title = document.querySelector('#title');
var $notes = document.querySelector('#notes');
var $formInputs = document.getElementById('inputs');
var $ul = document.querySelector('ul');
var $noEntriesText = document.querySelector('.no-entries-text');

function updateImgSrc(event) {
  $image.setAttribute('src', event.target.value);
}
$photoUrl.addEventListener('input', updateImgSrc);

function handleSubmit(event) {
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
  data.view = 'entries';
  $ul.prepend(renderEntry(entryData));
  $noEntriesText.className = 'hidden';
  swapViews();
  $formInputs.reset();
}

$formInputs.addEventListener('submit', handleSubmit);

function renderEntry(entry) {
  var $listItem = document.createElement('li');
  $listItem.setAttribute('data-entry-id', entry.entryId);

  var $row = document.createElement('div');
  $row.setAttribute('class', 'row margin-bottom50');
  $listItem.appendChild($row);

  var $colHalfImg = document.createElement('div');
  $colHalfImg.setAttribute('class', 'column-half center');
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

  var $editIcon = document.createElement('i');
  $editIcon.className = 'fa-solid fa-pen';
  $entryH2.appendChild($editIcon);

  var $entryP = document.createElement('p');
  $entryP.textContent = entry.notes;
  $colHalfEntry.appendChild($entryP);

  return $listItem;
}

function handleDomContent(event) {
  $noEntriesText.className = 'hidden';
  swapViews();
  for (var i = 0; i < data.entries.length; i++) {
    var newEntry = renderEntry(data.entries[i]);
    $ul.append(newEntry);
  }
}
window.addEventListener('DOMContentLoaded', handleDomContent);

var $headerEntries = document.querySelector('.header-entries');
var $newButton = document.getElementById('new-btn');
var $entryForm = document.querySelector('.view');
var $entries = document.querySelector('.entries');

function swapViews() {
  if (data.view === 'entries') {
    $entries.className = 'entries';
    $entryForm.className = 'hidden';
  } else if (data.view === 'entry-form') {
    $entries.className = 'hidden';
    $entryForm.className = 'entry-form';
  }
}

function swapViewToEntries(event) {
  data.view = 'entries';
  swapViews();
}
$headerEntries.addEventListener('click', swapViewToEntries);

function swapViewToForm(event) {
  data.view = 'entry-form';
  swapViews();
}
$newButton.addEventListener('click', swapViewToForm);

window.addEventListener('load', swapViews(event));
// end issue 2
