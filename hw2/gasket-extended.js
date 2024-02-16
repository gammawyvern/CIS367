"use strict";

let canvas;
let gl;

let points = [];
let p1 = vec2( 0,  1);
let p2 = vec2( 1, -1);
let p3 = vec2(-1, -1);

let numTimesToSubdivide = 5;

let is_even = 1;
let even_position;

function init() {
  canvas = document.getElementById( "gl-canvas" );

  gl = WebGLUtils.setupWebGL( canvas );
  if ( !gl ) { alert( "WebGL isn't available" ); }

  var vertices = [
    p1, p2, p3
  ];

  divideTriangle(
    vertices[0],
    vertices[1],
    vertices[2],
    numTimesToSubdivide
  );

  gl.viewport(0, 0, canvas.width, canvas.height);

  var program = initShaders(gl, "vertex-shader", "fragment-shader");
  gl.useProgram(program);

  var bufferId = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
  gl.bufferData(gl.ARRAY_BUFFER, 50000, gl.STATIC_DRAW);
  gl.bufferSubData(gl.ARRAY_BUFFER, 0, flatten(points));

  var vPosition = gl.getAttribLocation( program, "vPosition" );
  gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vPosition);

  even_position = gl.getUniformLocation(program, "is_even");

  render();
};

function triangle(a, b, c) {
  points.push(a, b, c);
}

function divideTriangle(a, b, c, count) {
  if ( count === 0 ) {
    triangle(a, b, c);
  } else {
    var ab = mix( a, b, 0.5 );
    var ac = mix( a, c, 0.5 );
    var bc = mix( b, c, 0.5 );

    --count;

    divideTriangle(a, ab, ac, count);
    divideTriangle(c, ac, bc, count);
    divideTriangle(b, bc, ab, count);
  }
}

window.onload = init;

function render() {
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES, 0, points.length);
}
