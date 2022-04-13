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
        // for(const [key,value] of new Map(Object.entries(request))) {
        //     console.log(`Before ${img.width} and ${img.height}`);
        //     img.src = "https://alexandermorton.co.uk/68cb5bcc4e0025874fdb34456d66d09f.jpg";
        //     // img.width = value.size.width*0.1
        //     // img.height = value.size.height*0.1
        //     img.onload = () => {
        //         console.log(`${img.width} and ${img.height}`);
        //         // img.width = value.size.width
        //         // img.height = value.size.height
        //         // console.log(`offset: ${canvas.offsetWidth}`);
        //         ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, value.size.width, value.size.height);
        //         // ctx.drawImage(img, 0, 0)
        //         // const imageData = ctx.getImageData(0, 0, canvas.offsetWidth, 100);
        //         // ctx.putImageData(imageData, 0, 0)
        //     }
        // }
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