#define PI 3.14159265

uniform float radius;
uniform float strength;
uniform vec2 translate;

varying vec4 color;
varying vec2 imageCoord;
uniform vec2 textureSize;
uniform vec2 imageSize;
uniform sampler2D sampler0;

mat2 rotate2D( float t ) { return mat2(cos(t), -sin(t), sin(t), cos(t)); }

void main()
{
	vec2 uv = imageCoord;
	vec2 pos = uv - 0.5;

	float len = length( pos );

	if ( len < radius )
	{
		float v = clamp(1.0 - len / radius, 0.0, 1.0) * strength;
		uv = rotate2D(v * PI) * pos + 0.5;
	}

	uv = mod( uv + translate, 1.0 ) / textureSize * imageSize;

	gl_FragColor = texture2D( sampler0, uv ) * color;
}
