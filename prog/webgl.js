'use strict';

//going to need a uniform pointScale in here
// attribute float pointSize;
// and gl_PointSize = pointSize


/*
  TODO:
    support drawing camera-facing triangles
    - requires storing center point
      - then projecting center->vert vector onto xy plane
      - ? maybe deal with textures


*/
const vertex_shader_source = `
    uniform bool points; //true if drawing points

    attribute vec3 aPointPosition; //position of vertex
    uniform mat4 camera;

    void main() {
      if(points) {
        gl_Position = camera * vec4(aPointPosition, 1.0);
        gl_PointSize = 75.0 + 70.0 * aPointPosition.x;
      } else { //drawing triangles
        gl_Position = camera * vec4(aPointPosition, 1.0);
      }
    }
`;

const fragment_shader_source = `
    uniform bool points;

    precision mediump float;
    
    void main() {
      if(points) {
        float dist = distance(gl_PointCoord, vec2(0.5));
        if(dist >= 0.49) {
          discard;
        } else {
          float alpha = 1.0 - smoothstep(0.45, 0.5, dist);
          gl_FragColor = vec4(gl_PointCoord.xy, 1.0, alpha);
        }
      } else { //drawing triangles
        gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0);
      }
    }
`;

function setupWebGL() {
  gl = canvas.getContext("webgl2");
  gl.program = initShaders(gl, vertex_shader_source, fragment_shader_source)
  gl.loc = {}

  //set anti-alias
  let aa_loc = gl.getUniformLocation(gl.program, "antialiased")
  gl.uniform1f(aa_loc, 1)

  //blending, for rounder points
  gl.enable(gl.BLEND);
  gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ZERO, gl.ONE);

  //depth!
  gl.enable(gl.DEPTH_TEST);

  //locations for webgl
  gl.loc.pPos = gl.getAttribLocation(gl.program, "aPointPosition");
  gl.loc.points = gl.getUniformLocation(gl.program, "points")

  //camera matrix
  camera.loc = gl.getUniformLocation(gl.program, "camera");
  camera.mat = new Matrix4().setIdentity();
  gl.uniformMatrix4fv(camera.loc, false, camera.mat.elements);
}

function initShaders(gl, vsSource, fsSource) {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

  if (!vertexShader || !fragmentShader) {
    console.log("Shaders loading failed")
    return null;
  }

  const shaderProgram = gl.createProgram();

  if (!shaderProgram) {
    console.log("Shader program failed")
    return null;
  }

  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);

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

