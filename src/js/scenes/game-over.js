import Phaser from 'phaser';

import GameLogic from '../control/gameLogic';

import center from '../helpers/position';

export default class GameOver extends Phaser.Scene {
  constructor() {
    super('gameOver');
  }

  create() {
    const title = this.add.text(this.game.config.width / 2,
      this.game.config.height / 3,
      'GAME OVER',
      { fontSize: '26px' });
    center(title);

    // this.add.text(100, 100, `${title.width}`);
    const retryBtn = this.add.text(this.game.config.width / 4,
      this.game.config.height / 1.5,
      'RETRY', {
        fontSize: '24px',
        color: '#fff',
      });
    center(retryBtn);
    const retryBtnHvr = this.add.text(this.game.config.width / 4,
      this.game.config.height / 1.5,
      'RETRY', {
        fontSize: '24px',
        fontStyle: 'bold',
        color: '#ffc',
      }).setVisible(false);
    center(retryBtnHvr);

    const rankBtn = this.add.text((this.game.config.width / 4) * 3,
      this.game.config.height / 1.5,
      'RANK', {
        fontSize: '24px',
        color: '#fff',
      });
    center(rankBtn);
    const rankBtnHvr = this.add.text((this.game.config.width / 4) * 3,
      this.game.config.height / 1.5,
      'RANK', {
        fontSize: '24px',
        fontStyle: 'bold',
        color: '#ffc',
      }).setVisible(false);
    center(rankBtnHvr);

    // ----- Name Imput -----
    const inputElm = this.add.dom(400, this.game.config.height / 3).createFromHTML('div');
    inputElm.style = 'border: 5px solid blue; width: 300px; height: 100px';
//     inputElm.innerHTML = `
// <input type="text" id="inputName" placeholder="Type your name to submit" style="width: 300px;  height: 30px; margin-bottom: 30px; padding: 3px; text-align: center; border: 1px darkcyan solid; font: 20px Calibri; font-weight: 900; background-color: transparent; color: darkcyan"><br>
//     `;
//     const inputStyle = 'text-align: center';
    // this.add.dom(400, this.game.config.height / 3, inputElm);

    if (GameLogic.endStat === 'win') ;

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