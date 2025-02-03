uniform float radius;

varying vec4 color;
varying vec2 imageCoord;
uniform vec2 textureSize;
uniform vec2 imageSize;
uniform sampler2D sampler0;

float rand( vec2 co ) { return fract(sin(dot(co.xy,vec2(12.9898,78.233))) * 43758.5453); }

void main()
{
	vec2 uv = imageCoord;
	vec2 uvn = uv;

	uv.x += rand(uvn.xy) * radius * 2.0 - radius;
	uv.y += rand(uvn.yx) * radius * 2.0 - radius;

	vec3 col;

	if ( min(uv.x,uv.y) >= 0.0 && max(uv.x,uv.y) <= 1.0 )
	{
		col = texture2D( sampler0, uv / textureSize * imageSize ).rgb;
	}

	gl_FragColor = vec4( col, 1.0 ) * color;
}
