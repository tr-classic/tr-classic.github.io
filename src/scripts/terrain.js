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

  smooth_terrain(){
    var tgeometry = new THREE.Geometry();

    for(let i =0 ; i<this.width ; i++){
      for(let j =0 ;j<this.length ; j++){
        tgeometry.vertices.push(
          new THREE.Vector3(  i, 0, j )
        );
      }
    }

    for(let i =0 ; i<this.width ; i++){
      for(let j =0 ;j<this.length ; j++){
        if(j!=this.length-1 && i!=this.width-1){
          tgeometry.faces.push( new THREE.Face3( (j)+(i)*this.width ,(j+1)+(i+1)*this.width ,(j)+(i+1)*this.width ) );
          tgeometry.faces.push( new THREE.Face3( (j)+(i)*this.width ,(j+1)+(i)*this.width ,(j+1)+(i+1)*this.width ) );
        }
      }
    }

    return tgeometry;
  }

  square_terrain(){
    var tgeometry = new THREE.Geometry();

    for(let i =0 ; i<this.width ; i++){
      for(let j =0 ;j<this.length ; j++){
        var height = -.6 ;
        tgeometry.vertices.push(
          new THREE.Vector3(  i  , (i+j)*height, j   ),
          new THREE.Vector3(  i+1, (i+j)*height, j   ),
          new THREE.Vector3(  i  , (i+j)*height, j+1 ),
          new THREE.Vector3(  i+1, (i+j)*height, j+1 ),
        );
      }
    }

    for(let i =0 ; i<this.width ; i++){
      for(let j =0 ;j<this.length ; j++){
        if(j!=this.length-1 && i!=this.width-1){
          var pos = ((j)+(i)*this.width)*4 ;
          tgeometry.faces.push(
            new THREE.Face3( pos  ,pos+2,pos+3),
            new THREE.Face3( pos  ,pos+3,pos+1),
            new THREE.Face3( pos+2,pos+4,pos+3),
            new THREE.Face3( pos+3,pos+4,pos+5),
            new THREE.Face3( pos+3,pos+5,((j)+(i+1)*this.width)*4),
            new THREE.Face3( pos+3,((j)+(i+1)*this.width)*4,pos+1),
          );
        }
      }
    }

    return tgeometry;
  }

  default(){
    //var tgeometry = this.smooth_terrain() ;
    var tgeometry = this.square_terrain() ;

    tgeometry.computeBoundingSphere();

    tgeometry.uvsNeedUpdate = true ;

    var material = new THREE.MeshBasicMaterial( {color: 0xffcccc} );
    //material.wireframe = true ;
    var terr = new THREE.Mesh( tgeometry, material );

    this.object.add( terr );
  }
}

export {Terrain} ;
