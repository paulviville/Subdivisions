import * as THREE from './CMapJS/Libs/three.module.js';
import * as Meshes from './meshes.js';

import { loadCMap2 } from './CMapJS/IO/SurfaceFormats/CMap2IO.js';

import Renderer from './CMapJS/Rendering/Renderer.js';
import { OrbitControls } from './CMapJS/Libs/OrbitsControls.js';


const scene = new THREE.Scene();
scene.background = new THREE.Color(0xAAAAAA);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000.0);
camera.position.set(0, 0, 2);

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

let controls = new OrbitControls(camera, renderer.domElement)


window.addEventListener('resize', function() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});

let ambientLight = new THREE.AmbientLight(0xAAAAFF, 0.5);
scene.add(ambientLight);
let pointLight = new THREE.PointLight(0x3137DD, 5);
pointLight.position.set(10,8,5);
scene.add(pointLight);


const mesh = loadCMap2('off', Meshes.octahedron_off);
const meshRenderer = new Renderer(mesh);

meshRenderer.vertices.create();
meshRenderer.vertices.addTo(scene);
meshRenderer.edges.create();
meshRenderer.edges.addTo(scene);
meshRenderer.faces.create();
meshRenderer.faces.addTo(scene);


function render()
{
	renderer.render(scene, camera);
}

function mainloop()
{
    render();
    requestAnimationFrame(mainloop);
}

mainloop();