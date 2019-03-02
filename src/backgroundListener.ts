chrome.tabs.onCreated.addListener((tab) => {
  chrome.tabs.executeScript(tab.id!, {
    code: "console.log('woo');"
  });
});
