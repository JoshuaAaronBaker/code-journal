/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var previousDataJSON = localStorage.getItem('javascript-codejournal-local-storage');

if (previousDataJSON !== null) {
  data = JSON.parse(previousDataJSON);
}

function storeItems(event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('javascript-codejournal-local-storage', dataJSON);
}

window.addEventListener('beforeunload', storeItems);
