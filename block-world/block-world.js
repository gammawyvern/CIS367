import * as THREE from "three";
import { FirstPersonControls } from "addons/first-person-controls";

/***************************************
 * Setting up THREE.js objects
 **************************************/

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.y = 3;
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000);
document.body.appendChild(renderer.domElement);

const ambient = new THREE.AmbientLight(0x202020);
scene.add(ambient);

const player_light = new THREE.SpotLight(0xffffff, 5);
const player_light_target = new THREE.Object3D();
player_light.target = player_light_target;
player_light.angle = Math.PI / 5;
scene.add(player_light, player_light_target);

const texture_loader = new THREE.TextureLoader(); 
function load_texture(file_path) {
  let texture = texture_loader.load(file_path);
  texture.magFilter = THREE.NearestFilter; 
  texture.minFilter = THREE.NearestFilter;
  return texture;
}

const dirt_texture = load_texture("./assets/dirt_block.png");
const stone_texture = load_texture("./assets/stone_block.png");
const grass_texture = load_texture("./assets/grass_block.png");

const controls = new FirstPersonControls(camera, renderer.domElement);
controls.movementSpeed = 5;
controls.lookSpeed = 0.1;
// controls.constrainVertical = true;
// controls.verticalMin = Math.PI * (2/3);
// controls.verticalMax = Math.PI * (1/2);
controls.lookVertical = false;

/***************************************
 * Functions to update while running
 **************************************/

function create_world() {
  let cube_geometry = new THREE.BoxGeometry(1, 1, 1);
  let dirt_material = new THREE.MeshStandardMaterial({map: dirt_texture}); 
  let stone_material = new THREE.MeshStandardMaterial({map: stone_texture}); 
  let grass_material = new THREE.MeshStandardMaterial({map: grass_texture}); 

  for (let x = -10; x <= 10; x++) {
    for (let z = -10; z <=10; z++) {
      let cube_mesh = new THREE.Mesh(cube_geometry, stone_material);
      cube_mesh.position.set(x, -1, z);
      scene.add(cube_mesh);
    }
  }

  for (let x = -10; x <= 10; x++) {
    for (let z = -10; z <=10; z++) {
      if ((Math.abs(x) + Math.abs(z)) >= 3) {
        let cube_mesh = new THREE.Mesh(cube_geometry, dirt_material);
        cube_mesh.position.set(x, 0, z);
        scene.add(cube_mesh);
      }
    }
  }

  for (let x = -10; x <= 10; x++) {
    for (let z = -10; z <=10; z++) {
      if ((Math.abs(x) + Math.abs(z)) >= 10) {
        let cube_mesh = new THREE.Mesh(cube_geometry, grass_material);
        cube_mesh.position.set(x, 1, z);
        scene.add(cube_mesh);
      }
    }
  }
}

function update_player_light() {
  player_light.position.copy(camera.position);

  let target_dist = 4;
  let target_pos = new THREE.Vector3();

  camera.getWorldDirection(target_pos);
  target_pos.multiplyScalar(target_dist);
  target_pos.add(camera.position);
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

