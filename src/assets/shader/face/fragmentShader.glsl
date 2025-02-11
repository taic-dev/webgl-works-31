uniform vec2 uResolution;
uniform vec2 uMouse;
uniform float uTime;
uniform vec2 uPlaneSize;
uniform sampler2D uTexture;
uniform vec2 uTextureSize;

varying vec2 vUv;

void main() {
  // アスペクトを計算
  float planeAspect = uPlaneSize.x / uPlaneSize.y;
  float calligraphyAspect = uTextureSize.x / uTextureSize.y;

  // 画像のアスペクトとプレーンのアスペクトを比較し、短い方に合わせる
  vec2 ratio = vec2(
    min(planeAspect / calligraphyAspect, 1.0),
    min((1.0 / planeAspect) / (1.0 / calligraphyAspect), 1.0)
  );

  // 計算結果を用いて補正後のuv値を生成
  vec2 fixedUv = vec2(
    (vUv.x - 0.5) * ratio.x + 0.5,
    (vUv.y - 0.5) * ratio.y + 0.5
  );

  // vec4 texture = texture2D(uTexture, fixedUv);
  
  // if(texture.a < 1.0) discard;

  // gl_FragColor = vec4(texture.rgb, 1.0);


  // vec2 uv = (gl_FragCoord.xy * 2.0 - uResolution) / min(uResolution.x, uResolution.y);

  vec2 q = mod(vUv, 0.2) -0.1;

  float ip = 0.;
  float c = 0.;
  for(float i=0.; i<10.; i++) {
    ip = dot(1., i);
    c += length(q * 10.) + sin(uTime * 1.);
  }

  vec3 col = vec3(sin(abs(pow(c, 2.)) / ip * 0.5));
 
  gl_FragColor = vec4(col, 1.);

}