var button = document.querySelector('.my-button');
button.addEventListener('click', function() {
    console.log('I have been clicked');
});

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log("iframe.js got a message")
      console.log(request);
      console.log(sender);
    //   chrome.tabs.sendMessage(sender.tab.id, `Again ${request}`);
      sendResponse("bar from iframe");
    }
  );