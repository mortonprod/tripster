# Running

emcc --pre-js pre.js -o iframe.js src/hello/hello.c

# Issues

How do we get images in the iframe context when it will not have the access rights to get to that webpage? No access to cookies or JWT