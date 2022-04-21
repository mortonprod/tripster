const IFRAMES: Array<HTMLIFrameElement> = []
let CREATED: Array<string> = []
let TYPE = 'psychedelic'

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

function sendBlobToIframe(iframe: HTMLIFrameElement, img: HTMLImageElement): Promise<void> {
  return new Promise((resolve) => {
    // console.log(`url: ${url}`);
    toDataURL(img.src).then((blob)=> {
      const _window = iframe.contentWindow
      console.log(`iframe src: ${iframe.src}`);
      window.addEventListener("message", function(e) {
          if ( e.data === "loaded" && e.origin === "null" && e.source === iframe.contentWindow) {
              _window.postMessage({type:'blob',blob}, "*")
              // img.parentElement.prepend(iframe)
              // iframe.style.cssText = dumpCSSText(img);
              img.style.display = "none"
              iframe.style.display = "block"
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
    if(!CREATED.includes(`${img.className}-${img.id}-${img.src}`)) {
      const iframe = document.createElement("iframe");
      iframe.id = `${img.className}-${img.id}-${img.src}`
      iframe.src = chrome.runtime.getURL(`iframe.html?type=${TYPE}`);
      iframe.style.cssText = dumpCSSText(img);
      // img.style.display = "none"
      iframe.style.display = "none"
      img.parentElement.prepend(iframe)
      CREATED.push(`${img.className}-${img.id}-${img.src}`)
      IFRAMES.push(iframe);
      await sendBlobToIframe(iframe, img);
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