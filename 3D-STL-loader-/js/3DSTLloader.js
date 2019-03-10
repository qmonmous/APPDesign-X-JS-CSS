//if (!Detector.webgl) Detector.addGetWebGLMessage();

var renderer, scene, camera, composer, controls;
var mouseX = 0, mouseY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

window.onload = function () {
  init();
  animate();
}

function init() {
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
  });

  renderer.setPixelRatio((window.devicePixelRatio) ? window.devicePixelRatio : 1);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.autoClear = false;
  renderer.setClearColor(0x000000, 0.0);
  document.getElementById('canvas').appendChild(renderer.domElement);

  scene = new THREE.Scene();

  //camera
  camera = new THREE.PerspectiveCamera(
    10,
    window.innerWidth / window.innerHeight,
    1,
    10000
  );
  camera.position.z = 2400;
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  scene.add(camera);

  //Loading and customizing STL file

  loader = new THREE.STLLoader();
  loader.load(
    "img/stance.stl",
    function (geometry) {
      var material = [
        new THREE.MeshLambertMaterial({
          color: 0xFFFFFF, //deer color
          shading: THREE.FlatShading
        }),
        new THREE.MeshBasicMaterial({
          color: 0xFFFFFF, //deer border color
          wireframe: true,
          side: THREE.DoubleSide
        })
      ];

      group = THREE.SceneUtils.createMultiMaterialObject(
        geometry,
        material
      );

      group.position.set(0, 0, 0); // deer position
      group.rotation.set(0, 0, 0);
      group.scale.set(2.2, 2.2, 2.2);

      //group.castShadow = true;
      //group.receiveShadow = true;
      scene.add(group);
    }
  );

  var ambientLight = new THREE.AmbientLight(0x999999);
  scene.add(ambientLight);

  var lights = [];
  lights[0] = new THREE.DirectionalLight(0xffffff, 1);
  lights[0].position.set(1, 0, 0);
  lights[1] = new THREE.DirectionalLight(0x3498DB, 1);
  lights[1].position.set(0.75, 1, 0.5);
  lights[2] = new THREE.DirectionalLight(0xFDA5D2, 1);
  lights[2].position.set(-0.75, -1, 0.5);
  scene.add(lights[0]);
  scene.add(lights[1]);
  scene.add(lights[2]);

  document.addEventListener("mousemove", onDocumentMouseMove, false);
  window.addEventListener("resize", onWindowResize, false);
};

function onDocumentMouseMove(event) {
  mouseX = event.clientX - windowHalfX;
  mouseY = event.clientY - windowHalfY;
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  render();
}

function render() {
  camera.position.x -= (mouseX + camera.position.x) * 0.2; //vitesse du suivi de la caméra
  camera.position.y -= (-mouseY + camera.position.y) * 0.2;

  camera.lookAt(scene.position);

  renderer.clear();
  renderer.render(scene, camera)

}