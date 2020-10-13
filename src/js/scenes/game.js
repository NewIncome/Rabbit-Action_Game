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
    this.punchBttnDown = false;
  }

  preload() {
    this.load.image('game-bg', '../assets/bg&objects/Background.png');


    ImgLoader.tiles(this, 'tile-flat-', ['l', 'm', 'r'],
      '../assets/bg&objects/Tile_', 10, 3, '.png');

    ImgLoader.tiles(this, 'tile-md-', ['t', 'm', 'b'],
      '../assets/bg&objects/Tile_', 13, 3, '.png');

    ImgLoader.tiles(this, 'tile-lg-',
      ['tl', 'tm', 'tr', 'ml', 'mm', 'mr', 'bl', 'bm', 'br'],
      '../assets/bg&objects/Tile_', 1, 9, '.png');


    this.load.image('light-tree', '../assets/bg&objects/Objects/Object_16.png');
    this.load.image('lessLgt-tree', '../assets/bg&objects/Objects/Object_18.png');
    this.load.image('flower', '../assets/bg&objects/Objects/Object_1.png');
    this.load.image('lgRock', '../assets/bg&objects/Objects/Object_2.png');
    this.load.image('smRock', '../assets/bg&objects/Objects/Object_3.png');


    ImgLoader.player(this);

    ImgLoader.enemy1(this);

    ImgLoader.enemy2(this);

    ImgLoader.boss(this);


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


    const url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js';
    this.load.plugin('rexvirtualjoystickplugin', url, true);

    this.load.spritesheet('bttn', '../assets/bg&objects/bttn-g(65op).png', { frameWidth: 200, frameHeight: 200 });
  }

  create() {
    this.add.image(400, 300, 'game-bg').setScale(0.4)
      .setScrollFactor(0, 0);

    this.earthGrounds = this.physics.add.staticGroup();

    this.spaceKey = this.input.keyboard.addKey('SPACE');

    this.sideFlag = 'right';


    this.add.image(750, 130, 'lessLgt-tree').setScale(0.5);
    this.earthGrounds.create(50, 32, 'lgRock')
      .setSize(120, 75);


    GndCreate.makeLgLand2(-100, 100, this, this.earthGrounds);
    this.add.image(150, 280, 'light-tree').setScale(0.9);
    GndCreate.makeLgLand1(350, 30, this, this.earthGrounds);
    GndCreate.makeLgLand2(550, 600, this, this.earthGrounds);
    GndCreate.makeLgLand3(0, 500, this, this.earthGrounds);
    GndCreate.makeMdLand(900, 170, this, this.earthGrounds, 2);
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


    this.gEnemies = this.createEnemy(Enemy1, 'enemy1', 12);

    this.pEnemies = this.createEnemy(Enemy2, 'enemy2', 6);
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


    this.physics.add.collider(this.player, this.earthGrounds);

    this.physics.add.collider(this.gEnemies, this.earthGrounds);

    this.physics.add.collider(this.pEnemies, this.earthGrounds);

    this.physics.add.collider(this.boss, this.earthGrounds);

    this.physics.add.overlap(this.player, this.gEnemies, (player, enemy) => {
      if (this.punched()) {
        enemy.body.velocity.y = -50;
        enemy.onKill();
      }
    }, null, this);

    this.physics.add.overlap(this.player, this.pEnemies, (player, enemy) => {
      if (this.punched() && enemy.body.checkCollision.up === true) {
        enemy.onHit();
      }
    }, null, this);

    this.physics.add.overlap(this.player, this.boss, (player, boss) => {
      if (this.punched() && boss.body.checkCollision.up === true) {
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


    this.cursors = this.input.keyboard.createCursorKeys();

    Movement.player(this);

    Movement.enemy1(this);

    Movement.enemy2(this);

    Movement.boss(this);

    this.phaseNum = this.add.text(this.game.config.width / 2, -150, 'Stage: 0');

    this.enemyCount = () => this.gEnemies.countActive() + this.pEnemies.countActive();

    this.joystick = this.plugins.get('rexvirtualjoystickplugin').add(this, {
      x: 150,
      y: 550,
      radius: 100,
      base: this.add.circle(0, 0, 100, 0x888888, 0.4),
      thumb: this.add.circle(0, 0, 50, 0xbbbbbb, 0.4),
      // dir: '8dir',   // 'up&down'|0|'left&right'|1|'4dir'|2|'8dir'|3
      // forceMin: 16,
      // enable: true
    }).setVisible(false);

    this.punchBttn = this.add.sprite(850, 540, 'bttn')
      .setScrollFactor(0, 0).setVisible(false);

    this.punchBttn.setInteractive().on('pointerdown', () => {
      this.punchBttn.setFrame(1);
      this.punchBttnDown = true;
    }).on('pointerup', () => {
      this.punchBttn.setFrame(0);
      this.punchBttnDown = false;
    });

    this.punched = () => this.spaceKey.isDown || this.punchBttnDown;

    // eslint-disable-next-line no-restricted-globals
    if (screen.width < 1200) {
      this.joystick.visible = true;
      this.punchBttn.visible = true;
    }
  }

  update() {
    if (this.cursors.left.isDown || this.joystick.left) {
      this.player.moveLeft();
    } else if (this.cursors.right.isDown || this.joystick.right) {
      this.player.moveRight();
    } else {
      this.player.body.setVelocityX(0);
    }

    if (this.player.getVelX() === 0 && this.player.getVelY() === 0) {
      if (this.player.getData('side') === 'left') {
        this.player.turnLeft();
      } else this.player.turnRight();
    }

    if (this.punched()) {
      if (this.player.getData('side') === 'left') {
        this.player.punchLeft();
      } else {
        this.player.punchRight();
      }
    }

    if (this.cursors.up.isDown || this.joystick.up) {
      if (this.player.body.touching.down) {
        if (this.player.getData('side') === 'left') this.player.jumpLeft();
        else this.player.jumpRight();
      }

      if (this.cursors.left.isDown || this.joystick.left) this.player.anims.play('jump-s-l');
      else if (this.cursors.right.isDown || this.joystick.right) this.player.anims.play('jump-s-r');
      else if ((!this.cursors.right.isDown && !this.cursors.right.isDown)
      || (!this.joystick.right && !this.joystick.right)) {
        this.player.anims.play('jump-s-r');
      }
    }

    if (this.isPlayerOut()) {
      GameLogic.endStat = 'lost';
      this.scene.start('gameOver');

      this.end = false;
    }


    if (this.end) {
      this.boss.update();

      this.enemyCount();

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