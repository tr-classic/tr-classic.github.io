class Terrain{
  constructor(scene){
    this.scene = scene ;
    this.length = 30 ;
    this.width = 30 ;
    //this.object = new BABYLON.Mesh("custom", this.scene);
    this.object = new THREE.Object3D() ;
    this.default() ;
    this.scene.add(this.object) ;


  }

  default(){
    var tgeometry = new THREE.Geometry();

    for(let i =0 ; i<this.width ; i++){
      for(let j =0 ;j<this.length ; j++){
        tgeometry.vertices.push(
          new THREE.Vector3(  i+0, 0, j+0 ),
          new THREE.Vector3(  i+0, 0, j+1 ),
          new THREE.Vector3(  i+1, 0, j+1 )
        );
        tgeometry.vertices.push(
          new THREE.Vector3(  i+0, 0, j+0 ),
          new THREE.Vector3(  i+1, 0, j+1 ),
          new THREE.Vector3(  i+1, 0, j+0 )
        );
        var pos = (i*this.length+j)*6 ;
        tgeometry.faces.push( new THREE.Face3( pos  ,pos+1,pos+2 ) );
        tgeometry.faces.push( new THREE.Face3( pos+3,pos+4,pos+5 ) );
      }
    }

    tgeometry.computeBoundingSphere();

    tgeometry.uvsNeedUpdate = true ;

    var material = new THREE.MeshLambertMaterial( {color: 0xffcccc} );
    var terr = new THREE.Mesh( tgeometry, material );
    this.object.add( terr );

    var geometry = new THREE.BoxBufferGeometry( 1, 1, 1 );
    //var material = new THREE.MeshPhongMaterial( { color: 0xffff00 } );
    var mesh = new THREE.Mesh( geometry, material );

    mesh.receiveShadow = true ;
    mesh.position.set(this.length/2,0,this.width/2) ;
    this.object.add(mesh) ;

    console.log(terr) ;
    console.log(mesh) ;
  }
}

export {Terrain} ;
