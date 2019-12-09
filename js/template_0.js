import {
  BufferGeometry,
  Color,
  Curve,
  DoubleSide,
  Float32BufferAttribute,
  FontLoader,
  Group,
  LineSegments,
  LineBasicMaterial,
  Mesh,
  MeshPhongMaterial,
  PerspectiveCamera,
  PointLight,
  Scene,
  Shape,
  TextGeometry,
  Vector3,
  WireframeGeometry,
  WebGLRenderer
} from "https://threejs.org/build/three.module.js";

import { GUI } from 'https://threejs.org/examples/jsm/libs/dat.gui.module.js';
import { OrbitControls } from 'https://threejs.org/examples/jsm/controls/OrbitControls.js';
// import { ParametricGeometries } from 'https://threejs.org/examples/jsm/geometries/ParametricGeometries.js';

if (gui != null) {
  gui.destroy();
}
gui = new GUI();

function updateGroupGeometry( mesh, geometry ) {

  if ( geometry.isGeometry ) {
    geometry[num_geometry] = new BufferGeometry().fromGeometry( geometry );
    num_geometry++;
    console.warn( 'THREE.GeometryBrowser: Converted Geometry to BufferGeometry.' );

  }

  mesh.children[ 0 ].geometry.dispose();
  mesh.children[ 1 ].geometry.dispose();

  mesh.children[ 0 ].geometry = new WireframeGeometry( geometry );
  mesh.children[ 1 ].geometry = geometry;

  // these do not update nicely together if shared

}

var guis = {

  TextGeometry: function ( mesh ) {

    var data = {
      text: "Try a template!",
      size: 5,
      height: 2,
      curveSegments: 12,
      font: "helvetiker",
      weight: "regular",
      bevelEnabled: false,
      bevelThickness: 1,
      bevelSize: 0.5,
      bevelOffset: 0.0,
      bevelSegments: 3
    };

    var fonts = [
      "helvetiker",
      "optimer",
      "gentilis",
      "droid/droid_serif"
    ];

    var weights = [
      "regular", "bold"
    ];

    function generateGeometry() {

      var loader = new FontLoader();
      loader.load( 'https://threejs.org/examples/fonts/' + data.font + '_' + data.weight + '.typeface.json', function ( font ) {

        var geometry = new TextGeometry( data.text, {
          font: font,
          size: data.size,
          height: data.height,
          curveSegments: data.curveSegments,
          bevelEnabled: data.bevelEnabled,
          bevelThickness: data.bevelThickness,
          bevelSize: data.bevelSize,
          bevelOffset: data.bevelOffset,
          bevelSegments: data.bevelSegments
        } );
        geometry.center();

        updateGroupGeometry( mesh, geometry );

      } );

    }

    //Hide the wireframe
    mesh.children[ 0 ].visible = false;

    var folder = gui.addFolder( 'TextGeometry' );

    folder.add( data, 'text' ).onChange( generateGeometry );
    folder.add( data, 'size', 1, 30 ).onChange( generateGeometry );
    folder.add( data, 'height', 1, 20 ).onChange( generateGeometry );
    folder.add( data, 'curveSegments', 1, 20 ).step( 1 ).onChange( generateGeometry );
    folder.add( data, 'font', fonts ).onChange( generateGeometry );
    folder.add( data, 'weight', weights ).onChange( generateGeometry );
    folder.add( data, 'bevelEnabled' ).onChange( generateGeometry );
    folder.add( data, 'bevelThickness', 0.1, 3 ).onChange( generateGeometry );
    folder.add( data, 'bevelSize', 0, 3 ).onChange( generateGeometry );
    folder.add( data, 'bevelOffset', - 0.5, 1.5 ).onChange( generateGeometry );
    folder.add( data, 'bevelSegments', 0, 8 ).step( 1 ).onChange( generateGeometry );

    generateGeometry();

  }
};

scene.background.set(0x444444);
camera.position.z = 30;
// orbit.enableZoom = false;

lights[num_light] = new PointLight( 0xffffff, 1, 0 );
lights[num_light].position.set( 0, 200, 0 );
scene.add( lights[ num_light ] );
num_light++;

lights[ num_light ] = new PointLight( 0xffffff, 1, 0 );
lights[ num_light ].position.set( 100, 200, 100 );
scene.add( lights[ num_light ] );
num_light++;

lights[ num_light ] = new PointLight( 0xffffff, 1, 0 );
lights[ num_light ].position.set( - 100, - 200, - 100 );
scene.add( lights[ num_light ] );
num_light++;

var group = new Group();

geometry[num_geometry] = new BufferGeometry();
geometry[num_geometry].setAttribute( 'position', new Float32BufferAttribute( [], 3 ) );
var tp0_num_geo = num_geometry;
num_geometry++;

var lineMaterial = new LineBasicMaterial( { color: 0xffffff, transparent: true, opacity: 0.5 } );
var meshMaterial = new MeshPhongMaterial( { color: 0xfefefe, emissive: 0x072534, side: DoubleSide, flatShading: true } );
material[num_material] = lineMaterial;
num_material++;
material[num_material] = meshMaterial;
num_material++;

group.add( new LineSegments( geometry[tp0_num_geo], lineMaterial ) );
group.add( new Mesh( geometry[tp0_num_geo], meshMaterial ) );
object[num_object] = group;
num_object++;

guis[ "TextGeometry" ]( group );

scene.add( group );

var render = function () {

  requestAnimationFrame( render );

  renderer.render( scene, camera );

};

render();
