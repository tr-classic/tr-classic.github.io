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

    for(let i =0 ; i<this.width ; i++){
      for(let j =0 ;j<this.length ; j++){
        pos.push(
          i  ,0,j  ,
          i  ,Math.random(),j+1,
          i+1,0,j+1,
          i  ,0,j  ,
          i+1,0,j+1,
          i+1,Math.random(),j  ,
        ) ;


        var index = (i*this.length+j)*6 ;

        ids.push(
          index  ,index+2,index+1,
          index+3,index+5,index+4
        ) ;

        colors.push(1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0,  0, 1, 0, 1) ;
      }
    }
    var normals = [] ;

  	var vertexData = new BABYLON.VertexData();
  	BABYLON.VertexData.ComputeNormals(pos, ids, normals);

    vertexData.positions = pos;
    vertexData.indices = ids;
    vertexData.normals = normals;
    vertexData.color = colors ;

    //Apply vertexData to custom mesh
    vertexData.applyToMesh(geo);

    //geo.parent = this.object ;
  }
}
