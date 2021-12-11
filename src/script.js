import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { Vector3 } from 'three'


// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color(0xF544BD)


/**
 * Sizes
 */
const sizes = {
    width: innerWidth,
    height: innerHeight
}

//hande resize 
window.addEventListener('resize', () => {
    //update sizes
    sizes.width = innerWidth
    sizes.height = innerHeight

    // update camera
    camera.aspect = sizes.width / sizes.innerHeight
    camera.updateProjectionMatrix()

    //update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio))
})


// load donut
var donut;
const donutLoader = new GLTFLoader()
donutLoader.load(
    '/models/donut1111.glb',
    (gltf) =>
    {
        donut = gltf.scene
        donut.rotateX(Math.PI / 2)
        scene.add(donut)
    }
)

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, .1, 10)
camera.position.z = 0.25
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Lights
 */
 const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
 scene.add(ambientLight)

 
 const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
 directionalLight.position.set(2, 2, 2)
 scene.add(directionalLight)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})

renderer.setSize(sizes.width, sizes.height)
renderer.physicallyCorrectLights = true
renderer.outputEncoding = THREE.sRGBEncoding
renderer.toneMapping = THREE.ACESFilmicToneMapping

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // update donut 
    if(donut) {
        donut.rotation.z = elapsedTime
    }

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()