import {
  AxesHelper,
  BoxGeometry,
  BufferAttribute, BufferGeometry, DoubleSide,
  Line, LineBasicMaterial, Mesh, MeshBasicMaterial,
  PerspectiveCamera, Points, PointsMaterial,
  Scene, SphereGeometry, WebGLRenderer,
} from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GUI } from 'three/addons/libs/lil-gui.module.min.js'
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
  // 创建 GUI 面板
  gui = new GUI()
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

    this.gui.add(this.controller, 'rander').name('渲染')
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

    const cube = this.addBox()
    const sphere = this.addSphere()
    this.addPoint()
    this.addLine()
    this.addRectangle()

    setInterval(() => {
      cube.rotateX(0.01)
      cube.rotateY(0.01)
      sphere.rotateX(0.01)
      sphere.rotateY(0.01)
    }, 1000 / 60)
  }

  addRectangle() {
    const geometry = new BufferGeometry()
    const vertices = new Float32Array([
      0, 20, 0, // 顶点 1 坐标
      100, 20, 0, // 顶点 2 坐标
      100, 100, 0, // 顶点 3 坐标

      0, 20, 0, // 顶点 4 坐标
      100, 100, 0, // 顶点 5 坐标
      0, 100, 0, // 顶点 6 坐标
    ])

    const attribue = new BufferAttribute(vertices, 3)
    geometry.attributes.position = attribue

    const material = new MeshBasicMaterial({
      color: 0x00FF00,
      side: DoubleSide, // 双面可见，默认反面可见
    })

    const mesh = new Mesh(geometry, material)
    this.scene.add(mesh)
  }

  addLine() {
    const geometry = new BufferGeometry()
    // 类型化数组创建顶点数据
    const vertices = new Float32Array([
      0, 0, 0, // 顶点 1 坐标
      5, 0, 0, // 顶点 2 坐标
      0, 10, 0, // 顶点 3 坐标
      0, 0, 1, // 顶点 4 坐标
      0, 0, 10, // 顶点 5 坐标
      5, 0, 1, // 顶点 6 坐标
    ])
    // 创建属性缓冲区对象
    const attribue = new BufferAttribute(vertices, 3)
    // 设置几何体 attributes 属性的位置属性
    geometry.attributes.position = attribue
    const material = new LineBasicMaterial({
      color: 0xFBFF00,
    })
    // 创建线模型对象
    const line = new Line(geometry, material)
    // const line = new LineLoop(geometry, material) // 闭合线条

    this.scene.add(line) // 线条对象添加到场景中
  }

  addPoint() {
    const geometry = new BufferGeometry()
    // 类型化数组创建顶点数据
    const vertices = new Float32Array([
      0, 0, 0, // 顶点 1 坐标
      5, 0, 0, // 顶点 2 坐标
      0, 10, 0, // 顶点 3 坐标
      0, 0, 1, // 顶点 4 坐标
      0, 0, 10, // 顶点 5 坐标
      5, 0, 1, // 顶点 6 坐标
    ])
    // 创建属性缓冲区对象
    const attribue = new BufferAttribute(vertices, 3)
    // 设置几何体 attributes 属性的位置属性
    geometry.attributes.position = attribue
    const material = new PointsMaterial({
      color: 0xFFFF00,
      size: 0.3, // 点对象像素尺寸
    })
    const points = new Points(geometry, material) // 点模型对象

    this.scene.add(points)
    return points
  }

  addBox() {
    const geometry = new BoxGeometry(1, 1, 1) // 创建几何体
    const material = new MeshBasicMaterial({
      color: 0x00FF00,
      wireframe: true, // 显示线条模式
    }) // 添加材质
    const cube = new Mesh(geometry, material) // 创建网格
    this.scene.add(cube)

    const gui = this.gui.addFolder('几何体')
    gui.add(cube.position, 'x', -3, 3, 0.01).name('X 轴')
    gui.add({ scale: 0 }, 'scale', this.controller.scale)
      .name('Y 轴')
      .onChange((value: number) => cube.position.setY(value))
    gui.add({ direction: 'center' }, 'direction', this.controller.direction)
      .name('方向选择')
      .onChange((value: number) => cube.position.setX(value))
    gui.addColor({ color: 0x00FF00 }, 'color')
      .name('颜色')
      .onChange((value: number) => {
        // 更新球体颜色
        cube.material.color.set(value)
      })

    this.camera.position.z = 5

    return cube
  }

  addSphere() {
    const geometry = new SphereGeometry(1, 32, 32) // 创建几何体
    const material = new MeshBasicMaterial({ color: 0xFF0000 }) // 添加材质
    const sphere = new Mesh(geometry, material) // 创建网格
    sphere.position.x = 2
    this.scene.add(sphere)

    const gui = this.gui.addFolder('球体')
    gui.add(sphere.position, 'x', -3, 3, 0.01).name('X 轴')
    gui.add({ scale: 0 }, 'scale', this.controller.scale)
      .name('Y 轴')
      .onChange((value: number) => sphere.position.setY(value))
    gui.add({ direction: 'right' }, 'direction', this.controller.direction)
      .name('方向选择')
      .onChange((value: number) => sphere.position.setX(value))
    gui.addColor({ color: 0xFF0000 }, 'color')
      .name('颜色')
      .onChange((value: number) => {
        // 更新球体颜色
        sphere.material.color.set(value)
      })

    return sphere
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
