import Phaser from 'phaser';

export default class Openning extends Phaser.Scene {
  constructor() {
    super('openning');
  }

  preload() {
    console.log('in op preload()');
    this.load.spritesheet('rabbit',
      '../assets/player&enemies/rabbit-sprite.png',
      { frameWidth: 54, frameHeight: 90 });
    // this.load.image('rock-b', '../assets/bg&objects/Object_2.png');
    for (let i = 0; i < 500; i += 1) {
      this.load.spritesheet(`rabbit + ${i}`,
        '../assets/player&enemies/rabbit-sprite.png',
        { frameWidth: 54, frameHeight: 90 });
      // this.load.image(`rock-b + ${i}`, '../assets/bg&objects/Object_2.png');
    }
  }

  create() {
    console.log('in op create()');
    this.add.sprite(400, 300, 'rabbit');
    // this.add.image(400, 300, 'rock-b');
  }
}