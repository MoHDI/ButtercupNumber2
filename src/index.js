// import Phaser from "phaser";
import "./phaser.min.js"
import {Boot} from "./scenes/BootScene";
import {Title} from "./scenes/TitleScene";
import {Buttercup} from "./scenes/ButtercupScene";
import {Constants} from "./ui/Constants";
const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 800,
  height: 400,
  pixelArt: true,
  roundPixels:true,
  backgroundColor:Constants.FCOLOR1,
  physics: {
    default: 'arcade',
    // components:Arcade.Components.Pushable,
    gravity: { y: 300 }, 
    arcade: { debug: false }
},
  scale: {
    // mode: Phaser.Scale.FIT,
   mode: Phaser.Scale.FIT,
    //  mode: Phaser.Scale.CENTER_BOTH,
    // autoCenter: Phaser.Scale.CENTER_BOTH,
    autoCenter: true,
    // width: DEFAULT_WIDTH,
    // height: DEFAULT_HEIGHT
  },
  scene: [Boot,Title,Buttercup]

};

const game = new Phaser.Game(config);

function preload() {
  this.load.image("logo", logoImg);
}

function create() {
  const logo = this.add.image(400, 200, "logo");

  this.tweens.add({
    targets: logo,
    y: 450,
    duration: 2000,
    ease: "Power2",
    yoyo: true,
    loop: -1
  });
}
