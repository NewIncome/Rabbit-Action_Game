import Phaser from 'phaser';

import preLoadBar from '../../helpers/loading-bar';

export default class Game extends Phaser.Scene {
  constructor() {
    super('game');
  }

  preload() {
    const asset = this.load.image('game-bg', '../assets/bg&objects/Background.png');
    console.log('Asset:');
    console.log(asset);
    console.log(asset.tag);
    preLoadBar(this, asset, 'game-bg');
  }

  create() {
    this.add.image(400, 300, 'game-bg').setScale(0.45);
  }
}