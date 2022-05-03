import '../styles/popup.scss';

document.getElementById('go-to-options').addEventListener('click', () => {
  chrome.runtime.openOptionsPage();
});

const btn: HTMLButtonElement = document.querySelector('#btn');
const sb: HTMLSelectElement = document.querySelector('#framework');

chrome.storage.local.get("trip", function(data){
  if(Object.prototype.hasOwnProperty.call(data, 'trip')) {
    console.log(`Changes trip: ${JSON.stringify(data.trip)}`)
    sb.value = data.trip;
  }
})

btn.onclick = (event) => {
    event.preventDefault();
    console.log(sb.value);
    chrome.storage.local.set({'trip': sb.value}, function(){
        console.log('Value set.')
    })
};