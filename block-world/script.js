import * as THREE from "three";
import { FlyControls } from "addons/fly-controls";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.y = 2;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xbbbbbb);
document.body.appendChild(renderer.domElement);

const ambient = new THREE.AmbientLight(0xffffff);
scene.add(ambient);

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

let prev_time = performance.now();
function animate() {
  let current_time = performance.now();
  let delta = (current_time - prev_time) / 1000; 
  prev_time = current_time;
  console.log(delta);

  requestAnimationFrame(animate);
  controls.update(delta);
  renderer.render(scene, camera);
}

create_world();
animate();
