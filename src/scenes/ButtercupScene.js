import {EventDispatcher} from "../ui/EventDispatcher";
import {Constants} from "../ui/Constants";

export class Buttercup extends Phaser.Scene{
    
    constructor(){

        super('Buttercup');
       
    }
    preload(){


    }
    create(){
      this.emitter= EventDispatcher.getInstance();
      // this.hero = this.add.container(400,200)
      // this.box = this.physics.add.
      this.hero = this.physics.add.sprite(400,200,"hero",0)
      this.hero.body.width = 85
      this.hero.body.height = 50
      this.hero.body.setOffset(0,1)
      this.hero.setGravity(0,100)
      this.hero.body.setEnable()
      // this.hero.body.= 45
      this.hero.setCollideWorldBounds(true);
      this.hero.anims.play("walk")
      
      
      let ground = this.physics.add.staticImage(400,350,'box')
      this.person = this.physics.add.sprite(470,100,"person").setGravity(0,200).setFrame(0).setCollideWorldBounds(true).setBounce(.1)

      let pp1 = this.physics.add.sprite(300,100,"person").setGravity(0,200).setFrame(1).enableBody().setCollideWorldBounds(true).setBounce(.1)
      let pp2 = this.physics.add.sprite(450,100,"person").setGravity(0,200).setFrame(2).enableBody().setCollideWorldBounds(true).setBounce(.1)
      let pp3 = this.physics.add.sprite(520,100,"person").setGravity(0,200).setFrame(3).enableBody().setCollideWorldBounds(true).setBounce(.1)
    // this.person.setPushable  
    
    // .setPushable(false)
      
      // this.pp1.body.setEnable()
      // this.peopleGroup = this.physics.add.group([this.person,pp1,pp2,pp3])
      // this.peopleGroup.add(this.person)
      // this.peopleGroup.add(pp1)
      // this.peopleGroup.add([this.person,pp1,pp2,pp3])
      
      // this.person.body.setPushable()
     
      this.person.body.setEnable()
      // person.setMass(.2)
      // this.hero.setMass(2)
      console.log(" BUTTERCUP#2 ")
      this.pad = this.add.sprite(100,100,"pad")
      this.createKeyInputs()
      this.physics.add.collider([this.hero,this.person, pp1,pp2,pp3], ground);
      this.physics.add.collider(this.hero,[this.person, pp1,pp2,pp3]);
      // this.physics.add.collider([pp2,pp1],ground)
      // this.physics.add.collider()

      
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
    keyX.on('down',()=> this.emitter.emit("KEYBOARDHIT",{key:'space'}))
    
  }
  keyBoardHit(params){
    console.log(params.key)
    // this.pad.anims.play('padleft')
    switch(params.key){
      case 'left':
        this.pad.anims.play('padleft')
        this.pad.once('animationcomplete', ()=> {this.freeMove("left")});
        this.hero.anims.play("walk")
        break;
      case 'right':
        this.pad.anims.play('padright')
        this.pad.once('animationcomplete', ()=> {this.freeMove("right")});
        this.hero.anims.play("walk")
        break;
      case 'up':
        this.pad.anims.play('padup')
        this.pad.once('animationcomplete', ()=> {this.freeMove("up")});
        this.hero.setVelocityY(-100)
        break;
      case 'down':
        this.pad.anims.play('paddown')
        this.pad.once('animationcomplete', ()=> {this.freeMove("down")});
        break;
      case 'space':
        
        break;
      default :
        this.pad.setFrame(0)
        break;
    }
  }
  freeMove(dir){
    this.pad.setFrame(2)
  }
  goIdle(){
      if(this.cursors.left.isUp && this.cursors.right.isUp && this.akey.isUp && this.dkey.isUp)
    this.hero.anims.play("idle")
  }
    update(){
      
    if(this.cursors.right.isDown){
      this.hero.flipX = false
      this.hero.setVelocityX(180)
      // this.hero.x+=3;
      }
    if(this.cursors.left.isDown){
      this.hero.flipX=true
      this.hero.setVelocityX(-180)
      // this.hero.x-=3
     }
    if(this.cursors.down.isDown){

    }
    if(this.cursors.up.isDown){

    }
    if(Phaser.Input.Keyboard.JustUp(this.cursors.right)){
      console.log(" right up")
  
      this.goIdle()
    }
    if(Phaser.Input.Keyboard.JustUp(this.cursors.left)){
     this.goIdle()
    }
  }
}
