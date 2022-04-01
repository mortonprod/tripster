var canvas = document.createElement("canvas");
const ctx = canvas.getContext('2d');
datas = [] 
function imageToData(src, width, height) {
    const img = new Image();
    img.src = src;
    img.onload = () => {
        ctx.drawImage(img, 0, 0, 100, 100);
        const imageData = ctx.getImageData(0, 0, 100, 100);
        datas.push(imageData.data);
    }
}
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log('Start breaking images into parts...')
        for(const img of request) {
            imageToData(img.src, 100, 100);
        }
        console.log("iframe.js got a message")
        console.log(request);
        console.log(sender);
        //   chrome.tabs.sendMessage(sender.tab.id, `Again ${request}`);
        sendResponse("bar from iframe");
    }
);

var button = document.querySelector('.my-button');
button.addEventListener('click', function () {
    console.log('I have been clicked');
    var canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const imageData = new ImageData(datas[0], 100, 100);
    ctx.putImageData(imageData, 100, 100)
});