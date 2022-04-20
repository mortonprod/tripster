interface IOffset {
  left: number,
  top: number
}

interface ISize {
  width: number,
  height: number
}

function getOffset (el: HTMLElement): IOffset {
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY
  };
}

function getSize (el: HTMLElement): ISize {
  return {
    width: el.offsetWidth,
    height: el.offsetHeight
  };
}

function isInViewport(element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

function getVisibleImgs () {
  const currentImgs = document.getElementsByTagName("img");
  const image_information = new Map();
  for (const currentImg of currentImgs) {
    if (isInViewport(currentImg)) {
      image_information.set(`${currentImg.className}-${currentImg.id}-${currentImg.src}`,{
        srcset: currentImg.srcset,
        src: currentImg.src,
        size: getSize(currentImg),
        offset: getOffset(currentImg),
        currentImg
      })
    }
  }
  return image_information
}

function dumpCSSText(element: HTMLElement){
  let s = '';
  const o = getComputedStyle(element);
  for(let i = 0; i < o.length; i++){
    s+=o[i] + ':' + o.getPropertyValue(o[i])+';';
  }
  return s;
}

const toDataURL = (url: string) => fetch(url)
  .then(response => response.blob())
  .then(blob => new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(blob)
}))

function messageIFrames(iframe) {
  const _window = iframe.contentWindow
  console.log(`iframe src: ${iframe.src}`);
  window.addEventListener("message", function(e) {
      // console.log(`MESSAGE ${e.origin} --- ${e.data} --- ${iframe.src} --- ${iframe.src.split("/").splice(0, 3).join("/")}`);
      // wait for child to signal that it's loaded.
      // console.log(e);
      if ( e.data === "loaded" && e.origin === "null" && e.source === iframe.contentWindow) {
          // console.log('SEND MESSAGE');
          // send the child a message.
          _window.postMessage("Test BOOM", "*")
      }
  })
}

function callIFrames(iframes) {
  // console.log(`DOM loaded????  --- ${document.readyState}`);
  // if( document.readyState !== 'loading' ) {
  //   console.log('DOM should be loaded');
  //   window.addEventListener("DOMContentLoaded", function() {
  //     console.log('DOM loaded');
  //     for(const iframe of iframes) {
  //       messageIFrames(iframe);
  //     }
  //   }, false)
  // } else {
  //   console.log('DOM loaded before');
  //   for(const iframe of iframes) {
  //     messageIFrames(iframe);
  //   }
  // }
  for(const iframe of iframes) {
    messageIFrames(iframe);
    // if( document.readyState !== 'loading' ) {
    //   console.log(`DOM not loaded  --- ${document.readyState}`);
    //   window.addEventListener("DOMContentLoaded", function() {
    //     messageIFrames(iframe);
    //   })
    // } else {
    //   console.log(`DOM complete  --- ${document.readyState}`);
    //   messageIFrames(iframe);
    // }
  }
}

let created: Array<string> = []
// const created_to_display = new Map();
function createIFrames() {
  const imgs = getVisibleImgs();
  const iframes = [];
  for (const [key,value] of imgs.entries()) {
    if(!created.includes(key)) {
      console.log(`Create iframe for image: ${key}`);
      // created_to_display.set(key,value.currentImg.style.display)
      const newIframe = document.createElement("iframe");
      newIframe.src = chrome.runtime.getURL(`iframe.html?src=${value.src}`);
      newIframe.id = key;
      newIframe.style.cssText = dumpCSSText(value.currentImg);
      // newIframe.sandbox.add('allow-same-origin');
      // newIframe.sandbox.add('allow-scripts');
      // newIframe.sandbox.add('allow-scripts');
      // newIframe.sandbox.add('allow-same-origin');
      value.currentImg.style.display = "none"
      value.currentImg.parentElement.prepend(newIframe)
      created.push(key);
      iframes.push(newIframe);
    }
  }
  callIFrames(iframes);
}

export function deleteFrames() {
  for(const key of created) {
    document.getElementById(key).remove();
  }
  created = [];
}

export function enableImgs() {
  const currentImgs = document.getElementsByTagName("img");
  for (const currentImg of currentImgs) {
    currentImg.style.display = "block"
  }
}

export function scroll () {
  createIFrames();
}