
var canvas = document.getElementById("three_env"); // Get the canvas element

var light ;
var camera ;

var engine = null;
var scene = null;
var sceneToRender = null;
var createDefaultEngine = function() { return new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true }); };
var createScene = function () {
  // This creates a basic Babylon Scene object (non-mesh)
  var scene = new BABYLON.Scene(engine);

  // This creates and positions a free camera (non-mesh)
  camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(2,2,2), scene);
  camera.inertia = 0 ;
  camera.angularSensibility = 200;
  camera.speed = 10 ;

  // This targets the camera to scene origin
  camera.setTarget(BABYLON.Vector3.Zero());

  // This attaches the camera to the canvas
  camera.attachControl(canvas, true);

  // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
  light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(6, 6, 6), scene);

  // Default intensity is 1. Let's dim the light a small amount
  light.intensity = 1;

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

var myTR ;

var terrain = new Terrain(scene) ;

var tr = new TR(scene) ;

// Resize
window.addEventListener("resize", function () {
  engine.resize();
});
