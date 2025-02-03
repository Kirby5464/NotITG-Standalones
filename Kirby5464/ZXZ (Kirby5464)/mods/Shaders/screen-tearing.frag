/*	first of all, i would like to say thanks to Xero for helping me coding this shader,
check him out here: https://www.youtube.com/user/XeroOl
~Kirby */

#version 120

uniform float expo;
uniform float linear;
uniform float seed;
/*
    -- do this for screen
    local width = DISPLAY:GetDisplayWidth()
    local height = DISPLAY:GetDisplayHeight()
    local function nextpow2(x)return math.pow(2,math.ceil(math.log(x)/math.log(2)))end
    myShader:uniform2f('screen',width/nextpow2(width),height/nextpow2(height))
*/
uniform vec2 screen;

varying vec2 imageCoord;
uniform vec2 textureSize;
uniform vec2 imageSize;
uniform sampler2D sampler0;

float rand (vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}
void main() {
    vec2 uv = imageCoord / textureSize * imageSize;
    
    uv /= screen;
    
    float x = uv.x;
    if (expo != 0) {
        uv.y += tan(3.141592653 * (rand(vec2(x, seed)) - .5)) * expo;
    }
    if (linear != 0) {
        uv.y += (rand(vec2(x, seed-1)) - .5) * linear;
    }
    uv.x = mod(uv.x, 1);
    
    uv *= screen;
    
    vec4 color = texture2D(sampler0,uv);
    color.a = 1;
    gl_FragColor = color;
}