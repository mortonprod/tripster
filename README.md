# Running

emcc --pre-js src/pre.js -o static/iframe.js src/hello/hello.c

# Issues

How do we get images in the iframe context when it will not have the access rights to get to that webpage? No access to cookies or JWT

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