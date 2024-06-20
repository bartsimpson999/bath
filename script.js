// ...

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

// ...
