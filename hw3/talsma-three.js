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

// Add meshes
let floorWidth = 20;
let floorHeight = 40;
let floorGeometry = new THREE.PlaneGeometry(floorWidth, floorHeight);
let floorMaterial = new THREE.MeshStandardMaterial({color: 0x009900});
let floorMesh = new THREE.Mesh(floorGeometry, floorMaterial);
floorMesh.position.set(0, -1, -3);
floorMesh.rotation.set(-Math.PI/2, 0, 0);
scene.add(floorMesh);

let boxWidth = 0.9;
let boxHeight = 2;
let boxDepth = 0.2;
let boxGeometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
let boxMaterial = new THREE.MeshStandardMaterial({color: 0x00ffff});
for (let i = 0; i < 14; i++) {
  let boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
  boxMesh.position.set(i - 7, 1, -5);
  boxMesh.receiveShadow = true;
  boxMesh.castShadow = true;
  scene.add(boxMesh);
  boxes.push(boxMesh);
}
// let boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
// boxMesh.position.set(-2, 1, -5);
// scene.add(boxMesh);

// Camera 
let ambient = new THREE.AmbientLight(0x888888);
scene.add(ambient);
let lightIntensity = 10;
let pointLight = new THREE.PointLight(0xffffff, lightIntensity);
pointLight.position.set(2, 4, -2);
scene.add(pointLight);
renderer.shadowMap.enabled = true;
floorMesh.receiveShadow = true;
// boxMesh.receiveShadow = true;
// boxMesh.castShadow = true;
pointLight.castShadow = true;

// Run animation loop
function animate() {
  for(let i = 0; i < boxes.length; i++) {
    boxes[i].rotateX(Math.PI/(100+i));
  }

  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();

