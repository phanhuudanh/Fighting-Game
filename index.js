const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
//Chieu dai va rong cua man hinh game
canvas.width = 1024;
canvas.height = 576;

const gravity = 0.2;
c.fillRect(50, 100, canvas.width, canvas.height);
var menu=true;

const background = new Sprite({
  position:{
    x:50,
    y:47
  },
  imageSrc: './img/background.png',
})

const shop = new Sprite({
  position:{
    x:120,
    y:175,
  },
  imageSrc: './img/shop.png',
  scale: 2.75,
  framesMax:6,
})
const crock = new Sprite({
  position:{
    x:792,
    y:473,
  },
  imageSrc: './img/rock_3.png',
  scale:3
})
const sign = new Sprite({
  position:{
    x:792,
    y:430,
  },
  imageSrc: './img/sign.png',
  scale:3
})
function checkWin({Player, Enemy, timerID}){
  clearTimeout(timerID);
  if(Player.health===Enemy.health){
    document.querySelector('.tie').style.display="block";
    setTimeout(()=>{
      document.querySelector('.tie').style.display="none";
      resetData();
      menu.classList.add('disflex');
    },3000);
  }
  if(Player.health>Enemy.health){
    document.querySelector('.pwin').style.display="block";
    setTimeout(()=>{
      document.querySelector('.pwin').style.display="none";
      resetData();
      menu.classList.add('disflex');
    },3000);
  }
  if(Player.health<Enemy.health){
    document.querySelector('.ewin').style.display="block";
    setTimeout(()=>{
      document.querySelector('.ewin').style.display="none";
      resetData();
      menu.classList.add('disflex');
    },3000);
  }
}


//Time
var time=50;
let timerID;
function DecreaseTimer(){
  timerID = setTimeout(DecreaseTimer,1000)
  if(time>0){
  time--;
  document.querySelector(".time").innerHTML=time;
  if(time==0){
    checkWin({Player,Enemy,timerID});
  }
}
}

//Tao nhan vat Player va Enemy
const Player = new Fighter({
  position: {
    x: 100,
    y: 100,
  },
  velocity: {
    x: 0,
    y: 5,
  },
  offsetattack:{
    x: 0,
    y: 0
  },
  // color: 'red'
  imageSrc: './img/samuraiMack/Idle.png',
  framesMax: 8,
  scale:2.5,
  offset:{
    x:215,
    y:155
  },
  sprites:{
    idle:{
      imageSrc: './img/samuraiMack/Idle.png',
      framesMax: 8,
    },
    run:{
      imageSrc: './img/samuraiMack/Run.png',
      framesMax: 8,
    },
    jump:{
      imageSrc: './img/samuraiMack/Jump.png',
      framesMax:2
    },
    attack1:{
      imageSrc: './img/samuraiMack/Attack1.png',
      framesMax:6
    },
    fall:{
      imageSrc: './img/samuraiMack/Fall.png',
      framesMax:2
    },
    takehit:{
      imageSrc: './img/samuraiMack/Take Hit - white silhouette.png',
      framesMax:4
    },
    death:{
      imageSrc: './img/samuraiMack/Death.png',
      framesMax:6
    },
    attack2:{
      imageSrc: './img/samuraiMack/Attack2.png',
      framesMax:6
    }
  }
});

const Enemy = new Fighter({
  position: {
    x: canvas.width - 100,
    y: 100,
  },
  velocity: {
    x: 0,
    y: 5,
  },
  offsetattack:{
    x: -160,
    y: 0
  },
  // color: 'blue'
  scale:2.5,
  offset:{
    x:215,
    y:166
  },
  sprites:{
    idle:{
      imageSrc: './img/kenji/Idle.png',
      framesMax: 4,
    },
    run:{
      imageSrc: './img/kenji/Run.png',
      framesMax: 8,
    },
    jump:{
      imageSrc: './img/kenji/Jump.png',
      framesMax:2
    },
    attack1:{
      imageSrc: './img/kenji/Attack1.png',
      framesMax:4
    },
    fall:{
      imageSrc: './img/kenji/Fall.png',
      framesMax:2
    },
    takehit:{
      imageSrc: './img/kenji/Take hit.png',
      framesMax:3
    },
    death:{
      imageSrc: './img/kenji/Death.png',
      framesMax:7
    },
    attack2:{
      imageSrc: './img/kenji/Attack2.png',
      framesMax:4
    }
  }
});
const keys = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  w: {
    pressed: false,
  },
  j: {
    pressed: false,
  },
  ArrowRight: {
    pressed: false,
  },
  ArrowLeft: {
    pressed: false,
  },
  ArrowUp: {
    pressed: false,
  },
  2: {
    pressed: false,
  },
};
Player.draw();
Enemy.draw();
console.log(Player);

//MUSIC
const soundArr=["hit.mp3","jump.mp3","run.mp3","Slash.mp3"];
var countsound=0;
function PlaySound(n){
  let audio = new Audio(`/sound/`+soundArr[n]);
  audio.play();
}
let soundButton=document.getElementById('soundButton');
let mute=document.querySelector('.mute');
let muted=document.querySelector('.muted');
if(countsound==0){
  muted.classList.add('disblock');
}
function PlayBSound(n){
  if(n==0){
    document.getElementById("audioOne").pause();
    document.getElementById("audioTwo").pause();
    muted.classList.add('disblock');
    mute.classList.remove('disblock');
  }
  else if(n==1){
    document.getElementById("audioTwo").pause();
    document.getElementById("audioOne").play();
    mute.classList.add('disblock');
    muted.classList.remove('disblock');
  }else{
    document.getElementById("audioTwo").play();
    document.getElementById("audioOne").pause();
    mute.classList.add('disblock');
    muted.classList.remove('disblock');
  }
}


function resetData(){
  Player.position.y=Enemy.position.y=100;
  Player.velocity.y=Enemy.velocity.y=5;
  Player.position.x=100;
  Enemy.position.x= canvas.width - 100;
  Player.health=100;
  Enemy.health=100;
  Player.death=false;
  Enemy.death=false;
  time=50;
  document.querySelector(".playerHP").style.width = '99%';
  document.querySelector(".enemyHP").style.width = '99%';
}
soundButton.addEventListener("click",function(){
  if(countsound!=2){
    countsound++;
  }else{
    countsound=0;
  }
  PlayBSound(countsound);
})

//Menu
var menu=document.querySelector('.menu');
if(menu){
  menu.classList.add('disflex');
}
var buttonPlay=document.querySelector('.button-play');

buttonPlay.addEventListener("click",()=>{
  menu.classList.remove('disflex');
  DecreaseTimer();
})
//Call back de load lai man hinh tao hieu ung dong
function animate() {
  window.requestAnimationFrame(animate);
  c.fillStyle = "black";
  c.fillRect(50, 100, canvas.width, canvas.height);
  //load/ve background
  background.update();
  shop.update();
  sign.update();
  crock.update();
  //load/ve nhan vat
  Player.update();
  Enemy.update();
  // console.log("go");
  Player.velocity.x = 0;
  Enemy.velocity.x = 0;
  if(Player.isSprinting){
    Player.velocity.x=10;
  }
  if(Enemy.isSprinting){
    Enemy.velocity.x=-10;
  }
  //Player keys
  if (keys.a.pressed && Player.lastkey=='a' ) {
    if(Player.position.x<98){
      Player.velocity.x=0;
    }else{
      Player.velocity.x = -2;
    }
    Player.switchsprites('run');
  } else if (keys.d.pressed && Player.lastkey=='d') {
    if(Player.position.x>canvas.width-100){
      Player.velocity.x=0;
    }else{
      Player.velocity.x =2;
    }
    Player.switchsprites('run');
  }else{
    Player.switchsprites('idle')
  }

  //Enemy keys
  if (keys.ArrowLeft.pressed && Enemy.lastkey=='ArrowLeft' ) {
    if(Enemy.position.x<80){
      Enemy.velocity.x=0;
    }else{
      Enemy.velocity.x =-2;
    }
    Enemy.switchsprites('run');
  } else if (keys.ArrowRight.pressed && Enemy.lastkey=='ArrowRight') {
    if(Enemy.position.x>canvas.width-100){
      Enemy.velocity.x=0;
    }else{
      Enemy.velocity.x =2;
    }
    Enemy.switchsprites('run');
  }else{
    Enemy.switchsprites('idle')
  }
  //nhay
  if(Player.velocity.y<0){
    Player.switchsprites('jump');
  }
  if(Player.velocity.y>0){
    Player.switchsprites('fall');
  }
  //nhay-Enemy
  if(Enemy.velocity.y<0){
    Enemy.switchsprites('jump');
  }else if(Enemy.velocity.y>0){
    Enemy.switchsprites('fall');
  }
  //attack
  if(Player.isAttacking){
    if(Player.attack1){
      Player.switchsprites('attack1');
      PlaySound(3);
    }
    else{
    Player.switchsprites('attack2');
    PlaySound(3);
    }
  }
  //Enemy attack
  if(Enemy.isAttacking){
   if(Enemy.attack1){
    Enemy.switchsprites('attack1');
    PlaySound(3);
   }
  else {
    Enemy.switchsprites('attack2');
    PlaySound(3);
  }
  }
  // attack action
  if(Player.attackBox.position.x + Player.attackBox.width >= Enemy.position.x && Player.attackBox.position.x <= Enemy.position.x + Enemy.width && Player.attackBox.position.y + Player.attackBox.height >= Enemy.position.y && Player.attackBox.position.y <= Enemy.position.y + Enemy.height && Player.isAttacking){
    Enemy.health-=8;
    if(Player.health>0){
      Enemy.switchsprites('takehit');
      PlaySound(0);
    }
    else{
      Enemy.switchsprites('death');
    }
    if(Enemy.health<=0){
      document.querySelector(".enemyHP").style.width = 0;
      checkWin({Player,Enemy, timerID});
    }else{
      document.querySelector(".enemyHP").style.width = Enemy.health + '%';
    }
  }
  if(Enemy.attackBox.position.x + Enemy.attackBox.width >= Player.position.x && Enemy.attackBox.position.x <= Player.position.x + Player.width && Enemy.attackBox.position.y + Enemy.attackBox.height >= Player.position.y && Enemy.attackBox.position.y <= Player.position.y + Player.height && Enemy.isAttacking){
    Player.health-=8;
    if(Player.health>0){
      Player.switchsprites('takehit');
      PlaySound(0);
    }
    else{
      Player.switchsprites('death');
    }
    if(Player.health<=0){
      document.querySelector(".playerHP").style.width = 0;
      checkWin({Player,Enemy, timerID});
    }else{
      document.querySelector(".playerHP").style.width = Player.health + '%';
    }
  }
}

animate();

window.addEventListener("keydown", (event) => {
  if(Player.death || Enemy.death) return
  switch (event.key) {
    case "d":
      Player.lastkey='d';
      keys.d.pressed = true;
      break;
    case "a":
      Player.lastkey='a'
      keys.a.pressed = true;
      break;
    case "w":
      if(Player.velocity.y==0){
        Player.velocity.y = -20;
        setTimeout(()=>{
          Player.jumping==true;
        },4000)
      }
      break;
    case 'j':
      Player.attack1=true;
      Player.attack();
      break;
    case 'k':
      Player.attack2=true;
      Player.attack();
      break;
    case 'l':
        Player.sprint();
        break;
    case "ArrowRight":
      keys.ArrowRight.pressed = true;
      Enemy.lastkey='ArrowRight';
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = true;
      Enemy.lastkey='ArrowLeft';
      break;
    case "ArrowUp":
      Enemy.velocity.y = -20;
      break;
    case "n":
      Enemy.attack1=true;
      Enemy.attack();
      break;
      case "m":
        Enemy.attack2=true;
        Enemy.attack();
        break;
      case ',':
          Enemy.sprint();
          break;
    default:
      break;
  }
  // console.log(event);
});

window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "d":
      keys.d.pressed = false;
      break;
    case "a":
      keys.a.pressed = false;
      break;
    case "w":
      Player.velocity.y = 3;
      break;
    case "ArrowRight":
      keys.ArrowRight.pressed = false;
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = false;
      break;
    case "ArrowUp":
      Enemy.velocity.y = 3;
      break;
    default:
      break;
  }
  console.log(event.key);
});

///website
document.getElementById('hearth').addEventListener=("onclick", ()=>{
  alert("Thank you so much!");
  console.log("ok cam on");
})
