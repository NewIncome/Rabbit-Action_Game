import Phaser from 'phaser';

import preLoadBar from '../../helpers/loading-bar';

import tileLoader from '../../helpers/groundLoader';

import GndCreate from '../../helpers/groundMaker';


export default class Game extends Phaser.Scene {
  constructor() {
    super('game');
  }

  preload() {
    const asset = this.load.image('game-bg', '../assets/bg&objects/Background.png');
    // preLoadBar(this, asset, 'game-bg');

    // ---------- Loading the Land ----------
    this.load.image('land-s', '../assets/bg&objects/land-sm.png');
    this.load.image('land-lg', '../assets/bg&objects/land-lg.png');
    this.load.image('land-flat', '../assets/bg&objects/land-ss.png');

    tileLoader(this, 'tile-flat-', ['l', 'm', 'r'],
      '../assets/bg&objects/Tile_', 10, 3, '.png');

    tileLoader(this, 'tile-md-', ['t', 'm', 'b'],
      '../assets/bg&objects/Tile_', 13, 3, '.png');

    tileLoader(this, 'tile-lg-',
      ['tl', 'tm', 'tr', 'ml', 'mm', 'mr', 'bl', 'bm', 'br'],
      '../assets/bg&objects/Tile_', 1, 9, '.png');

    // ---------- Loading Objects ----------
    this.load.image('light-tree', '../assets/bg&objects/Objects/Object_16.png');
    this.load.image('lessLgt-tree', '../assets/bg&objects/Objects/Object_18.png');
    this.load.image('flower', '../assets/bg&objects/Objects/Object_1.png');
    this.load.image('lgRock', '../assets/bg&objects/Objects/Object_2.png');
    this.load.image('smRock', '../assets/bg&objects/Objects/Object_3.png');

    // ---------- Loading Animated Objects ----------
    this.load.spritesheet('rabbit',
      '../assets/player&enemies/rabbit-sprite.png',
      { frameWidth: 54, frameHeight: 90 });
  }

  create() {
    this.add.image(400, 300, 'game-bg').setScale(0.4);

    // Creating background objects
    this.add.image(750, 150, 'lessLgt-tree').setScale(0.5);
    this.add.image(50, 20, 'lgRock').setScale(0.7);

    // Creating the Land
    GndCreate.makeLgLand2(-100, 100, this);
    this.add.image(150, 300, 'light-tree').setScale(0.9);
    GndCreate.makeLgLand1(350, 30, this);
    GndCreate.makeLgLand2(550, 600, this);
    GndCreate.makeLgLand3(0, 500, this); // 450~
    GndCreate.makeMdLand(900, 170, this, 2); // Md
    GndCreate.makeLgLand2(650, 270, this);

    // this.add.image(100, 200, 'land-s');
    // this.add.image(100, 400, 'land-lg');
    this.add.image(570, 410, 'land-flat');

    this.add.image(900, 417, 'smRock').setScale(0.8);

    GndCreate.makeFlatLand(640, 120, this, 2);
    GndCreate.makeFlatLand(660, 490, this, 5);
    GndCreate.makeFlatLand(820, 400, this, 4);

    GndCreate.makeMdLand(270, 120, this, 2);

    this.add.image(700, 530, 'flower').setScale(0.5);

    const player = this.add.sprite(100, 600, 'rabbit');
  }
}