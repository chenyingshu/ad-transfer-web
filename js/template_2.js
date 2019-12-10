export default class template_2 {

  constructor (elem) {
    this.scene = null;
    this.camera = null;
    this.gui = null;
    this.gltfLoader = null;
    this.elem = elem;
    this.object = null;
  }

  async loadGLTF(scene) {

    let promise = new Promise((resolve, reject) => {
      this.gltfLoader = new THREE.GLTFLoader();
      this.gltfLoader.load(
        // resource URL
        'obj/johnnys_beer/scene.gltf',
        // called when the resource is loaded
        function (gltf) {
          gltf.scene.scale.set(3, 3, 3);
          gltf.scene.position.set(0, -15, 0);

          scene.add(gltf.scene);

          gltf.animations; // Array<THREE.AnimationClip>
          gltf.scene; // THREE.Scene
          gltf.scenes; // Array<THREE.Scene>
          gltf.cameras; // Array<THREE.Camera>
          gltf.asset; // Object

          console.log(gltf.scene.children[0]);
          resolve(true);
        },
        // called while loading is progressing
        function (xhr) {
          console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        // called when loading has errors
        function (error) {
          console.log('An error happened');
          resolve(false);
        }
      );
    });

    let result = await promise; // wait until the promise resolves (*)
  }

  async init() {
    var lights = [];
    var num_light = 0;

    // scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color( 0xf0f0f0 );

    // camera
    this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth/window.innerHeight, 1, 10000 );
    this.camera.position.set(0, 5, 35);

    // background texture
    {
      var urls = [
        './img/template_2/bg_square.png',
        './img/template_2/bg_square.png',
        './img/template_2/bg_square.png',
        './img/template_2/bg_square.png',
        './img/template_2/bg_square.png',
        './img/template_2/bg_square.png',
      ];

      var textureCube = new THREE.CubeTextureLoader().load(urls);
      textureCube.format = THREE.RGBFormat;
      textureCube.mapping = THREE.CubeReflectionMapping;
      textureCube.encoding = THREE.sRGBEncoding;

      this.scene.background = textureCube;
    }


    // Load a glTF resource
    await this.loadGLTF(this.scene);

    this.gui = new dat.GUI();
    var gui = this.gui;
    // text
    {
      var textData = {
        text: "FRESHNESS HAS A NAME",
        height: 0.5,
        size: 2,
        hover: 1,
        curveSegments: 12,
        bevelThickness: 0.1,
        bevelSize: 0.05,
        font: "helvetiker",
        weight: "regular",
        bevelEnabled: true,
        color: "#ffffff",
        emissive: "#072534",
        bevelOffset: 0.0,
        bevelSegments: 3,
        flatShading: true,
        posx: 0,
        posy: 12,
        posz: 0,
        anglex: 0,
        angley: 0,
        anglez: 0
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

      var textMaterial = new THREE.MeshPhongMaterial();
      var textGeometry = new THREE.BufferGeometry();
      var textMesh = new THREE.Mesh(textGeometry, textMaterial);
    }
    function generateGeometry() {

      var loader = new THREE.FontLoader();
      loader.load('https://threejs.org/examples/fonts/' + textData.font + '_' + textData.weight + '.typeface.json', function (font) {

        var geometry = new THREE.TextGeometry(textData.text, {
          font: font,
          size: textData.size,
          height: textData.height,
          curveSegments: textData.curveSegments,
          bevelEnabled: textData.bevelEnabled,
          bevelThickness: textData.bevelThickness,
          bevelSize: textData.bevelSize,
          bevelOffset: textData.bevelOffset,
          bevelSegments: textData.bevelSegments
        });
        geometry.center();
        geometry = new THREE.BufferGeometry().fromGeometry(geometry);

        textMesh.geometry.dispose();
        textMesh.geometry = geometry;

        var textMaterial = new THREE.MeshPhongMaterial({
          side: THREE.DoubleSide,
          flatShading: textData.flatShading
        });
        textMaterial.color.setHex(textData.color.replace('#', '0x'));
        textMaterial.emissive.setHex(textData.emissive.replace('#', '0x'));
        textMaterial.needsUpdate = true;
        // textMesh.material.dispose();
        textMesh.material = textMaterial;
        textMesh.position.set(textData.posx, textData.posy, textData.posz);
        textMesh.rotation.set(textData.anglex, textData.angley, textData.anglez);
      });
    }

    generateGeometry();
    this.scene.add( textMesh );


    // lights

    //GUI parameters
    var lightingParams = {
      Ambient: {
        intensity : 1,
        color : "#006918"
      },
      PointLight:  {
        color : "#f2f8ec",
        intensity : 10,
        distance: 100,
        x : 3,
        y : 3,
        z : 6
      },
      SpotLight:  {
        color : "#f2f8ec",
        intensity : 10,
        distance: 100,
        posx : 0,
        posy : 6,
        posz : 0,
        castShadow: true,
        mapSize_width: 1024,
        mapSize_height: 1024,
        cam_near: 500,
        cam_far: 4000,
        cam_fov: 30,
        lookAtx: 0,
        lookAty: 0,
        lookAtz: 0
      },
    };

    var handleColorChange = function(color) {
      return function ( value ) {
        if ( typeof value === 'string' ) {
          value = value.replace( '#', '0x' );
        }
        color.setHex( value );
      };
    };

    var am_num = num_light++;
    lights[am_num] = new THREE.AmbientLight(0xeeeeee, 10); // soft white light
    var point_num = num_light++;
    var sphere = new THREE.SphereBufferGeometry( 0.5, 16, 8 );
    lights[point_num] = new THREE.PointLight(0xf2f8ec, 10, 100);
    lights[point_num].add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xf2f8ec } ) ) );
    var spot_num = num_light++;
    lights[spot_num] = new THREE.SpotLight(0xf2f8ec, 10, 100);
    console.log(am_num, " ", point_num, " ", spot_num);

    function setLightings(){
      var rectLightHelper;
      // lights[am_num].intensity = lightingParams.Ambient.intensity;
      // lights[am_num].color.setHex(lightingParams.Ambient.color.replace('#', '0x'));

      lights[point_num].position.set(lightingParams.PointLight.x, lightingParams.PointLight.y, lightingParams.PointLight.z);
      lights[point_num].intensity = lightingParams.PointLight.intensity;
      lights[point_num].distance = lightingParams.PointLight.distance;
      // rectLightHelper = new THREE.PointLightHelper( lights[point_num] );
      // lights[point_num].add( rectLightHelper );

      lights[spot_num].intensity = lightingParams.SpotLight.intensity;
      lights[spot_num].distance = lightingParams.SpotLight.distance;
      lights[spot_num].position.set(lightingParams.SpotLight.posx, lightingParams.SpotLight.posy, lightingParams.SpotLight.posz);
      lights[spot_num].castShadow = lightingParams.SpotLight.castShadow;
      lights[spot_num].shadow.mapSize.width = lightingParams.SpotLight.mapSize_width;
      lights[spot_num].shadow.mapSize.height = lightingParams.SpotLight.mapSize_height;
      lights[spot_num].shadow.camera.near = lightingParams.SpotLight.cam_near;
      lights[spot_num].shadow.camera.far = lightingParams.SpotLight.cam_far;
      lights[spot_num].shadow.camera.fov = lightingParams.SpotLight.cam_fov;
      lights[spot_num].lookAt(lightingParams.SpotLight.lookAtx, lightingParams.SpotLight.lookAty, lightingParams.SpotLight.lookAtz);
      // rectLightHelper = new THREE.SpotLightHelper( lights[spot_num] );
      // lights[spot_num].add( rectLightHelper );
    }
    setLightings();
    this.scene.add(lights[num_light]);
    this.scene.add(lights[point_num]);
    this.scene.add(lights[spot_num]);

    //gui
    // var f1 = this.gui.addFolder("Object");
    var f2 = this.gui.addFolder("Lighting");
    var light_idx = am_num;
    var light_param = lightingParams.Ambient;
    var f21 = f2.addFolder("Ambient Light");
    f21.add(light_param, 'intensity', 1, 100).step(1).onChange( function(val) { lights[light_idx].intensity = val; });
    f21.addColor(light_param, "color").onChange(handleColorChange(lights[light_idx].color));

    light_idx = point_num;
    light_param = lightingParams.PointLight;
    f21 = f2.addFolder("Point Light");
    f21.add(light_param, 'intensity', 0, 100).step(0.1).onChange( setLightings );
    // f21.addColor(light_param, 'color').onChange(this.handleColorChange(lights[light_idx].color));
    f21.add(light_param, 'distance', 0, 1000).step(1).onChange( setLightings );
    f21.add(light_param, 'x', -100, 100).step(0.5).onChange( setLightings );
    f21.add(light_param, 'y', -100, 100).step(0.5).onChange( setLightings );
    f21.add(light_param, 'z', -100, 100).step(0.5).onChange( setLightings );


    light_idx = spot_num;
    light_param = lightingParams.SpotLight;
    f21 = f2.addFolder("SpotLight");
    f21.add(light_param, 'intensity', 0, 100).step(0.1).onChange( setLightings );
    f21.addColor(light_param, 'color').onChange( setLightings );
    f21.add(light_param, 'distance', 0, 1000).step(1).onChange( setLightings );
    f21.add(light_param, 'posx', -100, 100).step(0.5).onChange( setLightings );
    f21.add(light_param, 'posy', -100, 100).step(0.5).onChange( setLightings );
    f21.add(light_param, 'posz', -100, 100).step(0.5).onChange( setLightings );
    f21.add(light_param, 'lookAtx', -100, 100).step(0.5).onChange( setLightings );
    f21.add(light_param, 'lookAty', -100, 100).step(0.5).onChange( setLightings );
    f21.add(light_param, 'lookAtz', -100, 100).step(0.5).onChange( setLightings );
    f21.add(light_param, 'cam_near', 1, 1000).step(0.5).onChange( setLightings );
    f21.add(light_param, 'cam_far', 1, 10000).step(0.5).onChange( setLightings );
    f21.add(light_param, 'cam_fov', 1, 360).step(0.5).onChange( setLightings );


    var f3 = this.gui.addFolder("Text");
    // var folder = this.gui.addFolder('TextGeometry');
    // f3.add( data, 'text' ).onChange( generateGeometry );
    f3.add(textData, 'size', 1, 30).onChange(generateGeometry);
    f3.add(textData, 'height', 0.1, 5).step(0.1).onChange(generateGeometry);
    f3.add(textData, 'curveSegments', 1, 20).step(1).onChange(generateGeometry);
    f3.add(textData, 'font', fonts).onChange(generateGeometry);
    f3.add(textData, 'weight', weights).onChange(generateGeometry);
    f3.add(textData, 'bevelEnabled').onChange(generateGeometry);
    f3.add(textData, 'bevelThickness', 0.1, 3).onChange(generateGeometry);
    f3.add(textData, 'bevelSize', 0, 3).onChange(generateGeometry);
    f3.add(textData, 'bevelOffset', -0.5, 1.5).onChange(generateGeometry);
    f3.add(textData, 'bevelSegments', 0, 8).step(1).onChange(generateGeometry);
    f3.add(textData, 'flatShading').onChange(generateGeometry);
    f3.addColor(textData, 'color').onChange(generateGeometry);
    f3.addColor(textData, 'emissive').onChange(generateGeometry);
    f3.add(textData, 'posx', -100, 100).step(0.1).onChange(generateGeometry);
    f3.add(textData, 'posy', -100, 100).step(0.1).onChange(generateGeometry);
    f3.add(textData, 'posz', -100, 100).step(0.1).onChange(generateGeometry);
    f3.add(textData, 'anglex', 0, 180).step(0.1).onChange(generateGeometry);
    f3.add(textData, 'angley', 0, 180).step(0.1).onChange(generateGeometry);
    f3.add(textData, 'anglez', 0, 180).step(0.1).onChange(generateGeometry);
  }

}
