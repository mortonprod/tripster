chrome.runtime.onInstalled.addListener(async () => {
  // Here goes everything you want to execute after extension initialization

  console.log('Extension successfully installed!');
  chrome.storage.local.get("trip", function(data){
    console.log(`Changes trip: ${JSON.stringify(data.trip)}`)
    chrome.tabs.query({currentWindow: true}, (tabs) => {
      for (const tab of tabs) {
        chrome.tabs.sendMessage(tab.id, {trip: data.trip}, (response) => {
          console.log(`Changed: ${JSON.stringify(response)}`);
        })
      }
    })
  })

});

// Log storage changes, might be safely removed
chrome.storage.onChanged.addListener((changes) => {
  console.log(`Changes trip: ${changes.trip.newValue}`)
  chrome.tabs.query({currentWindow: true}, (tabs) => {
    for (const tab of tabs) {
      chrome.tabs.sendMessage(tab.id, {trip: changes.trip.newValue}, (response) => {
        console.log(`Changed: ${JSON.stringify(response)}`);
      })
    }
  })
});