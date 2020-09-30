import Phaser, { Cameras, GameObjects } from 'phaser';

import preLoadBar from '../helpers/loading-bar';

import ImgLoader from '../helpers/loader';

import GndCreate from '../helpers/groundMaker';

import Player from '../characters/rabbit';

import Enemy1 from '../characters/enemy1';

import Enemy2 from '../characters/enemy2';

import Boss from '../characters/boss';

import Movement from '../helpers/animations';


const GamePhaseCycle = (cycle, enemycount) => {
  if (enemycount === 0 && cycle === 0) {
    return 1;
  }
  if (enemycount === 0 && cycle === 1) {
    return 2;
  }
  if (enemycount === 0 && cycle === 2) {
    // createBoss();
    return 3;
  }
  if (enemycount === 0 && cycle === 2) return 'Win';

  return 'Game Over';
};

export default class Game extends Phaser.Scene {
  constructor() {
    super('game');
  }

  init() {
    this.gamePhase = 0;
  }

  preload() {
    const asset = this.load.image('game-bg', '../assets/bg&objects/Background.png');
    // preLoadBar(this, asset, 'game-bg');

    // ---------- Loading the Land ----------
    ImgLoader.tiles(this, 'tile-flat-', ['l', 'm', 'r'],
      '../assets/bg&objects/Tile_', 10, 3, '.png');

    ImgLoader.tiles(this, 'tile-md-', ['t', 'm', 'b'],
      '../assets/bg&objects/Tile_', 13, 3, '.png');

    ImgLoader.tiles(this, 'tile-lg-',
      ['tl', 'tm', 'tr', 'ml', 'mm', 'mr', 'bl', 'bm', 'br'],
      '../assets/bg&objects/Tile_', 1, 9, '.png');

    // ---------- Loading Objects ----------
    this.load.image('light-tree', '../assets/bg&objects/Objects/Object_16.png');
    this.load.image('lessLgt-tree', '../assets/bg&objects/Objects/Object_18.png');
    this.load.image('flower', '../assets/bg&objects/Objects/Object_1.png');
    this.load.image('lgRock', '../assets/bg&objects/Objects/Object_2.png');
    this.load.image('smRock', '../assets/bg&objects/Objects/Object_3.png');

    // ---------- Loading Animated Objects ----------
    ImgLoader.player(this);

    ImgLoader.enemy1(this);

    ImgLoader.enemy2(this);

    ImgLoader.boss(this);

    // helper function to create Enemy Groups
    this.createEnemy = (className, type, qnt) => this.physics.add.group({
      classType: className,
      key: type,
      repeat: qnt - 1,
      setXY: {
        x: 150,
        y: 400,
        stepX: 200,
        stepY: -100,
      },
      setSize: { x: 50, y: 50 },
      runChildUpdate: true,
    });
  }

  create() {
    this.add.image(400, 300, 'game-bg').setScale(0.4)
      .setScrollFactor(0, 0);

    this.earthGrounds = this.physics.add.staticGroup();

    this.spaceKey = this.input.keyboard.addKey('SPACE');

    this.sideFlag = 'right';

    console.log(Phaser.Renderer.WebGL.WebGLRenderer.getMaxTextures);
    console.log(Phaser.getMaxTextures);

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

    GndCreate.makeFlatLand(570, 360, this, this.earthGrounds, 1);

    this.add.image(900, 380, 'smRock').setScale(0.8);

    GndCreate.makeFlatLand(670, 120, this, this.earthGrounds, 2);
    GndCreate.makeFlatLand(730, 490, this, this.earthGrounds, 4);
    GndCreate.makeFlatLand(820, 400, this, this.earthGrounds, 4);

    GndCreate.makeMdLand(320, 120, this, this.earthGrounds, 2);

    this.add.image(700, 505, 'flower').setScale(0.5);

    this.earthGrounds.children.iterate((earthChild) => {
      earthChild.body.checkCollision.down = false;
      earthChild.body.checkCollision.left = false;
      earthChild.body.checkCollision.right = false;
    });

    // this.add.image(200, 400, 'enemy2').setFrame(0);
    // ---------- Create Enemies & Player ----------
    // gEnemy.createAll(this, 2);
    this.gEnemies = this.createEnemy(Enemy1, 'enemy1', 5);

    this.pEnemies = this.createEnemy(Enemy2, 'enemy2', 3);


    // this.player = this.physics.add.sprite(70, 300, 'rabbit-nrm-n-hit');
    this.player = new Player(
      this,
      this.game.config.width * 0.07,
      this.game.config.height * 0.45,
      'rabbit-nrm-n-hit',
    );
    this.playerSpeed = this.add.text(this.player.x + 50, this.player.y, 'Speed:');

    // this.player.setGravityY = 500;

    this.boss = new Boss(
      this,
      this.game.config.width * 0.3,
      this.game.config.height * 0.45,
      'boss-walk-left',
    );

    // this.player.setCollideWorldBounds(true);
    this.physics.world.setBounds(0, -700, 1030, 1600);

    // ---------- Collisions ----------
    this.physics.add.collider(this.player, this.earthGrounds);

    this.physics.add.collider(this.gEnemies, this.earthGrounds);

    this.physics.add.collider(this.pEnemies, this.earthGrounds);

    this.physics.add.collider(this.boss, this.earthGrounds);

    this.physics.add.overlap(this.player, this.gEnemies, (player, enemy) => {
      console.log('inside OverLap');
      if (this.spaceKey.isDown) {
        console.log('it HIT!!');
        enemy.anims.play('enemy-hit');
        enemy.body.velocity.y = -50;
        enemy.onKill();
      }
    }, null, this);

    this.physics.add.overlap(this.player, this.pEnemies, (player, enemy) => {
      if (this.spaceKey.isDown) {
        console.log('it HIT!!');
        enemy.anims.play('enemy-hit_2');
        enemy.body.velocity.y = -50;
        enemy.onHit();
      }
    }, null, this);

    this.enemyCount = this.add.text(100, 400, 'EnemyCount:');

    // this.player.anims.getCurrentKey();


    this.cameras.main.startFollow(this.player);
    this.cameras.main.setDeadzone(this.scale.width);
    this.cameras.main.centerOnX(this.scale.width / 2);

    this.add.text(200, 300, `camera X: ${this.cameras.main.centerX}`);
    // ---------- Movement ----------
    this.cursors = this.input.keyboard.createCursorKeys();

    Movement.player(this);

    Movement.enemy1(this);

    Movement.enemy2(this);

    Movement.boss(this);

    // Check to start Enemy Round 2
    // if (this.enemyCount === 0) {

    // }
  }

  update() {
    // ---------- Cursor Movement ----------
    if (this.cursors.left.isDown) {
      this.player.moveLeft();
    } else if (this.cursors.right.isDown) {
      this.player.moveRight();
    } else {
      this.player.body.setVelocityX(0);
    }

    if (this.player.getVelX() === 0 && this.player.getVelY() === 0) {
      if (this.player.getData('side') === 'left') {
        this.player.turnLeft();
      } else this.player.turnRight();
    }

    if (this.spaceKey.isDown) {
      if (this.player.getData('side') === 'left') {
        this.player.punchLeft();
      } else {
        this.player.punchRight();
      }
    }

    if (this.cursors.up.isDown) {
      if (this.player.body.touching.down) {
        if (this.player.getData('side') === 'left') this.player.jumpLeft();
        else this.player.jumpRight();
      }

      if (this.cursors.left.isDown) this.player.anims.play('jump-s-l');
      else if (this.cursors.right.isDown) this.player.anims.play('jump-s-r');
      else if (!this.cursors.right.isDown && !this.cursors.right.isDown) {
        this.player.anims.play('jump-s-r');
      }
    }

    this.boss.update();

    this.gamePhase = GamePhaseCycle(this.gamePhase, this.enemyCount);

    this.playerSpeed.x = this.player.x;
    this.playerSpeed.y = this.player.y - 50;
    this.playerSpeed.text = `Velocity X, Y: ${this.player.body.velocity.x}, ${this.player.body.velocity.y}`;
    this.enemyCount.text = `EnemyCount: ${this.gEnemies.countActive() + this.pEnemies.countActive()}`;

    if (this.player.y > 900) this.scene.start('game');
  }
}