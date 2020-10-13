/* eslint-disable no-undef */
import './styles/style.scss';

import Phaser from 'phaser';

import VirtualJoystickPlugin from 'phaser3-rex-plugins/plugins/virtualjoystick-plugin';

import Openning from './js/scenes/openning';

import Game from './js/scenes/game';

import GameOver from './js/scenes/game-over';

import Scores from './js/scenes/scores';


export default new Phaser.Game({
  type: Phaser.AUTO,
  width: 1030,
  height: 700,
  scene: [
    Openning,
    Game,
    GameOver,
    Scores,
  ],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  parent: bodyId,
  dom: {
    createContainer: true,
  },
  input: {
    activePointers: 2,
  },
  plugins: {
    global: [{
      key: 'rexVirtualJoystick',
      plugin: VirtualJoystickPlugin,
      start: true,
    }],
  },
});