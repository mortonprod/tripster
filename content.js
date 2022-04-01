console.log("Content is up and running");

function getOffset (el) {
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY
  };
}

function getSize (el) {
  return {
    width: el.offsetWidth,
    height: el.offsetHeight
  };
}

document.onreadystatechange = () => {
  image_information = []
  var currentImgs = document.getElementsByTagName("img");
  let count = 0;
  for (const currentImg of currentImgs) {
    var offset = getOffset(currentImg)
    var size = getSize(currentImg)
    // console.log(offset);
    // console.log(size);
    image_information.push({
      srcset: currentImg.srcset,
      src: currentImg.src
    })
    // var newDiv = document.createElement("div");
    var newIframe = document.createElement("iframe");
    newIframe.src = chrome.extension.getURL("iframe.html");
    newIframe.id = count;
    // newDiv.style.cssText = `top:${offset.top}px; left:${offset.left}px; width: ${size.width}px; height:${size.height}px; z-index:1000; position: absolute`
    newIframe.style.cssText = `padding: 0px; margin: 0px; border:0px; top:${offset.top}px; left:${offset.left}px; width: ${size.width}px; height:${size.height}px; z-index:1000; position: absolute`
    // newDiv.appendChild(newIframe);
    document.body.appendChild(newIframe)
    count++;
  }
  resizedw = () => {
    count = 0;
    for (const currentImg of currentImgs) {
      var offset = getOffset(currentImg)
      var size = getSize(currentImg)
      // console.log(offset);
      // console.log(size);
      // console.log(count);
      var iFrame = document.getElementById(`${count}`);
      // console.log(`iFrame blah: ${iFrame}`);
      // iFrame.style.width = "100px";
      iFrame.style= `padding: 0px; margin: 0px; border:0px; top:${offset.top}px; left:${offset.left}px; width: ${size.width}px; height:${size.height}px; z-index:1000; position: absolute`
      count++;
    }
    chrome.runtime.sendMessage(image_information, (temp) => {
      console.log(temp);
    })
  }
  // Need this or we resize repeatedly
  var doit;
  window.onresize = function () {
    clearTimeout(doit);
    doit = setTimeout(resizedw, 100);
  };

  var importObject = {
    imports: {
      imported_func: function (arg) {
        console.log(arg);
      }
    }
  };
}