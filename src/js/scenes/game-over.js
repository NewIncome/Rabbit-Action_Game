import Phaser from 'phaser';

export default class GameOver extends Phaser.Scene {
  constructor() {
    super('gameOver');
  }

  create() {
    this.add.text(this.game.config.width / 2,
      this.game.config.height / 2,
      'GAME OVER');

    this.add.text(this.game.config.width / 2 + 300,
      this.game.config.height / 2 + 300,
      'REPLAY');

    this.add.text(this.game.config.width / 2 - 300,
      this.game.config.height / 2 + 300,
      'RANK');
  }
}