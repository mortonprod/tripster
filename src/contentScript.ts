import { getInfoImgs  } from "./contentUtils";
console.log("Content is up and running");

document.onreadystatechange = () => {
  const imgs = getInfoImgs();
  for (const [key,value] of imgs.entries()) {
    console.log(`Create iframe for image: ${key}`);
    const newIframe = document.createElement("iframe");
    newIframe.src = chrome.runtime.getURL(`iframe.html?id=${key}`);
    newIframe.id = key;
    newIframe.style.cssText = `padding: 0px; margin: 0px; border:0px; top:${value.offset.top}px; left:${value.offset.left}px; width: ${value.size.width}px; height:${value.size.height}px; z-index:1000; position: absolute`
    document.body.appendChild(newIframe)
  }
  const resizedw = () => {
    const imgs = getInfoImgs();
    for (const [key,value] of imgs.entries()) {
      console.log(`Resize iframe for image: ${key}`);
      const iFrame = document.getElementById(key);
      iFrame.style= `padding: 0px; margin: 0px; border:0px; top:${value.offset.top}px; left:${value.offset.left}px; width: ${value.size.width}px; height:${value.size.height}px; z-index:1000; position: absolute`
    }
  }
  // Need this or we resize repeatedly
  let doit;
  window.onresize = function () {
    clearTimeout(doit);
    doit = setTimeout(resizedw, 100);
  };
  // TODO: Need to wait some time to ensure the iframes have been created
  // window.setTimeout(() => {
  //   console.log(`inside timeout ${imgs}`);
  //   chrome.runtime.sendMessage(Object.fromEntries(imgs), (temp) => {
  //     console.log(temp);
  //   })
  // }, 5000);
}