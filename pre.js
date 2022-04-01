var button = document.querySelector('.my-button');
button.addEventListener('click', function () {
    console.log('I have been clicked');
});

var canvas = document.createElement("canvas");
const ctx = canvas.getContext('2d');
function imageToData(src, width, height) {
    const img = new Image();
    img.src = src;
    img.onload = () => {
        ctx.drawImage(img, 0, 0, width, height);
        const imageData = ctx.getImageData(0, 0, width, height);
        const data = imageData.data;
        console.log(`Image ${data}`);
    }
}

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        for(const img of request) {
            imageToData(img.src, 100, 100)
        }
        console.log("iframe.js got a message")
        console.log(request);
        console.log(sender);
        //   chrome.tabs.sendMessage(sender.tab.id, `Again ${request}`);
        sendResponse("bar from iframe");
    }
);