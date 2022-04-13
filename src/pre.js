const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const img = new Image();
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log(request)
        console.log('Start breaking images into parts...')
        console.log(`iframe id: ${window.location.search.substring(1).split('=')[1]}`);
        let map = new Map(Object.entries(request));
        let info = map.get(window.location.search.substring(1).split('=')[1]);
        console.log(`Info ${JSON.stringify(info)}`);
        img.src = "https://alexandermorton.co.uk/68cb5bcc4e0025874fdb34456d66d09f.jpg";
        img.onload = () => {
            ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
        }
    }
);

// var button = document.querySelector('.my-button');
// button.addEventListener('click', function () {
//     console.log('I have been clicked');
//     var canvas = document.getElementById('canvas');
//     const ctx = canvas.getContext('2d');
//     const imageData = new ImageData(datas[0], width, height);
//     ctx.putImageData(imageData, 0, 0)
// });