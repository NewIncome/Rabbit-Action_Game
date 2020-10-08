import {
  center,
  hover,
  numIs,
  strIs,
} from '../helpers/position-n-buttons';

import { getScores } from '../api/api';

// eslint-disable-next-line no-undef
export default class Scores extends Phaser.Scene {
  constructor() {
    super('scores');
  }

  preload() {
    this.load.image('bg', '../assets/bg&objects/game-over-bg.png');
  }

  create() {
    const { width } = this.game.config;
    const { height } = this.game.config;

    this.add.image(width / 2, height / 3, 'bg').setScale(0.4);

    // ----- Menu Bttn Setup and Action -----
    const menu = this.add.text(width / 2,
      height / 1.2,
      'MENU', {
        fontSize: '24px',
        color: '#fff',
      });
    center(menu);
    const menuHvr = this.add.text(width / 2,
      height / 1.2,
      'MENU', {
        fontSize: '24px',
        fontStyle: 'bold',
        color: '#ffc',
      }).setVisible(false);
    center(menuHvr);

    hover(menu, menuHvr);

    menu.on('pointerup', () => {
      this.scene.start('openning');
    });

    // ----- Get and Display Scores -----
    this.add.text(width / 2, 60, 'SCORE-BOARD', {
      fontSize: '40px',
      fontStyle: 'bold',
      color: '#8dc',
    })
      .setOrigin(0.5, 0.5);

    const DataStyle = 'font: 26px Courier; color: white; width: 380px; height: 40px; font-weight: 700;';
    let j = 140;


    getScores().then((scoreArr) => {
      const qnt = scoreArr.length > 10 ? 10 : scoreArr.length;
      for (let i = 0; i < qnt; i += 1) {
        this.add.dom(i < 5 ? 135 : 545, j, 'div', `${DataStyle}`, `${i + 1}.  ${strIs(scoreArr[i].user)}: ${numIs(scoreArr[i].score)}`).setOrigin(0, 0);
        j += 80;
        if (i === 4) j = 140;
      }
    });
    this.add.text(width / 1.5,
      height / 1.15,
      `
      Note: If score not updated,
            please go to menu and
            come back to reload
                                 (^_^)
      `, { fontSize: '14px', color: '#888', fontStyle: 'italic' });
  }
}