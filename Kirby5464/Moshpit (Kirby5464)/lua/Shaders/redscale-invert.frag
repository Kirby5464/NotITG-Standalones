varying vec4 color;
varying vec2 textureCoord;
uniform sampler2D sampler0;

void main()
{	
	gl_FragColor = texture2D( sampler0, textureCoord ) * color;
	
	gl_FragColor.g = 0;
	gl_FragColor.r = 1-gl_FragColor.r;
	gl_FragColor.b = 0;
	
}