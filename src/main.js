/* eslint-disable no-undef */
import './styles/style.scss';

import Phaser from 'phaser';

import Openning from './js/scenes/openning';

import Game from './js/scenes/game';

import GameOver from './js/scenes/game-over';

export default new Phaser.Game({
  type: Phaser.AUTO,
  width: 1030,
  height: 700,
  scene: [
    Openning,
    // Game,
    // GameOver,
  ],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: true,
    },
  },
  parent: bodyId,
  dom: {
    createContainer: true,
  },
});