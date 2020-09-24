import Phaser, { Cameras, GameObjects } from 'phaser';

import preLoadBar from '../helpers/loading-bar';

import tileLoader from '../helpers/groundLoader';

import GndCreate from '../helpers/groundMaker';

import rabbitLoad from '../characters/rabbit';

import gEnemy from '../characters/enemy1';


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
    rabbitLoad(this);
    gEnemy.load(this);
  }

  create() {
    this.add.image(400, 300, 'game-bg').setScale(0.4)
      .setScrollFactor(0, 0);

    this.earthGrounds = this.physics.add.staticGroup();

    this.spaceKey = this.input.keyboard.addKey('SPACE');
    this.sideFlag = 'right';

    this.add.image(300, 300, 'rabbit-righ-punch').setFrame(4);

    // Creating background objects
    this.add.image(750, 130, 'lessLgt-tree').setScale(0.5);
    this.earthGrounds.create(50, 32, 'lgRock')
      .setSize(120, 75);

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

    GndCreate.makeFlatLand(670, 120, this, this.earthGrounds, 2);
    GndCreate.makeFlatLand(730, 490, this, this.earthGrounds, 4);
    GndCreate.makeFlatLand(820, 400, this, this.earthGrounds, 4);

    GndCreate.makeMdLand(320, 120, this, this.earthGrounds, 2);

    this.add.image(700, 505, 'flower').setScale(0.5);


    // ---------- Create Enemies & Player ----------
    gEnemy.createAll(this, 2);

    this.player = this.physics.add.sprite(70, 300, 'rabbit-nrm-n-hit');
    this.playerSpeed = this.add.text(this.player.x + 50, this.player.y, 'Speed:');

    this.player.setCollideWorldBounds(true);
    this.physics.world.setBounds(0, -700, 1030, 1600);
    // ---------- Collisions ----------
    this.physics.add.collider(this.player, this.earthGrounds);
    this.player.body.checkCollision.up = false;
    this.player.body.checkCollision.left = false;
    this.player.body.checkCollision.right = false;

    this.physics.add.collider(this.gEnemies, this.earthGrounds);
    // this.physics.add.collider(this.gEnemies, this.earthGrounds, (enemy, gnd) => {
    //   // console.log(enemy);
    //   // console.log(gnd);

    //   if (enemy.body.touching.left) {
    //     console.log(('collided left'));
    //     enemy.anims.play('walkRgt-s', true);
    //     enemy.setVelocityX(60);
    //   } else if (enemy.body.touching.right) {
    //     console.log(('collided right'));
    //     enemy.anims.play('walkLft-s', true);
    //     enemy.setVelocityX(-60);
    //   } else if (enemy.body.touching.up) console.log(('collided up'));
    //   else if (enemy.body.touching.down) console.log(('collided down'));
    // }, null, this);

    // this.physics.add.collider(this.gEnemies, this.earthGrounds, (enemy, gnd) => {
    //   console.log('Enemy:');
    //   console.log(enemy);
    //   console.log('Ground:');
    //   console.log(gnd);
    // }, null, this);
    // gEnemy.hitWall(this.gEnemies);

    this.physics.add.overlap(this.player, this.gEnemies, (player, enemy) => {
      if (this.spaceKey.isDown) {
        console.log('it HIT!!');
        enemy.anims.play('enemy-hit');
        enemy.setVelocityY(-50);
        enemy.disableBody(true, true);
      }
    }, null, this);

    this.enemyCount = this.add.text(100, 400, 'EnemyCount:');


    this.cameras.main.startFollow(this.player);
    this.cameras.main.setDeadzone(this.scale.width);
    this.cameras.main.centerOnX(this.scale.width / 2);

    this.add.text(200, 300, `camera X: ${this.cameras.main.centerX}`);
    // ---------- Movement ----------
    this.cursors = this.input.keyboard.createCursorKeys();

    this.anims.create({
      key: 'left-run',
      frames: this.anims.generateFrameNumbers('rabbit-left-run',
        { start: 5, end: 0 }),
      frameRate: 12,
      repeat: -1,
    });
    this.anims.create({
      key: 'normal-l',
      frames: this.anims.generateFrameNumbers('rabbit-nrm-n-hit-left',
        { start: 0, end: 3 }),
      frameRate: 5,
      repeat: 1,
    });
    this.anims.create({
      key: 'normal-r',
      frames: this.anims.generateFrameNumbers('rabbit-nrm-n-hit',
        { start: 0, end: 3 }),
      frameRate: 5,
      repeat: 1,
    });
    this.anims.create({
      key: 'right-run',
      frames: this.anims.generateFrameNumbers('rabbit-right-run',
        { start: 0, end: 5 }),
      frameRate: 12,
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
      key: 'punch-left',
      frames: [{ key: 'rabbit-left-punch', frame: 0 }],
      frameRate: 1,
      repeat: 0,
    });
    this.anims.create({
      key: 'punch-right',
      frames: this.anims.generateFrameNumbers('rabbit-righ-punch',
        { start: 4, end: 0 }),
      // frames: [{ key: 'rabbit-right-punch', frame: 4 }],
      frameRate: 10,
      repeat: 1,
    });
    this.anims.create({
      key: 'walkLft-s',
      frames: this.anims.generateFrameNumbers('enemy1-lft',
        { start: 0, end: 1 }),
      frameRate: 2,
      repeat: -1,
    });
    this.anims.create({
      key: 'walkRgt-s',
      frames: this.anims.generateFrameNumbers('enemy1',
        { start: 1, end: 2 }),
      frameRate: 2,
      repeat: -1,
    });

    this.anims.create({
      key: 'enemy-hit',
      frames: [{ key: 'enemy1', frame: 2 }],
      frameRate: 10,
    });
  }

  update() {
    // ---------- Cursor Movement ----------
    if (this.cursors.left.isDown) {
      this.player.body.setVelocityX(-160);
      this.player.anims.play('left-run', true);
      this.sideFlag = 'left';
    } else if (this.cursors.right.isDown) {
      this.player.body.setVelocityX(160);
      this.player.anims.play('right-run', true);
      this.sideFlag = 'right';
    } else {
      this.player.body.setVelocityX(0);
      if (this.sideFlag === 'left') {
        this.player.anims.play('normal-l', true);
      } else this.player.anims.play('normal-r', true);
    }

    if (this.spaceKey.isDown) {
      this.player.anims.play('punch-right');
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

    gEnemy.keepWalking(this.gEnemies);

    gEnemy.reappear(this.gEnemies);

    this.playerSpeed.x = this.player.x;
    this.playerSpeed.y = this.player.y - 50;
    this.playerSpeed.text = `Velocity X, Y: ${this.player.body.velocity.x}, ${this.player.body.velocity.y}`;
    this.enemyCount.text = `EnemyCount: ${this.gEnemies.countActive()}`;
  }
}