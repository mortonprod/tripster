import { scroll } from "./contentUtils";
console.log("Content is up and running");

document.onreadystatechange = () => {
  // Scroll at the very start to we create the visible iframes
  scroll();
  // Need this or we scroll repeatedly
  let doscroll: any;
  window.onscroll = function () {
    clearTimeout(doscroll);
    doscroll = setTimeout(scroll, 500);
  }
  chrome.runtime.onMessage.addListener((request, sender, sendResponse)=>{
    console.log(`Trip: ${request.trip}`);
    sendResponse({isConfirmed: true});
  })
}