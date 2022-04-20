const IFRAMES: Array<HTMLIFrameElement> = []
let CREATED: Array<string> = []
let TYPE = 'waves'

const toDataURL = (url: string) => fetch(url)
  .then(response => response.blob())
  .then(blob => new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(blob)
}))

function dumpCSSText(element: HTMLElement){
  let s = '';
  const o = getComputedStyle(element);
  for(let i = 0; i < o.length; i++){
    s+=o[i] + ':' + o.getPropertyValue(o[i])+';';
  }
  return s;
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
  const imgs = document.getElementsByTagName("img");
  const visible = [];
  for (const img of imgs) {
    if (isInViewport(img)) {
      visible.push(img);
    }
  }
  return visible
}

function sendBlobToIframe(iframe: HTMLIFrameElement, url: string): Promise<void> {
  return new Promise((resolve) => {
    toDataURL(url).then((blob)=> {
      const _window = iframe.contentWindow
      console.log(`iframe src: ${iframe.src}`);
      window.addEventListener("message", function(e) {
          if ( e.data === "loaded" && e.origin === "null" && e.source === iframe.contentWindow) {
              _window.postMessage({type:'blob',blob}, "*")
              resolve();
          }
      })
    })
  })
}

// const created_to_display = new Map();
async function createIFrames() {
  const imgs = getVisibleImgs();
  for (const img of imgs) {
    if(!CREATED.includes(`${img.className}-${img.id}`)) {
      // created_to_display.set(key,value.currentImg.style.display)
      const iframe = document.createElement("iframe");
      iframe.id = `${img.className}-${img.id}`
      iframe.src = chrome.runtime.getURL(`iframe.html?type=${TYPE}`);
      iframe.style.cssText = dumpCSSText(img);
      img.style.display = "none"
      img.parentElement.prepend(iframe)
      CREATED.push(`${img.className}-${img.id}`)
      IFRAMES.push(iframe);
      await sendBlobToIframe(iframe, img.src);
    }
  }
}

export function deleteFrames() {
  for(const key of CREATED) {
    document.getElementById(key).remove();
  }
  CREATED = [];
}

export function enableImgs() {
  const currentImgs = document.getElementsByTagName("img");
  for (const currentImg of currentImgs) {
    currentImg.style.display = "block"
  }
}

export function setType(type: string) {
  TYPE = type;
}

export function scroll () {
  createIFrames();
}