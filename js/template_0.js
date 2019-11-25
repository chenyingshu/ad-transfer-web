cube_geo_id = num_geometry;
num_geometry++;
geometry[cube_geo_id] = new THREE.BoxGeometry( 1, 1, 1 );
cube_mat_id = num_material;
num_material++;
material[cube_mat_id] = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
cube_id = num_object;
num_object++;
object[cube_id] = new THREE.Mesh( geometry[cube_geo_id], material[cube_mat_id] );
scene.add( object[cube_id] );

var animate = function () {
  // animation[num_animation] =
  requestAnimationFrame( animate );
  // num_animation++;
  object[cube_id].rotation.x += 0.01;
  object[cube_id].rotation.y += 0.01;

  renderer.render( scene, camera );
};

animate();
