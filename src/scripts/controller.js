try{
  let acl = new Accelerometer({frequency: 35});

  acl.addEventListener('reading', () => {
    document.getElementById("log").innerHTML = acl.x*18 + " </br> " + acl.y*18 + " </br> " + acl.z*18 ;

    var cosx = Math.cos(act.x/10 * Math.PI) ;
    var sinx = Math.sin(act.x/10 * Math.PI) ;
    var cosy = Math.cos(act.y/10 * Math.PI) ;
    var siny = Math.sin(act.y/10 * Math.PI) ;

    tr.view.position.set(
      cosx + siny,
      cosy + sinx,
      tr.view.position.z
    );
    tr.refresh() ;
  });

  acl.start();
}catch(ex){
  console.info("No accelerometer detected") ;
}


window.onbeforeunload = function()
{
  var r = confirm("Are you sure you want to reload the page.");
  if(r)
  {
    window.location.reload();
  }
  else
  {
    return "";
  }
};


window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

/*
var cursorX = 0;
var cursorY = 0;
document.onmousemove = function(e){
    cursorX = e.pageX;
    cursorY = e.pageY - window.scrollY;
    tr.view.position.y = (cursorY / window.innerHeight -.5  ) *4;
    tr.view.position.x = (cursorX / window.innerWidth  -.5) *4;
}*/
