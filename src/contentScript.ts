import { scroll, deleteFrames, enableImgs } from "./contentUtils";
console.log("Content is up and running");

document.onreadystatechange = () => {
  // Scroll at the very start to we create the visible iframes
  scroll();
  // Need this or we scroll repeatedly
  let doscroll: any;
  function delayedScroll() {
    clearTimeout(doscroll);
    doscroll = setTimeout(scroll, 500);
  }
  window.addEventListener('scroll', delayedScroll);
  chrome.runtime.onMessage.addListener((request, sender, sendResponse)=>{
    console.log(`Trip: ${request.trip}`);
    if(request.trip === 'none') {
      console.log('Remove frames and stop generating...');
      window.removeEventListener('scroll', delayedScroll);
      deleteFrames();
      enableImgs();
      sendResponse({isConfirmed: true, trip: 'none'});
    }
  })
}