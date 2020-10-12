import Phaser from 'phaser';

import ImgLoader from '../helpers/loader';

import GndCreate from '../helpers/groundMaker';

import Player from '../characters/rabbit';

import Enemy1 from '../characters/enemy1';

import Enemy2 from '../characters/enemy2';

import Boss from '../characters/boss';

import Movement from '../helpers/animations';

import GameLogic from '../control/gameLogic';


export default class Game extends Phaser.Scene {
  constructor() {
    super('game');
  }

  // eslint-disable-next-line class-methods-use-this
  init() {
    GameLogic.phase = 0;
    GameLogic.endStat = '';
    this.end = true;
  }

  preload() {
    this.load.image('game-bg', '../assets/bg&objects/Background.png');

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

    // Creating background objects
    this.add.image(750, 130, 'lessLgt-tree').setScale(0.5);
    this.earthGrounds.create(50, 32, 'lgRock')
      .setSize(120, 75);

    // ---------- Creating the Land ----------
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

    // ---------- Create Enemies & Player ----------
    this.gEnemies = this.createEnemy(Enemy1, 'enemy1', 1);

    this.pEnemies = this.createEnemy(Enemy2, 'enemy2', 2);
    this.pEnemies.children.iterate((child) => {
      child.active = false;
      child.visible = false;
      child.body.checkCollision.up = false;
      child.body.checkCollision.left = false;
      child.body.checkCollision.right = false;
    });

    this.player = new Player(
      this,
      this.game.config.width * 0.07,
      this.game.config.height * 0.45,
      'rabbit-nrm-n-hit',
    );

    this.isPlayerOut = () => this.player.y > 900 || this.player.x < -250 || this.player.x > 1200;


    this.boss = new Boss(
      this,
      this.game.config.width * 0.3,
      this.game.config.height * 0.45,
      'boss-walk-left',
    );
    this.boss.active = false;
    this.boss.visible = false;
    this.boss.body.checkCollision.up = false;
    this.boss.body.checkCollision.left = false;
    this.boss.body.checkCollision.right = false;
    this.boss.disableInteractive();

    this.physics.world.setBounds(0, -700, 1030, 1600);

    // ---------- Collisions ----------
    this.physics.add.collider(this.player, this.earthGrounds);

    this.physics.add.collider(this.gEnemies, this.earthGrounds);

    this.physics.add.collider(this.pEnemies, this.earthGrounds);

    this.physics.add.collider(this.boss, this.earthGrounds);

    this.physics.add.overlap(this.player, this.gEnemies, (player, enemy) => {
      if (this.spaceKey.isDown) {
        enemy.body.velocity.y = -50;
        enemy.onKill();
      }
    }, null, this);

    this.physics.add.overlap(this.player, this.pEnemies, (player, enemy) => {
      if (this.spaceKey.isDown && enemy.body.checkCollision.up === true) {
        enemy.onHit();
      }
    }, null, this);

    this.physics.add.overlap(this.player, this.boss, (player, boss) => {
      if (this.spaceKey.isDown && boss.body.checkCollision.up === true) {
        if (boss.onHit(this) > 1) boss.body.velocity.y = -80;
        else {
          GameLogic.endStat = 'win';
          this.scene.start('gameOver');
        }
      }
    }, null, this);


    this.cameras.main.startFollow(this.player);
    this.cameras.main.setDeadzone(this.scale.width);
    this.cameras.main.centerOnX(this.scale.width / 2);

    // ---------- Movement ----------
    this.cursors = this.input.keyboard.createCursorKeys();

    Movement.player(this);

    Movement.enemy1(this);

    Movement.enemy2(this);

    Movement.boss(this);

    this.phaseNum = this.add.text(this.game.config.width / 2, -150, 'Stage: 0');

    this.enemyCount = () => this.gEnemies.countActive() + this.pEnemies.countActive();

    console.log('Scene: ');
    console.log(this.scene);
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

    if (this.isPlayerOut()) {
      GameLogic.endStat = 'lost';
      console.log(this.scene.systems.config);
      console.log(this.scene.systems.game.scene.isProcessing);
      // this.scene.pause('game');
      this.scene.sleep('game');
      // this.scene.stop('game');
      // this.scene.scene.events.removeAllListeners();
      console.log(this.scene.systems.config);
      this.scene.start('gameOver');
      console.log('Active Scene: ');
      console.log(this.scene.isActive('openning'));
      console.log(this.scene.get('game'));
      console.log(this.scene.isActive('gameOver'));
      console.log(this.scene.systems.config);
      console.log(this.scene.systems.game.scene.isProcessing);
      console.log(this.scene.isActive('game'));
      console.log(this.scene.isVisible('game'));
      console.log('-----end-----');

      this.end = false;
    }

    if (this.end) {
      this.boss.update();

      // this.enemyCount();

      // ---------- Game Logic ----------
      GameLogic.phase = GameLogic.gameCycle(GameLogic.phase,
        this.gEnemies,
        this.pEnemies,
        this.boss,
        this.enemyCount,
        this.phaseNum,
        this.end);
    }
  }
}