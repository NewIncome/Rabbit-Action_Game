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
    this.load.spritesheet('rabbit-nrm-n-hit',
      '../assets/player&enemies/rabbit-sprite_r-1(normal&hit).png',
      { frameWidth: 45, frameHeight: 76 });
    this.load.spritesheet('rabbit-right-run',
      '../assets/player&enemies/rabbit-sprite_r-2(run).png',
      { frameWidth: 51, frameHeight: 65 });
    this.load.spritesheet('rabbit-right-jump',
      '../assets/player&enemies/rabbit-sprite_r-3(jump).png',
      { frameWidth: 61, frameHeight: 78 });
    this.load.spritesheet('rabbit-left-run',
      '../assets/player&enemies/rabbit-sprite_l-1 (run).png',
      { frameWidth: 65, frameHeight: 66 });
    this.load.spritesheet('rabbit-left-jump',
      '../assets/player&enemies/rabbit-sprite_l-2 (jump).png',
      { frameWidth: 42, frameHeight: 77 });
  }

  create() {
    this.add.image(400, 300, 'game-bg').setScale(0.4);

    this.earthGrounds = this.physics.add.staticGroup();

    // Creating background objects
    this.add.image(750, 130, 'lessLgt-tree').setScale(0.5);
    this.earthGrounds.create(50, 32, 'lgRock');

    // Creating the Land
    GndCreate.makeLgLand2(-100, 100, this, this.earthGrounds);
    this.add.image(150, 280, 'light-tree').setScale(0.9);
    GndCreate.makeLgLand1(350, 30, this, this.earthGrounds);
    GndCreate.makeLgLand2(550, 600, this, this.earthGrounds);
    GndCreate.makeLgLand3(0, 500, this, this.earthGrounds); // 45.earthGrounds0~
    GndCreate.makeMdLand(900, 170, this, this.earthGrounds, 2); // .earthGroundsMd
    GndCreate.makeLgLand2(650, 270, this, this.earthGrounds);

    this.earthGrounds.create(570, 340, 'land-flat');

    this.add.image(900, 380, 'smRock').setScale(0.8);

    GndCreate.makeFlatLand(640, 120, this, this.earthGrounds, 2);
    GndCreate.makeFlatLand(730, 490, this, this.earthGrounds, 4);
    GndCreate.makeFlatLand(820, 400, this, this.earthGrounds, 4);

    GndCreate.makeMdLand(320, 120, this, this.earthGrounds, 2);

    this.add.image(700, 505, 'flower').setScale(0.5);

    this.player = this.physics.add.sprite(70, 300, 'rabbit-nrm-n-hit');

    // ---------- Collisions ----------
    this.physics.add.collider(this.player, this.earthGrounds);
    this.player.body.checkCollision.up = false;
    this.player.body.checkCollision.left = false;
    this.player.body.checkCollision.right = false;

    // ---------- Movement ----------
    this.cursors = this.input.keyboard.createCursorKeys();

    this.anims.create({
      key: 'left-run',
      frames: this.anims.generateFrameNumbers('rabbit-left-run',
        { start: 5, end: 0 }),
      frameRate: 14,
      repeat: -1,
    });
    this.anims.create({
      key: 'normal', // normal stance
      // frames: [{ key: 'rabbit-nrm-n-hit', frame: 4 }],
      // frameRate: 20,
      frames: this.anims.generateFrameNumbers('rabbit-nrm-n-hit',
        { start: 0, end: 3 }),
      frameRate: 5,
      repeat: 1,
    });
    this.anims.create({
      key: 'right-run',
      frames: this.anims.generateFrameNumbers('rabbit-right-run',
        { start: 0, end: 5 }),
      frameRate: 14,
      repeat: -1,
    });
    this.anims.create({
      key: 'jump-s-l', // simple jump
      frames: [{ key: 'rabbit-left-jump', frame: 2 }],
      frameRate: 10,
    });
    this.anims.create({
      key: 'jump-s-r', // simple jump
      frames: [{ key: 'rabbit-right-jump', frame: 3 }],
      frameRate: 10,
    });
    this.anims.create({
      key: 'jump-right',
      frames: this.anims.generateFrameNumbers('rabbit-right-jump',
        { start: 0, end: 5 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'jump-left',
      frames: this.anims.generateFrameNumbers('rabbit-left-jump',
        { start: 5, end: 0 }),
      frameRate: 10,
      repeat: -1,
    });
  }

  update() {
    // ---------- Cursor Movement ----------
    if (this.cursors.left.isDown) {
      this.player.body.setVelocityX(-160);
      this.player.anims.play('left-run', true);
    } else if (this.cursors.right.isDown) {
      this.player.body.setVelocityX(160);
      this.player.anims.play('right-run', true);
    } else {
      this.player.body.setVelocityX(0);
      this.player.anims.play('normal', true);
    }

    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.body.setVelocityY(-350);
      this.player.anims.play('jump-s-r');
    }
    if (this.cursors.up.isDown && this.cursors.left.isDown) this.player.anims.play('jump-s-l');
    else if (this.cursors.up.isDown && this.cursors.right.isDown) this.player.anims.play('jump-s-r');
    else if (this.cursors.up.isDown && !this.cursors.right.isDown && !this.cursors.right.isDown) {
      this.player.anims.play('jump-s-r');
    }
    //  else if (this.cursors.up.isDown) {
    //   if (this.cursors.left.isDown) {
    //     this.player.anims.play('jump-left', true);
    //   } else if (this.cursors.right.isDown) {
    //     this.player.anims.play('jump-right', true);
    //   }
  }
}