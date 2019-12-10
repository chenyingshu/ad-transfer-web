export default class template_1 {

  constructor (elem) {
    this.scene = null;
    this.camera = null;
    // this.controls = null;
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
    }

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
        z : -10
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

    //Lights
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


    // Load a glTF resource
    await this.loadGLTF(this.scene);


    //gui
    this.gui = new dat.GUI();
    var f1 = this.gui.addFolder("Object");
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
  }

}
