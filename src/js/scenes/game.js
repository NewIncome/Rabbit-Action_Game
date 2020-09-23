import Phaser, { GameObjects } from 'phaser';

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

    this.earthGrounds = this.physics.add.staticGroup();

    this.earthGrounds.create(600, 400, 'tile-md-t');

    this.earthGrounds.create(600, 450, 'tile-lg-tl');

    // .setSize(35, 28) // working for 'tile-flat-l'
    // .setDisplayOrigin(680, 690);
    // this.earthGrounds.create(700, 500, 'tile-lg-tr').setScale(0.4)
    // .setSize(68, 58).setDisplayOrigin(276, 375); // working for t-r-corner

    // Creating background objects
    this.add.image(750, 150, 'lessLgt-tree').setScale(0.5);
    this.earthGrounds.create(50, 20, 'lgRock');

    // Creating the Land
    GndCreate.makeLgLand2(-100, 100, this.earthGrounds);
    this.add.image(150, 300, 'light-tree').setScale(0.9);
    // GndCreate.makeLgLand1(350, 30, this.earthGrounds);
    // GndCreate.makeLgLand2(550, 600, this.earthGrounds);
    GndCreate.makeLgLand3(0, 500, this.earthGrounds); // 45.earthGrounds0~
    // GndCreate.makeMdLand(900, 170, this.earthGrounds, 2); // .earthGroundsMd
    // GndCreate.makeLgLand2(650, 270, this.earthGrounds);

    // // this.add.image(100, 200, 'land-s');
    // // this.add.image(100, 400, 'land-lg');
    // this.earthGrounds.create(570, 410, 'land-flat');

    // this.add.image(900, 417, 'smRock').setScale(0.8);

    // GndCreate.makeFlatLand(640, 120, this.earthGrounds, 2);
    // GndCreate.makeFlatLand(730, 490, this.earthGrounds, 4);
    GndCreate.makeFlatLand(820, 400, this.earthGrounds, 4);

    // GndCreate.makeMdLand(270, 120, this.earthGrounds, 2);

    this.add.image(700, 530, 'flower').setScale(0.5);

    this.player = this.physics.add.sprite(70, 300, 'rabbit');

    this.add.text(400, 450, `${this.player.body.width}, ${this.player.body.height}`);

    // ---------- Collisions ----------
    this.physics.add.collider(this.player, this.earthGrounds);
    this.player.body.checkCollision.up = false;
    this.player.body.checkCollision.left = false;
    this.player.body.checkCollision.right = false;

    // ---------- Movement ----------
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    // ---------- Cursor Movement ----------
    if (this.cursors.left.isDown) {
      this.player.body.setVelocityX(-160);
      // this.player.anims.play('left', true);
    } else if (this.cursors.right.isDown) {
      this.player.body.setVelocityX(160);
      // this.player.anims.play('right', true);
    } else if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.body.setVelocityY(-300);
      // this.player.anims.play('up', true);
    } else {  
      this.player.body.setVelocityX(0);
    }
  }
}