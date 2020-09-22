import Phaser from 'phaser';

import preLoadBar from '../../helpers/loading-bar';

import GndCreate from '../../helpers/groundLoader';

export default class Game extends Phaser.Scene {
  constructor() {
    super('game');
  }

  preload() {
    const asset = this.load.image('game-bg', '../assets/bg&objects/Background.png');
    // preLoadBar(this, asset, 'game-bg');
    this.load.image('land-s', '../assets/bg&objects/land-sm.png');
    this.load.image('land-lg', '../assets/bg&objects/land-lg.png');
    this.load.image('land-flat', '../assets/bg&objects/land-ss.png');

    this.load.image('tile-flat-l', '../assets/bg&objects/Tile_10.png');
    this.load.image('tile-flat-m', '../assets/bg&objects/Tile_11.png');
    this.load.image('tile-flat-r', '../assets/bg&objects/Tile_12.png');

    this.load.image('tile-md-t', '../assets/bg&objects/Tile_13.png');
    this.load.image('tile-md-m', '../assets/bg&objects/Tile_14.png');
    this.load.image('tile-md-b', '../assets/bg&objects/Tile_15.png');

    this.load.image('tile-lg-tl', '../assets/bg&objects/Tile_1.png');
    this.load.image('tile-lg-tm', '../assets/bg&objects/Tile_2.png');
    this.load.image('tile-lg-tr', '../assets/bg&objects/Tile_3.png');
    this.load.image('tile-lg-ml', '../assets/bg&objects/Tile_4.png');
    this.load.image('tile-lg-mm', '../assets/bg&objects/Tile_5.png');
    this.load.image('tile-lg-mr', '../assets/bg&objects/Tile_6.png');
    this.load.image('tile-lg-bl', '../assets/bg&objects/Tile_7.png');
    this.load.image('tile-lg-bm', '../assets/bg&objects/Tile_8.png');
    this.load.image('tile-lg-br', '../assets/bg&objects/Tile_9.png');

    this.load.spritesheet('rabbit',
      '../assets/player&enemies/rabbit-sprite.png',
      { frameWidth: 54, frameHeight: 90 });
  }

  create() {
    this.add.image(400, 300, 'game-bg').setScale(0.4);

    this.add.image(100, 200, 'land-s');
    this.add.image(100, 400, 'land-lg');
    this.add.image(100, 600, 'land-flat');

    GndCreate.makeFlatLand1(400, 500, this);
    GndCreate.makeFlatLand2(400, 550, this);
    GndCreate.makeFlatLand3(400, 600, this);

    GndCreate.makeMdLand1(200, 100, this);
    GndCreate.makeMdLand2(250, 100, this);
    GndCreate.makeMdLand3(300, 100, this);

    GndCreate.makeLgLand1(400, 50, this);
    GndCreate.makeLgLand2(450, 100, this);
    GndCreate.makeLgLand3(600, 150, this);

    const player = this.add.sprite(100, 600, 'rabbit');
  }
}