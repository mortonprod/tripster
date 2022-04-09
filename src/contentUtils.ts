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

export function getInfoImgs(): Map<string,{srcset: string, src: string, size:ISize, offset:IOffset}>  {
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