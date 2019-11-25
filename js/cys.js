cube_geo_id = num_geometry;
num_geometry++;
geometry[cube_geo_id] = new THREE.BoxGeometry( 1, 1, 1 );
cube_mat_id = num_material;
num_material++;
material[cube_mat_id] = new THREE.MeshBasicMaterial( { color: 0xeeeeee } );
cube_id = num_object;
num_object++;
object[cube_id] = new THREE.Mesh( geometry[cube_geo_id], material[cube_mat_id] );
scene.add( object[cube_id] );

cube_geo_id2 = num_geometry;
num_geometry++;
geometry[cube_geo_id2] = new THREE.SphereGeometry( 0.5, 32, 32 );
cube_mat_id2 = num_material;
num_material++;
material[cube_mat_id2] = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
cube_id2 = num_object;
num_object++;
object[cube_id2] = new THREE.Mesh( geometry[cube_geo_id2], material[cube_mat_id2] );
scene.add( object[cube_id2] );

x_sign = 1;
y_sign = 1;
z_sign = 1;
// animation_id = num_animation;
// num_animation ++;
var animate = function () {
  requestAnimationFrame( animate );

  object[cube_id].rotation.x += 0.01;
  object[cube_id].rotation.y += 0.01;

  object[cube_id2].position.x += x_sign * Math.floor(Math.random()*100)*0.0002;
  object[cube_id2].position.y += y_sign * Math.floor(Math.random()*100)*0.0002;
  object[cube_id2].position.z += z_sign * Math.floor(Math.random()*100)*0.0002;
  if (Math.abs(object[cube_id2].position.x) > 2) x_sign = -x_sign;
  if (Math.abs(object[cube_id2].position.y) > 2) y_sign = -y_sign;
  if (Math.abs(object[cube_id2].position.z) > 2) z_sign = -z_sign;

  renderer.render( scene, camera );
};

animate();


