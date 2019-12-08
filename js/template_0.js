// cube_geo_id = num_geometry;
// num_geometry++;
// geometry[cube_geo_id] = new THREE.BoxGeometry( 1, 1, 1 );
// cube_mat_id = num_material;
// num_material++;
// material[cube_mat_id] = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
// cube_id = num_object;
// num_object++;
// object[cube_id] = new THREE.Mesh( geometry[cube_geo_id], material[cube_mat_id] );
// scene.add( object[cube_id] );
//
// var animate = function () {
//   animation[num_animation] = requestAnimationFrame( animate );
//   num_animation++;
//   object[cube_id].rotation.x += 0.01;
//   object[cube_id].rotation.y += 0.01;
//
//   renderer.render( scene, camera );
// };
//
// animate();


camera.position.set(0, 0, 10);

// LIGHTS
lights[num_light] = new THREE.AmbientLight(0xeeeeee, 100); // soft white light
scene.add(lights[num_light]);
num_light++;

var loader = new THREE.FontLoader();

loader.load( './fonts/helvetiker_bold.typeface.json', function ( font ) {

  var text = "Try a Template",
    height = 0.1,
    size = 1,
    hover = 1,
    curveSegments = 5,
    bevelThickness = 0.1,
    bevelSize = 0.05,
    bevelEnabled = true,
    fontName = "helvetiker", // helvetiker, optimer, gentilis, droid sans, droid serif
    fontWeight = "regular"; // regular bold

  textGeo = new THREE.TextGeometry(text, {

    font: font,

    size: size,
    height: height,
    curveSegments: curveSegments,

    bevelThickness: bevelThickness,
    bevelSize: bevelSize,
    bevelEnabled: bevelEnabled

  });

  var textMaterial = new THREE.MeshPhongMaterial({color: 0xffffff});
  object[num_object] = new THREE.Mesh(textGeo, textMaterial);
  object[num_object].position.set(-4.5, 0, 0);
  scene.add(object[num_object]);
  num_object++;
});


var animate = function () {
  animation[num_animation] = requestAnimationFrame( animate );
  num_animation++;

  renderer.render( scene, camera );
};

animate();
