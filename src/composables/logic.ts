import {
  AxesHelper,
  PerspectiveCamera,
  Scene, WebGLRenderer,
} from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import Stats from 'three/addons/libs/stats.module.js'

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
  // 创建性能监视器
  stats = new Stats()

  controller = reactive({
    scale: [0, 1, 2, 3],
    direction: {
      left: -1,
      center: 0,
      right: 1,
    },
    rander: true,
  })

  constructor() {
    this.render = this.render.bind(this) // 绑定 this

    document.body.appendChild(this.stats.dom) // 添加性能监视器

    watchEffect(() => {
      if (this.controller.rander)
        this.render() // 执行渲染函数
    })
  }

  initThree(dom: HTMLElement) {
    this.renderer.setPixelRatio(window.devicePixelRatio) // 设置设备像素比，以免渲染模糊问题
    this.renderer.setSize(window.innerWidth, window.innerHeight) // 设置渲染器输出画布大小

    dom.appendChild(this.renderer.domElement) // 将画布添加到指定元素中

    window.onresize = this.onresize.bind(this) // 监听屏幕变化

    this.scene.add(this.axesHelper) // 添加辅助坐标系

    this.camera.position.setZ(5) // 设置相机位置坐标
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
    if (!this.controller.rander)
      return

    this.stats.update() // 刷新性能监视器时间
    requestAnimationFrame(this.render) // 请求再次执行渲染函数 render，渲染下一帧
    this.renderer.render(this.scene, this.camera) // 渲染器执行渲染操作
  }
}
