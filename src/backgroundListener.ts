const blockedList = ['games','twitter.com','reddit.com'];

function isBlockedURL(url: any){
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

const handleTabChange = (tabId: number) => {
  chrome.tabs.get(tabId, (tab) => {
    if (isBlockedURL(tab.url!)) {
      chrome.tabs.executeScript(tabId, {
        file: 'static/js/index.js',
        runAt: 'document_end'
      });
      chrome.tabs.insertCSS(tabId, {
        file: 'static/css/index.css'
      });
    }
  });
}

let unproductiveTimer = 0;
const TIMER_INTERVAL = 100;
setInterval(() => {
  unproductiveTimer += 0.001;

  chrome.runtime.sendMessage({
    overlayScale: {
      heightPercent: Math.min(unproductiveTimer / 100, 1),
      widthPercent: Math.min(unproductiveTimer / 100, 1)
    },
    type: 'OVERLAY_SIZE_CHANGE'
  });

  chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
    chrome.tabs.sendMessage(tab.id!, {
      overlayScale: {
        heightPercent: unproductiveTimer,
        widthPercent: unproductiveTimer
      },
      type: 'OVERLAY_SIZE_CHANGE'
    });
  });
}, TIMER_INTERVAL);

chrome.tabs.onActivated.addListener((activeInfo) => {
   handleTabChange(activeInfo.tabId);
})

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    handleTabChange(tabId);
  }
});

// Resources not used
// https://stackoverflow.com/questions/1979583/how-can-i-get-the-url-of-the-current-tab-from-a-google-chrome-extension
// https://stackoverflow.com/questions/38352698/mousemove-event-not-triggering-in-chrome
// https://developer.chrome.com/extensions/tabs#method-query
