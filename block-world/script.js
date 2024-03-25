import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// Messing with manual camera position for now
camera.position.x = 2;
camera.position.y = 2;
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xbbbbbb);
document.body.appendChild(renderer.domElement);

const ambient = new THREE.AmbientLight(0x888888);
scene.add(ambient);

const texture_loader = new THREE.TextureLoader(); 
const dirt_texture = texture_loader.load("./assets/dirt.png");
dirt_texture.magFilter = THREE.NearestFilter; 
dirt_texture.minFilter = THREE.NearestFilter;

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
