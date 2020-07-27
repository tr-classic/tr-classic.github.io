let acl = new Accelerometer({frequency: 60});

acl.addEventListener('reading', () => {
  document.getElementById("log").innerHTML = acl.x + " - " + acl.y + " - " + acl.z ;
});

acl.start();
