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

  if (data.editing !== null) {
    entryData.entryId = data.editing.entryId;
    for (var i = 0; i < data.entries.length; i++) {
      if (data.editing.entryId === data.entries[i].entryId) {
        data.entries[i] = entryData;
        $ul.children[i].replaceWith(renderEntry(entryData));
        swapViewToEntries();
      }
    }
  } else {
    entryData.entryId = data.nextEntryId;
    data.nextEntryId++;
    data.entries.unshift(entryData);
    $ul.prepend(renderEntry(entryData));
    swapViews();
  }

  $image.setAttribute('src', '/images/placeholder-image-square.jpg');
  $formInputs.reset();
  data.view = 'entries';
  swapViews();
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
  $entryH2.setAttribute('class', 'space-between');
  $entryH2.textContent = entry.title;
  $colHalfEntry.appendChild($entryH2);

  var $editIcon = document.createElement('i');
  $editIcon.className = 'fa-solid fa-pen';
  $entryH2.appendChild($editIcon);

  var $entryP = document.createElement('p');
  $entryP.textContent = entry.notes;
  $colHalfEntry.appendChild($entryP);

  $noEntriesText.className = 'hidden';

  return $listItem;
}

function handleDomContent(event) {
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
  $image.setAttribute('src', '/images/placeholder-image-square.jpg');
  $formInputs.reset();
}
$newButton.addEventListener('click', swapViewToForm);

var $entryHeader = document.querySelector('.entry-header');

function clickEditIcon(event) {
  if (event.target && event.target.tagName === 'I') {
    var closestEntryView = event.target.closest('li');
    var entryIdNumber = closestEntryView.getAttribute('data-entry-id');
    $entryForm.setAttribute('class', 'view');
    $entries.setAttribute('class', 'hidden');
    swapViews();
    data.view = ('entry-form');
  }

  for (var i = 0; i < data.entries.length; i++) {
    if (Number(entryIdNumber) === data.entries[i].entryId) {
      data.editing = data.entries[i];
      $title.value = data.editing.title;
      $notes.value = data.editing.notes;
      $photoUrl.value = data.editing.photoUrl;
      $image.setAttribute('src', data.editing.photoUrl);
      swapViews();
    }
  }
  $entryHeader.textContent = 'Edit Entry';
}
$ul.addEventListener('click', clickEditIcon);

var $delete = document.getElementById('delete');
var $toggleModal = document.getElementById('toggle-modal');

function handleDelete(event) {
  if (event.target.className === 'delete-btn');
  $toggleModal.setAttribute('class', 'view');
}

$delete.addEventListener('click', handleDelete);

var $cancelButton = document.getElementById('cancel');

function handleCancel(event) {
  if (event.target.className === 'cancel-btn') {
    $toggleModal.setAttribute('class', 'hidden');
  }
}
$cancelButton.addEventListener('click', handleCancel);

var $confirmButton = document.getElementById('confirm');

function handleConfirm(event) {
  if (event.target.className === 'confirm-btn') {
    for (var d = 0; d < data.entries.length; d++) {
      if (data.entries[d] === data.editing) {
        data.entries.splice(d, 1);
        $ul.children[d].remove();
        $toggleModal.setAttribute('class', 'hidden');
        data.views = 'entries';
        swapViewToEntries();
      }
    }
  }
}
$confirmButton.addEventListener('click', handleConfirm);
