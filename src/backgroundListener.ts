const blockedList = ['games','twitter.com','reddit.com'];

function filteredURL(url: any){
  if (typeof(url) !== "string" || url === null){
    return false;
  }

  // https://www.typescriptlang.org/docs/handbook/iterators-and-generators.html
  for (const blocked of blockedList){
    if (url.indexOf(blocked) !== -1){
      return true;
    }
  }
  return false;
}

function checkURLFromID(tabId: any){
  chrome.tabs.get(tabId, (tab) => {
    if (filteredURL(tab.url)){
      chrome.tabs.executeScript(tabId, {
        file: 'static/js/index.js',
        runAt: 'document_end'
      });
    }
  });
}

// https://developer.chrome.com/extensions/tabs
chrome.tabs.onActivated.addListener((activeInfo) => {
   checkURLFromID(activeInfo.tabId);
})

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    checkURLFromID(tabId);
  }
});

// Resources not used
// https://stackoverflow.com/questions/1979583/how-can-i-get-the-url-of-the-current-tab-from-a-google-chrome-extension
// https://stackoverflow.com/questions/38352698/mousemove-event-not-triggering-in-chrome
// https://developer.chrome.com/extensions/tabs#method-query
