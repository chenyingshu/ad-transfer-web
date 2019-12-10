/*function template_test() {

  // constructor (elem) {
  var scene = null;
  var camera = null;
  // this.controls = null;
  var gui = null;
  var gltfLoader = null;
  var lights = [];
  var num_light = 0;
  var object = null;

  //GUI parameters
  var lightingParams = {

  };
  // }

  // init() {
  // scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0xf0f0f0 );

  // camera
  camera = new THREE.PerspectiveCamera( 70, window.innerWidth/window.innerHeight, 1, 10000 );
  camera.position.set(-1, 0.7, 25);

  // Load a glTF resource
  {
    gltfLoader = new THREE.GLTFLoader();
    gltfLoader.load(
      // resource URL
      'obj/blue_diamond/scene.gltf',
      // called when the resource is loaded
      function (gltf) {

        // var gltf_id = num_object;
        // num_object++;
        // object[gltf_id] = gltf.scene;
        object = gltf.scene.children[0]; //mesh

        gltf.scene.scale.set(10,12,10);

        this.scene.add(gltf.scene);

        gltf.animations; // Array<THREE.AnimationClip>
        gltf.scene; // THREE.Scene
        gltf.scenes; // Array<THREE.Scene>
        gltf.cameras; // Array<THREE.Camera>
        gltf.asset; // Object

        console.log(gltf.scene.children[0]);
        // console.log(gltf);

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
  }


  //Lights
  {
    var am_num = num_light;
    lights[num_light] = new THREE.AmbientLight(0xeeeeee, 100); // soft white light
    scene.add(lights[num_light]);
    num_light++;

    var area1_num = num_light;
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

    // var area4_num = num_light;
    // lights[num_light] = new THREE.RectAreaLight(0xe46879, 1, 50, 50); // soft pink light
    // lights[num_light].position.set(5, 5, -10);
    // lights[num_light].lookAt(0, 0, 0);
    // scene.add(lights[num_light]);
    // num_light++;
    //
    // var area5_num = num_light;
    // lights[num_light] = new THREE.RectAreaLight(0xe9de77, 0.7, 50, 50); // soft yellow light
    // lights[num_light].position.set(-5, 7.5, -10);
    // lights[num_light].lookAt(0, 0, 0);
    // scene.add(lights[num_light]);
    // num_light++;
    //
    // var area6_num = num_light;
    // lights[num_light] = new THREE.RectAreaLight(0x3bbce4, 0.5, 50, 50); // soft blue light
    // lights[num_light].position.set(5, -5, -10);
    // lights[num_light].lookAt(0, 0, 0);
    // scene.add(lights[num_light]);
    // num_light++;
  }

  //gui
  gui = new dat.GUI();
  var f1 = gui.addFolder("Object");

  var f2 = gui.addFolder("Lighting");
  var f2_0 = f2.addFolder("Ambient Light");
  var f2_1 = f2.addFolder("Area Light 1");
  var f2_2 = f2.addFolder("Area Light 2");
  var f2_3 = f2.addFolder("Area Light 3");
  var f2_4 = f2.addFolder("Area Light 4");
  var f2_5 = f2.addFolder("Area Light 5");
  var f2_6 = f2.addFolder("Area Light 6");
  return {scene, camera, gui};
}
*/
export default class template_test {

  constructor (elem) {
    this.scene = null;
    this.camera = null;
    // this.controls = null;
    this.gui = null;
    this.gltfLoader = null;
    this.elem = elem;
    this.object = null;
    //GUI parameters
    this.lightingParams = {

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

    // alert(result); // "done!"
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
      lights[num_light] = new THREE.AmbientLight(0xeeeeee, 100); // soft white light
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
    var scene = this.scene;
    // Load a glTF resource

    await this.loadGLTF(this.scene);


    //gui
    this.gui = new dat.GUI();
    var f1 = this.gui.addFolder("Object");

    var f2 = this.gui.addFolder("Lighting");
    var f2_0 = f2.addFolder("Ambient Light");
    var f2_1 = f2.addFolder("Area Light 1");
    var f2_2 = f2.addFolder("Area Light 2");
    var f2_3 = f2.addFolder("Area Light 3");
    var f2_4 = f2.addFolder("Area Light 4");
    var f2_5 = f2.addFolder("Area Light 5");
    var f2_6 = f2.addFolder("Area Light 6");


  }
}
