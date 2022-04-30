//__________________________________________________________________________________________________ Imports

import * as THREE from 'three';
import { OrbitControls } from 'OrbitControls';
import { GUI } from 'dat.gui';
import { InteractionManager } from "three.interactive";

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

//__________________________________________________________________________________________________ Colors

const colors = {
  white: new THREE.Color( 0xFFFFFF ),
  silver: new THREE.Color( 0xC0C0C0 ),
  gray: new THREE.Color( 0x808080 ),
  black: new THREE.Color( 0x000000 ),
  red: new THREE.Color( 0xFF0000 ),
  maroon: new THREE.Color( 0x800000 ),
  yellow: new THREE.Color( 0xFFFF00 ),
  olive: new THREE.Color( 0x808000 ),
  lime: new THREE.Color( 0x00FF00 ),
  green: new THREE.Color( 0x008000 ),
  aqua: new THREE.Color( 0x00FFFF ),
  teal: new THREE.Color( 0x008080 ),
  blue: new THREE.Color( 0x0000FF ),
  navy: new THREE.Color( 0x000080 ),
  fuchsia: new THREE.Color( 0xFF00FF ),
  purple: new THREE.Color( 0x800080 )
};

const randomColor = () => {
  const colorsArray = [];
  colorsArray.push(
    colors.red,
    colors.yellow,
    colors.lime,
    colors.aqua,
    colors.teal,
    colors.blue,
    colors.fuchsia
  );
  const color = colorsArray[Math.floor(Math.random() * colorsArray.length)];
  return color;
};

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



//__________________________________________________________________________________________________ Creators

//________________________________________________ Light

const createAmbientLight = () => {

  const light = new THREE.AmbientLight( colors.white );

  return light;

};

const createPointLight = ( x, y, z ) => {

  const light = new THREE.PointLight(0xFFFFFF);
  light.position.set( x, y, z );

  return light;

};

scene.add( createAmbientLight() );



//________________________________________________ Material

const createMaterial = () => {

  const material = new THREE.MeshPhongMaterial({
    color: randomColor(),
    transparent: true,
    opacity: 0.3
  });

  return material;

};

//________________________________________________ Plane

const createPlane = () => {

  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry( 1, 1 ),
    new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} )
  );

  return plane;

};

//________________________________________________ Box

const createBox = ( x, y, z ) => {

  const box = new THREE.Mesh(
    new THREE.BoxGeometry( x, y, z ),
    createMaterial()
  );

  return box;

};

//________________________________________________ Cylinder

const createCylinder = () => {

  const cylinder = new THREE.Mesh(
    new THREE.CylinderGeometry( 0.5, 0.5, 1, 32 ),
    createMaterial()
  );

  return cylinder;

};

//________________________________________________ Cone

const createCone = () => {

  const cone = new THREE.Mesh(
    new THREE.ConeGeometry( 0.5, 1, 32 ),
    createMaterial()
  );

  return cone;

};

//________________________________________________ Torus

const createTorus = () => {

  const torus = new THREE.Mesh(
    new THREE.TorusGeometry( 0.5, 0.2, 12, 45 ),
    createMaterial()
  );

  return torus;

};

//________________________________________________ Room

const createRoom = ( x, y, z, t ) => {

  const floor = new THREE.Mesh(
    new THREE.BoxGeometry( x + t * 2, t, y + t * 2 ),
    createMaterial()
  );
  floor.position.y -= z / 2 + t / 2;

  const roof = new THREE.Mesh(
    new THREE.BoxGeometry( x + t * 2, t, y + t * 2 ),
    createMaterial()
  );
  roof.position.y += z / 2 + t / 2;

  const frontWall = new THREE.Mesh(
    new THREE.BoxGeometry( x + t * 2, z, t ),
    createMaterial()
  );
  frontWall.position.z -= y / 2 + t / 2;

  const backWall = new THREE.Mesh(
    new THREE.BoxGeometry( x + t * 2, z, t ),
    createMaterial()
  );
  backWall.position.z += y / 2 + t / 2;

  const rightWall = new THREE.Mesh(
    new THREE.BoxGeometry( t, z, y ),
    createMaterial()
  );
  rightWall.position.x += y / 2 + t / 2;

  const leftWall = new THREE.Mesh(
    new THREE.BoxGeometry( t, z, y ),
    createMaterial()
  );
  leftWall.position.x -= y / 2 + t / 2;

  const room = new THREE.Group();
  room.add( floor );
  room.add( frontWall );
  room.add( backWall );
  room.add( rightWall );
  room.add( leftWall );
  room.add( roof );

  return room;

};

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
