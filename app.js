
import { OrbitControls } from 'https://threejs.org/examples/jsm/controls/OrbitControls.js';

let container;
let camera;
let renderer;
let scene;
let controls;

function init() {
    container = document.querySelector('.scene');

    //careating scene
    scene = new THREE.Scene();

    //setting up renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    //setting up camera
    const fov = 45;
    const aspect = container.clientWidth / container.clientHeight;
    const near = 0.1;
    const far = 500
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

    //setting up controls
    controls = new OrbitControls(camera, renderer.domElement);
    controls.listenToKeyEvents(window);
    controls.maxPolarAngle = Math.PI / 2;
    controls.minDistance = 5;
    controls.maxDistance = 5;

    camera.position.set(3.0679134273082003, 1.9584414998616988, 3.4281794139399286);

    //setting up lights
    const dirLight1 = new THREE.DirectionalLight(0x002288, 30);
    dirLight1.position.set(1, 1, 2);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xb81024, 30);
    dirLight2.position.set(- 1, - 1, 2);
    scene.add(dirLight2)

    const ambientLight = new THREE.AmbientLight(0x404040, 10);
    scene.add(ambientLight);

    window.addEventListener('resize', onWindowResize);

    //loading our model using gltf loader
    let loader = new THREE.GLTFLoader();
    loader.load('./3d_model/scene.gltf', function (gltf) {
        scene.add(gltf.scene);
    })
}


function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

//animate function is used to render our object
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

init();
animate();





