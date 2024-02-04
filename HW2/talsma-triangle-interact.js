let gl;
let points;

let x = y = 0.0;
let xLoc, yLoc;

let dirs = [null, null];
let speed = 0.001;

window.onload = function init() {

  window.addEventListener("keydown", function(e) {
    if (e.key == "ArrowLeft") {
      dirs[0] = false;
    } else if (e.key == "ArrowRight") {
      dirs[0] = true;
    } else if (e.key == "ArrowUp") {
      dirs[1] = true;
    } else if (e.key == "ArrowDown") {
      dirs[1] = false;
    } else if (e.key == "Space") {
      dirs[0] = null;
      dirs[1] = null;
    }
  }, false);

  var canvas = document.getElementById('gl-canvas');
  gl = WebGLUtils.setupWebGL(canvas);

  if (!gl) { alert('WebGL unavailable'); }

  var vertices = [
    scale(0.25, vec2( 1.0, -1.0)),
    scale(0.25, vec2( 0.0,  1.0)),
    scale(0.25, vec2(-1.0, -1.0)),
  ];

  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(1.0, 1.0, 1.0, 1.0);

  var program = initShaders(gl, 'vertex-shader', 'fragment-shader');
  gl.useProgram(program);

  xLoc = gl.getUniformLocation(program, "x");
  yLoc = gl.getUniformLocation(program, "y");

  var bufferID = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, bufferID);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

  var vPosition = gl.getAttribLocation(program, 'vPosition');
  gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vPosition);
  render();
};

function render() {
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES, 0, 3);

/*
  if (dirs[0] === true) // move right
    x += 0.01;
  else if (dirs[0] === false) // move left
    x -= 0.01;
  if (dirs[1] === true) // move up
    y += 0.01;
  else if (dirs[1] === false) // move down
    y -= 0.01
*/

  x += dirs[0] ? speed : -speed; 
  y += dirs[1] ? speed : -speed;

  gl.uniform1f(xLoc, x);
  gl.uniform1f(yLoc, y);

  window.requestAnimationFrame(render);
}

