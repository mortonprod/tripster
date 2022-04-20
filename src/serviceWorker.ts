import { initializeStorageWithDefaults } from './storage';

chrome.runtime.onInstalled.addListener(async () => {
  // Here goes everything you want to execute after extension initialization

  await initializeStorageWithDefaults({});

  console.log('Extension successfully installed!');

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
});

// Log storage changes, might be safely removed
chrome.storage.onChanged.addListener((changes) => {
  for (const [key, value] of Object.entries(changes)) {
    console.log(
      `"${key}" changed from "${value.oldValue}" to "${value.newValue}"`,
    );
  }
});

// const img = new Image();

// img.src = "https://alexandermorton.co.uk/68cb5bcc4e0025874fdb34456d66d09f.jpg";
// // img.crossOrigin = "anonymous";
// img.onload = () => {
//   console.log('Loaded');
// }
