uniform sampler2D Texture1;
uniform sampler2D Texture2;

vec4 ApplyVividLight( vec4 over, vec4 under, float fill )
{
	vec3 NeutralColor = vec3(.5,.5,.5);
	over.rgb = mix( NeutralColor, over.rgb, fill );

	over.rgb -= 0.5;
	over.rgb *= 2.0;

	vec4 ret;
	ret.rgb = under.rgb;
	ret.rgb += min(over.rgb, 0.0);
	ret.rgb /= max(1.0-abs(over.rgb), 0.000001);
	ret.rgb *= under.a;
	ret = clamp( ret, 0.0, 1.0 );
	ret.rgb *= over.a;

	ret.a = over.a * under.a;

	return ret;
}

void main(void)
{
	vec4 under = texture2DProj( Texture1, gl_TexCoord[0] );
	vec4 over = texture2DProj( Texture2, gl_TexCoord[0] );

	vec4 ret = ApplyVividLight( over, under, gl_Color.a );

	ret.rgb += (1.0 - over.a) * under.rgb * under.a;
	ret.a += (1.0 - over.a) * under.a;

	over.a *= gl_Color.a;
	ret.rgb += (1.0 - under.a) * over.rgb * over.a;
	ret.a += (1.0 - under.a) * over.a;
	
	ret.rgb /= ret.a;
	
	gl_FragColor = ret;
	return;
}

