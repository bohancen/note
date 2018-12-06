let canvas = document.querySelector('#canvas')
let stage = new createjs.Stage(canvas)
createjs.Touch.enable(stage)
let reader = new FileReader()
let s = 1
let n = 0.02;
let append = function(src,fn){
  let image = new Image()
  image.src = src
  image.onload=function(){
    let img = new createjs.Bitmap(this)
    stage.addChild(img)
    stage.update()
    fn && fn()
  }
}
canvas.addEventListener('mousewheel',function(e){
  e.preventDefault();
  if (e.deltaY > 0) { //up
    s = s + n > 10 ? s : s + n
  }
  if (e.deltaY < 0) { //down
    s = s - n
  }
  stage.scaleX = s
  stage.scaleY = s
  stage.update();
})

append('https://i0.hdslb.com/bfs/bigfun/610a791062c124cb2da073232f96cb575b91b681.jpg',function(){
  append('https://i0.hdslb.com/bfs/bigfun/873326f9fd251b1050df8831ac4154e7926dc920.png')
})
