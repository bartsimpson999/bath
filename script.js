import * as THREE from 'three';

// Create the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('canvas'),
  antialias: true
});

// Create the bat mesh and add it to the scene
const batMesh = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 32), new THREE.MeshBasicMaterial({ color: 0xffffff }));
scene.add(batMesh);

// Create the visual range cone
const coneGeometry = new THREE.ConeGeometry(1, 2, 32);
const coneMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.5 });
const coneMesh = new THREE.Mesh(coneGeometry, coneMaterial);
coneMesh.position.set(0, 0, 2); // position the cone in front of the bat
scene.add(coneMesh);

// Update the bat's position and direction based on user input
function update(event) {
  // Get the mouse position and direction
  const mousePosition = new THREE.Vector2();
  mousePosition.x = (event.clientX / window.innerWidth) * 2 - 1;
  mousePosition.y = -(event.clientY / window.innerHeight) * 2 + 1;
  const direction = new THREE.Vector3(mousePosition.x, mousePosition.y, 0);

  // Update the bat's position and direction
  batMesh.position.addScaledVector(direction, 0.1);
  batMesh.rotation.y = Math.atan2(direction.x, direction.z);

  // Update the visual range cone
  coneMesh.rotation.y = batMesh.rotation.y;
  coneMesh.rotation.x = batMesh.rotation.x;

  // Render the scene
  renderer.render(scene, camera);
}

// Handle user input (Flappy Bird-style controls)
document.addEventListener('keydown', (event) => {
  if (event.key === ') {
    // Flap wings and ascend
    batMesh.position.y += 0.1;
  }
  update(event); // Pass the event object to the update function
});

document.addEventListener('mousemove', (event) => {
  // Update the bat's direction based on mouse movement
  update(event); // Pass the event object to the update function
});

// Animate the scene
function animate() {
  requestAnimationFrame(animate);
  update(); // Call update without event object
  renderer.render(scene, camera);
}

animate();
