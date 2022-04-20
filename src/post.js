const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d',  {
	alpha: false,
	antialias: false,
	depth: false
});
// const img = new Image();


Module['onRuntimeInitialized'] = () => {
	console.log(`Initial width ${canvas.width} ${canvas.height}`);
	var _init = Module.cwrap("init", "number", ["number", "number"]);
	var _render = Module.cwrap("render", null, ["number"]);
	var pointer = _init(canvas.width, canvas.height);
	var pointer = Module._init(canvas.width, canvas.height);
	var data = new Uint8ClampedArray(Module.HEAPU8.buffer, pointer, canvas.width * canvas.height * 4);
	var img = new ImageData(data, canvas.width, canvas.height);
	var render = (timestamp) => {
		_render(timestamp);
		ctx.putImageData(img, 0, 0);
		window.requestAnimationFrame(render);
	};
	window.requestAnimationFrame(render);
}

// img.src = "https://alexandermorton.co.uk/68cb5bcc4e0025874fdb34456d66d09f.jpg";
// img.crossOrigin = "anonymous";
// img.onload = () => {
//     ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
//     var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
//     var input_ptr = Module._malloc(canvas.width * canvas.height * 4);
//     Module.HEAPU8.set(imageData.data, input_ptr);
//     blackStrips(input_ptr,canvas.width,canvas.height);
// }

var js_wrapped_fib = Module.cwrap("fib", "number", ["number"]);
var addOne = Module.cwrap("addOne", null, ["number", "number", "number"]);

function pressBtn(){
	var input_array = new Int32Array([10, 5, -3, 120, -70]); // array of 32-bit signed int to pass
	var len = input_array.length;					         // 5 elements
	var bytes_per_element = input_array.BYTES_PER_ELEMENT;   // 4 bytes each element
    
	// alloc memory, in this case 5*4 bytes
	var input_ptr = Module._malloc(len * bytes_per_element);
	var output_ptr = Module._malloc(len * bytes_per_element);
    
	Module.HEAP32.set(input_array, input_ptr / bytes_per_element); // write WASM memory calling the set method of the Int32Array, (see below for details)
	addOne(input_ptr, output_ptr, len);   	                       // call the WASM function
	var output_array = new Int32Array(Module.HEAP32.buffer, output_ptr, len); // extract data to another JS array
	console.log("The starting array was:", input_array);
	console.log("The result read is:	", output_array);
    
	// dealloc memory
	Module._free(input_ptr);
	Module._free(output_ptr);
}