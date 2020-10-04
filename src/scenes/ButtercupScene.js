import {EventDispatcher} from "../ui/EventDispatcher";
import {Constants} from "../ui/Constants";

export class Buttercup extends Phaser.Scene{
    
    constructor(){

        super('Buttercup');
       
    }
    preload(){


    }
    create(){
      this.wheelCount =0
      this.music01 = this.sound.add("music_001")
      this.music01.setLoop(true)
      // this.music01.play();
    
      this.emitter= EventDispatcher.getInstance();
      this.createKeyInputs()
      this.bg = this.add.image(400,200,'room_bg')
      this.bg.setInteractive()
      this.bg.on('pointerdown', ()=>{
     //   console.log(" hit ")
        var pointer = this.input.activePointer;
      
       if(pointer.x>470 && this.cursors.left.isUp && this.cursors.right.isUp && this.akey.isUp && this.dkey.isUp){
        this.emitter.emit("KEYBOARDHIT",{key:'right'})
        this.hero.flipX=false
        if(!this.wheelMode)this.hero.setVelocityX(180)
       }
        
       if(pointer.x<330 && this.cursors.left.isUp && this.cursors.right.isUp && this.akey.isUp && this.dkey.isUp){
        this.emitter.emit("KEYBOARDHIT",{key:'left'})
        this.hero.flipX=true
        if(!this.wheelMode)this.hero.setVelocityX(-180)
       }
        //console.log(pointer.x)
        if(pointer.x<470 && pointer.x>330){
          this.actionWheel()
        }
      
        }) 

        this.bg.on('pointerup', ()=>{
          this.goIdle()
        }
        )
      this.wheel = this.add.sprite(400,244 ,"wheel")
      this.hero = this.physics.add.sprite(400,250,"hero")
      // this.hitbox = this.physics.add.sprite(400,250,"person").setGravity(0,200).setFrame(0).setCollideWorldBounds(true).setDragX(95).setBounce(.1)
      // this.hitbox.setPushable(false)
      this.hero.body.width = 85
      this.hero.body.height =40
   
      this.hero.setGravity(0,500)
      this.hero.body.setEnable()

      this.hero.body.updateBounds()
      this.hero.setScale(1,1)
      this.hero.body.setOffset(8,10)
      this.hero.setCollideWorldBounds(true);
      this.hero.anims.play("idle")
      
      this.hero.setFrictionX(1)
     this.ground = this.physics.add.staticImage(400,350,'box')
     
    //  this.person = this.physics.add.sprite(470,100,"person").setGravity(0,200).setFrame(0).setCollideWorldBounds(true).setDragX(95).setBounce(.1)

    //   let pp1 = this.physics.add.sprite(300,100,"person").setFrame(1).enableBody().setCollideWorldBounds(true).setBounce(.11)
    //   let pp2 = this.physics.add.sprite(450,100,"person").setFrame(2).enableBody().setCollideWorldBounds(true).setBounce(.11)
    //   let pp3 = this.physics.add.sprite(520,100,"person").setFrame(3).enableBody().setCollideWorldBounds(true).setBounce(.11)
  
      // SEE THIS RUNNING AT  - https://www.mohdi.com/buttercup2/ 

      // this.person.body.setPushable()
     
      // this.person.body.setEnable()

      
      this.pad = this.add.sprite(100,100,"pad")
      this.pad.visible= false
     
      this.physics.add.collider([this.hero], this.ground);
      // this.physics.add.collider(this.hero,[this.person, pp1,pp2,pp3]);
    //  this.physics.add.overlap(this.hero,this.hitbox,this.wheelTime);
      
      this.wheelHit = false
      this.wheelMode = false
      // this.physics.add.collider([pp2,pp1],ground)
      // this.physics.add.collider()
      this.btn = this.add.sprite(400,310,"btn")
      this.btn.setInteractive()
      this.btn.on('pointerdown', ()=>{
      //  console.log(" hit ")
        this.actionWheel()
        }) 
      this.btn.setAlpha(0)
      //console.log(" BUTTERCUP#2 ")
      
  }
  fadeMusicOut(){
   // this.killTweensOf(this.music01)
   this.tweens.killTweensOf(this.music01)
    this.tweens.add({
        targets: this.music01,
        volume: 0,
        ease: 'Linear',
        duration: 500,
        onComplete:()=>{
        this.music01.stop() 
    }
    });
}
fadeMusicIn(){
//  this.killTweensOf(this.music01)
this.tweens.killTweensOf(this.music01)
  this.music01.volume =0;
  this.music01.setLoop(true)
  this.music01.play();

  this.tweens.add({
    targets: this.music01,
    volume: 1,
    ease: 'Linear',
    duration: 5000,
    onComplete:()=>{
    
}
});
}
  wheelTime()
  {
    if(!this.wheelHit){
      this.wheelHit = true
    //.log("Wheel time ")
    }
      //console.log("Wheel time ")
  }
  showButton(){
  //   var tween = this.tweens.add({
  //     targets: this.btn,
  //     alpha:1,
  //     duration: 500,
  //     ease: 'Power2',
  //     loop: 0
  // })
  var tween2 = this.tweens.add({
    targets: this.btn,
    alpha:.9,
    duration: 1000,
    ease: 'Power2',
    loop: 0
})
  this.btn.anims.play("buttongo")
  }
  hideButton(){
    var tween2 = this.tweens.add({
      targets: this.btn,
      alpha:0,
      duration: 1000,
      ease: 'Power2',
      loop: 0
  })
 this.btn.anims.stop()
  }
actionWheel(){
  if(!this.wheelHit)return
  if(this.cursors.left.isUp && this.cursors.right.isUp && this.akey.isUp && this.dkey.isUp)
  {
  if(!this.wheelMode){
  this.hero.x = 400
  this.hero.y =310
  this.hero.setGravity(0,0)
  this.hideButton()
  this.wheelMode = true
} else{
  // this.hero.x = 400
 
  this.hero.setGravity(0,500)
  // this.hideButton()
  this.wheel.anims.stop()
  this.wheel.setFrame(0)
  this.wheelMode = false
}
  }
}

  createKeyInputs(){
    this.emitter.on('KEYBOARDHIT',this.keyBoardHit.bind(this));
   this.cursors = this.input.keyboard.createCursorKeys()

    this.akey = this.input.keyboard.addKey("a")
    let left = this.input.keyboard.addKey('LEFT')
       
          left.on('down',()=> this.emitter.emit("KEYBOARDHIT",{key:'left'}))
          this.akey.on('down',()=> this.emitter.emit("KEYBOARDHIT",{key:'left'}))


      this.dkey = this.input.keyboard.addKey("d")   
      let right = this.input.keyboard.addKey('RIGHT')
      right.on('down',()=> this.emitter.emit("KEYBOARDHIT",{key:'right'}))
      this.dkey.on('down',()=> this.emitter.emit("KEYBOARDHIT",{key:'right'}))

    let wkey = this.input.keyboard.addKey("w")   
    let up = this.input.keyboard.addKey('UP')
    up.on('down',()=> this.emitter.emit("KEYBOARDHIT",{key:'up'}))
    wkey.on('down',()=> this.emitter.emit("KEYBOARDHIT",{key:'up'}))
    
    let skey= this.input.keyboard.addKey("s")   
    let down = this.input.keyboard.addKey('DOWN')
    down.on('down',()=> this.emitter.emit("KEYBOARDHIT",{key:'down'}))
    skey.on('down',()=> this.emitter.emit("KEYBOARDHIT",{key:'down'}))

    var keyZ = this.input.keyboard.addKey('Z')  
    // keyZ.on('down',()=> this.keyHit())

    var keyX = this.input.keyboard.addKey('X') 
    // keyX.on('down',()=> this.keyHit())

    
    let space = this.input.keyboard.addKey('SPACE')
    space.on('down',()=> this.emitter.emit("KEYBOARDHIT",{key:'space'}))
    keyX.on('down',()=> this.emitter.emit("KEYBOARDHIT",{key:'X'}))
    keyZ.on('down',()=> this.emitter.emit("KEYBOARDHIT",{key:'Z'}))
    
  }
  keyBoardHit(params){
   // console.log(params.key)
    // this.pad.anims.play('padleft')
    switch(params.key){
      case 'left':
        this.pad.anims.play('padleft')
        this.pad.once('animationcomplete', ()=> {this.freeMove("left")});
        if(this.wheelMode){
          this.wheel.anims.play("spin")
          this.hero.anims.play("walk_wheel")
            this.fadeMusicIn()
        }else{
          this.hero.anims.play("walk")
        }
        break;
      case 'right':
        this.pad.anims.play('padright')
        this.pad.once('animationcomplete', ()=> {this.freeMove("right")});
        if(this.wheelMode){
          this.wheel.anims.play("spin")
          this.hero.anims.play("walk_wheel")
          this.fadeMusicIn()
        }else{
          this.hero.anims.play("walk")
        }
      

        break;
      case 'up':
        this.pad.anims.play('padup')
        this.pad.once('animationcomplete', ()=> {this.freeMove("up")});
     //   this.hero.setVelocityY(-400)

        break;
      case 'down':
        this.pad.anims.play('paddown')
        this.pad.once('animationcomplete', ()=> {this.freeMove("down")});
        break;
      case 'space':
        // this.hero.scaleX =-1 
        this.actionWheel()
       // console.log(this.hero.body.touching)
        break;
      case 'Z':
        this.hero.setScale(-1,1)
        // this.hero.body.setOffset(-1)
        this.hero.body.setOffset(92,10)
        break;
      case 'X':
        this.hero.setScale(1,1)
        this.hero.body.setOffset(8,10)
          break;  
      default :
        this.pad.setFrame(0)
        break;
    }
  }
  freeMove(dir){
    this.pad.setFrame(2)
  }
  youWin(){
    for(let i=0;i<400;i++){
      
      let p= this.physics.add.sprite(Phaser.Math.Between(0,800),Phaser.Math.Between(-600,0),"person").setGravity(0,200).setFrame(Phaser.Math.Between(0,4)).setCollideWorldBounds(false).setDragX(95).setBounce(.99)
      this.physics.add.collider(p, this.ground);
    }
    console.log("you win.")
  }
  goIdle(){
      if(this.cursors.left.isUp && this.cursors.right.isUp && this.akey.isUp && this.dkey.isUp)
    this.hero.anims.play("idle")
    this.fadeMusicOut()
    this.hero.setVelocityX(0)
    this.wheelCount =0
    if(this.wheelMode)this.wheel.anims.stop()
  }
    update(){
     console.log(this.wheelCount)

    if(this.wheelMode && this.cursors.right.isDown ||this.wheelMode && this.cursors.left.isDown){
      this.wheelCount++;
      if(this.wheelCount == 5000) this.youWin()
    }
    if(!this.wheelMode){
    if(this.hero.x <470 && this.hero.x >330 && !this.wheelHit){
      //hit hit 
      this.wheelHit = true
      // this.btn.alpha = 1
      this.tweens.killTweensOf(this.btn)
      this.showButton()
  //    console.log(" WHEEL HIT IS TRUE")
    }
    if(this.hero.x >470 && this.wheelHit || this.hero.x <330 && this.wheelHit ){
      this.wheelHit = false
      
      this.tweens.killTweensOf(this.btn)
     this.hideButton()
     // console.log(" WHEEL HIT IS FALSE")
    }
  }
    if(this.cursors.right.isDown){
      this.hero.flipX = false
      // this.hero.body.setOffset()
      if(!this.wheelMode)this.hero.setVelocityX(180)
      // this.hero.x+=3;
      }
    if(this.cursors.left.isDown){
      this.hero.flipX=true
      
      if(!this.wheelMode)this.hero.setVelocityX(-180)
      // this.hero.x-=3
     }
    if(this.cursors.down.isDown){

    }
    if(this.cursors.up.isDown){

    }
    if(Phaser.Input.Keyboard.JustUp(this.cursors.right)){
  //    console.log(" right up")
  
      this.goIdle()
    }
    if(Phaser.Input.Keyboard.JustUp(this.cursors.left)){
     this.goIdle()
    }
  }
}
