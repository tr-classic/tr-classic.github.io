class TR{
  constructor(scene){
    this.scene = scene ;
    this.object = new THREE.Object3D() ;
    this.object.rotation.y = Math.PI
    this.scene.add(this.object) ;
    this.view = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.01, 1000 ) ;

    this.pointLight = new THREE.PointLight( 0xffff00, 1, 6 );
    this.object.add( this.pointLight );

    this.refresh() ;

    this.hand = null ;
  }

  refresh(){
    this.view.position.set(this.object.position.x,this.object.position.y+1.5,this.object.position.z - 2) ;
    this.view.rotation.set(this.object.rotation.x,this.object.rotation.y,this.object.rotation.z) ;
    this.pointLight.position.set(this.view.position.x, this.view.position.y, this.view.position.z)
  }

  load(){
    // instantiate a loader
    var loader = new THREE.OBJLoader();
    var sc = this.scene ;
    var obj = this.object ;

    // load a resource
    loader.load(
    	// resource URL
    	'/src/obj/scaled-tr.obj',
    	// called when resource is loaded
    	function ( object) {
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

  getTorch(){
    if(this.hand != null){
      console.log("vous avez deja une torche") ;
      return ;
    }

    this.hand = new THREE.Object3D() ;
    this.object.add(this.hand) ;
    this.hand.position.set(.62,1.4,0) ;
    var geometry = new THREE.CylinderGeometry( .01, .01, .1, 5 );
    var material = new THREE.MeshBasicMaterial( {color: 0xccffcc} );
    var cylinder = new THREE.Mesh( geometry, material );
    this.hand.add( cylinder );


    var pointLight = new THREE.PointLight( 0x00ff00, 1, 2 );
    pointLight.position.set( 0, 0, 0);
    this.hand.add( pointLight );

    var instance = this ;

    var _timeout = function(){
      var tick = 30 ;
      var x = setInterval(function(){
        tick-- ;

        pointLight.intensity = Math.random() ;

        if(tick==0){
          clearInterval(x) ;

          instance.object.children.pop() ;
          instance.hand = null ;
        }
      },50) ;
    }

    setTimeout(_timeout, 28000);
  }
}
