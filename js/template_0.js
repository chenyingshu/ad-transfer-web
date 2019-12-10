export default class template_0 {

  constructor (elem) {
    this.scene = null;
    this.camera = null;
    this.gui = null;
    this.elem = elem;
    this.object = null;
  }

  async init() {
    var lights = [];
    var num_light = 0;
    // scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color( 0x444444 );

    // camera
    this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth/window.innerHeight, 1, 10000 );
    this.camera.position.set( 0, 0, 30 );

    //Lights
    {
      lights[num_light] = new THREE.PointLight( 0xffffff, 1, 0 );
      lights[num_light].position.set( 0, 200, 0 );
      this.scene.add( lights[ num_light ] );
      num_light++;

      lights[ num_light ] = new THREE.PointLight( 0xffffff, 1, 0 );
      lights[ num_light ].position.set( 100, 200, 100 );
      this.scene.add( lights[ num_light ] );
      num_light++;

      lights[ num_light ] = new THREE.PointLight( 0xffffff, 1, 0 );
      lights[ num_light ].position.set( - 100, - 200, - 100 );
      this.scene.add( lights[ num_light ] );
      num_light++;
    }

    //load text, text gui params setup
    function updateGroupGeometry( mesh, geometry ) {
      if ( geometry.isGeometry ) {
        geometry = new THREE.BufferGeometry().fromGeometry( geometry );
        console.warn( 'THREE.GeometryBrowser: Converted Geometry to BufferGeometry.' );
      }
      mesh.children[ 0 ].geometry.dispose();
      // mesh.children[ 1 ].geometry.dispose();
      // mesh.children[ 0 ].geometry = new THREE.WireframeGeometry( geometry );
      mesh.children[ 0 ].geometry = geometry;
      // these do not update nicely together if shared

    }

    function textGeometry( mesh ) {

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

        var loader = new THREE.FontLoader();
        loader.load( 'https://threejs.org/examples/fonts/' + data.font + '_' + data.weight + '.typeface.json', function ( font ) {

          var geometry = new THREE.TextGeometry( data.text, {
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
      // mesh.children[ 0 ].visible = false;

      var folder = gui.addFolder( 'TextGeometry' );
      // folder.add( data, 'text' ).onChange( generateGeometry );
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
    //add materials to text
    var group = new THREE.Group();
    var geometry = new THREE.BufferGeometry();
    geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( [], 3 ) );
    // var lineMaterial = new THREE.LineBasicMaterial( { color: 0xffffff, transparent: true, opacity: 0.5 } );
    var meshMaterial = new THREE.MeshPhongMaterial( { color: 0x156289, emissive: 0x072534, side: THREE.DoubleSide, flatShading: true } );
    // group.add( new THREE.LineSegments( geometry, lineMaterial ) );
    group.add( new THREE.Mesh( geometry, meshMaterial ) );

    this.gui = new dat.GUI();
    var gui = this.gui;
    textGeometry(group);
    this.scene.add( group );
  }

}
