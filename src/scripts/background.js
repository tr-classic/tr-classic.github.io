var cursorX = 0;
var cursorY = 0;
document.onmousemove = function(e){
    cursorX = e.pageX;
    cursorY = e.pageY - window.scrollY;
}

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

window.addEventListener('click', function(){
  tr.getTorch() ;
});

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );


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
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  container.appendChild( renderer.domElement );

  var tr = new TR(scene) ;
  tr.load() ;

  var axesHelper = new THREE.AxesHelper( 5 );
  scene.add( axesHelper );

  var animate = function () {
    requestAnimationFrame( animate );
    tr.refresh() ;

    renderer.render( scene, tr.view );
  };

  animate();
}
