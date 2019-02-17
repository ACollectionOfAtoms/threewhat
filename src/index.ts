import * as THREE from 'three';
import { 
  Scene,
  PerspectiveCamera,
  WebGLRenderer
} from 'three';
import './lib/FilmShader';
import './lib/EffectComposer';
import './lib/RenderPass';
import './lib/ShaderPass';
import './lib/MaskPass';
import './lib/CopyShader';
import './lib/RGBShiftShader';
import BadTvShader from './BadTVShader';
import StaticShader from './StaticShader';

const renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const camera = new PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 500);
camera.lookAt(0,0,0);
const scene = new Scene();
const geo = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({color: 0x00ff00 });
const cube = new THREE.Mesh(geo, material);
scene.add(cube);
camera.position.z = 5;

const renderPass = new THREE.RenderPass(scene, camera);
const badTVPass = new THREE.ShaderPass(BadTvShader);
const rgbPass = new THREE.ShaderPass(THREE.RGBShiftShader);
const filmPass = new THREE.ShaderPass(THREE.FilmShader);
const staticPass = new THREE.ShaderPass(StaticShader);
const copyPass = new THREE.ShaderPass(THREE.CopyShader);
const composer = new THREE.EffectComposer(renderer);
composer.addPass(renderPass);
composer.addPass(filmPass);
composer.addPass(badTVPass);
composer.addPass(rgbPass);
composer.addPass(staticPass);
composer.addPass(copyPass);
copyPass.renderToScreen = true;

let shaderTime = 0;
function animate() {
  shaderTime += 0.1;
  badTVPass.uniforms['time'].value = shaderTime;
  requestAnimationFrame(animate);
  composer.render(0.1);
}
animate();
