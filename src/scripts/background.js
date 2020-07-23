var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );



let container = document.getElementById( 'three_env' );

if(container == null){
  console.error("Pas d'élément nommé 'three_env' dans le html") ;
}else{
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  container.appendChild( renderer.domElement );

  // var cube = new THREE.Mesh(new THREE.BoxGeometry( .1, .001, .1 ), new THREE.MeshBasicMaterial( {color: 0x00ff00} ));
  // cube.position.z = 2 ;
  // cube.position.y = 1.75 ;
  // scene.add(cube) ;

  var pointLight = new THREE.PointLight( 0xffffff, 1, 6 );
  pointLight.position.set( 0, 0, 0 );
  scene.add( pointLight );



  var animate = function () {
    requestAnimationFrame( animate );
    camera.position.x =  ((cursorX/window.innerWidth )-0.5) *0.6;
    camera.position.y =  ((cursorY/window.innerHeight)-0.5) *0.6 + 1.50;

    camera.rotation.z = window.scrollY / window.scrollMaxY * Math.PI *2 + 1;

    camera.lookAt(0,1.5,2) ;
    pointLight.position.set(camera.position.x,camera.position.y,camera.position.z) ;

    renderer.render( scene, camera );
  };

  animate();
}
