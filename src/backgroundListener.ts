chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    chrome.tabs.executeScript(tabId, {
      file: 'static/js/index.js',
      runAt: 'document_end'
    });
  }
});
