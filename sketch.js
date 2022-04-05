const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;
var corda 
var cenoura
var cenouraIMG
var prender
var coelho
var muro
var coelhoA
var butom
var triste
var eat
let engine;
let world;
var ground;
var comendo
var musica
var tristesound
var cortarcorda
var comendosound
var ar
var cortandoFolhas
var parederight
var paredeleft
var corda2
var corda3
var butom2
var butom3

function preload(){
  cenouraIMG=loadImage("Anel.png")
  coelho=loadImage("Gollum SUS.jpg")
  muro=loadImage("Caverna.gif")
  triste=loadImage("No.gif")
  eat=loadImage("mi-precioso-gollum.gif")
}

function setup() 
{
  createCanvas(700,700);
  frameRate(100);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(200,680,600,20);
  parederight= new Ground (500,350,20,800)
  paredeleft= new Ground (0,350,20,800)

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  var cenoura_config={
density:0.0001
}
butom=createImg("cut_btn.png")
butom.size(100,100)
butom.position(100,0)
butom.mouseClicked(cortar)

butom=createImg("balloon.png")
butom.size(100,100)
butom.position(400,0)
butom.mouseClicked(vento)
  //  tamanho da corda
   corda=new rope(10,{x:200,y:0})
   fruta=Bodies.rectangle(200,400,60,60,cenoura_config)
   Matter.Composite.add(corda.body,fruta)
prender=new ligacao(corda,fruta)
eat.frameDelay=20
coelhoA=createSprite(400,630)
coelhoA.addImage("acao",coelho)
coelhoA.scale=0.2
}

function draw() 
{
  
  background(muro);
  Engine.update(engine);
  corda.show()
  if(fruta!==null){
  push()
  imageMode(CENTER)
image(cenouraIMG,fruta.position.x,fruta.position.y,100,100)
pop()
  }
drawSprites()
   if(colision(fruta,coelhoA)==true){
     coelhoA.addImage ("comer",eat)
     coelhoA.changeImage("comer")
     coelhoA.scale = 0.7
   }
   if(colision(fruta,ground.body)==true){
    coelhoA.addImage ("triste",triste)
    coelhoA.changeImage("triste")
    coelhoA.scale = 0.7
  }
}

function cortar(){
  corda.break()
  prender.remove()
  prender=null
}

function colision (cenoura,coelho){
  
  if (cenoura!==null){
    var distancia=dist (cenoura.position.x,cenoura.position.y,coelho.position.x,coelho.position.y)
    if (distancia < 80){
      World.remove(engine.world,fruta)
      fruta=null
      return true  
    }
else {return false}
  }
}


function vento (){
  Matter.Body.applyForce(fruta,{x:0,y:0},{x:-0.01,y:0})
}