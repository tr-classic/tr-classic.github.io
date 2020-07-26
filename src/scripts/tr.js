import {
	GLTFLoader
} from 'https://threejs.org/examples/jsm/loaders/GLTFLoader.js';

class TR{
  constructor(scene){
    this.scene = scene ;
    this.object = new THREE.Object3D() ;
    this.object.rotation.y = Math.PI ;
    this.scene.add(this.object) ;
    this.view = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.01, 1000 ) ;
		this.animations = [] ;
		this.animations_mixer = [] ;

    this.pointLight = new THREE.PointLight( 0xffffff, 1, 12 );
    this.pointLight.intensity = .9 ;
    this.pointLight.position.set(this.view.position.x,this.view.position.y,this.view.position.z);
    this.object.add( this.pointLight );

    this.object.add(this.view) ;

    this.view.position.set(0,1.5,-2) ;
    this.view.lookAt(0, 1.5,0) ;
    this.pointLight.position.set(0,1.5,-2);

    this.refresh() ;

    this.hand = null ;
  }

  refresh(){
    this.view.lookAt(this.object.position.x,this.object.position.y+1.5,this.object.position.z) ;
  }

  load(){
    // instantiate a loader
    var sc = this.scene ;
    var obj = this.object ;
    this.object.rotateY(Math.PI) ;


    var axesHelper = new THREE.AxesHelper( 0.2 );
    obj.add( axesHelper );

    var loader = new GLTFLoader();
    var model ;
    var skeleton ;
    var mixer ;
		var animm;
		var idleAction ;

		var instance = this ;
		var fct = function (gltf) {

  		model = gltf.scene;

  		model.traverse(function (object) {

  			if (object.isMesh) object.castShadow = true;

  		});

      model.castShadow = true; //default is false
      model.receiveShadow = true; //default

      obj.add(model) ;

  		skeleton = new THREE.SkeletonHelper(model);
  		skeleton.visible = true;
  		obj.add(skeleton);

  		instance.animations_mixer = new THREE.AnimationMixer(model);

  		idleAction = instance.animations_mixer.clipAction(gltf.animations[0]);
			idleAction.loop = false ;
			idleAction.setLoop( THREE.LoopOnce );
	  	idleAction.clampWhenFinished = true;
			instance.animations.push(idleAction) ;

			this.object.children[3].castShadow = true ;
			this.object.children[3].children[0].castShadow = true ;
			//this.object.children[3].visible = false ;

  	} ;

  	loader.load('/src/obj/tr.glb', fct);
  }

  getTorch(){
    if(this.hand != null){
      console.log("vous avez deja une torche") ;
      return ;
    }

		this.animations[0].play().reset() ;

    this.hand = new THREE.Object3D() ;
    //this.object.children[1].children[18] = this.hand ;
    this.object.add(this.hand) ;
    this.hand.position.set(-.62,1.4,0) ;
    var geometry = new THREE.CylinderGeometry( .01, .01, .1, 5 );
    var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
    var cylinder = new THREE.Mesh( geometry, material );
    this.hand.add( cylinder );


    var pointLight = new THREE.PointLight( 0x00ff00, 1, 2 );
    pointLight.position.set( 0, 0, 0);
    pointLight.castShadow = true ;
    this.hand.add( pointLight );

    var instance = this ;

    var _timeout = function(){
      var tick = 30 ;
      var x = setInterval(function(){
        tick-- ;

        pointLight.intensity = Math.random() ;
        material.color.g = pointLight.intensity;

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

export {TR} ;
