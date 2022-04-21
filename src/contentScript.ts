import { scroll, deleteFrames, enableImgs, setType } from "./contentUtils";
console.log("Content is up and running");

document.onreadystatechange = () => {
  // Need this or we scroll repeatedly
  let doscroll: any;
  function delayedScroll() {
    clearTimeout(doscroll);
    doscroll = setTimeout(scroll, 500);
  }
  chrome.runtime.onMessage.addListener((request, sender, sendResponse)=>{
    console.log(`Trip: ${JSON.stringify(request.trip)}`);
    setType(request.trip);
    console.log('Remove frames and stop generating...');
    window.removeEventListener('scroll', delayedScroll);
    deleteFrames();
    enableImgs();
    switch(request.trip){
      case 'none':
        console.log('Do nothing');
        sendResponse({isConfirmed: true, trip: 'none'});
        break;
      case 'waves':
        console.log('Generating waves...');
        scroll();
        window.addEventListener('scroll', delayedScroll);
        sendResponse({isConfirmed: true, trip: 'waves'});  
        break;
      case 'psychedelic':
        console.log('Generating psychedelic...');
        scroll();
        window.addEventListener('scroll', delayedScroll);
        sendResponse({isConfirmed: true, trip: 'waves'});  
        break;
    }
  })
}