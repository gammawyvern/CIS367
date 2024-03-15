import * as THREE from 'three';
const scene = new THREE.Scene();

let boxes = [];

const fov = 75;
const near = 0.1;
const far = 1000;
const camera = new THREE.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, near, far);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.setClearColor(0xFFFFFF);

// Load textures
let floor_width = 20;
let floor_height = 40;
let box_width = 0.9;
let box_height = 2;
let box_depth = 0.2;
let texture_loader = new THREE.TextureLoader(); 

// Load in textures
let grass = texture_loader.load("./assets/grass.png");
let stone = texture_loader.load("./assets/stone_wall.png");

grass.wrapS = THREE.RepeatWrapping;
grass.wrapT = THREE.RepeatWrapping;
grass.repeat.set(floor_width/2, box_height/2);

stone.wrapS = THREE.RepeatWrapping;
stone.wrapT = THREE.RepeatWrapping;
stone.repeat.set(floor_width/2, box_height/2);

// Add floor mesh
let floor_geometry = new THREE.PlaneGeometry(floor_width, floor_height);
let floor_material = new THREE.MeshStandardMaterial({
  map: grass,
  metalness: 0.25,
  roughness: 0.25
});
let floor_mesh = new THREE.Mesh(floor_geometry, floor_material);
floor_mesh.position.set(0, -1, -3);
floor_mesh.rotation.set(-Math.PI/2, 0, 0);
scene.add(floor_mesh);

// Add boxe meshes to scene
let box_geometry = new THREE.BoxGeometry(box_width, box_height, box_depth);
let box_material = new THREE.MeshStandardMaterial({
  map: stone,
  metalness: 0,
  roughness: 1
});
for (let i = 0; i < 14; i++) {
  let box_mesh = new THREE.Mesh(box_geometry, box_material);
  box_mesh.position.set(i - 7, 1, -5);
  box_mesh.receiveShadow = true;
  box_mesh.castShadow = true;
  scene.add(box_mesh);
  boxes.push(box_mesh);
}

// Camera / Lighting
let ambient = new THREE.AmbientLight(0x888888);
scene.add(ambient);
let light_intensity = 10;
let point_light = new THREE.PointLight(0xffffff, light_intensity);
point_light.position.set(2, 4, -2);
scene.add(point_light);
renderer.shadowMap.enabled = true;
floor_mesh.receiveShadow = true;
point_light.castShadow = true;

// Run animation loop
function animate() {
  for(let i = 0; i < boxes.length; i++) {
    boxes[i].rotateX(Math.PI/(100+i));
  }

  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();

