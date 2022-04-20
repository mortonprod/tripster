import { scroll, deleteFrames, enableImgs, setType } from "./contentUtils";
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
    setType(request.trip);
    switch(request.trip){
      case 'none':
        console.log('Remove frames and stop generating...');
        window.removeEventListener('scroll', delayedScroll);
        deleteFrames();
        enableImgs();
        sendResponse({isConfirmed: true, trip: 'none'});
        break;
      case 'waves':
        console.log('Generating waves...');
        scroll();
        window.addEventListener('scroll', delayedScroll);
        sendResponse({isConfirmed: true, trip: 'waves'});  
        break;
    }
  })
}