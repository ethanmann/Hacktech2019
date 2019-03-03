function load_dropdowns(){

}

function unblock_site(){

}

function block_site(){

}

function set_mode(){

}

document.addEventListener('DOMContentLoaded', () => {
  load_dropdowns();
  document.getElementById('unblockButton').addEventListener('click',unblock_site);
  document.getElementById('blockButton').addEventListener('click',block_site);
  document.getElementById('setModeButton').addEventListener('click',set_mode);
});


// // Saves options to chrome.storage
// function save_options() {
//   var color = document.getElementById('color').value;
//   var likesColor = document.getElementById('like').checked;
//   chrome.storage.sync.set({ // storage.sync means we will sync across Chrome
//     favoriteColor: color,
//     likesColor: likesColor
//   }, function() {
//     // Update status to let user know options were saved.
//     var status = document.getElementById('status');
//     status.textContent = 'Options saved.';
//     setTimeout(function() {
//       status.textContent = '';
//     }, 750);
//   });
// }
//
// // Restores select box and checkbox state using the preferences
// // stored in chrome.storage.
// function restore_options() {
//   // Use default value color = 'red' and likesColor = true.
//   chrome.storage.sync.get({
//     favoriteColor: 'red',
//     likesColor: true
//   }, function(items) {
//     document.getElementById('color').value = items.favoriteColor;
//     document.getElementById('like').checked = items.likesColor;
//   });
// }
//
// document.addEventListener('DOMContentLoaded', () => {
//   restore_options();
//   document.getElementById('save').addEventListener('click',
//       save_options);
// });
