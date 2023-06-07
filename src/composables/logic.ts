import { BoxGeometry, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, WebGLRenderer } from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

export default class LogicMap {
  // 创建场景
  scene = new Scene()
  // 创建相机
  camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  // 创建画布
  renderer = new WebGLRenderer({
    antialias: true, // 抗锯齿
  })

  // 设置相机控件轨道控制器 OrbitControls
  controls = new OrbitControls(this.camera, this.renderer.domElement)

  constructor() {
    this.render = this.render.bind(this) // 绑定 this
  }

  initThree(dom: HTMLElement) {
    this.renderer.setPixelRatio(window.devicePixelRatio) // 设置设备像素比，以免渲染模糊问题
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    dom.appendChild(this.renderer.domElement)
    this.render()

    this.addBox()
  }

  addBox() {
    const geometry = new BoxGeometry(1, 1, 1) // 创建几何体
    const material = new MeshBasicMaterial({ color: 0x00FF00 }) // 添加材质
    const cube = new Mesh(geometry, material) // 创建网格
    this.scene.add(cube)

    this.camera.position.z = 5

    setInterval(() => {
      cube.rotation.x += 0.01
      cube.rotation.y += 0.01
    }, 1000 / 60)
  }

  // 渲染函数
  render() {
    requestAnimationFrame(this.render)

    this.renderer.render(this.scene, this.camera)
  }
}
