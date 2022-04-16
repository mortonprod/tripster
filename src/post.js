const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const img = new Image();
img.src = "https://alexandermorton.co.uk/68cb5bcc4e0025874fdb34456d66d09f.jpg";
img.onload = () => {
    ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
}

var js_wrapped_fib = Module.cwrap("fib", "number", ["number"]);
var addOne = Module.cwrap("addOne", null, ["number", "number"]);

function pressBtn(){
    console.log("The result of fib(5) is:", js_wrapped_fib(5));
    var input_ptr = Module._malloc(4);
    var output_ptr = Module._malloc(4);
    var value = 6;                                   // value to increment by one
    Module.setValue(input_ptr, value, "i32");        // set the value in WASM memory
    addOne(input_ptr, output_ptr);                   // call the WASM function
    var result = Module.getValue(output_ptr, "i32"); // extract the result from WASM memory
    console.log("The result read is", result, "at position", output_ptr);
      
    // dealloc memory to avoid memory leaks
    Module._free(input_ptr);
    Module._free(output_ptr);
}