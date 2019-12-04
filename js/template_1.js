// Optional: Provide a DRACOLoader instance to decode compressed mesh data
// var dracoLoader = new THREE.DRACOLoader();
// dracoLoader.setDecoderPath( '/examples/js/libs/draco/' );
// loader.setDRACOLoader( dracoLoader );

// Load a glTF resource
gltfLoader.load(
  // resource URL
  'obj/blue_diamond/scene.gltf',
  // called when the resource is loaded
  function ( gltf ) {
    gltf_id = num_object;
    num_object++;
    object[gltf_id] = gltf.scene;

    scene.add( gltf.scene );

    gltf.animations; // Array<THREE.AnimationClip>
    gltf.scene; // THREE.Scene
    gltf.scenes; // Array<THREE.Scene>
    gltf.cameras; // Array<THREE.Camera>
    gltf.asset; // Object

  },
  // called while loading is progressing
  function ( xhr ) {

    console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

  },
  // called when loading has errors
  function ( error ) {

    console.log( 'An error happened' );

  }
);
