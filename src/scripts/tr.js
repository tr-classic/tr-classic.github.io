class TR{
  constructor(scene){
    this.scene = scene ;
    this.object = new THREE.Object3D() ;
    this.scene.add(this.object) ;

    var pointLight = new THREE.PointLight( 0x00ff00, 1, 6 );
    pointLight.position.set( 0, 0, 2 );
    this.object.add( pointLight );
  }

  load(){
    // instantiate a loader
    var loader = new THREE.OBJLoader();
    var sc = this.scene ;
    var obj = this.object ;

    // load a resource
    loader.load(
    	// resource URL
    	'/src/obj/tr.obj',
    	// called when resource is loaded
    	function ( object) {
        object.position.set(0,.7,0) ;
        object.scale.x = 0.004 ;
        object.scale.y = 0.004 ;
        object.scale.z = 0.004 ;
        object.traverse( function ( child ) {
      		//This allow us to check if the children is an instance of the Mesh constructor
      		if(child instanceof THREE.Mesh){
      			child.material.color = new THREE.Color(0Xf25922);

      			//Sometimes there are some vertex normals missing in the .obj files, ThreeJs will compute them
      			child.geometry.computeVertexNormals();
      		}
      	});
        obj.add(object) ;
    	},
    	// called when loading is in progresses
    	function ( xhr ) {

    		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

    	},
    	// called when loading has errors
    	function ( error ) {

    		console.log( 'An error happened' );
        console.error(error) ;

    	}
    );
  }
}
