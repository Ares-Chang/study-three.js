import {
  AxesHelper,
  BoxGeometry,
  Mesh, MeshBasicMaterial,
  PerspectiveCamera, Scene,
  SphereGeometry, WebGLRenderer,
} from 'three'
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
  // 创建辅助坐标系
  axesHelper = new AxesHelper(150)

  constructor() {
    this.render = this.render.bind(this) // 绑定 this
  }

  initThree(dom: HTMLElement) {
    this.renderer.setPixelRatio(window.devicePixelRatio) // 设置设备像素比，以免渲染模糊问题
    this.renderer.setSize(window.innerWidth, window.innerHeight) // 设置渲染器输出画布大小

    dom.appendChild(this.renderer.domElement) // 将画布添加到指定元素中

    window.onresize = this.onresize.bind(this) // 监听屏幕变化
    this.render() // 执行渲染函数

    this.scene.add(this.axesHelper) // 添加辅助坐标系

    this.addBox()
    this.addSphere()
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

  addSphere() {
    const geometry = new SphereGeometry(1, 32, 32) // 创建几何体
    const material = new MeshBasicMaterial({ color: 0xFF0000 }) // 添加材质
    const sphere = new Mesh(geometry, material) // 创建网格
    sphere.position.x = 2
    this.scene.add(sphere)

    setInterval(() => {
      sphere.rotation.x += 0.01
      sphere.rotation.y += 0.01
    }, 1000 / 60)
  }

  /**
   * 屏幕大小改变后，自动改变渲染器大小
   */
  onresize() {
    // 重置渲染器输出画布 canvas 尺寸
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    // 全屏情况下：设置观察范围长宽比 aspect 为窗口宽高比
    this.camera.aspect = window.innerWidth / window.innerHeight
    // 渲染器执行 render 方法的时候会读取相机对象的投影矩阵属性 projectionMatrix
    // 但是不会每渲染一帧，就通过相机的属性计算投影矩阵(节约计算资源)
    // 如果相机的一些属性发生了变化，需要执行 updateProjectionMatrix() 方法更新相机的投影矩阵
    this.camera.updateProjectionMatrix()
  }

  /**
   * 渲染函数，每帧执行
   */
  render() {
    requestAnimationFrame(this.render)

    this.renderer.render(this.scene, this.camera)
  }
}
