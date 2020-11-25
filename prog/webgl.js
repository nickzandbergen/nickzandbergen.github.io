'use strict';

//going to need a uniform pointScale in here
// attribute float pointSize;
// and gl_PointSize = pointSize
const vertex_shader_source = `
    attribute vec3 aVertexPosition;

    uniform mat4 camera;

    void main() {
      gl_Position = camera * vec4(aVertexPosition, 1.0);
      gl_PointSize = 75.0;
    }
`;

const fragment_shader_source = `
    precision mediump float;
    void main() {
      float dist = distance(gl_PointCoord, vec2(0.5));
      float alpha = 1.0 - smoothstep(0.45, 0.5, dist);
      gl_FragColor = vec4(1.0, 1.0, 1.0, alpha);
    }
`;

function setup() {
  gl = canvas.getContext("webgl2");
  gl.program = initShaders(gl, vertex_shader_source, fragment_shader_source)

  //set anti-alias
  let aa_loc = gl.getUniformLocation(gl.program, "antialiased")
  gl.uniform1f(aa_loc, 1)

  //blending, for points
  gl.enable(gl.BLEND);
  gl.blendFuncSeparate( gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA,gl.ZERO, gl.ONE );

}

function initShaders(gl, vsSource, fsSource) {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

  if (!vertexShader || !fragmentShader) {
    console.log("Null shaders")
    return null;
  }

  const shaderProgram = gl.createProgram();
  
  if(!shaderProgram) {
    console.log("Null program")
    return null;
  }
  
  //attach
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);

  //link
  gl.linkProgram(shaderProgram);
  gl.useProgram(shaderProgram)
  // If creating the shader program failed, alert
  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
    gl.deleteProgram(program);
    gl.deleteShader(fragmentShader);
    gl.deleteShader(vertexShader);
    return null;
  }

  return shaderProgram;
}

function loadShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert('Err: ' + gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

