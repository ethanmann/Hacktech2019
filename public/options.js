const ensureValidSettings = () => {
  chrome.storage.sync.get(['blockingEnabled', 'blockedSites', 'potatoEnabled'], ({ blockingEnabled, blockedSites, potatoEnabled }) => {
    if (blockedSites === null || blockedSites.length === 0) {
      chrome.storage.sync.set({
        blockedSites: []
      });
    }

    if (blockingEnabled === null) {
      chrome.storage.sync.set({
        blockingEnabled: false
      });
    }

    if (potatoEnabled === null) {
      chrome.storage.sync.set({
        potatoEnabled: false
      });
    }

    console.log('Initialized settings!');
  });
};

const loadUI = () => {
  chrome.storage.sync.get(['blockedSites', 'blockingEnabled', 'potatoEnabled'], function({ blockedSites, blockingEnabled, potatoEnabled }) {
      const blockedSitesMenu = document.getElementById('blockedSitesMenu');
      if (blockedSites !== null && blockedSites.length !== 0) {
        blockedSitesMenu.innerHTML = '';
        for (const site of blockedSites) {
            blockedSitesMenu.innerHTML += '<option value="' + site + '">' + site + '</option>';
        }
      }

    document.getElementById('potatoModeDiv').style.display = blockingEnabled ?
      'none' : 'block';
    document.getElementById('enableBlockingButton').checked = blockingEnabled;
    document.getElementById('enablePotatoButton').checked = potatoEnabled;

    console.log("Loaded dropdowns!");
  });
}

const initialize = () => {
  ensureValidSettings();
  loadUI();
};

// function unblock_site(){
//   chrome.storage.sync.get(["blockedSites"], function(items) {
//          // https://love2dev.com/blog/javascript-remove-from-array/
//          const newBlockedSites = items.blockedSites.filter(function(ele){
//            return ele != value;
//             });
//         chrome.storage.sync.set({ "blockedSites": newBlockedSites}, load_dropdowns);
//       });
// }

const blockSite = () => {
  // add it in a way that keeps it sorted???
  // or just call the .sort() method
  // allows duplicates, but shouldn't -> fix for the future
  // Store in a sorted set, maybe?
  chrome.storage.sync.get(['blockedSites'], ({ blockedSites }) => {
    const newItem = document.getElementById('newBlockFilter');
    blockedSites.push(newItem.value);
    newItem.value = '';
    chrome.storage.sync.set({ blockedSites });
    loadUI();
  });
};

const toggleBlockingEnabled = () => {
  const enableBoxChecked = document.getElementById('enableBlockingButton').checked;
  chrome.storage.sync.set({
    blockingEnabled: enableBoxChecked
  });
  loadUI();
};

initialize();
document.addEventListener('DOMContentLoaded', () => {
    // document.getElementById('unblockButton').addEventListener('click',unblock_site);
    document.getElementById('blockButton').addEventListener('click', blockSite);
    document.getElementById('enableBlockingButton').addEventListener('click',toggleBlockingEnabled);
    // document.getElementById('enablePotatoButton').addEventListener('click',change_blocking_setting);
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
