#version 120

/*
	local function nextpow2(x) return math.pow(2, math.ceil(math.log(x) / math.log(2))) end
	shader:uniform2f('screen', DISPLAY:GetDisplayWidth() / nextpow2(DISPLAY:GetDisplayWidth()), DISPLAY:GetDisplayHeight() / nextpow2(DISPLAY:GetDisplayHeight()))
*/
uniform vec2 screen; // recommended value : see code above // makes the shader work properly (expect a blank screen or an inactive shader if not set)

uniform float offset;

varying vec2 imageCoord;
uniform vec2 textureSize;
uniform vec2 imageSize;
uniform sampler2D sampler0;
uniform float time;
float rand (vec2 st) {
	return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}
void main() {
	vec2 uv = imageCoord / textureSize * imageSize / screen;
	
	vec2 r = texture2D(sampler0, fract(uv + offset * vec2(0, -.5 + rand(uv.xx + time + 1))) * screen).ra;
	vec2 g = texture2D(sampler0, fract(uv + offset * vec2(0, -.5 + rand(uv.xx + time + 2))) * screen).ga;
	vec2 b = texture2D(sampler0, fract(uv + offset * vec2(0, -.5 + rand(uv.xx + time))) * screen).ba;
	
	gl_FragColor = vec4(r.x, g.x, b.x, r.y * g.y * b.y);
	
}
