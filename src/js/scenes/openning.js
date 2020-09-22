import Phaser from 'phaser';

export default class Openning extends Phaser.Scene {
  constructor() {
    super('openning');
  }

  preload() {
    console.log('in op preload()');
    this.load.spritesheet('rabbit',
      'assets/player&enemies/rabbit-sprite.png',
      { frameWidth: 54, frameHeight: 90 });
    for (let i = 0; i < 500; i += 1) {
      this.load.spritesheet(`rabbit + ${i}`,
        'assets/player&enemies/rabbit-sprite.png',
        { frameWidth: 54, frameHeight: 90 });
    }
  }

  create() {
    console.log('in op create()');
    this.add.sprite(400, 300, 'rabbit');
  }
}