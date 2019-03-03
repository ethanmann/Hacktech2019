function load_dropdowns(){

  // take all of the stuff from chrome storage
  chrome.storage.sync.get({
       "blockedSites": ["test"],
       "blockingEnabled": false,
       "potatoEnabled": false
  }, function(items) {
      const blockedSitesMenu = document.getElementById('blockedSitesMenu');
      for (let site of items.blockedSites){
          blockedSitesMenu.innerHTML += site;
      }
  //     document.getElementById('color').value = items.favoriteColor;
  //     document.getElementById('like').checked = items.likesColor;
  //   });
  alert("TEST");
}

function unblock_site(){
  return;
}

function block_site(){
  // add it in a way that keeps it sorted???
  // or just call the .sort() method
  return;
}

function enable_blocking(){
  return;
}

function disable(){
  return;
}

document.addEventListener('DOMContentLoaded', () => {
  load_dropdowns();
  document.getElementById('unblockButton').addEventListener('click',unblock_site);
  document.getElementById('blockButton').addEventListener('click',block_site);
  document.getElementById('enableBlockingButton').addEventListener('click',enable_blocking);
  document.getElementById('enablePotatoButton').addEventListener('click',enable_potato);
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
