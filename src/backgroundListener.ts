let shouldBlock = false;

/***********
 * Overlay *
 ***********/
let overlayPosition = {
  x: 0,
  y: 0
};
let overlayMoveDirection = {
  x: 1,
  y: 1
};
let overlayColor = 0;
let unproductiveTimer = 0;
const TIMER_INTERVAL_MS = 50;
const MAX_OVERLAY_PERCENT = 50;
setInterval(() => {
  const timerDelta = 0.1 * (shouldBlock ? 1 : -1);
  unproductiveTimer = Math.max(0, unproductiveTimer + timerDelta);
  const height = Math.min(unproductiveTimer, MAX_OVERLAY_PERCENT);
  const width = Math.min(unproductiveTimer, MAX_OVERLAY_PERCENT);

  const fullSize = height === MAX_OVERLAY_PERCENT || width === MAX_OVERLAY_PERCENT;
  const maxPosition = 100 - MAX_OVERLAY_PERCENT;
  if (fullSize) {
    if (overlayPosition.x < 0 || overlayPosition.x > maxPosition) {
      overlayMoveDirection.x *= -1;
    }
    if (overlayPosition.y < 0 || overlayPosition.y > maxPosition) {
      overlayMoveDirection.y *= -1;
    }

    const MOVE_SPEED = unproductiveTimer / 1000;
    overlayPosition.x += overlayMoveDirection.x * MOVE_SPEED;
    overlayPosition.y += overlayMoveDirection.y * MOVE_SPEED;

    const MAX_COLOR = 16777214;
    overlayColor = Math.floor(unproductiveTimer) % MAX_COLOR;
  }

  chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
    chrome.tabs.sendMessage(tab.id!, {
      overlay: {
        color: overlayColor,
        position: overlayPosition,
        size: {
          x: height,
          y: width
        }
      },
      type: 'OVERLAY_SIZE_CHANGE'
    });
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
