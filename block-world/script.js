import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.y = 5;
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const texture_loader = new THREE.TextureLoader(); 
const dirt_texture = texture_loader.load("./assets/dirt.png");

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({
  map: dirt_texture,
  roughness: 0.2
}); 
const block = new THREE.Mesh(geometry, material);
scene.add(block);

let angle = 0;

function animate() {
  requestAnimationFrame(animate);

  angle += 0.01;
  // block.rotation.x = angle;
  // block.rotation.y = angle;

  renderer.render(scene, camera);
}

animate();
