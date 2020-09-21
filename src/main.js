/* eslint-disable no-new */
import './styles/style.scss';

import Phaser from 'phaser';

import simpleScene from './js/scenes/simple-scene';

const gameConfig = {
  width: 680,
  height: 400,
  scene: simpleScene,
};

new Phaser.Game(gameConfig);