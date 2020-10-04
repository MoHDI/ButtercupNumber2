import {EventDispatcher} from "../ui/EventDispatcher";
import {Constants} from "../ui/Constants";

export class Boot extends Phaser.Scene{
    
    constructor(){

        super('Boot');
       
    }
    preload(){
       this.loadImages()  
       this.loadSprites()
       this.loadMaps()
       this.loadAudio()
      this.scene = this
        this.emitter= EventDispatcher.getInstance();
      this.makeProgressBar()
        this.scale.refresh();

    }
    create(){
  

  }
  padAnimationDone(){
    //console.log("Pad animation is done")
  }
  freeMove(dir){
    //console.log('DIR :'+ dir)
    this.pad.setFrame(2)
  }
  
  makeProgressBar(){
    let progressBox = this.add.graphics();
    let progressBar = this.add.graphics();
    
    progressBox.fillStyle(Constants.FCOLOR4, 0.2);
    progressBox.fillRect(0, 250,800, 3);
    this.load.on('progress', function (value) {
            ////console.log(value);

            progressBar.clear();
            progressBar.fillStyle(Constants.FCOLOR1, 1);
            progressBar.fillRect(0, 250, 1000 * value, 3);
        });

        this.load.on('fileprogress', function (file) {
          //  //console.log(file.src);
        });

        this.load.on('complete', ()=> {
    
          progressBar.destroy()
          progressBox.destroy()
          this.createAnims()
          //console.log('loaded ')
      
          // this.transitionTitle()
          this.game.scene.start("Title")
        });

  }
  loadImages(){
      //IMGS
      this.load.image('title_screen', './src/assets/imgs/title_screen.png');
      // this.load.image('person', './src/assets/imgs/person.png');
      this.load.image('box', './src/assets/imgs/box.png');

  }
  loadSprites(){
     //SPRITESHEETS
    //  this.load.spritesheet("pad",   './src/assets/pad.png', { frameWidth: 11, frameHeight: 11,endFrame:6});
    this.load.spritesheet("pad",   './src/assets/sprites/pad.png', { frameWidth: 11, frameHeight: 11,endFrame:6});
    this.load.spritesheet("hero_wheel",   './src/assets/sprites/hero.png', { frameWidth: 100, frameHeight: 50,endFrame:4});
    this.load.spritesheet("hero_walk",   './src/assets/sprites/hero_walk_ground.png', { frameWidth: 100, frameHeight: 50,endFrame:4});
    this.load.spritesheet("hero_idle",   './src/assets/sprites/hero_idle.png', { frameWidth: 100, frameHeight: 50,endFrame:2});
    this.load.spritesheet("person",   './src/assets/sprites/person.png', { frameWidth: 21, frameHeight: 43,endFrame:4});
  }
  loadAudio(){
          //AUDIO 
        //SOUNDS OF MUSIC
        // this.load.audio('music_001', ['./src/assets/audio/FeltTip.ogg','./src/assets/audio/FeltTip.mp3']);
        // this.load.audio('music_002', ['./src/assets/audio/scary_run.ogg','./src/assets/audio/scary_run.mp3']);

  }
  loadMaps(){
  }


  createAnims(){
    //console.log(" ANIMS MADE")

    this.anims.create({key: 'padmove',
    frames: this.anims.generateFrameNumbers('pad', { start: 0, end: 5 }),
    frameRate: 15,
    repeat: -1
    });
    this.anims.create({key: 'padleft',
    frames: this.anims.generateFrameNumbers('pad', { start: 5, end: 5 }),
    frameRate: 5,
    repeat: 0
    });
    this.anims.create({key: 'padright',
    frames: this.anims.generateFrameNumbers('pad', { start: 6, end: 6 }),
    frameRate: 5,
    repeat: 0
    });
    this.anims.create({key: 'padup',
    frames: this.anims.generateFrameNumbers('pad', { start: 3, end: 3 }),
    frameRate: 5,
    repeat: 0
    });
    this.anims.create({key: 'paddown',
    frames: this.anims.generateFrameNumbers('pad', { start: 4, end: 4 }),
    frameRate: 5,
    repeat: 0
    });
    this.anims.create({key: 'walk',
    frames: this.anims.generateFrameNumbers('hero_walk', { start: 0, end: 3 }),
    frameRate: 15,
    repeat: -1
    });
    this.anims.create({key: 'idle',
    frames: this.anims.generateFrameNumbers('hero_idle', { start: 0, end: 2 }),
    frameRate: 1,
    repeat: 2
    });

  }
    transitionTitle(ob){
      // Constants.createAnims
      ob.visible = false
      this.createAnims()
  
    this.game.scene.start("Title")


  
    }

    update(){

    }
}
