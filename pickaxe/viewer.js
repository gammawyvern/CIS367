// Initialize Three.js scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x6e5342);
document.body.appendChild(renderer.domElement);

// Load and display the 3D model
const loader = new THREE.GLTFLoader();
loader.load("./pickaxe.glb", (gltf) => {
  gltf.scene.position.y -= 0.5
  scene.add(gltf.scene);
});

// camera.position.y = 0.5;
camera.position.z = 3;
let ambient = new THREE.AmbientLight(0xffffff);
scene.add(ambient);

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; 
controls.dampingFactor = 0.1; 

function animate() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();
