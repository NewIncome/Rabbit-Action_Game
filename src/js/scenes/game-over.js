import Phaser from 'phaser';

import GameLogic from '../control/gameLogic';

import { center, hover } from '../helpers/position-n-buttons';

import { pushScore } from '../api/api';

export default class GameOver extends Phaser.Scene {
  constructor() {
    super('gameOver');
  }

  preload() {
    this.load.image('bg', '../assets/bg&objects/game-over-bg.png');
  }

  create() {
    const { width } = this.game.config;
    const { height } = this.game.config;

    this.add.image(width / 2, height / 3, 'bg').setScale(0.4);
    // ----- The Texts -----
    const title = this.add.text(width / 2,
      height / 3,
      'GAME OVER',
      { fontSize: '26px' });
    center(title);

    // this.add.text(100, 100, `${title.width}`);
    const retryBtn = this.add.text(width / 4,
      height / 1.5,
      'RETRY', {
        fontSize: '24px',
        color: '#fff',
      });
    center(retryBtn);
    const retryBtnHvr = this.add.text(width / 4,
      height / 1.5,
      'RETRY', {
        fontSize: '24px',
        fontStyle: 'bold',
        color: '#ffc',
      }).setVisible(false);
    center(retryBtnHvr);

    const rankBtn = this.add.text((width / 4) * 3,
      height / 1.5,
      'RANK', {
        fontSize: '24px',
        color: '#fff',
      });
    center(rankBtn);
    const rankBtnHvr = this.add.text((width / 4) * 3,
      height / 1.5,
      'RANK', {
        fontSize: '24px',
        fontStyle: 'bold',
        color: '#ffc',
      }).setVisible(false);
    center(rankBtnHvr);

    // --- Submit Button ---
    const submitBtn = this.add.text(width / 2,
      height / 3 + 50,
      'SUBMIT', {
        fontSize: '24px',
        color: '#aea',
        backgroundColor: 'grey',
        padding: 6,
      });
    center(submitBtn);
    const submitBtnHvr = this.add.text(width / 2,
      height / 3 + 50,
      'SUBMIT', {
        fontSize: '24px',
        fontStyle: 'bold',
        color: '#aea',
        backgroundColor: 'grey',
        padding: {
          top: 7, bottom: 7, left: 7, right: 7,
        },
      }).setVisible(false);
    center(submitBtnHvr);

    // ----- Name Imput -----
    const inputElm = document.createElement('div');
    inputElm.innerHTML = `
      <input type="text" id="name" placeholder="What's your name Winner?" style="width: 336px;  height: 30px; margin-bottom: 30px; padding: 15px; text-align: center; border: 2px #aea solid; border-radius: 5px; font: 20px Calibri; font-weight: 900; background-color: transparent; color: #8e8"><br>
    `;
    const domObj = this.add.dom(width / 2,
      height / 3, inputElm);

    if (GameLogic.endStat === 'win') {
      title.setVisible(false);
      domObj.setVisible(true);
      submitBtn.setVisible(true);
    } else {
      title.setVisible(true);
      domObj.setVisible(false);
      submitBtn.setVisible(false);
    }

    const errorMssg = this.add.dom(width / 2, (height / 2) - 100, 'div', 'padding: 3px 7px; border: 1px solid red; border-radius: 20px; font: 15px Calibri; color: red', 'Input name cannot be empty');
    errorMssg.setVisible(false);

    // ----- Submit bttn actions -----
    hover(submitBtn, submitBtnHvr);

    submitBtn.on('pointerup', () => {
      const nameVal = document.getElementById('name').value;

      if (nameVal !== '') {
        pushScore(nameVal, GameLogic.koTime());
        this.scene.start('scores');
      } else if (nameVal === '') {
        errorMssg.setVisible(true);
      }
    });

    // ----- Rank bttn actions -----
    hover(rankBtn, rankBtnHvr);

    rankBtn.on('pointerup', () => {
      this.scene.start('scores');
    });

    // ----- Retry bttn actions -----
    hover(retryBtn, retryBtnHvr);

    retryBtn.on('pointerup', () => {
      this.scene.start('game');
    });
  }
}