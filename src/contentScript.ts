import { getInfoImgs  } from "./contentUtils";
console.log("Content is up and running");

document.onreadystatechange = () => {
  const imgs = getInfoImgs();
  for (const [key,value] of imgs.entries()) {
    // let newDiv = document.createElement("div");
    const newIframe = document.createElement("iframe");
    newIframe.src = chrome.runtime.getURL("iframe.html");
    newIframe.id = key;
    // newDiv.style.cssText = `top:${offset.top}px; left:${offset.left}px; width: ${size.width}px; height:${size.height}px; z-index:1000; position: absolute`
    newIframe.style.cssText = `padding: 0px; margin: 0px; border:0px; top:${value.offset.top}px; left:${value.offset.left}px; width: ${value.size.width}px; height:${value.size.height}px; z-index:1000; position: absolute`
    // newDiv.appendChild(newIframe);
    document.body.appendChild(newIframe)
  }
  const resizedw = () => {
    const imgs = getInfoImgs();
    for (const [key,value] of imgs.entries()) {
      const iFrame = document.getElementById(key);
      // console.log(`iFrame blah: ${iFrame}`);
      // iFrame.style.width = "100px";
      iFrame.style= `padding: 0px; margin: 0px; border:0px; top:${value.offset.top}px; left:${value.offset.left}px; width: ${value.size.width}px; height:${value.size.height}px; z-index:1000; position: absolute`
    }
  }
  // Need this or we resize repeatedly
  let doit;
  window.onresize = function () {
    clearTimeout(doit);
    doit = setTimeout(resizedw, 100);
  };

  // const importObject = {
  //   imports: {
  //     imported_func: function (arg) {
  //       console.log(arg);
  //     }
  //   }
  // };

  //TODO: Make this more generic than a single frame
  // Also need to upgrade from simple timeout because below DOES NOT WORK!
  // function checkIframeLoaded() {
  //   let iframe = document.getElementById('0');
  //   let iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
  //   if (  iframeDoc.readyState  == 'complete' ) {
  //       console.log('Send img info');
  //       iframe.contentWindow.onload = function(){
  //         chrome.runtime.sendMessage(image_information, (temp) => {
  //           console.log(temp);
  //         })
  //       }
  //       return;
  //   } 

  //   // If we are here, it is not loaded. Set things up so we check   the status again in 100 milliseconds
  //   window.setTimeout(checkIframeLoaded, 100);
  // }
  // checkIframeLoaded();

  window.setTimeout(() => {
    chrome.runtime.sendMessage(image_information, (temp) => {
      console.log(temp);
    })
  }, 5000);
}