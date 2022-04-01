console.log('Background running');

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log("background.js got a message")
    console.log(request);
    console.log(sender);
    console.log(sender.tab.id);
    chrome.tabs.sendMessage(sender.tab.id, request);
    sendResponse("bar");
  }
);