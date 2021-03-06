import * as R from 'ramda';

const defaultBlockedList: string[] = ['games', 'twitter.com', 'reddit.com'];
let shouldBlock = false;
/***********
 * Overlay *
 ***********/
const INITIAL_OVERLAY_POSITION = {
  x: 0,
  y: 0
};
const INITIAL_OVERLAY_MOVE_DIRECTION = {
  x: 1,
  y: 1
};
const INITIAL_OVERLAY_COLOR = 0;
let overlayPosition = INITIAL_OVERLAY_POSITION;
let overlayMoveDirection = INITIAL_OVERLAY_MOVE_DIRECTION;
let overlayColor = INITIAL_OVERLAY_COLOR;
let unproductiveTimer = 0;
const TIMER_INTERVAL_MS = 50;
const potatoMode = false;
const MAX_OVERLAY_PERCENT = potatoMode ? 75 : 50;
let audioPlayed = false;
setInterval(() => {
  const timerDelta = (potatoMode ? 0.5 : 0.1) * (shouldBlock ? 1 : -1);
  unproductiveTimer = Math.max(0, unproductiveTimer + timerDelta);
  const height = Math.min(unproductiveTimer, MAX_OVERLAY_PERCENT);
  const width = Math.min(unproductiveTimer, MAX_OVERLAY_PERCENT);

  const fullSize = height === MAX_OVERLAY_PERCENT || width === MAX_OVERLAY_PERCENT;
  const maxPosition = 100 - MAX_OVERLAY_PERCENT;
  if (fullSize) {
    if (!audioPlayed && potatoMode) {
      // const audio = new Audio('https://freesound.org/data/previews/362/362887_6048343-lq.mp3');
      const NAILS_ON_CHALKBOARD_AUDIO = 'http://soundbible.com/mp3/Knife%20Scrape%20Horror-SoundBible.com-1519171758.mp3';
      const audio = new Audio(NAILS_ON_CHALKBOARD_AUDIO);
      audio.play();
      audioPlayed = true;
    }

    if (overlayPosition.x === 0 || overlayPosition.x === maxPosition) {
      overlayMoveDirection.x *= -1;
    }
    if (overlayPosition.y === 0 || overlayPosition.y === maxPosition) {
      overlayMoveDirection.y *= -1;
    }

    const MOVE_SPEED = potatoMode ? 3 : (unproductiveTimer / 1000);
    const getPerturbation = () => potatoMode ? (2 * Math.random() - 1) : 0;
    overlayPosition.x += (overlayMoveDirection.x * MOVE_SPEED) + getPerturbation();
    overlayPosition.y += (overlayMoveDirection.y * MOVE_SPEED) + getPerturbation();

    if (overlayPosition.x < 0) {
      overlayPosition.x = 0;
    }
    if (overlayPosition.x > maxPosition) {
      overlayPosition.x = maxPosition;
    }
    if (overlayPosition.y < 0) {
      overlayPosition.y = 0;
    }
    if (overlayPosition.y > maxPosition) {
      overlayPosition.y = maxPosition;
    }

    const MAX_COLOR = 16777214;
    overlayColor = Math.floor(unproductiveTimer * (potatoMode ? 15 : 1)) % MAX_COLOR;
  } else {
    overlayMoveDirection = INITIAL_OVERLAY_MOVE_DIRECTION;
    overlayPosition = INITIAL_OVERLAY_POSITION;
    overlayColor = INITIAL_OVERLAY_COLOR;
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

const isBlockedURL = (blockedList: string[] | null, url: string | null) => {
  if (url === null) {
    return false;
  }

  const choiceList = (blockedList === null || blockedList.length === 0)
    ? defaultBlockedList
    : blockedList;

  return R.any(blocked => url.indexOf(blocked) !== -1, choiceList);
};

const handleTabChange = (tabId: number) => {
  chrome.storage.sync.get(['blockedSites', 'blockingEnabled'], ({ blockedSites, blockingEnabled }) => {
    chrome.tabs.get(tabId, (tab) => {
      shouldBlock = blockingEnabled && isBlockedURL(blockedSites, tab.url!);
      if (shouldBlock) {
        chrome.tabs.executeScript(tabId, {
          file: 'static/js/index.js',
          runAt: 'document_start'
        });
      }
    });
  });
};

chrome.tabs.onActivated.addListener(({ tabId }) => {
  handleTabChange(tabId);
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.status === 'complete') {
    handleTabChange(tabId);
  }
});

// Resources not used
// https://stackoverflow.com/questions/1979583/how-can-i-get-the-url-of-the-current-tab-from-a-google-chrome-extension
// https://stackoverflow.com/questions/38352698/mousemove-event-not-triggering-in-chrome
// https://developer.chrome.com/extensions/tabs#method-query
