template_1();

function template_1() {
  // BACKGROUND
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
  var cubeMesh = new THREE.Mesh(new THREE.BoxBufferGeometry(100, 100, 100), cubeMaterial);
  sceneCube.add(cubeMesh);
  cubeMesh.material = cubeMaterial;
  cubeMesh.visible = true;

  // scene.background = tp1_textureCube;

  // LOAD OBJECT
  objectMaterial = new THREE.MeshLambertMaterial({envMap: textureCube});
  objectMaterial.envMap = textureCube;
  objectMaterial.needsUpdate = true;

  // Load a glTF resource
  gltfLoader.load(
    // resource URL
    'obj/blue_diamond/scene.gltf',
    // called when the resource is loaded
    function (gltf) {
      gltf_id = num_object;
      num_object++;
      object[gltf_id] = gltf.scene;

      gltf.scene.scale.set(10,12,10)

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
  lights[num_light] = new THREE.AmbientLight(0xeeeeee, 100); // soft white light
  scene.add(lights[num_light]);
  num_light++;

  lights[num_light] = new THREE.RectAreaLight(0xe46879, 1, 50,50); // soft pink light
  lights[num_light].position.set(5, 5, 10);
  lights[num_light].lookAt(0, 0, 0);
  scene.add(lights[num_light]);
  // rectLightHelper = new THREE.RectAreaLightHelper( lights[num_light] );
  // lights[num_light].add( rectLightHelper );
  num_light++;

  lights[num_light] = new THREE.RectAreaLight(0xe9de77, 0.7, 50,50); // soft yellow light
  lights[num_light].position.set(-5, 7.5, 10);
  lights[num_light].lookAt(0, 0, 0);
  scene.add(lights[num_light]);
  // rectLightHelper = new THREE.RectAreaLightHelper( lights[num_light] );
  // lights[num_light].add( rectLightHelper );
  num_light++;

  lights[num_light] = new THREE.RectAreaLight(0x3bbce4, 0.5, 50,50); // soft blue light
  lights[num_light].position.set(5, -5, 10);
  lights[num_light].lookAt(0, 0, 0);
  scene.add(lights[num_light]);
  // rectLightHelper = new THREE.RectAreaLightHelper( lights[num_light] );
  // lights[num_light].add( rectLightHelper );
  num_light++;

  lights[num_light] = new THREE.RectAreaLight(0xe46879, 1, 50,50); // soft pink light
  lights[num_light].position.set(5, 5, -10);
  lights[num_light].lookAt(0, 0, 0);
  scene.add(lights[num_light]);
  num_light++;

  lights[num_light] = new THREE.RectAreaLight(0xe9de77, 0.7, 50,50); // soft yellow light
  lights[num_light].position.set(-5, 7.5, -10);
  lights[num_light].lookAt(0, 0, 0);
  scene.add(lights[num_light]);
  num_light++;

  lights[num_light] = new THREE.RectAreaLight(0x3bbce4, 0.5, 50,50); // soft blue light
  lights[num_light].position.set(5, -5, -10);
  lights[num_light].lookAt(0, 0, 0);
  scene.add(lights[num_light]);
  num_light++;


  var tp1_skyColor = 0xB1E1FF;  // light blue
  var tp1_groundColor = 0xB97A20;  // brownish orange
  var tp1_hemi_intensity = 10;
  lights[num_light] = new THREE.HemisphereLight(tp1_skyColor, tp1_groundColor, tp1_hemi_intensity);
  scene.add(lights[num_light]);
  num_light++;


  // TEXT
  loadText();

}

function loadText() {
  var fontName = "helvetiker", // helvetiker, optimer, gentilis, droid sans, droid serif
      fontWeight = "regular"; // regular bold

  //load font
  var loader = new THREE.FontLoader();
  loader.load( './fonts/' + fontName + '_' + fontWeight + '.typeface.json', function ( font ) {

    var text = "ADELAIDE\nFRINGE",
      height = 0.5,
      size = 2,
      hover = 1,
      curveSegments = 12,
      bevelThickness = 0.1,
      bevelSize = 0.05,
      bevelEnabled = true,
      fontName = "helvetiker", // helvetiker, optimer, gentilis, droid sans, droid serif
      fontWeight = "regular"; // regular bold

    textGeo = new THREE.TextGeometry( text, {

      font: font,

      size: size,
      height: height,
      curveSegments: curveSegments,

      bevelThickness: bevelThickness,
      bevelSize: bevelSize,
      bevelEnabled: bevelEnabled

    } );

    var textMaterial = new THREE.MeshPhongMaterial({color: 0xffffff});
    object[num_object] = new THREE.Mesh(textGeo, textMaterial);
    object[num_object].position.set( -20, -5, 0 );
    scene.add(object[num_object]);
    num_object++;

  } );

}

  //GUI
  // var params = {
  //   Object: function () {
  //
  //     cubeMesh.visible = false;
  //     objectMaterial.envMap = textureSphere;
  //     objectMaterial.needsUpdate = true;
  //
  //   },
  //   Refraction: false
  // };
  // gui.add(params, 'Object');
  // gui.add(params, 'Refraction').onChange(function (value) {
  //
  //   if (value) {
  //
  //     // textureEquirec.mapping = THREE.EquirectangularRefractionMapping;
  //     textureCube.mapping = THREE.CubeRefractionMapping;
  //
  //   } else {
  //
  //     // textureEquirec.mapping = THREE.EquirectangularReflectionMapping;
  //     textureCube.mapping = THREE.CubeReflectionMapping;
  //
  //   }
  //   objectMaterial.needsUpdate = true;
  //
  // });
  // gui.open();

