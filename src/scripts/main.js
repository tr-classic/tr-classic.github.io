
/*
var cursorX = 0;
var cursorY = 0;
document.onmousemove = function(e){
    cursorX = e.pageX;
    cursorY = e.pageY - window.scrollY;
    tr.view.position.y = (cursorY / window.innerHeight -.5  ) *4;
    tr.view.position.x = (cursorX / window.innerWidth  -.5) *4;
}*/

function createCube(){
  var geometry = new THREE.BoxGeometry( .1, .1, .1 );
  var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
  var cube = new THREE.Mesh( geometry, material );
  return cube ;
}

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}
/*
window.addEventListener('click', function(){
	tr.animations[0].play() ;
  tr.getTorch() ;
});
//*/

var scene = new THREE.Scene();
{
	const color = 0x000000;  // white
  const near = 1;
  const far = 20;
  scene.fog = new THREE.Fog(color, near, far);
}
var clock = new THREE.Clock() ;


function moveTo(object, end, time){
  var animation = 0 ;
  var beg = new THREE.Vector3(object.position.x,object.position.y,object.position.z) ;
  var x = setInterval(function(){
    animation+=10 ;
    if(animation > time)
      animation = time ;

    var avancement = (animation/time) ;
    object.position.set(
      beg.x+((end.x-beg.x)*avancement),
      beg.y+((end.y-beg.y)*avancement),
      beg.z+((end.z-beg.z)*avancement),
    ) ;
    if(animation >= time){
      console.log("animation terminated") ;
      clearInterval(x) ;
    }
  }, 10);
}


let container = document.getElementById( 'three_env' );

if(container == null){
  console.error("Pas d'élément nommé 'three_env' dans le html") ;
}else{
  var renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setSize( window.innerWidth, window.innerHeight );
  container.appendChild( renderer.domElement );

  var tr = new TR(scene) ;
  tr.load() ;

	var ambilight = new THREE.AmbientLight( 0xcccccc );
	scene.add(ambilight) ;

	var controls = new THREE.OrbitControls( tr.view, renderer.domElement );
	controls.keys = {
		LEFT: 37, //left arrow
		UP: 38, // up arrow
		RIGHT: 39, // right arrow
		BOTTOM: 40 // down arrow
	}

  var terrain = new Terrain(scene) ;
	tr.object.position.set(terrain.width/2,0,terrain.length/2) ;
	//tr.view.position.set(0,0,0) ;

	tr.view.position.set(0,1.5,-4) ;

	//controls.target = new THREE.Vector3(tr.object.position.x,tr.object.position.y,tr.object.position.z) ;
	//controls.update();
	controls.enableRotate = true ;
	controls.autoRotate = true ;
	controls.maxDistance = 4;
	controls.minDistance = 1 ;

	//console.log(controls.target) ;
	//console.log(tr.object.position) ;


  var axesHelper = new THREE.AxesHelper( 1 );
  //scene.add( axesHelper );

  var animate = function () {
    requestAnimationFrame( animate );
    //tr.refresh() ;
		controls.update();
		/*
		console.log("target") ;
		console.log(controls) ;
		console.log(tr) ;
		*/

		var mixerUpdateDelta = clock.getDelta();
		if(tr.animations_mixer != undefined && tr.animations_mixer.length != 0)
			tr.animations_mixer.update(mixerUpdateDelta);

    renderer.render( scene, tr.view );
  };

  animate();
}
