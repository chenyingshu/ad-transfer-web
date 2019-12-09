import * as THREE from "https://threejs.org/build/three.module.js";
import { GUI } from 'https://threejs.org/examples/jsm/libs/dat.gui.module.js';
import { OrbitControls } from 'https://threejs.org/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader} from "https://threejs.org/examples/jsm/loaders/GLTFLoader.js";

var cameraCube;
var textureCube, textureSphere;
var cubeMesh, objectMesh;
var objectMaterial;

if (gui != null) {
  gui.destroy();
}
gui = new GUI();

template_1();
animate();

function template_1() {
  // Textures
  var urls = [
    './img/template_1/bg_square.png',
    './img/template_1/bg_square.png',
    './img/template_1/bg_square.png',
    './img/template_1/bg_square.png',
    './img/template_1/bg_square.png',
    './img/template_1/bg_square.png',
  ];

  textureCube = new THREE.CubeTextureLoader().load(urls);
  textureCube.format = THREE.RGBFormat;
  textureCube.mapping = THREE.CubeReflectionMapping;
  textureCube.encoding = THREE.sRGBEncoding;

  // textureSphere = textureLoader.load( "https://threejs.org/examples/textures/metal.jpg" );
  // textureSphere.mapping = THREE.SphericalReflectionMapping;
  // textureSphere.encoding = THREE.sRGBEncoding;

  // Materials
  var cubeShader = THREE.ShaderLib["cube"];
  var cubeMaterial = new THREE.ShaderMaterial({
    fragmentShader: cubeShader.fragmentShader,
    vertexShader: cubeShader.vertexShader,
    uniforms: cubeShader.uniforms,
    depthWrite: false,
    side: THREE.BackSide
  });

  cubeMaterial.uniforms["tCube"].value = textureCube;
  Object.defineProperty(cubeMaterial, 'map', {
    get: function () {
      return this.uniforms.tCube.value;
    }
  });

  // Skybox
  // var cubeMesh = new THREE.Mesh(new THREE.BoxBufferGeometry(100, 100, 100), cubeMaterial);
  // sceneCube.add(cubeMesh);
  // cubeMesh.material = cubeMaterial;
  // cubeMesh.visible = true;
  scene.background = textureCube;

  // LOAD OBJECT
  // objectMaterial = new THREE.MeshLambertMaterial({envMap: textureCube});
  // objectMaterial.envMap = textureCube;
  // objectMaterial.needsUpdate = true;

  // Load a glTF resource
  gltfLoader.load(
    // resource URL
    'obj/blue_diamond/scene.gltf',
    // called when the resource is loaded
    function (gltf) {

      var gltf_id = num_object;
      num_object++;
      object[gltf_id] = gltf.scene;

      gltf.scene.scale.set(10,12,10);

      scene.add(gltf.scene);

      gltf.animations; // Array<THREE.AnimationClip>
      gltf.scene; // THREE.Scene
      gltf.scenes; // Array<THREE.Scene>
      gltf.cameras; // Array<THREE.Camera>
      gltf.asset; // Object

      console.log(gltf.scene.children[0]);
      console.log(gltf);

    },
    // called while loading is progressing
    function (xhr) {

      console.log((xhr.loaded / xhr.total * 100) + '% loaded');

    },
    // called when loading has errors
    function (error) {

      console.log('An error happened');

    }
  );

  // CAMERA
  camera.position.set(-1, 0.7, 25);

  // LIGHTS
  var am_num, area1_num;



  function setupLights()
  {

    am_num = num_light;
    lights[num_light] = new THREE.AmbientLight(0xeeeeee, 100); // soft white light
    scene.add(lights[num_light]);
    num_light++;

    area1_num = num_light;
    lights[num_light] = new THREE.RectAreaLight(0xe46879, 1, 50, 50); // soft pink light
    lights[num_light].position.set(5, 5, 10);
    lights[num_light].lookAt(0, 0, 0);
    scene.add(lights[num_light]);
    // rectLightHelper = new THREE.RectAreaLightHelper( lights[num_light] );
    // lights[num_light].add( rectLightHelper );
    num_light++;

    var area2_num = num_light;
    lights[num_light] = new THREE.RectAreaLight(0xe9de77, 0.7, 50, 50); // soft yellow light
    lights[num_light].position.set(-5, 7.5, 10);
    lights[num_light].lookAt(0, 0, 0);
    scene.add(lights[num_light]);
    // rectLightHelper = new THREE.RectAreaLightHelper( lights[num_light] );
    // lights[num_light].add( rectLightHelper );
    num_light++;

    var area3_num = num_light;
    lights[num_light] = new THREE.RectAreaLight(0x3bbce4, 0.5, 50, 50); // soft blue light
    lights[num_light].position.set(5, -5, 10);
    lights[num_light].lookAt(0, 0, 0);
    scene.add(lights[num_light]);
    // rectLightHelper = new THREE.RectAreaLightHelper( lights[num_light] );
    // lights[num_light].add( rectLightHelper );
    num_light++;

    var area4_num = num_light;
    lights[num_light] = new THREE.RectAreaLight(0xe46879, 1, 50, 50); // soft pink light
    lights[num_light].position.set(5, 5, -10);
    lights[num_light].lookAt(0, 0, 0);
    scene.add(lights[num_light]);
    num_light++;

    var area5_num = num_light;
    lights[num_light] = new THREE.RectAreaLight(0xe9de77, 0.7, 50, 50); // soft yellow light
    lights[num_light].position.set(-5, 7.5, -10);
    lights[num_light].lookAt(0, 0, 0);
    scene.add(lights[num_light]);
    num_light++;

    var area6_num = num_light;
    lights[num_light] = new THREE.RectAreaLight(0x3bbce4, 0.5, 50, 50); // soft blue light
    lights[num_light].position.set(5, -5, -10);
    lights[num_light].lookAt(0, 0, 0);
    scene.add(lights[num_light]);
    num_light++;


    var hemi_num = num_light;
    var tp1_skyColor = 0xB1E1FF;  // light blue
    var tp1_groundColor = 0xB97A20;  // brownish orange
    var tp1_hemi_intensity = 10;
    lights[num_light] = new THREE.HemisphereLight(tp1_skyColor, tp1_groundColor, tp1_hemi_intensity);
    scene.add(lights[num_light]);
    num_light++;
  }
  setupLights();

  //GUI
  var textparams = {
    text: "ADELAIDE\nFRINGE",
    height: 0.5,
    size: 2,
    hover: 1,
    curveSegments: 12,
    bevelThickness: 0.1,
    bevelSize: 0.05,
    bevelEnabled: true,
    fontName: "helvetiker", // helvetiker, optimer, gentilis, droid sans, droid serif
    fontWeight: "regular", // regular bold
    color: 0xffffff
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

  var object_num = -1;
  var textMaterial;
  var textGeo;
  function loadText() {
    //load font
    var loader = new THREE.FontLoader();
    loader.load( 'https://threejs.org/examples/fonts/' + textparams.fontName + '_' + textparams.fontWeight + '.typeface.json', function ( font ) {
      if (object_num >= 0) {
        textGeo.dispose();
        textMaterial.dispose();
        object[object_num].geometry.dispose();
        object[object_num].material.dispose();

      }

      textGeo = new THREE.TextGeometry(textparams.text, {

        font: font,

        size: textparams.size,
        height: textparams.height,
        curveSegments: textparams.curveSegments,

        bevelThickness: textparams.bevelThickness,
        bevelSize: textparams.bevelSize,
        bevelEnabled: textparams.bevelEnabled

      });

      textMaterial = new THREE.MeshPhongMaterial({color: textparams.color});
      if (object_num >= 0) {
        object[object_num].geometry = textGeo;
        object[object_num].material = textMaterial;
      } else{
        object[num_object] = new THREE.Mesh(textGeo, textMaterial);
        object[num_object].position.set(-20, -5, 0);
        scene.add(object[num_object]);
        object_num = num_object;
        num_object++;
      }
      console.log(object[object_num]);

    } );

  }
  var folder = gui.addFolder( 'TextGeometry' );

  // TEXT
  loadText();
  folder.add( textparams, 'text' ).onChange( loadText());
  folder.add( textparams, 'color' ).onChange( loadText() );
  folder.add( textparams, 'size', 1, 30 ).onChange( loadText() );
  folder.add( textparams, 'height', 1, 20 ).onChange( loadText() );
  folder.add( textparams, 'curveSegments', 1, 20 ).step( 1 ).onChange( loadText() );
  folder.add( textparams, 'fontName', fonts ).onChange( loadText() );
  folder.add( textparams, 'fontWeight', weights ).onChange( loadText() );
  folder.add( textparams, 'bevelEnabled' ).onChange( loadText() );
  folder.add( textparams, 'bevelThickness', 0.1, 3 ).onChange( loadText() );
  folder.add( textparams, 'bevelSize', 0, 3 ).onChange( loadText() );

  var lightparams = {
    color: lights[area1_num].color.getHex(),
    intensity: lights[area1_num].intensity
  };
  function changeLights() {
    lights[area1_num].color.setHex(lightparams.color);
    lights[area1_num].intensity = lightparams.intensity;
  }
  var folder2 = gui.addFolder( 'Area Lights1' );
  folder2.add (lightparams, "intensity", 0, 100).step( 0.1 ).onChange(function(val) {
    lights[area1_num].intensity = val;
  });
  folder2.add (lightparams, "color").onChange(function(val) {
    lights[area1_num].color.setHex(val);
  });

  // gui.open();

}

function handleColorChange( color ) {
  return function ( value ) {
    if ( typeof value === 'string' ) {
      value = value.replace( '#', '0x' );
    }
    color.setHex( value );
  };
}

window.addEventListener( 'resize', function () {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  // cameraCube.aspect = window.innerWidth / window.innerHeight;
  // cameraCube.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );

}, false );

function animate() {

  requestAnimationFrame( animate );

  render();

}

function render() {
  // required if controls.enableDamping or controls.autoRotate are set to true
  controls.update();

  // requestAnimationFrame( render );

  camera.lookAt( scene.position );
  // cameraCube.rotation.copy( camera.rotation );
  // renderer.render( sceneCube, cameraCube );
  renderer.render( scene, camera );

}
