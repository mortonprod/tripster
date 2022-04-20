#define PI 3.14159265358979323846
#define RAD 6.283185307179586
#define COEFF_1 0.7853981633974483
#define COEFF_2 2.356194490192345
#define BLADES 3
#define PSY_BLADES 100
#define CYCLE_WIDTH 100
#define PSY_CYCLE_WIDTH 1000
#define BLADES_T_CYCLE_WIDTH 300
#define PSY_BLADES_T_CYCLE_WIDTH 3000
#include <math.h>
#include <stdio.h>
#include <stdlib.h>
#include <emscripten.h>

int height;
int width;
int pixelCount;
int ch;
int cw;
double maxDistance;

/*
We'll cheat a bit and just allocate loads of memory
so we don't have to implement malloc
*/
int data[2000000];
int red = (255 << 24) | 255;
int* EMSCRIPTEN_KEEPALIVE init(int cWidth, int cHeight) {
  width = cWidth;
  height = cHeight;
  pixelCount = width * height;
  ch = height >> 1;
  cw = width >> 1;
  maxDistance = sqrt(ch * ch + cw * cw);
  for (int y = 0; y < height; y++) {
    int yw = y * width;
    for (int x = 0; x < width; x++) {
      data[yw + x] = red;
    }
  }
  // data = malloc(pixelCount * sizeof(int));
  return &data[0];
}

double customAtan2(int y, int x) {
	double abs_y = abs(y) + 1e-10;
	double angle;
	if (x >= 0) {
		double r = (x - abs_y) / (x + abs_y);
    angle = 0.1963 * r * r * r - 0.9817 * r + COEFF_1;
	} else {
		double r = (x + abs_y) / (abs_y - x);
    angle = 0.1963 * r * r * r - 0.9817 * r + COEFF_2;
	}
	return y < 0 ? -angle : angle;
}

// Using the 'native' fmod would require us to provide the module with asm2wasm...
double customFmod(double a, double b)
{
  return (a - b * floor(a / b));
}
void EMSCRIPTEN_KEEPALIVE render(double timestamp) {
  int scaledTimestamp = floor(timestamp / 10.0 + 2000.0);
  // printf("Time: %d \n",scaledTimestamp);
  for (int y = 0; y < height; y++) {
    int dy = ch - y;
    int dysq = dy * dy;
    int yw = y * width;
    for (int x = 0; x < width; x++) {
      int dx = cw - x;
      int dxsq = dx * dx;
      double angle = customAtan2(dx, dy) / RAD;
      // Arbitrary mangle of the distance, just something that looks pleasant
      int asbs = dxsq + dysq;
      double distanceFromCenter = sqrt(asbs);
      double scaledDistance = asbs / 400.0 + distanceFromCenter;
      double lerp = 1.0 - (customFmod(fabs(scaledDistance - scaledTimestamp + angle * BLADES_T_CYCLE_WIDTH), CYCLE_WIDTH)) / CYCLE_WIDTH;
      // Fade R more slowly
      double absoluteDistanceRatioGB = 1.0 - distanceFromCenter / maxDistance;
      double absoluteDistanceRatioR = absoluteDistanceRatioGB * 0.8 + 0.2;
      int fadeB = round(50.0 * lerp * absoluteDistanceRatioGB);
      int fadeR = round(240.0 * lerp * absoluteDistanceRatioR * (1.0 + lerp) / 2.0);
      int fadeG = round(120.0 * lerp * lerp * lerp * absoluteDistanceRatioGB);
      // data[yw + x] = red;
      // printf("Data: %d %d %d \n",fadeB,fadeG,fadeR);
      data[yw + x] =
        (255 << 24) |   // A
        (fadeB << 16) | // B
        (fadeG << 8) |  // G
        fadeR;          // R
      // printf("Data: %d \n",data[yw+x]);
    }
  }
}

void EMSCRIPTEN_KEEPALIVE psyrender(double timestamp) {
  int scaledTimestamp = floor(timestamp / 10.0 + 2000.0);
  // printf("Time: %d \n",scaledTimestamp);
  for (int y = 0; y < height; y++) {
    int dy = ch - y;
    int dysq = dy * dy;
    int yw = y * width;
    for (int x = 0; x < width; x++) {
      int dx = cw - x;
      int dxsq = dx * dx;
      double angle = customAtan2(dx, dy) / RAD;
      // Arbitrary mangle of the distance, just something that looks pleasant
      int asbs = dxsq + dysq;
      double distanceFromCenter = sqrt(asbs);
      double scaledDistance = asbs / 400.0 + distanceFromCenter;
      double lerp = 1.0 - (customFmod(fabs(scaledDistance - scaledTimestamp + angle * PSY_BLADES_T_CYCLE_WIDTH), PSY_CYCLE_WIDTH)) / PSY_CYCLE_WIDTH;
      // Fade R more slowly
      double absoluteDistanceRatioGB = 1.0 - distanceFromCenter / maxDistance;
      double absoluteDistanceRatioR = absoluteDistanceRatioGB * 0.8 + 0.2;
      int fadeB = round(50.0 * lerp * absoluteDistanceRatioGB);
      int fadeR = round(240.0 * lerp * absoluteDistanceRatioR * (1.0 + lerp) / 2.0);
      int fadeG = round(120.0 * lerp * lerp * lerp * absoluteDistanceRatioGB);
      // data[yw + x] = red;
      // printf("Data: %d %d %d \n",fadeB,fadeG,fadeR);
      data[yw + x] = data[yw + x] +
        (255 << 24) |   // A
        (fadeB << 16) | // B
        (fadeG << 8) |  // G
        fadeR;          // R
      // data[yw + x] = data[yw + x] + (255 << 24);
      // printf("Data: %d \n",data[yw+x]);
    }
  }
}

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
  for (int y = 0; y < height; y++) {
    int yw = y * width;
    for (int x = 0; x < width; x++) {
      input_ptr[yw + x] = red;
    }
  }
}