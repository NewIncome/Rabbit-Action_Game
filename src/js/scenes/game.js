import Phaser from 'phaser';

export default class Game extends Phaser.Scene {
  constructor() {
    super('game');
  }

  preload() {
    this.load.image('game-bg', '../assets/bg&objects/Background.png');
  }

  create() {
    this.add.image(400, 300, 'game-bg').setScale(0.45);
  }
}