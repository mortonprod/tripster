# Running

## Hello World

emcc --pre-js src/pre.js -o static/iframe.js src/hello/hello.c

## Image Manipulation

emcc --post-js src/post.js -o static/iframe.js src/image/main.c -s WASM=1 -s EXPORTED_FUNCTIONS='["_fib", "_addOne", "_malloc", "_free"]' -s EXPORTED_RUNTIME_METHODS='["cwrap", "getValue", "setValue"]' -s ALLOW_MEMORY_GROWTH

# Issues

* How do we get images in the iframe context when it will not have the access rights to get to that webpage? No access to cookies or JWT
* Will need to update to manifest version 3 by the end of the year but can't now since can't run wasm in extension with this.
* How do you get a random picture to fit a random frame in another website.
# Reference

https://github.com/GoogleChromeLabs/wasm-av1
https://web.dev/wasm-av1/
https://github.com/dteare/wasm-csp
https://github.com/inflatablegrade/Extension-with
https://www.weforum.org/agenda/2021/06/deep-learning-animated-moving-photos/
https://blog.tensorflow.org/2020/09/bringing-mona-lisa-effect-to-life-tensorflow-js.html
https://surma.dev/things/c-to-webassembly
https://github.com/sszczep/chrome-extension-webpack
https://stackoverflow.com/questions/69321549/webassembly-inside-chrome-extension-in-sandbox-with-manifest-v3
https://marcoselvatici.github.io/WASM_tutorial/
https://compile.fi/canvas-filled-three-ways-js-webassembly-and-webgl/