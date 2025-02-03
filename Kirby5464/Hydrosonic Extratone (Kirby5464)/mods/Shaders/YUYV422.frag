uniform sampler2D Texture1;
uniform sampler2D Texture2;
uniform int TextureWidth;

void main(void)
{
	vec4 tex = gl_TexCoord[0];

	float fRealWidth = float(TextureWidth);
	float fU = tex.x;

	fU *= fRealWidth;

	fU *= 2.0;

	fU -= 0.5;

	float fOdd = mod(fU+0.0001, 2.0);

	fU -= fOdd;

	fU += 0.5;
	fU /= 2.0;
	fU /= fRealWidth;

	tex.x = fU;

	vec4 yuyv = texture2D( Texture1, tex.xy );

	vec3 yuv;
	if( fOdd <= 0.5 )
		yuv = yuyv.rga;
	else
		yuv = yuyv.bga;
	yuv -= vec3(16.0/255.0, 128.0/255.0, 128.0/255.0);

	mat3 conv = mat3(
		// Y     U (Cb)    V (Cr)
		1.1643,  0.000,    1.5958,  // R
		1.1643, -0.39173, -0.81290, // G
		1.1643,  2.017,    0.000);  // B

	gl_FragColor.r=dot(yuv,conv[0]);
	gl_FragColor.g=dot(yuv,conv[1]);
	gl_FragColor.b=dot(yuv,conv[2]);
	gl_FragColor.a = 1.0;
}
