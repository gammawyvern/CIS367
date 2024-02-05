let gl;
let points;

let translation = vec2(0.0, 0.0);
let translation_location = vec2(0.0, 0.0);

let control_speed = 0.005;
let rotation_speed = Math.PI * control_speed;

let dirs = [null, null];

const Rotation = {
  IDLE: "idle",
  CLOCKWISE: "clockwise",
  COUNTER_CLOCKWISE: "counter-clockwise",
};

let rotation_input = Rotation.IDLE; 
let rotation = 0.0;
let rotation_location = 0.0;

window.onload = function init() {

  window.addEventListener("keydown", function(e) {
    if (e.code === "ArrowLeft") {
      rotation_input = Rotation.COUNTER_CLOCKWISE;
    } else if (e.code === "ArrowRight") {
      rotation_input = Rotation.CLOCKWISE;
    } 

    // if (e.code === "ArrowUp") {
    //   dirs[1] = true;
    // } else if (e.code === "ArrowDown") {
    //   dirs[1] = false;
    // } else if (e.code === "Space") {
    //   dirs[0] = null;
    //   dirs[1] = null;
    // }
  }, false);

  window.addEventListener("keyup", function(e) {
    if (e.code === "ArrowLeft" && rotation_input === Rotation.COUNTER_CLOCKWISE) {
      rotation_input = Rotation.IDLE;
    } else if (e.code === "ArrowRight" && rotation_input === Rotation.CLOCKWISE) {
      rotation_input = Rotation.IDLE;
    }
  }, false);

  var canvas = document.getElementById('gl-canvas');
  gl = WebGLUtils.setupWebGL(canvas);

  if (!gl) { alert('WebGL unavailable'); }

  var vertices = [
    scale(0.25, vec2(0, 1)),
    scale(0.25, vec2(Math.sqrt(3)/2, -1/2)),
    scale(0.25, vec2(-Math.sqrt(3)/2, -1/2)),
  ];

  console.log(vertices);

  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(0.5, 0.5, 0.5, 1.0);

  var program = initShaders(gl, 'vertex-shader', 'fragment-shader');
  gl.useProgram(program);

  translation_location = gl.getUniformLocation(program, "translation");
  rotation_location = gl.getUniformLocation(program, "rotation")

  var bufferID = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, bufferID);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

  var vPosition = gl.getAttribLocation(program, 'vPosition');
  gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vPosition);
  render();
};

function logic() {
  // translation = add(translation, vec2(control_speed, control_speed));

  console.log(rotation_input);

  if (rotation_input === Rotation.CLOCKWISE) {
    rotation += rotation_speed;
  } else if (rotation_input === Rotation.COUNTER_CLOCKWISE) {
    rotation -= rotation_speed;
  } 
}

function render() {
  logic();

  // Pass values to shader
  gl.uniform2fv(translation_location, translation);
  gl.uniform1f(rotation_location, rotation);

  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES, 0, 3);

  window.requestAnimationFrame(render);
}

