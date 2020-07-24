class Terrain{
  constructor(scene){
    this.scene = scene ;
    this.length = 30 ;
    this.width = 30 ;
    this.object = new BABYLON.Mesh("custom", this.scene);
    this.default_bab() ;

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


    var material = new THREE.MeshBasicMaterial( {color: 0xffffff} );
    var cube = new THREE.Mesh( tgeometry, material );
    this.object.add( cube );
  }
  default_bab(){
    var geo = new BABYLON.Mesh("custom", this.scene);
    var pos = [] ;
    var ids = [] ;
    var colors = [] ;
    var ind = 0 ;

    for(let i =0 ; i<this.width ; i++){
      for(let j =0 ;j<this.length ; j++){
        ind = (j+i)*.5 ;

        //* SQUARE GROUND
        pos.push(
          i  ,ind,j  ,
          i  ,ind,j+1,
          i+1,ind,j+1,
          i+1,ind,j  ,
        ) ;


        var index = (i*this.length+j)*4 ;

        ids.push(
          index  ,index+2,index+1,
          index  ,index+3,index+2
        ) ;

        if(i != 0){
          ids.push(
            (i*this.length+j)*4, (i*this.length+j)*4+1    , ((i-1)*this.length+j)*4+2,
            ((i-1)*this.length+j)*4+3, (i*this.length+j)*4      , ((i-1)*this.length+j)*4+2,
          ) ;
        }

        if(j != 0){
          ids.push(
            index,index-3,index-2,
            index+3,index,index-2,
          ) ;
        }
        //*/
      }
    }
    var normals = [] ;

  	var vertexData = new BABYLON.VertexData();
  	BABYLON.VertexData.ComputeNormals(pos, ids, normals);

    vertexData.positions = pos;
    vertexData.indices = ids;
    vertexData.normals = normals;

    //Apply vertexData to custom mesh
    vertexData.applyToMesh(geo);

    console.log(geo) ;

    //geo.parent = this.object ;
  }
}
