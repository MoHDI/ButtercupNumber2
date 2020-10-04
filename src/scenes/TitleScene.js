import {EventDispatcher} from "../ui/EventDispatcher";
import {Constants} from "../ui/Constants";

export class Title extends Phaser.Scene{
    
    constructor(){

        super('Title');
       
    }
    preload(){
    

    }
    create(){
  
      let titleScreen = this.add.image(400,200,"title_screen");
        
      titleScreen.setInteractive();
        titleScreen.on('pointerdown', ()=>{
      this.transitionTitle(titleScreen);
      }) 
  }
 
    transitionTitle(ob){
      // Constants.createAnims
      ob.visible = false
     
    this.game.scene.start("Buttercup")


  
    }

    update(){

    }
}
