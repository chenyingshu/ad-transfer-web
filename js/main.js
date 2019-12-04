/* Menu animation and structure*/
//Click the menu to see the animation
//You can click the X to close or click anywhere outside the menu

$(document).ready(function(){
  $('.hamburger-shell').click(function(){
    $('#menu').slideToggle(300);
    $('.top').toggleClass('rotate');
    $('.middle').toggleClass('rotate-back');
    $('.menu-name').toggleClass('bump');
    $('.bg-cover').toggleClass('reveal');
    $('.menu-contrainer').toggleClass('enlarge');
  });
  $('.bg-cover').click(function(){
    $('#menu').slideToggle(300);
    $('.top').toggleClass('rotate');
    $('.middle').toggleClass('rotate-back');
    $('.menu-name').toggleClass('bump');
    $('.bg-cover').toggleClass('reveal');
  })
});

/* Menu -- END */

/* Three.js basic setup*/
/**Special variable with name unchanged:
 * scene
 * camera
 * renderer
 * ************/

var scene = new THREE.Scene();
scene.background = new THREE.Color( 0xf0f0f0 ); // UPDATED
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
camera.position.z = 5;


// Instantiate a loader
var gltfLoader = new THREE.GLTFLoader();

/* record all objects in the scene */
object = [];
material = [];
texture = [];
geometry = [];
animation = [];
scenes = []
num_object = 0;
num_material = 0;
num_texture = 0;
num_geometry = 0;
num_animation = 0;
num_scene = 0;

function onWindowResize()
{
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}

function render()
{
  animation[num_animation] = requestAnimationFrame( render );
  renderer.render( scene, camera );
  num_animation++
}

/**reference: https://threejs.org/docs/#manual/en/introduction/How-to-dispose-of-objects **/
function clearScene() {
  for (i = 0; i < num_object; i++) {
    scene.remove( object[i] );
  }
  for (i = 0; i < num_geometry; i++) {
    geometry[i].dispose();
  }
  for (i = 0; i < num_texture; i++) {
    texture[i].dispose();
  }
  for (i = 0; i < num_material; i++) {
    material[i].dispose();
  }
  for (i = 0; i < num_scene; i++) {
    scenes[i].dispose();
  }
  for (i =0; i < num_animation; i++) {
    cancelAnimationFrame(animation[i]);
  }
  //ref. https://www.jstips.co/en/javascript/two-ways-to-empty-an-array/
  object.length = 0;
  material.length = 0;
  texture.length = 0;
  geometry.length = 0;
  animation.length = 0;
  num_object = 0;
  num_material = 0;
  num_texture = 0;
  num_geometry = 0;
  num_animation = 0;
  render();
  console.log("Cleared Scene");
}

/* Three.js -- END */

/* Other functions - START *


 Other functions -- END */
