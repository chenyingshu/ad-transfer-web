var group, disc, circle;
var width, height, depth;
var basicLightning, hemiLight, pointLight;
var particlesGroup;
var spotLightsGroup;
var dancingSpotLights;
var startTime, elapsedTime;

function setupBasicLightning() {
  hemiLight = new THREE.HemisphereLight( 0xDDDDFF, 0xDDDDFF, 0.02 );
  hemiLight.intensity = ambientIlluminance[lightningParams.hemiLightningPower];
  hemiLight.position.set(0, height / 2.5, 0);
  hemiLight.visible = lightningParams.hemiActive;
  basicLightning.add(hemiLight);

  var pointLightGeometry = new THREE.DodecahedronGeometry(7, 0);
  var pointLightMaterial = new THREE.MeshStandardMaterial({
    emissive: 0x4477FF,
    emissiveIntensity: 2,
    color: 0xFFFFFF
  });

  pointLight = new THREE.SpotLight(0x4477FF, 2);
  pointLight.castShadow = true;
  pointLight.angle = 0.8;
  pointLight.penumbra = 0.8;
  pointLight.decay = 2;
  pointLight.distance = 800;
  pointLight.shadow.mapSize.width = 1024;
  pointLight.shadow.mapSize.height = 1024;
  pointLight.add(new THREE.Mesh(pointLightGeometry, pointLightMaterial));
  pointLight.updateMatrixWorld();
  pointLight.castShadow = true;
  pointLight.intensity =  lmPerWat[lightningParams.pointLightningPowerA] *
    lampPower[lightningParams.pointLightningPowerB];
  pointLight.position.set(0, height / 3, 0);
  pointLight.visible = lightningParams.pointActive;
  basicLightning.add(pointLight);
}

export default class template_3 {

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
          gltf.scene.traverse( function ( node ) {
            if ( node.isMesh ) node.castShadow = true;
          } );
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

  async loadGLTF2(scene) {

    let promise = new Promise((resolve, reject) => {
      this.gltfLoader = new THREE.GLTFLoader();
      this.gltfLoader.load(
        // resource URL
        'obj/stone_tile/scene.gltf',
        // called when the resource is loaded
        function (gltf) {
          // gltf.scene.children[0].rotation.set(-1.5707963267948963,45,45);
          gltf.scene.scale.set(100, 100, 100);
          gltf.scene.position.set(0, -15, 0);
          gltf.scene.rotation.set(0,45,0);

          scene.add(gltf.scene);

          gltf.animations; // Array<THREE.AnimationClip>
          gltf.scene; // THREE.Scene
          gltf.scenes; // Array<THREE.Scene>
          gltf.cameras; // Array<THREE.Camera>
          gltf.asset; // Object

          console.log(gltf.scene.children[0]);
          console.log(gltf.scene);
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
    startTime       = Date.now();
    group           = new THREE.Group();
    disc            = new THREE.Group();
    basicLightning  = new THREE.Group();
    particlesGroup  = new THREE.Group();
    spotLightsGroup = new THREE.Group();
    height = window.innerHeight;
    width = window.innerWidth;
    depth = height;

    var lights = [];
    var num_light = 0;

    // scene
    this.scene = new THREE.Scene();
    // this.scene.background = new THREE.Color( 0xf0f0f0 );

    // camera
    this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth/window.innerHeight, 1, 10000 );
    this.camera.position.set(0, 5, 35);

    var scene = this.scene;

    //disc texture
    function setDisc() {
      var circleRadius = 50;
      var texture = new THREE.TextureLoader().load('vinyl_texture.png');
      var circleGeometry = new THREE.CircleGeometry(circleRadius, 128);
      var circleMaterial = new THREE.MeshStandardMaterial({
        color: 0xFFFFFF,
        metalness: 0,
        map: texture
      });
      circleMaterial.side = THREE.DoubleSide;
      circle = new THREE.Mesh(circleGeometry, circleMaterial);
      circle.castShadow = false;
      circle.receiveShadow = true;
      circle.rotation.x = 90 * Math.PI / 180;
      circle.position.set(0, -8, 0);
      circle.updateMatrixWorld();
      // sceneMaterials.push(circleMaterial);
      circleMaterial.needsUpdate = true;
      disc.add(circle);
    }
    setDisc();
    group.position.y = -10;
    group.add( disc );
    group.add( basicLightning );
    this.scene.add( group );

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
    // await this.loadGLTF2(this.scene);
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
        font: "droid/droid_serif",
        weight: "regular",
        bevelEnabled: true,
        color: "#f2ffd0",
        emissive: "#f2f8ec",
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

    //dancing spotlights
    var folder = this.gui.addFolder('Dancing SpotLights');
    folder.add(dancingSpotLightsParams, 'enable');
    folder.add(dancingSpotLightsParams, 'helpers').listen();
    particlesGroup.radius = 512;
    particlesGroup.positionY = 0;
    group.add( particlesGroup );
    dancingSpotLights = new SpotLights();
    dancingSpotLights.init( spotLightsGroup, 4, 40, 40 );
    dancingSpotLights.helpersVisible = dancingSpotLightsParams.helpers;
    group.add(spotLightsGroup);
    spotLightsGroup.visible = dancingSpotLightsParams.enable;

    setupBasicLightning();

    //GUI parameters
    var lightingParams = {
      Ambient: {
        intensity : 1,
        color : "#006918"
      },
      PointLight:  {
        color : "#f2f8ec",
        intensity : 20,
        castShadow: true,
        distance: 20,
        x : 3,
        y : 3,
        z : 6
      },
      SpotLight:  {
        color : "#f2f8ec",
        intensity : 7,
        distance: 50,
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
    lights[point_num] = new THREE.PointLight(0xf2f8ec, lightingParams.PointLight.intensity, lightingParams.PointLight.distance);
    lights[point_num].add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xf2f8ec } ) ) );
    lights[point_num].castShadow = lightingParams.PointLight.castShadow;
    var spot_num = num_light++;
    lights[spot_num] = new THREE.SpotLight(0xf2f8ec,  lightingParams.SpotLight.intensity, lightingParams.SpotLight.distance);
    lights[spot_num].castShadow = lightingParams.SpotLight.castShadow;

    var dynamicLights = {
      enable: true,
      castShadow: true
    };



    var dynamicFlag = false;
    var light1, light2, light3, light4;
    var frameId;

    function updateDancingSpotLights() {
      if (dancingSpotLightsParams.enable) {
        spotLightsGroup.visible = true;
        dancingSpotLights.helpersVisible = dancingSpotLightsParams.helpers;
        dancingSpotLights.update(spotLightsGroup);
      } else {
        dancingSpotLightsParams.helpers = false;
        spotLightsGroup.visible = false;
      }
    }

    function animate() {

      updateDancingSpotLights();

      frameId = requestAnimationFrame( animate );
      render();
      // stats.update();
    }

    function stop() {
      cancelAnimationFrame(frameId);
    }
    var clock = new THREE.Clock();
    function render() {
      var time = Date.now() * 0.0005;
      var delta = clock.getDelta();
      // if ( object ) object.rotation.y -= 0.5 * delta;
      light1.position.x = Math.sin( time * 0.7 ) * 15;
      light1.position.y = Math.cos( time * 0.5 ) * 20;
      light1.position.z = Math.cos( time * 0.3 ) * 15;
      light2.position.x = Math.cos( time * 0.3 ) * 15;
      light2.position.y = Math.sin( time * 0.5 ) * 20;
      light2.position.z = Math.sin( time * 0.7 ) * 15;
      light3.position.x = Math.sin( time * 0.7 ) * 15;
      light3.position.y = Math.cos( time * 0.3 ) * 20;
      light3.position.z = Math.sin( time * 0.5 ) * 15;
      light4.position.x = Math.sin( time * 0.3 ) * 15;
      light4.position.y = Math.cos( time * 0.7 ) * 20;
      light4.position.z = Math.sin( time * 0.5 ) * 15;
      // renderer.render( scene, this.camera );
    }

    function setDynamicLights(flag){
      if (dynamicFlag != flag) {
        dynamicFlag = flag;
        if (flag) {
          light1 = new THREE.PointLight( 0xff0040, 2, 50 );
          light1.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xff0040 } ) ) );
          light2 = new THREE.PointLight( 0x0040ff, 2, 50 );
          light2.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0x0040ff } ) ) );
          light3 = new THREE.PointLight( 0x80ff80, 2, 50 );
          light3.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0x80ff80 } ) ) );
          light4 = new THREE.PointLight( 0xffaa00, 2, 50 );
          light4.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xffaa00 } ) ) );
          scene.add(light1);
          scene.add(light2);
          scene.add(light3);
          scene.add(light4);
          animate();
        } else {
          scene.remove(light1);
          scene.remove(light2);
          scene.remove(light3);
          scene.remove(light4);
          stop();
        }
      }
    }
    setDynamicLights(true);

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

    // add fog
    var fogParams = {
      color: "#090f06",
      near: 25,
      far: 100
    };

    this.scene.fog = new THREE.Fog(0xe1fad3, 1, 2);
    function setFog() {
      scene.fog.color.setHex(fogParams.color.replace('#', '0x'));
      scene.fog.near = fogParams.near;
      scene.fog.far = fogParams.far;
    }
    setFog();
    // this.scene.background = new THREE.Color(color);

    //gui
    var f1 = this.gui.addFolder("Dynamic Point Lights");
    f1.add(dynamicLights, "enable").onChange(function (val) {
      setDynamicLights(val);
    });
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
    f21.add(light_param, 'castShadow').onChange( setLightings );
    f21.add(light_param, 'x', -100, 100).step(0.5).onChange( setLightings );
    f21.add(light_param, 'y', -100, 100).step(0.5).onChange( setLightings );
    f21.add(light_param, 'z', -100, 100).step(0.5).onChange( setLightings );


    light_idx = spot_num;
    light_param = lightingParams.SpotLight;
    f21 = f2.addFolder("SpotLight");
    f21.add(light_param, 'intensity', 0, 100).step(0.1).onChange( setLightings );
    f21.addColor(light_param, 'color').onChange( setLightings );
    f21.add(light_param, 'distance', 0, 1000).step(1).onChange( setLightings );
    f21.add(light_param, 'castShadow').onChange( setLightings );
    f21.add(light_param, 'posx', -100, 100).step(0.5).onChange( setLightings );
    f21.add(light_param, 'posy', -100, 100).step(0.5).onChange( setLightings );
    f21.add(light_param, 'posz', -100, 100).step(0.5).onChange( setLightings );
    f21.add(light_param, 'lookAtx', -100, 100).step(0.5).onChange( setLightings );
    f21.add(light_param, 'lookAty', -100, 100).step(0.5).onChange( setLightings );
    f21.add(light_param, 'lookAtz', -100, 100).step(0.5).onChange( setLightings );
    f21.add(light_param, 'cam_near', 1, 1000).step(0.5).onChange( setLightings );
    f21.add(light_param, 'cam_far', 1, 10000).step(0.5).onChange( setLightings );
    f21.add(light_param, 'cam_fov', 1, 360).step(0.5).onChange( setLightings );
    f21.add(light_param, 'mapSize_width', 1, 3000).step(1).onChange( setLightings );
    f21.add(light_param, 'mapSize_height', 1, 3000).step(1).onChange( setLightings );



    var f3 = this.gui.addFolder("Text");
    f3.add(textData, 'text' ).onChange( generateGeometry );
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


    var f4 = this.gui.addFolder("Fog");
    f4.add(fogParams, 'near', 0, 100).onChange(setFog);
    f4.add(fogParams, 'far', 0, 100).onChange(setFog);
    f4.addColor(fogParams, 'color').onChange(setFog);
  }

}
