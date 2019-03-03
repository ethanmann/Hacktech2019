function initialize_data(){
  chrome.storage.sync.get(["blockedSites"], function(item) {
    if (item == null){
      chrome.storage.sync.set({
        "blockedSites":new Array()
      });
    }
  }

  chrome.storage.sync.get(["blockingEnabled"], function(item) {
    if (item == null){
      chrome.storage.sync.set({
        "blockingEnabled":false
      });
    }
  }

  chrome.storage.sync.get(["potatoEnabled"], function(item) {
    if (item == null){
      chrome.storage.sync.set({
        "potatoEnabled":false
      });
    }
  }
}

function load_dropdowns(){

  // chrome.storage.sync.set({
  //   "blockedSites":new Array("test1", "test2", "test3"),
  // }, null);

  // take all of the stuff from chrome storage
  chrome.storage.sync.get(["blockedSites", "blockingEnabled", "potatoEnabled"], function(items) {
      const blockedSitesMenu = document.getElementById('blockedSitesMenu');
      for (let site of items.blockedSites){
          blockedSitesMenu.innerHTML += "<option value=\"" + site + "\">" + site + "</option>";
      }
      document.getElementById('enableBlockingButton').checked = items.blockingEnabled;
      document.getElementById('enablePotatoButton').checked = items.potatoEnabled;
  });
}

function unblock_site(){

  chrome.storage.sync.get({
       "blockedSites"]}, function(items) {
         // https://love2dev.com/blog/javascript-remove-from-array/
         const newBlockedSites = items.blockedSites.filter(function(ele){
           return ele != value;
            });
        chrome.storage.sync.set({ "blockedSites": newBlockedSites}, load_dropdowns);
      });
}

function block_site(){
  console.log("click");
  alert("click");
  // add it in a way that keeps it sorted???
  // or just call the .sort() method
  // allows duplicates, but shouldn't -> fix for the future
  chrome.storage.sync.get({"blockedSites":new Array(),},function(items){
    var newItem = document.getElementById('newBlockFilter');
    items.blockedSites.push(newItem.text);
    newItem.text = "";
    chrome.storage.sync.set({blockedSites: items.blockedSites}, null);
       });
}

function change_blocking_allowed(){
  // https://www.w3schools.com/howto/howto_js_toggle_hide_show.asp
  return;
}

function change_blocking_setting(){
  return;
}

document.addEventListener('DOMContentLoaded', () => {
  initialize_data();
  load_dropdowns();
  document.getElementById('unblockButton').addEventListener('click',unblock_site);
  document.getElementById('blockButton').addEventListener('click',block_site);
  document.getElementById('enableBlockingButton').addEventListener('click',change_blocking_allowed);
  document.getElementById('enablePotatoButton').addEventListener('click',change_blocking_setting);
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
