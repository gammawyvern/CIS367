let gl;
let points;

let translation = vec2(0.0, 0.0);
let translation_location = vec2(0.0, 0.0);

let run_speed = 0.005;

let dirs = [null, null];

const Rotation = {
  IDLE: "idle",
  CLOCKWISE: "clockwise",
  COUNTER_CLOCKWISE: "counter-clockwise",
};

let rotation_input = Rotation.IDLE; 
let current_rotation = Math.PI / 2;
let rotation_location = 0.0;

window.onload = function init() {

  window.addEventListener("keydown", function(e) {
    if (e.key == "ArrowLeft") {
      dirs[0] = false;
      rotation_input = Rotation.COUNTER_CLOCKWISE;
    } else if (e.key == "ArrowRight") {
      dirs[0] = true;
      rotation_input = Rotation.CLOCKWISE;
    } else if (e.key == "ArrowUp") {
      dirs[1] = true;
    } else if (e.key == "ArrowDown") {
      dirs[1] = false;
    } else if (e.key == "Space") {
      rotation_input = Rotation.IDLE; 
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

  translation_location[0] = gl.getUniformLocation(program, "x");
  translation_location[1] = gl.getUniformLocation(program, "y");
  rotation_location = gl.getUniformLocation(program, "rotation")

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

  // translation[0] += dirs[0] ? run_speed : -run_speed; 
  // translation[1] += dirs[1] ? run_speed : -run_speed;
  //
  // gl.uniform1f(translation_location[0], translation[0]);
  // gl.uniform1f(translation_location[1], translation[1]);

  current_rotation += Math.PI / 200;
  gl.uniform1f(rotation_location, current_rotation);

  window.requestAnimationFrame(render);
}

