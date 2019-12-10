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
// lights = [];
// num_light = 0;
/* Menu -- END */

/* Three.js basic setup*/
/**Special variable with name unchanged:
 * scene
 * camera
 * renderer
 * gui
 * ************/
/*
// var controls, camera, scene, renderer;
// var cameraCube, sceneCube;
// var textureEquirec, textureCube, textureSphere;
// var cubeMesh, objectMesh;
// var objectMaterial;
gui = null;

// Instantiate a loader
gltfLoader = new THREE.GLTFLoader();
gltfLoader2 = new THREE.GLTFLoader();

/* record all objects in the scene *
object = [];
material = [];
texture = [];
geometry = [];
animation = [];
scenes = [];
lights = [];
num_object = 0;
num_material = 0;
num_texture = 0;
num_geometry = 0;
num_animation = 0;
num_scene = 0;
num_light = 0;


/*INIT - BEGIN*
scene = new THREE.Scene();
scene.background = new THREE.Color( 0xf0f0f0 );
sceneCube = new THREE.Scene();

//CAMERAS
camera = new THREE.PerspectiveCamera( 70, window.innerWidth/window.innerHeight, 1, 10000 );
camera.position.set( 0, 0, 5 );
cameraCube = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 100000 );

// Lights
// lights[num_light] = new THREE.AmbientLight( 0x404040 ); // soft white light
// scene.add( lights[num_light] );
// num_light++;
var ambient = new THREE.AmbientLight( 0x404040 );
scene.add( ambient );

// Textures
// var urls = [
//   './img/template_1/bg_square.png',
//   './img/template_1/bg_square.png',
//   './img/template_1/bg_square.png',
//   './img/template_1/bg_square.png',
//   './img/template_1/bg_square.png',
//   './img/template_1/bg_square.png',
// ];
//
// textureCube = new THREE.CubeTextureLoader().load( urls );
// textureCube.format = THREE.RGBFormat;
// textureCube.mapping = THREE.CubeReflectionMapping;
// textureCube.encoding = THREE.sRGBEncoding;

// var textureLoader = new THREE.TextureLoader();

// textureEquirec = textureLoader.load( "https://threejs.org/examples/textures/2294472375_24a3b8ef46_o.jpg" );
// textureEquirec.mapping = THREE.EquirectangularReflectionMapping;
// textureEquirec.magFilter = THREE.LinearFilter;
// textureEquirec.minFilter = THREE.LinearMipmapLinearFilter;
// textureEquirec.encoding = THREE.sRGBEncoding;

// textureSphere = textureLoader.load( "https://threejs.org/examples/textures/metal.jpg" );
// textureSphere.mapping = THREE.SphericalReflectionMapping;
// textureSphere.encoding = THREE.sRGBEncoding;

// Materials
// var equirectShader = THREE.ShaderLib[ "equirect" ];
//
// var equirectMaterial = new THREE.ShaderMaterial( {
//   fragmentShader: equirectShader.fragmentShader,
//   vertexShader: equirectShader.vertexShader,
//   uniforms: equirectShader.uniforms,
//   depthWrite: false,
//   side: THREE.BackSide
// } );

// equirectMaterial.uniforms[ "tEquirect" ].value = textureEquirec;
// // enable code injection for non-built-in material
// Object.defineProperty( equirectMaterial, 'map', {
//   get: function () {
//     return this.uniforms.tEquirect.value;
//   }
// } );

// var cubeShader = THREE.ShaderLib[ "cube" ];
// var cubeMaterial = new THREE.ShaderMaterial( {
//   fragmentShader: cubeShader.fragmentShader,
//   vertexShader: cubeShader.vertexShader,
//   uniforms: cubeShader.uniforms,
//   depthWrite: false,
//   side: THREE.BackSide
// } );
//
// cubeMaterial.uniforms[ "tCube" ].value = textureCube;
// Object.defineProperty( cubeMaterial, 'map', {
//   get: function () {
//     return this.uniforms.tCube.value;
//   }
// } );

// Skybox
// cubeMesh = new THREE.Mesh( new THREE.BoxBufferGeometry( 100, 100, 100 ), cubeMaterial );
// sceneCube.add( cubeMesh );

// Mesh
// var geometry = new THREE.SphereBufferGeometry( 400.0, 48, 24 );
// sphereMaterial = new THREE.MeshLambertMaterial( { envMap: textureCube } );
// sphereMesh = new THREE.Mesh( geometry, sphereMaterial );
// scene.add( sphereMesh );

// RENDERER
renderer = new THREE.WebGLRenderer();
renderer.autoClear = false;
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
renderer.gammaOutput = true; //
//

controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.minDistance = 1;
controls.maxDistance = 1000;
//controls.update() must be called after any manual changes to the camera's transform
controls.update();

window.addEventListener( 'resize', onWindowResize, false );

/*INIT - END*/

var scene, camera, controls, gui, renderer;

/*INIT - BEGIN*/
function init()
{
// renderer
  renderer = new THREE.WebGLRenderer();
  renderer.autoClear = true;
  // renderer.autoClear = false;
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  renderer.gammaOutput = true;

//controls
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.minDistance = 1;
  controls.maxDistance = 1000;
//controls.update() must be called after any manual changes to the camera's transform
  controls.update();
}
/*INIT - END*/

/*CHANGE SCENE - START*/

import template_0 from "./template_0.js";
import template_1 from "./template_1.js";

var template_patterns = {
  "template_0": template_0,
  "template_1": template_1,
};

async function selectTemplate(id) {
  var template = document.getElementById("template_"+ id);
  template.checked = true;

  var currentTemplateName = template.value;
  var sceneInfo = new template_patterns[currentTemplateName]();
  // var sceneInfo =
  await sceneInfo.init();
  stop();
  scene = sceneInfo.scene;
  camera = sceneInfo.camera;
  gui = sceneInfo.gui;
  init();
  animate();
  console.log(currentTemplateName + " loaded");
}
window.selectTemplate = selectTemplate;
selectTemplate(0);

/*CHANGE SCENE - END*/

/* RESIZE WINDOW - START */
window.addEventListener( 'resize', onWindowResize, false );
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}
/* RESIZE WINDOW - END */

/* RENDER & ANIMATE - START */
var frameId = null;
function animate() {
  frameId = requestAnimationFrame( animate );
  render();
}

//clear the scene
function stop() {
  cancelAnimationFrame(frameId);
  try {
    var elem = renderer.domElement;
    elem.parentNode.removeChild(elem);
    elem = gui.domElement;
    elem.parentNode.removeChild(elem);
  } catch (e) {
    console.log("failed to stop")
  }
}

function render() {
  controls.update();
  camera.lookAt( scene.position );
  renderer.render( scene, camera );
}

/* RENDER & ANIMATE - END */

/**reference: https://threejs.org/docs/#manual/en/introduction/How-to-dispose-of-objects **
function clearScene() {
  for (i = 0; i < num_object; i++) {
    scene.remove( object[i] );
  }
  // for (i = 0; i < num_geometry; i++) {
  //   geometry[i].dispose();
  // }
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
  for (i = 0; i < num_light; i++) {
    scene.remove(lights[i]);
  }
  //ref. https://www.jstips.co/en/javascript/two-ways-to-empty-an-array/
  object.length = 0;
  material.length = 0;
  texture.length = 0;
  geometry.length = 0;
  animation.length = 0;
  lights.length = 0;
  num_object = 0;
  num_material = 0;
  num_texture = 0;
  num_geometry = 0;
  num_animation = 0;
  num_light = 0;
  renderer.setClearColor( 0x000000, 0 );
  render();
  console.log("Cleared Scene");
}

/* Three.js -- END */


/* Other functions - START *


 Other functions -- END */
