import * as THREE from './CMapJS/Libs/three.module.js';
import Renderer from './CMapJS/Rendering/Renderer.js';

export default function MeshHandler (mesh, params = {}) {
	const renderer = new Renderer(mesh);

	const vertexColor = params.vertexColor || new THREE.Color(0x095A5A);
	const edgeColor = params.edgeColor || new THREE.Color(0x0A0A20);
	const faceColor = params.faceColor || new THREE.Color(0x66AABB);
	let vertexSize = params.vertexSize || 0.01; 
	let edgeSize = params.edgeSize || 1.5; 

	let parentObject;
	let verticesMesh, edgesMesh, facesMesh;
	this.initialize = function (params = {}) {
		if(params.vertices) {
			renderer.vertices.create({size: vertexSize, color: vertexColor}); 
			verticesMesh = renderer.vertices.mesh;
		}
		if(params.edges) {
			renderer.edges.create({size: edgeSize, color: edgeColor}); 
			edgesMesh = renderer.edges.mesh;
		}
		if(params.faces) {
			renderer.faces.create({color: faceColor, side: THREE.DoubleSide}); 
			facesMesh = renderer.faces.mesh;
		}
	};

	this.addMeshesTo = function (parent) {
		parentObject = parentObject || parent;
		if(verticesMesh) renderer.vertices.addTo(parent);
		if(edgesMesh) renderer.edges.addTo(parent);
		if(facesMesh) renderer.faces.addTo(parent);
	};
}