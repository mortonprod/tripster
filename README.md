# Introduction

This app scans a website and changes all images to a canvas element which we manipulate through web assembly.

# Building

**Remember to increase version number for production build**

```
emcc --post-js src/post.js -o static/iframe.js src/image/main.c -s WASM=1 -s EXPORTED_FUNCTIONS='["_render", "_init", "_psyrender"]' -s EXPORTED_RUNTIME_METHODS='["cwrap"]' -s ALLOW_MEMORY_GROWTH
npm run build
cd dist
 zip -r ../extension.zip *
```

*Note: The build is set to development since you can't minimise code sent to chrome developers as part of validation.*

You can check you have zip correctly using

```
unzip extension.zip -d test
```
# Issues

* How do we get images in the iframe context when it will not have the access rights to get to that webpage? No access to cookies or JWT
