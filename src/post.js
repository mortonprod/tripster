const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const img = new Image();
img.src = "https://alexandermorton.co.uk/68cb5bcc4e0025874fdb34456d66d09f.jpg";
img.onload = () => {
    ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
}

var js_wrapped_fib = Module.cwrap("fib", "number", ["number"]);

function pressBtn(){
    console.log("The result of fib(5) is:", js_wrapped_fib(5));
}