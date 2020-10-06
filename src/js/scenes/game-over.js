import Phaser from 'phaser';

import GameLogic from '../control/gameLogic';

import { center, hover } from '../helpers/position-n-buttons';

export default class GameOver extends Phaser.Scene {
  constructor() {
    super('gameOver');
  }

  create() {
    // ----- The Texts -----
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

    // --- Submit Button ---
    const submitBtn = this.add.text(this.game.config.width / 2,
      this.game.config.height / 3 + 50,
      'SUBMIT', {
        fontSize: '24px',
        color: '#000',
        backgroundColor: 'grey',
        padding: 5,
      });
    center(submitBtn);
    const submitBtnHvr = this.add.text(this.game.config.width / 2,
      this.game.config.height / 3 + 50,
      'SUBMIT', {
        fontSize: '24px',
        fontStyle: 'bold',
        color: '#000',
        backgroundColor: 'grey',
        padding: 5,
      }).setVisible(false);
    center(submitBtnHvr);

    // ----- Name Imput -----
    const inputElm = document.createElement('div');
    // inputElm.style = 'border: 5px solid green; width: 300px; height: 100px;';
    inputElm.innerHTML = `
      <input type="text" id="inputName" placeholder="What's your name Winner?" style="width: 336px;  height: 30px; margin-bottom: 30px; padding: 15px; text-align: center; border: 2px green solid; border-radius: 5px; font: 20px Calibri; font-weight: 900; background-color: transparent; color: green"><br>
    `;
    const domObj = this.add.dom(this.game.config.width / 2,
      this.game.config.height / 3, inputElm);

    if (GameLogic.endStat === 'win') {
      title.setVisible(false);
      domObj.setVisible(true);
      submitBtn.setVisible(true);
    } else {
      title.setVisible(true);
      domObj.setVisible(false);
      submitBtn.setVisible(false);
    }

    // ----- Submit bttn actions -----
    hover(submitBtn, submitBtnHvr);

    // ----- Rank bttn actions -----
    hover(rankBtn, rankBtnHvr);

    // ----- Retry bttn actions -----
    hover(retryBtn, retryBtnHvr);

    retryBtn.on('pointerup', () => {
      this.scene.start('game');
    });
  }
}