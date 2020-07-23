
var canvas = document.getElementById("three_env"); // Get the canvas element

var engine = null;
var scene = null;
var sceneToRender = null;
var createDefaultEngine = function() { return new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true }); };
var createScene = function () {
  // This creates a basic Babylon Scene object (non-mesh)
  var scene = new BABYLON.Scene(engine);

  // This creates and positions a free camera (non-mesh)
  var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);

  // This targets the camera to scene origin
  camera.setTarget(BABYLON.Vector3.Zero());

  // This attaches the camera to the canvas
  camera.attachControl(canvas, true);

  // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
  var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

  // Default intensity is 1. Let's dim the light a small amount
  light.intensity = 0.7;

  return scene;

};

var engine;
try {
  engine = createDefaultEngine();
} catch(e) {
  console.log("the available createEngine function failed. Creating the default engine instead");
  engine = createDefaultEngine();
}
if (!engine) throw 'engine should not be null.';

scene = createScene();
sceneToRender = scene;

engine.runRenderLoop(function () {
  if (sceneToRender) {
    sceneToRender.render();
  }
});

BABYLON.MeshBuilder.CreateBox("myBox", {height: 5, width: 2, depth: 0.5}, scene);

var terrain = new Terrain(scene) ;

// Resize
window.addEventListener("resize", function () {
  engine.resize();
});
//
// var scene = new THREE.Scene();
// var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
//
//
// var controls = new THREE.OrbitControls( camera, renderer.domElement );
// camera.position.set(0,3,0) ;
// controls.update();
//
//
// let container = document.getElementById( 'three_env' );
//
// var renderer = new THREE.WebGLRenderer();
// renderer.setSize( window.innerWidth, window.innerHeight );
// container.appendChild( renderer.domElement );
//
// // var tr = new TR(scene);
// // tr.load() ;
//
// //var terrain = new Terrain(scene) ;
//
//
//
//   // var tgeometry = new THREE.Geometry();
//   //
//   // tgeometry.vertices.push(
//   //   new THREE.Vector3(  0, 0, 4 ),
//   //   new THREE.Vector3(  1, 0, 5 ),
//   //   new THREE.Vector3(  0, 0, 5 )
//   // );
//   //
//   // tgeometry.faces.push( new THREE.Face3( 2,1,0 ) );
//   //
//   // tgeometry.computeBoundingSphere();
//
//
//   // var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
//   // var cube = new THREE.Mesh( tgeometry, material );
//   // scene.add( cube );
//
//
//
// var light = new THREE.AmbientLight( 0x404040 ); // soft white light
// scene.add( light );
//
// var animate = function () {
//   requestAnimationFrame( animate );
//
//   renderer.render( scene, camera );
// };
//
// animate();
