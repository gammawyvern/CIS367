let gl;
let points;
let translation_location;
let rotation_location;

let control_speed = 0.005;
let rotation_speed = Math.PI * control_speed;
let move_speed = 2 * control_speed;

const rotation_input = {
  clockwise: false,
  counter_clockwise: false
};

const translation_input = {
  forwards: false,
  backwards: false
}

let translation = vec2(0.0, 0.0);
let translation_direction_offset = Math.PI / 2;
let rotation = 0.0;

let vertices = [
  scale(0.25, vec2(0, 1)),
  scale(0.25, vec2(Math.sqrt(3)/2, -1/2)),
  scale(0.25, vec2(-Math.sqrt(3)/2, -1/2)),
];

let colors = [
  vec3(0.0, 1.0, 0.0),
  vec3(0.0, 0.0, 1.0),
  vec3(0.0, 0.0, 1.0),
];

window.onload = function init() {

  window.addEventListener("keydown", function(e) {
    if (e.code === "ArrowLeft") {
      rotation_input.counter_clockwise = true; 
    } else if (e.code === "ArrowRight") {
      rotation_input.clockwise = true;
    } 

    if (e.code === "ArrowDown") {
      translation_input.backwards = true;
    } else if (e.code === "ArrowUp") {
      translation_input.forwards = true; 
    } 
  }, false);

  window.addEventListener("keyup", function(e) {
    if (e.code === "ArrowLeft") {
      rotation_input.counter_clockwise = false; 
    } else if (e.code === "ArrowRight") {
      rotation_input.clockwise = false; 
    }

    if (e.code === "ArrowDown") {
      translation_input.backwards = false;
    } else if (e.code === "ArrowUp") {
      translation_input.forwards = false;
    }
  }, false);

  var canvas = document.getElementById('gl-canvas');
  gl = WebGLUtils.setupWebGL(canvas);

  if (!gl) { alert('WebGL unavailable'); }

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

  var c_buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, c_buffer);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);

  var v_color = gl.getAttribLocation(program, "v_color");
  gl.vertexAttribPointer(v_color, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(v_color);

  render();
};

function logic() {
  // Rotation update
  let rotation_dir = 0;
  rotation_dir += rotation_input.clockwise ? 1 : 0;
  rotation_dir -= rotation_input.counter_clockwise ? 1 : 0;
  rotation += rotation_dir * rotation_speed;

  // Translation update
  let translation_dir = 0.0;
  translation_dir += translation_input.forwards ? 1 : 0;
  translation_dir -= translation_input.backwards ? 1 : 0;

  translation_x = translation_dir * move_speed * -Math.cos(rotation + translation_direction_offset); 
  translation_y = translation_dir * move_speed * Math.sin(rotation + translation_direction_offset); 
  translation = add(translation, vec2(translation_x, translation_y))
}

function render() {
  logic();

  gl.uniform2fv(translation_location, translation);
  gl.uniform1f(rotation_location, rotation);

  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES, 0, 3);

  window.requestAnimationFrame(render);
}

