/* eslint-disable no-new */
import './styles/style.scss';

import Phaser from 'phaser';

import Openning from './js/scenes/openning';

import Game from './js/scenes/game';

export default new Phaser.Game({
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: [Openning, Game],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 },
      debug: false,
    },
  },
});