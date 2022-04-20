import '../styles/popup.scss';

document.getElementById('go-to-options').addEventListener('click', () => {
  chrome.runtime.openOptionsPage();
});

const btn: HTMLButtonElement = document.querySelector('#btn');
const sb: HTMLSelectElement = document.querySelector('#framework');
btn.onclick = (event) => {
    event.preventDefault();
    console.log(sb.value);
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {trip: sb.value}, (response) => {
        console.log(`Changed: ${response.isConfirmed}`);
      })
    })
};