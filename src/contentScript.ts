import { scroll, resize  } from "./contentUtils";
console.log("Content is up and running");

document.onreadystatechange = () => {
  // Need this or we resize repeatedly
  // let doresize: any;
  // window.onresize = function () {
  //   clearTimeout(doresize);
  //   doresize = setTimeout(resize, 500);
  // };
  // Scroll at the very start to we create the visible iframes
  scroll();
  // Need this or we scroll repeatedly
  let doscroll: any;
  window.onscroll = function () {
    clearTimeout(doscroll);
    doscroll = setTimeout(scroll, 500);
  }
  // TODO: Need to wait some time to ensure the iframes have been created
  // window.setTimeout(() => {
  //   console.log(`inside timeout ${imgs}`);
  //   chrome.runtime.sendMessage(Object.fromEntries(imgs), (temp) => {
  //     console.log(temp);
  //   })
  // }, 5000);
}