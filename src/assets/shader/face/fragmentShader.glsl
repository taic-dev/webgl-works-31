uniform vec2 uResolution;
uniform vec2 uMouse;
uniform float uTime;
uniform float uSize;
uniform float uSpeed;

varying vec2 vUv;
varying vec3 vPosition;

#pragma glslify: noise2d = require('glsl-noise/simplex/2d');
#pragma glslify: noise3d = require('glsl-noise/simplex/3d');

float noise(vec2 p) {
  return noise3d(vec3(p.y * uSize + uMouse.y * 2., p.x, uSpeed));
}

mat2 rotate2d(float _angle){
  return mat2(cos(_angle),-sin(_angle),sin(_angle),cos(_angle));
}

vec3 overlay(vec3 base, vec3 blend) {
  return mix(2.0 * base * blend, 1.0 - 2.0 * (1.0 - base) * (1.0 - blend), step(0.5, base));
}

vec4 effect(float uSize, float uSpeed) {
  vec2 p = vec2(vUv * uSize);
  p = rotate2d(noise2d(p)) * vec2((noise3d(vec3(vPosition * uSpeed))));
  float n = noise(p + uTime * 0.1);

  return vec4(overlay(vec3(n), vec3(n)), 1.);
}

void main() {
  vec4 effect = effect(uSize, uSpeed);

  gl_FragColor = effect;
}