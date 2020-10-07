import { center, hover } from '../helpers/position-n-buttons';

import { getScores } from '../api/api';

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
      this.scene.start('gameOver');
    });

    // ----- Get and Display Scores -----
    this.add.text(width / 2, 60, 'SCORE-BOARD', {
      fontSize: '40px',
      fontStyle: 'bold',
      color: '#8dc',
    })
      .setOrigin(0.5, 0.5);

    const DataStyle = 'font: 23px Calibri; color: white; width: 250px; height: 40px; font-weight: 700;';
    let j = 170;

    // const scoreArr = getScores();

    function setTimeVal(secs) {
      if (secs > 60)
      return 
    }

    getScores().then((resp) => {
      console.log('el Score');
      console.log(resp);
      console.log(resp.result);
      const scoreArr = resp;
      const qnt = scoreArr.length;
      for (let i = 0; i < qnt; i += 1) {
        this.add.dom(125, j, 'div', `${DataStyle}`, `${i + 1}.  ${scoreArr[i].user}  - ${scoreArr[i].score}`).setOrigin(0, 0);
        if (qnt > 5) {
          this.add.dom(525, j, 'div', `${DataStyle}`, `${i + 6}.  ${scoreArr[i].user}  - ${scoreArr[i].score}`).setOrigin(0, 0);
        }
        j += 40;
      }
    });
  }
}