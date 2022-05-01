//__________________________________________________________________________________________________ Imports

import * as THREE from 'three';
import { OrbitControls } from 'OrbitControls';
import { GUI } from 'dat.gui';
import { InteractionManager } from "three.interactive";

import { colors, randomColor } from "./colors.js";

import {
  createAmbientLight,
  createPointLight,
  createPlane,
  createBox,
  createCylinder,
  createCone,
  createTorus,
  createRoom
} from "./creators.js";

//__________________________________________________________________________________________________ Stats

const stats0 = new Stats();
stats0.showPanel(0);
stats0.domElement.style.cssText = 'float: right';
document.body.appendChild( stats0.dom );

const stats1 = new Stats();
stats1.showPanel(1);
stats1.domElement.style.cssText = 'float: right';
document.body.appendChild( stats1.dom );

const stats2 = new Stats();
stats2.showPanel(2);
stats2.domElement.style.cssText = 'float: right';
document.body.appendChild( stats2.dom );

//__________________________________________________________________________________________________ Scene

const scene = new THREE.Scene();
scene.background = colors.white;

//__________________________________________________________________________________________________ Camera

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.z = 2;

//__________________________________________________________________________________________________ Renderer

const canvas = document.querySelector("canvas");

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//__________________________________________________________________________________________________ Orbit Controls

const controls = new OrbitControls( camera, renderer.domElement );

//__________________________________________________________________________________________________ Interaction Manager

const interactionManager = new InteractionManager(
  renderer,
  camera,
  renderer.domElement
);

//__________________________________________________________________________________________________ Scene Array

let sceneArray = [];
let animationArray =[];
document.getElementById("objects").innerHTML = "Objects: " + scene.children.length;

//________________________________________________ Scene Add

let initialPosition = 0;

const sceneAdd = (item) => {

  console.log(item);

  item.addEventListener("mouseover", (event) => {
    document.body.style.cursor = "pointer";
    event.target.material = new THREE.MeshPhongMaterial({ color: colors.red, transparent: true, opacity: 0.3});
  });
  item.addEventListener("mouseout", (event) => { document.body.style.cursor = "default"; });
  item.addEventListener("click", (event) => { console.log(event.target); });

  interactionManager.add(item);
  animationArray.push(item);
  sceneArray.push(item);
  scene.add(item);

  document.getElementById("objects").innerHTML = "Objects: " + scene.children.length;

};

//________________________________________________ Scene Clear

const sceneClear = () => {

  sceneArray.forEach((item) => {
		scene.remove(item);
	});

  sceneArray = [];

  document.getElementById("objects").innerHTML = "Objects: " + scene.children.length;

};

//__________________________________________________________________________________________________ Scene init

scene.add( createAmbientLight() );

//__________________________________________________________________________________________________ Event Listeners

//________________________________________________ Box

const planeButton = document.getElementById("plane");
planeButton.addEventListener("click", (event) => { sceneAdd(createPlane() ) } );

//________________________________________________ Box

const boxButton = document.getElementById("box");
boxButton.addEventListener("click", (event) => { sceneAdd(createBox( 1, 1, 1 ) ) } );

//________________________________________________ Cylinder

const cylinderButton = document.getElementById("cylinder");
cylinderButton.addEventListener("click", (event) => { sceneAdd(createCylinder() ) } );

//________________________________________________ Cone

const coneButton = document.getElementById("cone");
coneButton.addEventListener("click", (event) => { sceneAdd(createCone() ) } );

//________________________________________________ Torus

const torusButton = document.getElementById("torus");
torusButton.addEventListener("click", (event) => { sceneAdd(createTorus() ) } );

//________________________________________________ Room

const buttonRoom = document.getElementById("room");
buttonRoom.addEventListener("click", (event) => { sceneAdd(createRoom(10, 10, 10, 0.5) ) } );

//________________________________________________ Clear

const buttonClear = document.getElementById("clear");
buttonClear.addEventListener("click", (event) => { sceneClear() } );

//________________________________________________ Background

const selectBackground = document.getElementById("background");
selectBackground.addEventListener("change", (event) => {
  scene.background = colors[event.target.value]
});

//__________________________________________________________________________________________________ Animate

const animate = function () {

  animationArray.forEach((item) => {
    if(item){
      item.rotation.x += 0.01;
      item.rotation.y += 0.01;
    }
	});

  interactionManager.update();
  controls.update();
	renderer.render( scene, camera );

  stats0.update();
  stats1.update();
  stats2.update();

  requestAnimationFrame( animate );

};
animate();

//__________________________________________________________________________________________________ Commented Code

// let mousePositionX;
// let mousePositionY;
//
// window.addEventListener('mousemove', (event) => {
//   mousePositionX = event.PageX;
//   mousePositionY = event.PageY;
// });

// item.addEventListener("mouseover", (event) => {
//   document.body.style.cursor = "pointer";
//   event.target.scale.set(1.0, 1.0, 1.0);
// });

//__________________________________________________________________________________________________ End
