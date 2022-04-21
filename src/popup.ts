import '../styles/popup.scss';

document.getElementById('go-to-options').addEventListener('click', () => {
  chrome.runtime.openOptionsPage();
});

const btn: HTMLButtonElement = document.querySelector('#btn');
const sb: HTMLSelectElement = document.querySelector('#framework');

chrome.storage.local.get("trip", function(data){
  console.log(`Trip stored: ${JSON.stringify(data)}`);
  sb.value = data.trip;
})

btn.onclick = (event) => {
    event.preventDefault();
    console.log(sb.value);
    chrome.storage.local.set({'trip': sb.value}, function(){
      chrome.tabs.query({currentWindow: true}, (tabs) => {
        for (const tab of tabs) {
          chrome.tabs.sendMessage(tab.id, {trip: sb.value}, (response) => {
            console.log(`Changed: ${JSON.stringify(response)}`);
          })
        }
      })
    })
};