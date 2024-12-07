class Sprite {
    //Tao toa do
    constructor({ position, imageSrc, scale=1, framesMax=1, offset={x:0,y:0}}) {
      this.position = position;
      this.width=50;
      this.height = 150;
      this.image=new Image();
      this.image.src=imageSrc;
      this.scale=scale;
      this.framesMax=framesMax;
      this.framesCurrent=0;
      this.framesElapsed=0;
      this.framesHold=5;
      this.offset=offset;
    }
    //Ve nhan vat
    draw() {
      c.drawImage(
        this.image,
        this.framesCurrent*(this.image.width/this.framesMax),
        0,
        this.image.width/this.framesMax,
        this.image.height,
        this.position.x - this.offset.x,
        this.position.y - this.offset.y,
        (this.image.width/this.framesMax)*this.scale,
        this.image.height*this.scale
    );
    }
    animateFrames(){
        this.framesElapsed++;
      if(this.framesElapsed % this.framesHold == 0){
        if(this.framesCurrent< this.framesMax - 1){
            this.framesCurrent++;
         }
         else{
            this.framesCurrent=0;
         }
      }
    }
    update() {
      this.draw()
      this.animateFrames();
    }
  
  }
  class Fighter extends Sprite{
    //Tao toa do
    constructor({ position, velocity,offsetattack, color ='red', imageSrc, scale = 1,  framesMax=1, offset={x:0,y:0}, sprites}) {
        super({
            position,
            imageSrc,
            scale,
            framesMax,
            offset,
        })
      this.velocity = velocity;
      this.width=50;
      this.height = 150;
      this.attackBox={
        position:{
          x:this.position.x,
          y:this.position.y
        },
        width:200,
        height:50,
        offsetattack
      };
      this.lastkey;
      this.jumping=false;
      this.color=color;
      this.isAttacking=false;
      this.health=100;
      this.framesCurrent=0;
      this.framesElapsed=0;
      this.framesHold=5;
      this.sprites=sprites;
      this.death=false;
      this.attack1=false;
      this.attack2=false;
      this.isSprinting=false;
      for(const index in this.sprites){
        this.sprites[index].image=new Image();
        this.sprites[index].image.src= this.sprites[index].imageSrc;
      }
      console.log(this.sprites)
    }
    //Ve nhan vat
    // draw() {
    //   c.fillStyle = this.color;
    //   c.fillRect(this.position.x, this.position.y, this.width, this.height);
  
    //   //attackbox
    //   if(this.isAttacking){
    //     c.fillStyle='green';
    //     c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height);
    //   }
    // }
  
    update() {
      this.draw()
      if(this.death==false){
        this.animateFrames();
      }
      // if(this.isAttacking){
      //       c.fillStyle='green';
      //       c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height);
      //     }
      this.attackBox.position.x=this.position.x + this.attackBox.offsetattack.x;
      this.attackBox.position.y=this.position.y;
      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;
      if (this.position.y + this.height + this.velocity.y >= canvas.height-48) {
        this.velocity.y = 0;
      } else {
        this.position.y += gravity;
      }
    }
    switchsprites(sprite){
      if(this.health<=0&&this.image===this.sprites.death.image){
        if(this.framesCurrent == this.sprites.death.framesMax - 1){
          this.death=true;
        }
        return
      }
        if(this.image===this.sprites.attack1.image && this.framesCurrent < this.sprites.attack1.framesMax - 1) return;
        if(this.image===this.sprites.attack2.image && this.framesCurrent < this.sprites.attack2.framesMax - 1) return;
        if(this.image===this.sprites.takehit.image && this.framesCurrent < this.sprites.takehit.framesMax - 1) return;
        switch (sprite) {
            case 'idle':
                if(this.image !== this.sprites.idle.image){
                    this.image=this.sprites.idle.image;
                    this.framesCurrent=0;
                    this.framesMax=this.sprites.idle.framesMax;
                }
                break;
            case 'run':
                if(this.image !== this.sprites.run.image){
                    this.image=this.sprites.run.image;
                    this.framesMax=this.sprites.run.framesMax;
                    this.framesCurrent=0;
                }
                break;
            case 'jump':
                if(this.image !== this.sprites.jump.image){
                    this.image=this.sprites.jump.image;
                    this.framesCurrent=0;
                    this.framesMax=this.sprites.jump.framesMax;
                }
                break;
            case 'attack1':
                    if(this.image !== this.sprites.attack1.image){
                        this.image=this.sprites.attack1.image;
                        this.framesCurrent=0;
                        this.framesMax=this.sprites.attack1.framesMax;
                    }
                    break;
                    case 'attack2':
                      if(this.image !== this.sprites.attack2.image){
                          this.image=this.sprites.attack2.image;
                          this.framesCurrent=0;
                          this.framesMax=this.sprites.attack2.framesMax;
                      }
                      break;
                case 'fall':
                        if(this.image !== this.sprites.fall.image){
                            this.image=this.sprites.fall.image;
                            this.framesCurrent=0;
                            this.framesMax=this.sprites.fall.framesMax;
                        }
                        break;
                        case 'takehit':
                          if(this.image !== this.sprites.takehit.image){
                              this.image=this.sprites.takehit.image;
                              this.framesCurrent=0;
                              this.framesMax=this.sprites.takehit.framesMax;
                          }
                          break;
                          case 'death':
                            if(this.image !== this.sprites.death.image){
                                this.image=this.sprites.death.image;
                                this.framesCurrent=0;
                                this.framesMax=this.sprites.death.framesMax;
                            }
                            break;
            default:
                break;
        }
    }
    //attack
    attack(){
      this.isAttacking=true;
      setTimeout(()=>{
        this.isAttacking=false;
        this.attack1=false;
        this.attack2=false;
      },5)
    }
    sprint(){
      this.isSprinting=true;
      setTimeout(()=>{
        this.isSprinting=false;
      },200)
    }
  }
  