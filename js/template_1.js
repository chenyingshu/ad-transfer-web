import { FresnelShader } from 'https://threejs.org/examples/jsm/shaders/FresnelShader.js';
var bubbles = [];
var bubbleParams =  {
  enable: true,
  static: false
};

export default class template_1 {

  constructor (elem) {
    this.scene = null;
    this.camera = null;
    this.gui = null;
    this.gltfLoader = null;
    this.elem = elem;
    this.object = null;

    this.handleColorChange = function(color) {
      return function ( value ) {
        if ( typeof value === 'string' ) {
          value = value.replace( '#', '0x' );
        }
        color.setHex( value );
      };
    };

    //GUI parameters
    this.lightingParams = {
      Ambient: {
        intensity : 10,
        color : "#eeeeee"
      },
      Area1:  {
        color : "#e46879",
        intensity : 1,
        width : 50,
        height : 50,
        x : 5,
        y : 5,
        z : 10
      },
      Area2:  {
        color : "#e9de77",
        intensity : 0.7,
        width : 50,
        height : 50,
        x : -5,
        y : 7.5,
        z : 10
      },
      Area3:  {
        color : "#3bbce4",
        intensity : 0.5,
        width : 50,
        height : 50,
        x : 5,
        y : -5,
        z : 10
      },
      Area4:  {
        color : "#e46879",
        intensity : 1,
        width : 50,
        height : 50,
        x : 5,
        y : 5,
        z : -10
      },
      Area5:  {
        color : "#e9de77",
        intensity : 1,
        width : 50,
        height : 50,
        x : -5,
        y : 7.5,
        z : -10
      },
      Area6:  {
        color : "#3bbce4",
        intensity : 1,
        width : 50,
        height : 50,
        x : 5,
        y : -5,
        z : -10,
      },
    };
  }

  async loadGLTF(scene) {

    let promise = new Promise((resolve, reject) => {
      this.gltfLoader = new THREE.GLTFLoader();
      this.gltfLoader.load(
        // resource URL
        'obj/blue_diamond/scene.gltf',
        // called when the resource is loaded
        function (gltf) {

          // var gltf_id = num_object;
          // num_object++;
          // object[gltf_id] = gltf.scene;
          // this.object = gltf.scene.children[0]; //mesh

          gltf.scene.scale.set(10, 12, 10);

          scene.add(gltf.scene);

          gltf.animations; // Array<THREE.AnimationClip>
          gltf.scene; // THREE.Scene
          gltf.scenes; // Array<THREE.Scene>
          gltf.cameras; // Array<THREE.Camera>
          gltf.asset; // Object

          console.log(gltf.scene.children[0]);
          // console.log(gltf);
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
    this.camera.position.set(-1, 0.7, 25);

    // background texture
    {
      var urls = [
        './img/template_1/texture.png',
        './img/template_1/texture.png',
        './img/template_1/texture.png',
        './img/template_1/texture.png',
        './img/template_1/texture.png',
        './img/template_1/texture.png',
      ];

      var textureCube = new THREE.CubeTextureLoader().load(urls);
      textureCube.format = THREE.RGBFormat;
      textureCube.mapping = THREE.CubeReflectionMapping;
      textureCube.encoding = THREE.sRGBEncoding;

      this.scene.background = textureCube;
    }

    //bubbles - Fresnel Effect
    var bubble_geometry = new THREE.SphereBufferGeometry( 1, 16, 16 );
    var shader = FresnelShader;
    var uniforms = THREE.UniformsUtils.merge( [

      THREE.UniformsLib[ "lights" ],
      shader.uniforms

    ] );//.clone( shader.uniforms );
    uniforms[ "tCube" ].value = textureCube;
    var bubble_material = new THREE.ShaderMaterial( {
      uniforms: uniforms,
      vertexShader: shader.vertexShader,
      fragmentShader: shader.fragmentShader
    } );

    for ( var i = 0; i < 10; i ++ ) {

      var mesh = new THREE.Mesh( bubble_geometry, bubble_material );

      mesh.position.x = Math.random() * 100 - 50;
      mesh.position.y = Math.random() * 100 - 50;
      mesh.position.z = Math.random() * 100 - 50;

      mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 1 + 1;
      this.scene.add( mesh );
      bubbles.push( mesh );

    }

    var scene = this.scene;
    var bubble_enabled = true;
    var bubble_static = false;
    function enableBubbles(flag) {
      if (bubble_enabled != flag) {
        if (flag){
          for (var i = 0, il = bubbles.length; i < il; i++) {
            var bubble = bubbles[i];
            scene.add(bubble);
          }
        } else {
          for (var i = 0, il = bubbles.length; i < il; i++) {
            var bubble = bubbles[i];
            scene.remove(bubble);
          }
        }
      }
      bubble_enabled = flag;
    }

    // Load a glTF resource
    await this.loadGLTF(this.scene);

    this.gui = new dat.GUI();
    var gui = this.gui;
    // text
    {
      var textData = {
        text: "ADELAIDE\nFRINGE",
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
        posx: -20,
        posy: -5,
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
    {
      var am_num = num_light;
      lights[num_light] = new THREE.AmbientLight(0xeeeeee, 10); // soft white light
      lights[am_num].intensity = 11;
      this.scene.add(lights[num_light]);
      num_light++;

      var area1_num = num_light;
      lights[num_light] = new THREE.RectAreaLight(0xe46879, 1, 50, 50); // soft pink light
      lights[num_light].position.set(5, 5, 10);
      lights[num_light].lookAt(0, 0, 0);
      this.scene.add(lights[num_light]);
      // rectLightHelper = new THREE.RectAreaLightHelper( lights[num_light] );
      // lights[num_light].add( rectLightHelper );
      num_light++;

      var area2_num = num_light;
      lights[num_light] = new THREE.RectAreaLight(0xe9de77, 0.7, 50, 50); // soft yellow light
      lights[num_light].position.set(-5, 7.5, 10);
      lights[num_light].lookAt(0, 0, 0);
      this.scene.add(lights[num_light]);
      // rectLightHelper = new THREE.RectAreaLightHelper( lights[num_light] );
      // lights[num_light].add( rectLightHelper );
      num_light++;

      var area3_num = num_light;
      lights[num_light] = new THREE.RectAreaLight(0x3bbce4, 0.5, 50, 50); // soft blue light
      lights[num_light].position.set(5, -5, 10);
      lights[num_light].lookAt(0, 0, 0);
      this.scene.add(lights[num_light]);
      // rectLightHelper = new THREE.RectAreaLightHelper( lights[num_light] );
      // lights[num_light].add( rectLightHelper );
      num_light++;

      var area4_num = num_light;
      lights[num_light] = new THREE.RectAreaLight(0xe46879, 1, 50, 50); // soft pink light
      lights[num_light].position.set(5, 5, -10);
      lights[num_light].lookAt(0, 0, 0);
      this.scene.add(lights[num_light]);
      num_light++;

      var area5_num = num_light;
      lights[num_light] = new THREE.RectAreaLight(0xe9de77, 0.7, 50, 50); // soft yellow light
      lights[num_light].position.set(-5, 7.5, -10);
      lights[num_light].lookAt(0, 0, 0);
      this.scene.add(lights[num_light]);
      num_light++;

      var area6_num = num_light;
      lights[num_light] = new THREE.RectAreaLight(0x3bbce4, 0.5, 50, 50); // soft blue light
      lights[num_light].position.set(5, -5, -10);
      lights[num_light].lookAt(0, 0, 0);
      this.scene.add(lights[num_light]);
      num_light++;
    }

    //gui
    var f1 = this.gui.addFolder("Bubble");
    f1.add(bubbleParams, "enable").onChange(function(val){enableBubbles(val)});
    f1.add(bubbleParams, "static").onChange(function(val){bubble_static = val});
    var f2 = this.gui.addFolder("Lighting");
    var light_idx = am_num;
    var light_param = this.lightingParams.Ambient;
    var f21 = f2.addFolder("Ambient Light");
    f21.add(light_param, 'intensity', 1, 100).step(1).onChange( function(val) { lights[light_idx].intensity = val; });
    f21.addColor(light_param, "color").onChange(this.handleColorChange(lights[light_idx].color));

    light_idx = area1_num;
    light_param = this.lightingParams.Area1;
    f21 = f2.addFolder("Area Light 1");
    f21.add(light_param, 'intensity', 0, 10).step(0.1).onChange( function(val) { lights[light_idx].intensity = val; });
    f21.addColor(light_param, 'color').onChange(this.handleColorChange(lights[light_idx].color));
    f21.add(light_param, 'width', 1, 100).step(1).onChange( function(val) { lights[light_idx].width = val; });
    f21.add(light_param, 'height', 1, 100).step(1).onChange( function(val) { lights[light_idx].height = val; });
    f21.add(light_param, 'x', -100, 100).step(0.5).onChange( function(val) { lights[light_idx].position.x = val; });
    f21.add(light_param, 'y', -100, 100).step(0.5).onChange( function(val) { lights[light_idx].position.y = val; });
    f21.add(light_param, 'z', -100, 100).step(0.5).onChange( function(val) { lights[light_idx].position.z = val; });

    light_idx = area2_num;
    light_param = this.lightingParams.Area2;
    f21 = f2.addFolder("Area Light 2");
    f21.add(light_param, 'intensity', 0, 10).step(0.1).onChange( function(val) { lights[light_idx].intensity = val; });
    f21.addColor(light_param, 'color').onChange(this.handleColorChange(lights[light_idx].color));
    f21.add(light_param, 'width', 1, 100).step(1).onChange( function(val) { lights[light_idx].width = val; });
    f21.add(light_param, 'height', 1, 100).step(1).onChange( function(val) { lights[light_idx].height = val; });
    f21.add(light_param, 'x', -100, 100).step(0.5).onChange( function(val) { lights[light_idx].position.x = val; });
    f21.add(light_param, 'y', -100, 100).step(0.5).onChange( function(val) { lights[light_idx].position.y = val; });
    f21.add(light_param, 'z', -100, 100).step(0.5).onChange( function(val) { lights[light_idx].position.z = val; });

    light_idx = area3_num;
    light_param = this.lightingParams.Area3;
    f21 = f2.addFolder("Area Light 3");
    f21.add(light_param, 'intensity', 0, 10).step(0.1).onChange( function(val) { lights[light_idx].intensity = val; });
    f21.addColor(light_param, 'color').onChange(this.handleColorChange(lights[light_idx].color));
    f21.add(light_param, 'width', 1, 100).step(1).onChange( function(val) { lights[light_idx].width = val; });
    f21.add(light_param, 'height', 1, 100).step(1).onChange( function(val) { lights[light_idx].height = val; });
    f21.add(light_param, 'x', -100, 100).step(0.5).onChange( function(val) { lights[light_idx].position.x = val; });
    f21.add(light_param, 'y', -100, 100).step(0.5).onChange( function(val) { lights[light_idx].position.y = val; });
    f21.add(light_param, 'z', -100, 100).step(0.5).onChange( function(val) { lights[light_idx].position.z = val; });

    light_idx = area4_num;
    light_param = this.lightingParams.Area4;
    f21 = f2.addFolder("Area Light 4");
    f21.add(light_param, 'intensity', 0, 10).step(0.1).onChange( function(val) { lights[light_idx].intensity = val; });
    f21.addColor(light_param, 'color').onChange(this.handleColorChange(lights[light_idx].color));
    f21.add(light_param, 'width', 1, 100).step(1).onChange( function(val) { lights[light_idx].width = val; });
    f21.add(light_param, 'height', 1, 100).step(1).onChange( function(val) { lights[light_idx].height = val; });
    f21.add(light_param, 'x', -100, 100).step(0.5).onChange( function(val) { lights[light_idx].position.x = val; });
    f21.add(light_param, 'y', -100, 100).step(0.5).onChange( function(val) { lights[light_idx].position.y = val; });
    f21.add(light_param, 'z', -100, 100).step(0.5).onChange( function(val) { lights[light_idx].position.z = val; });

    light_idx = area5_num;
    light_param = this.lightingParams.Area5;
    f21 = f2.addFolder("Area Light 5");
    f21.add(light_param, 'intensity', 0, 10).step(0.1).onChange( function(val) { lights[light_idx].intensity = val; });
    f21.addColor(light_param, 'color').onChange(this.handleColorChange(lights[light_idx].color));
    f21.add(light_param, 'width', 1, 100).step(1).onChange( function(val) { lights[light_idx].width = val; });
    f21.add(light_param, 'height', 1, 100).step(1).onChange( function(val) { lights[light_idx].height = val; });
    f21.add(light_param, 'x', -100, 100).step(0.5).onChange( function(val) { lights[light_idx].position.x = val; });
    f21.add(light_param, 'y', -100, 100).step(0.5).onChange( function(val) { lights[light_idx].position.y = val; });
    f21.add(light_param, 'z', -100, 100).step(0.5).onChange( function(val) { lights[light_idx].position.z = val; });

    light_idx = area6_num;
    light_param = this.lightingParams.Area6;
    f21 = f2.addFolder("Area Light 6");
    f21.add(light_param, 'intensity', 0, 10).step(0.1).onChange( function(val) { lights[light_idx].intensity = val; });
    f21.addColor(light_param, 'color').onChange(this.handleColorChange(lights[light_idx].color));
    f21.add(light_param, 'width', 1, 100).step(1).onChange( function(val) { lights[light_idx].width = val; });
    f21.add(light_param, 'height', 1, 100).step(1).onChange( function(val) { lights[light_idx].height = val; });
    f21.add(light_param, 'x', -100, 100).step(0.5).onChange( function(val) { lights[light_idx].position.x = val; });
    f21.add(light_param, 'y', -100, 100).step(0.5).onChange( function(val) { lights[light_idx].position.y = val; });
    f21.add(light_param, 'z', -100, 100).step(0.5).onChange( function(val) { lights[light_idx].position.z = val; });


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

    animate();
    var frameId;
    function animate() {

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

      if (!bubble_static) {
        for (var i = 0, il = bubbles.length; i < il; i++) {
          var bubble = bubbles[i];
          bubble.position.x = 5 * Math.cos(time + i);
          bubble.position.y = 5 * Math.sin(time + i * 1.1);
        }
      }

    }
  }

}
