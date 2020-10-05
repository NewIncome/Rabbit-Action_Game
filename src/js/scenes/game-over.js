import Phaser from 'phaser';

export default class GameOver extends Phaser.Scene {
  constructor() {
    super('gameOver');
  }

  create() {
    this.add.text(this.game.config.width / 2,
      this.game.config.height / 3,
      'GAME OVER',
      { fontSize: '26px' });

    const retryBtn = this.add.text(this.game.config.width / 2 - 300,
      this.game.config.height / 1.5,
      'RETRY', {
        fontSize: '24px',
        color: '#fff',
      });
    const retryBtnHvr = this.add.text(this.game.config.width / 2 - 300,
      this.game.config.height / 1.5,
      'RETRY', {
        fontSize: '24px',
        fontStyle: 'bold',
        color: '#ffc',
      }).setVisible(false);

    const rankBtn = this.add.text(this.game.config.width / 2 + 300,
      this.game.config.height / 1.5,
      'RANK', {
        fontSize: '24px',
        color: '#fff',
      });
    const rankBtnHvr = this.add.text(this.game.config.width / 2 + 300,
      this.game.config.height / 1.5,
      'RANK', {
        fontSize: '24px',
        fontStyle: 'bold',
        color: '#ffc',
      }).setVisible(false);

    // ----- Retry bttn actions -----
    rankBtn.setInteractive();

    rankBtn.on('pointerover', () => {
      rankBtnHvr.setVisible(true);
    });

    rankBtn.on('pointerout', () => {
      rankBtnHvr.setVisible(false);
    });

    // ----- Retry bttn actions -----
    retryBtn.setInteractive();

    retryBtn.on('pointerover', () => {
      retryBtnHvr.setVisible(true);
    });

    retryBtn.on('pointerout', () => {
      retryBtnHvr.setVisible(false);
    });

    retryBtn.on('pointerup', () => {
      this.scene.start('game');
    });
  }
}