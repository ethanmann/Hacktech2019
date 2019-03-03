let shouldBlock = false;

/***********
 * Overlay *
 ***********/
let unproductiveTimer = 0;
const TIMER_INTERVAL_MS = 100;
const MAX_OVERLAY_PERCENT = 75;
setInterval(() => {
  const timerDelta = 0.01 * (shouldBlock ? 1 : -1);
  unproductiveTimer = Math.max(0, unproductiveTimer + timerDelta);

  const message = {
    overlayScale: {
      heightPercent: Math.min(unproductiveTimer / 100, MAX_OVERLAY_PERCENT / 100),
      widthPercent: Math.min(unproductiveTimer / 100, MAX_OVERLAY_PERCENT / 100)
    },
    type: 'OVERLAY_SIZE_CHANGE'
  };

  chrome.runtime.sendMessage(message);
  chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
    chrome.tabs.sendMessage(tab.id!, message);
  });
}, TIMER_INTERVAL_MS);

const blockedList = ['games', 'twitter.com', 'reddit.com'];

const isBlockedURL = (url: string | null) => {
  if (url === null) {
    return false;
  }

  for (const blocked of blockedList) {
    if (url.indexOf(blocked) !== -1) {
      return true;
    }
  }

  return false;
}

const handleTabChange = (tabId: number) => {
  chrome.tabs.get(tabId, (tab) => {
    shouldBlock = isBlockedURL(tab.url!);
    if (shouldBlock) {
      chrome.tabs.executeScript(tabId, {
        file: 'static/js/index.js',
        runAt: 'document_start'
      });
    }
  });
}

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
