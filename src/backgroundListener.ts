// const arr:string[] = ['google.com', 'games'];

function filteredURL(url: any){
  if (typeof(url) !== "string" || url === null){
    return false;
  }
  // https://www.tutorialkart.com/typescript/typescript-for-loop/
  // for(const item in ['google.com', 'games']){
  //   if (url.indexOf(item) !== -1){
  //     return true;
  //   }
  // }
  if (url.indexOf('google.com') !== -1){
    return true;
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
