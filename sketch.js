const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1,pig3;
var backgroundImg,platform;
var bird, slingshot;

var gameState = "onSling";
var bg = "sprites/bg1.png";
var score = 0;

function preload() {
getBackgroundImg();
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    pig1 = new Pig(810, 350);
    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    pig3 = new Pig(810, 220);

    log3 =  new Log(810,180,300, PI/2);

    box5 = new Box(810,160,70,70);
    log4 = new Log(760,120,150, PI/7);
    log5 = new Log(870,120,150, -PI/7);

    bird = new Bird(200,50);

    //log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(bird.body,{x:200, y:50});
}

function draw(){
    if(backgroundImg){    background(backgroundImg);  }
    Engine.update(engine);
    noStroke();
    textSize(35)
    fill("white")
    text("Score  " + score, width-300, 50);
    textSize(35);
    text("Press Space key to play again",250,50);
    //strokeWeight(4);
    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    log1.display();

    box3.display();
    box4.display();
    pig3.display();
    log3.display();

    box5.display();
    log4.display();
    log5.display();

    bird.display();
    platform.display();
    //log6.display();
    slingshot.display();  
    pig1.score();
    pig3.score();  
}

function mouseDragged(){
        Matter.Body.setPosition(bird.body, {x: mouseX , y: mouseY});
}


function mouseReleased(){
    slingshot.fly();
}


function keyPressed(){
    if(keyCode === 32){
        Matter.Body.setPosition(bird.body,{x:200,y:50});
        slingshot.attach(bird.body);
        bird.trajectory=[];
    }
}
async function getBackgroundImg(){
var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
var responsejson = await response.json();
/*{"abbreviation":"IST","client_ip":"122.163.215.197","datetime":"2020-09-09T16:15:23.211315+05:30",
"day_of_week":3,"day_of_year":253,"dst":false,"dst_from":null,"dst_offset":0,"dst_until":null,"raw_offset":19800,
"timezone":"Asia/Kolkata","unixtime":1599648323,"utc_datetime":"2020-09-09T10:45:23.211315+00:00",
"utc_offset":"+05:30","week_number":37}*/
var dateTime = responsejson.datetime;
/*"2020-09-09T16:15:23.211315+05:30"*/
var hour = dateTime.slice(11,13);
if(hour >= 06 && hour <= 19){
    backgroundImg=loadImage("sprites/bg.png");
}
else{
    backgroundImg=loadImage("sprites/bg2.jpg");
}
}