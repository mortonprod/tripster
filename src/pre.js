const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const img = new Image();
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log(request)
        console.log('Start breaking images into parts...')
        for(const [key,value] of new Map(Object.entries(request))) {
            img.src = "https://alexandermorton.co.uk/68cb5bcc4e0025874fdb34456d66d09f.jpg";
            img.onload = () => {
                // console.log(`offset: ${canvas.offsetWidth}`);
                // ctx.drawImage(img, 0, 0);
                ctx.drawImage(img, 0, 0, 100, 100 * img.height / img.width)
                // const imageData = ctx.getImageData(0, 0, canvas.offsetWidth, 100);
                // ctx.putImageData(imageData, 0, 0)
            }
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