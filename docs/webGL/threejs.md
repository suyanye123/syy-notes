# Threejs

Three.js引擎嵌入引入

```js
<script src="https://raw.github.com/mrdoob/three.js/master/build/three.js"></script>
```

三大要素：场景、相机、渲染器

1.场景

```js
var scene = new THREE.Scene
```

2.相机

相机决定了场景中哪个角度的景色会显示出来，只需要设置不同的参数

Threejs中有很多相机，这里介绍透视相机

```js
var camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
```

3.渲染器

渲染器决定了渲染的结果画在页面的什么元素上，并怎样的方式来绘制，例如 WebRender渲染器

```js
var renderer =new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement)
```

4.添加物体到场景中



5.渲染

渲染器使用渲染函数 renderer.render(scene,camera) 

渲染函数的原型如下：

```js
render(scene,camera,renderTarget,forceClear)
//场景，相机，渲染目标，每次绘制前强制清除画布
```

6.渲染循环

两种方式：实时渲染和离线渲染

离线渲染：把事先处理好的一帧一帧的图片拼接起来

实时渲染：不停的对画面进行渲染

```js
function render(){
	cube.rotation.x += 0.1;
	cube.rotation.y += 0.1;
	renderer.render(scene,camera);
	requestAimationFrame(render);
}
//requestAnimationFrame函数让浏览器去执行一次参数中的函数，这样通过上面render中再次调用，即形成游戏循环
```



一个完整的Threejs例子

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>Three框架</title>
		<script src="js/Three.js" data-ke-src="js/Three.js"></script>
		<style type="text/css">
			div#canvas-frame {
				border: none;
				cursor: pointer;
				width: 100%;
				height: 600px;
				background-color: #EEEEEE;
			}
		</style>
		<script>
            var renderer;
            function initThree() {
                width = document.getElementById('canvas-frame').clientWidth;
                height = document.getElementById('canvas-frame').clientHeight;
                renderer = new THREE.WebGLRenderer({
                    antialias : true
                });
                renderer.setSize(width, height);
                document.getElementById('canvas-frame').appendChild(renderer.domElement);
                renderer.setClearColor(0xFFFFFF, 1.0);
            }
            var camera;
            function initCamera() {
                camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
                camera.position.x = 0;
                camera.position.y = 1000;
                camera.position.z = 0;
                camera.up.x = 0;
                camera.up.y = 0;
                camera.up.z = 1;
                camera.lookAt({
                    x : 0,
                    y : 0,
                    z : 0
                });
            }
            var scene;
            function initScene() {
                scene = new THREE.Scene();
            }
            var light;
            function initLight() {
                light = new THREE.DirectionalLight(0xFF0000, 1.0, 0);
                light.position.set(100, 100, 200);
                scene.add(light);
            }
            var cube;
            function initObject() {
                var geometry = new THREE.Geometry();
                var material = new THREE.LineBasicMaterial( { vertexColors: THREE.VertexColors} );
                var color1 = new THREE.Color( 0x444444 ), color2 = new THREE.Color( 0xFF0000 );
                // 线的材质可以由2点的颜色决定
                var p1 = new THREE.Vector3( -100, 0, 100 );
                var p2 = new THREE.Vector3(  100, 0, -100 );
                geometry.vertices.push(p1);
                geometry.vertices.push(p2);
                geometry.colors.push( color1, color2 );
                var line = new THREE.Line( geometry, material, THREE.LinePieces );
                scene.add(line);
            }
            function render()
            {
                renderer.clear();
                renderer.render(scene, camera);
                requestAnimationFrame(render);
            }
            function threeStart() {
                initThree();
                initCamera();
                initScene();
                initLight();
                initObject();
                render();
            }
		</script>
	</head>

	<body onload="threeStart();">
		<div id="canvas-frame"></div>
	</body>
</html>
```

