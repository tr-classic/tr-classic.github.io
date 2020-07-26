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

    var material = new THREE.MeshBasicMaterial( {color: 0xffcccc} );
    var terr = new THREE.Mesh( tgeometry, material );
    
    this.object.add( terr );
  }
}

export {Terrain} ;
