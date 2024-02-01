var gl;
var points;

var x, y = 0.0;
var xLoc, yLoc;

window.onload = function init() {

  window.addEventListener("keydown", function(e) {
      console.log("Key: " + e.key);
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

  x += 0.01;
  y += 0.01;

  gl.uniform1f(xLoc, x);
  gl.uniform1f(yLoc, y);

  window.requestAnimationFrame(render);
}

