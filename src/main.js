import * as THREE from "three";
import { createScene } from "./core/scene";
import { createRenderer } from "./core/renderer";
import { generateChunk } from "./world/chunk";
import { PlayerController } from "./player/controller";
import { CAMERA_FOV, CAMERA_FAR_PALE, CAMERA_NEAR_PALE } from "./config"

const scene = createScene();
const renderer = createRenderer();

const camera = new THREE.PerspectiveCamera(
    CAMERA_FOV,
    window.innerWidth / window.innerHeight,
    CAMERA_NEAR_PALE,
    CAMERA_FAR_PALE
);

camera.position.set(8, 20, 50);

const renderDistance = 16;

for (let x = -renderDistance; x < renderDistance; x++) {
    for (let z = -renderDistance; z < renderDistance; z++) {
        generateChunk(scene, x, z);
    }
}
const controller = new PlayerController(
    camera,
    renderer.domElement
);
function animate() {
    requestAnimationFrame(animate);
    controller.update();
    renderer.render(scene, camera);
}

animate();