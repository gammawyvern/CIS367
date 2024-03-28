import * as THREE from "three";
import { FlyControls } from "addons/fly-controls";

/***************************************
 * Setting up THREE.js objects
 **************************************/

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.y = 2;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000);
document.body.appendChild(renderer.domElement);

const ambient = new THREE.AmbientLight(0x333333);
scene.add(ambient);

const player_light = new THREE.SpotLight(0xffffff, 1);
const player_light_target = new THREE.Object3D();
player_light.target = player_light_target;
player_light.angle = Math.PI / 4;
scene.add(player_light, player_light_target);

const texture_loader = new THREE.TextureLoader(); 
const dirt_texture = texture_loader.load("./assets/dirt.png");
dirt_texture.magFilter = THREE.NearestFilter; 
dirt_texture.minFilter = THREE.NearestFilter;

const controls = new FlyControls(camera, renderer.domElement);
controls.domElement = renderer.domElement;
controls.movementSpeed = 5;
controls.rollEnabled = false;
controls.rollSpeed = Math.PI / 3;
controls.autoForward = false;
// TODO would like to just remove mouse controls totally 
controls.dragToLook = true; 

/***************************************
 * Functions to update while running
 **************************************/

function create_world() {
  let geometry = new THREE.BoxGeometry(1, 1, 1);
  let material = new THREE.MeshStandardMaterial({
    map: dirt_texture,
    roughness: 0.2
  }); 

  let floor = new THREE.InstancedMesh(geometry, material, 10*10); 

  const matrix = new THREE.Matrix4();
  for (let x = 0; x < 10; x++) {
    for (let z = 0; z < 10; z++) {
      matrix.makeTranslation(x - 5, 0, z - 5); 
      floor.setMatrixAt((x * 10) + z, matrix); 
    }
  }

  scene.add(floor);
}

function update_player_light() {
  player_light.position.copy(camera.position);

  let target_dist = 4;
  let target_pos = new THREE.Vector3();

  camera.getWorldDirection(target_pos);
  target_pos.multiplyScalar(target_dist);
  player_light_target.position.copy(target_pos);
}

function game_logic() {
  update_player_light();
}

/***************************************
 * Running actual code here
 **************************************/

const fps = 60;
const frame_time = 1 / fps;

function animate() {
  controls.update(frame_time);

  game_logic();

  renderer.render(scene, camera);
  setTimeout(
    () => {requestAnimationFrame(animate)},
    frame_time
  );
}

create_world();
animate();
