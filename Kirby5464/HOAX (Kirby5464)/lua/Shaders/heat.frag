varying vec2 textureCoord;
uniform sampler2D sampler0;
uniform float tx;
uniform float ty;
uniform float yo;

vec2 SineWave( vec2 p )
    {
    // wave distortion
    float x = sin( 25.0*p.y + 30.0*p.x + 6.28*tx) * 0.05 * yo;
    float y = sin( 25.0*p.y + 30.0*p.x + 6.28*ty) * 0.05 * yo;
    return vec2(p.x+x, p.y+y);
    }

void main()
    {
    gl_FragColor = texture2D(sampler0,SineWave(textureCoord));
    }