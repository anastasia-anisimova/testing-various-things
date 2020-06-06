import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild
} from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-three',
  templateUrl: './three.component.html',
  styleUrls: ['./three.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThreeComponent implements OnInit, AfterViewInit {

  @ViewChild('canvas') canvasRef: ElementRef;

  @HostListener('document:keydown.enter', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.applyChanges();
  }

 // fieldOfView = 75;
  fieldOfView = 60; // вертикальное поле обзора камеры
  nearClippingPane = 80;
  farClippingPane = 1500;
  widthSegments = 60;
  heightSegments = 30;
  radius = 500;
  target = 100;

  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private cameraTarget: THREE.Vector3;
  private material: THREE.MeshBasicMaterial;
  private renderer: THREE.WebGLRenderer;
  private isUserInteracting = false;
  private longitude = 0;
  private latitude = 0;
  private phi = 0;
  private theta = 0;
  private onPointerDownPointerX = 0;
  private onPointerDownPointerY = 0;
  private onPointerDownLatitude = 0;
  private onPointerDownLongitude = 0;

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }
  private readonly texture = '/assets/textures/2.jpg';

  constructor() {
  }

  ngOnInit(): void {
  }

  applyChanges() {
    this.ngAfterViewInit();
  }

  ngAfterViewInit() {
    this.createScene();
    this.createCamera();
    this.createPanorama();
    this.startRendering();
  }

  onResize(event: Event) {
    this.camera.aspect = this.getAspectRatio();
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
  }

  onDragEnter(event: DragEvent) {
    this.canvas.style.opacity = 0.5.toString();
  }

  onDragLeave(event: DragEvent) {
    this.canvas.style.opacity = 1.0.toString();
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
  }

  onDrop(event: DragEvent) {
    event.preventDefault();

    let component: ThreeComponent = this;
    let reader = new FileReader();
    reader.addEventListener('load', function onDroppedFileLoad() {
      component.material.map.image.src = reader.result;
      component.material.map.needsUpdate = true;
    });
    reader.readAsDataURL(event.dataTransfer.files[0]);

    this.canvas.style.opacity = 1.0.toString();
  }

  onMouseDown(event: MouseEvent) {
    event.preventDefault();

    this.isUserInteracting = true;
    this.onPointerDownPointerX = event.clientX;
    this.onPointerDownPointerY = event.clientY;
    this.onPointerDownLatitude = this.latitude;
    this.onPointerDownLongitude = this.longitude;
  }

  onMouseMove(event: MouseEvent) {
    if (this.isUserInteracting !== true) {
      // Propagate event
      return true;
    }

    this.latitude = (event.clientY - this.onPointerDownPointerY) * 0.1 +
      this.onPointerDownLatitude;
    this.longitude = (this.onPointerDownPointerX - event.clientX) * 0.1 +
      this.onPointerDownLongitude;
  }

  onMouseUp(event: MouseEvent) {
    this.isUserInteracting = false;
  }

  onWheel(event: WheelEvent) {
    this.camera.fov += event.deltaY * 0.05;
    this.camera.updateProjectionMatrix();
  }

  private createScene() {
    this.scene = new THREE.Scene();
  }

  private createCamera() {
    let aspectRatio = this.getAspectRatio();
    this.camera = new THREE.PerspectiveCamera(
      this.fieldOfView,
      1,
      this.nearClippingPane,
      this.farClippingPane
    );
    this.cameraTarget = new THREE.Vector3(0, 0, 0);
  }

  private getAspectRatio(): number {
    let height = this.canvas.clientHeight;

    if (!height) {
      return 0;
    }

    return this.canvas.clientWidth / this.canvas.clientHeight;
  }

  private createPanorama() {
    let geometry = new THREE.SphereGeometry(
      this.radius,
      this.widthSegments,
      this.heightSegments
    );
    geometry.scale(-1, 1, 1);

    let map = new THREE.TextureLoader()
      .load(this.texture);
    this.material = new THREE.MeshBasicMaterial({map});
    let mesh = new THREE.Mesh(geometry, this.material);

    this.scene.add(mesh);
  }

  private startRendering() {
    this.renderer = new THREE.WebGLRenderer({canvas: this.canvas});
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);

    let component: ThreeComponent = this;

    (function render() {
      requestAnimationFrame(render);
      component.rotateCamera();
      component.renderer.render(component.scene, component.camera);
    }());
  }

  private rotateCamera() {
    if (this.isUserInteracting === false) {
      this.longitude += 0.1;
    }

    this.latitude = Math.max(-85, Math.min(85, this.latitude));
    this.phi = THREE.MathUtils.degToRad(90 - this.latitude);
    this.theta = THREE.MathUtils.degToRad(this.longitude);

    this.cameraTarget.x = this.target * Math.sin(this.phi) * Math.cos(this.theta);
    this.cameraTarget.y = this.target * Math.cos(this.phi);
    this.cameraTarget.z = this.target * Math.sin(this.phi) * Math.sin(this.theta);

    this.camera.lookAt(this.cameraTarget);
  }

}
