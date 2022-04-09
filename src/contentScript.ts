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
    console.log(`inside resize ${imgs}`);
    chrome.runtime.sendMessage(Object.fromEntries(imgs), (temp) => {
      console.log(temp);
    })
  }
  // Need this or we resize repeatedly
  let doit;
  window.onresize = function () {
    clearTimeout(doit);
    doit = setTimeout(resizedw, 100);
  };
    // Need this or we scroll repeatedly
  let doitscroll;
  window.onscroll = function () {
    console.log('scroll');
    clearTimeout(doitscroll);
    doit = setTimeout(resizedw, 100);
  };
  // TODO: Need to wait some time to ensure the iframes have been created
  window.setTimeout(() => {
    console.log(`inside timeout ${imgs}`);
    chrome.runtime.sendMessage(Object.fromEntries(imgs), (temp) => {
      console.log(temp);
    })
  }, 5000);
}