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

try {
// Get the container element
  var btnContainer = document.getElementById("menu");

// Get all buttons with class="btn" inside the container
  var btns = btnContainer.getElementsByClassName("menu-template-btn");

// Loop through the buttons and add the active class to the current/clicked button
  for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function () {
      var current = document.getElementsByClassName("active");
      // If there's no active class
      if (current.length > 0) {
        current[0].className = current[0].className.replace(" active", "");
      }
      // Add the active class to the current/clicked button
      this.className += " active";
    });
  }
} catch (e) {

}

/*************************** THREEJS PART ***********************************/
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
import template_2 from "./template_2.js";

var template_patterns = {
  "template_0": template_0,
  "template_1": template_1,
  "template_2": template_2,
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

  var menuElem = document.getElementById("menu-button");
  menuElem.dispatchEvent(new Event('click'));
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

/*************************** THREEJS PART  - END ***********************************/
