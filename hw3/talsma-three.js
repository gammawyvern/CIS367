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

let boxWidth = 1;
let boxHeight = 2;
let boxDepth = 1;
let boxGeometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
let boxMaterial = new THREE.MeshStandardMaterial({color: 0x00ffff});
let boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
boxMesh.position.set(-2, 1, -5);
scene.add(boxMesh);

// Camera 
var ambient = new THREE.AmbientLight(0x888888);
scene.add(ambient);
var lightIntensity = 10;
var pointLight = new THREE.PointLight(0xffffff, lightIntensity);
pointLight.position.set(2, 4, -2);
scene.add(pointLight);
renderer.shadowMap.enabled = true;
floorMesh.receiveShadow = true;
boxMesh.receiveShadow = true;
boxMesh.castShadow = true;
pointLight.castShadow = true;

// Run animation loop
function animate() {
requestAnimationFrame(animate);
renderer.render(scene, camera);
}

animate();

