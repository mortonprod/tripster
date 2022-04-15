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

function getInfoImgs(): Map<string,{srcset: string, src: string, size:ISize, offset:IOffset}>  {
  const image_information = new Map();
  const currentImgs = document.getElementsByTagName("img");
  for (const currentImg of currentImgs) {
    image_information.set(`${currentImg.className}-${currentImg.id}-${currentImg.src}`,{
      srcset: currentImg.srcset,
      src: currentImg.src,
      size: getSize(currentImg),
      offset: getOffset(currentImg)
    })
  }
  return image_information
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
        offset: getOffset(currentImg)
      })
    }
  }
  return image_information
}
const created: Array<string> = []
function createIFrames () {
  const imgs = getVisibleImgs();
  for (const [key,value] of imgs.entries()) {
    if(!created.includes(key)) {
      console.log(`Create iframe for image: ${key}`);
      const newIframe = document.createElement("iframe");
      newIframe.src = chrome.runtime.getURL(`iframe.html?id=${key}`);
      newIframe.id = key;
      newIframe.style.cssText = `padding: 0px; margin: 0px; border:0px; top:${value.offset.top}px; left:${value.offset.left}px; width: ${value.size.width}px; height:${value.size.height}px; z-index:1000; position: absolute`
      document.body.appendChild(newIframe)
      created.push(key);
    }
  }
}

function resizeIFrames () {
  const imgs = getInfoImgs();
  for (const [key,value] of imgs.entries()) {
    if(created.includes(key)) {
      console.log(`Resize iframe for image: ${key}`);
      const iFrame = document.getElementById(key);
      iFrame.style= `padding: 0px; margin: 0px; border:0px; top:${value.offset.top}px; left:${value.offset.left}px; width: ${value.size.width}px; height:${value.size.height}px; z-index:1000; position: absolute`
    }
  }
}

export function scroll () {
  createIFrames();
}

export function resize () {
  resizeIFrames();
}