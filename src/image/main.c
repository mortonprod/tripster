#include <stdio.h>
#include <emscripten.h> // note we added the emscripten header

int EMSCRIPTEN_KEEPALIVE fib(int n){
    if(n == 0 || n == 1)
        return 1;
    else
        return fib(n - 1) + fib(n - 2);
}

void EMSCRIPTEN_KEEPALIVE addOne(int* input_ptr, int* output_ptr, int len){
	int i;
	for(i = 0; i < len; i++)
    	output_ptr[i] = input_ptr[i] + 1;
}

void EMSCRIPTEN_KEEPALIVE blackStrips(int* input_ptr, int width, int height){
  printf("Width %d, height: %d", width, height);
}