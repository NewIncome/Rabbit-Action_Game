import Phaser from 'phaser';

import ImgLoader from '../helpers/loader';

import Movement from '../helpers/animations';

import { hover } from '../helpers/position-n-buttons';

export default class Openning extends Phaser.Scene {
  constructor() {
    super('openning');
  }

  init() {
    this.stop = false;
  }

  preload() {
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);

    const { width } = this.cameras.main;
    const { height } = this.cameras.main;

    progressBox.fillRect((width / 2) - 160,
      (height / 4) * 1.5, 320, 50);


    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 100,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff',
      },
    }).setOrigin(0.5, 0.5);

    const percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    }).setOrigin(0.5, 0.5);

    this.assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    }).setOrigin(0.5, 0.5);

    this.load.image('background', '../assets/bg&objects/op-background.jpg');

    this.load.image('Title', '../assets/RAbbitVsTheAliens-title.png');


    ImgLoader.player(this);


    this.load.on('progress', (value) => {
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect((this.game.config.width / 2) - 150,
        (this.game.config.height / 4) * 1.55, 300 * value, 30);
      percentText.setText(`${Math.round(value * 100)}%`);
    });

    this.load.on('fileprogress', (file) => {
      this.assetText.setText(`Loading asset: ${file.key}`);
    });

    this.load.on('complete', () => {
      setTimeout(() => {
        progressBar.destroy();
        progressBox.destroy();
        loadingText.destroy();
        percentText.destroy();
        this.assetText.destroy();
      }, 1500);
    });

    this.load.audio('0.punchSound', '../assets/Sounds/8(punch).ogg');
    this.load.audio('1.enemyDieSound', '../assets/Sounds/Shoot 1(enemy die).wav');
    this.load.audio('2.bossHitSound', '../assets/Sounds/monster-6(boss hit).wav');
    this.load.audio('3.winSound', '../assets/Sounds/Jingle_Win_Synth_00(win).wav');
    this.load.audio('4.sceneSound', '../assets/Sounds/SpaceEngine_Start_00(options & score).wav');
    this.load.audio('5.gameFlowSound', '../assets/Sounds/happy_adveture(game flow).mp3');
    this.load.audio('6.gameOverSound', '../assets/Sounds/Ambience_Sinister_Electric_Cello_Loop_02(gameOver).wav');
  }

  create() {
    const { width } = this.game.config;
    const { height } = this.game.config;

    this.add.image(0, 0, 'background').setOrigin(0, 0).setScale(1.52).setDepth(0);

    this.add.image(width / 2, 100, 'Title').setOrigin(0.5, 0.5);

    const playBtn = this.add.text(width / 2,
      height / 2.8, 'PLAY', {
        fontSize: '30px',
        color: '#000',
        fontStyle: 'bold',
        backgroundColor: '#e38100aa',
        padding: {
          left: 50,
          right: 50,
          top: 20,
          bottom: 20,
        },
      }).setOrigin(0.5, 0.5);
    const playBtnHvr = this.add.text(width / 2,
      height / 2.8, 'PLAY', {
        fontSize: '31px',
        color: '#22d',
        fontStyle: 'bold',
        backgroundColor: '#e38100bb',
        padding: {
          left: 51,
          right: 51,
          top: 21,
          bottom: 21,
        },
      }).setOrigin(0.5, 0.5).setVisible(false);

    const rankBtn = this.add.text(width / 2,
      (height / 4) * 2.2, 'RANK', {
        fontSize: '30px',
        color: '#000',
        fontStyle: 'bold',
        backgroundColor: '#22fa',
        padding: {
          left: 50,
          right: 50,
          top: 20,
          bottom: 20,
        },
      }).setOrigin(0.5, 0.5);
    const rankBtnHvr = this.add.text(width / 2,
      (height / 4) * 2.2, 'RANK', {
        fontSize: '31px',
        color: '#e38100',
        fontStyle: 'bold',
        backgroundColor: '#22fb',
        padding: {
          left: 51,
          right: 51,
          top: 21,
          bottom: 21,
        },
      }).setOrigin(0.5, 0.5).setVisible(false);

    const optionsBttn = this.add.text(width / 2,
      height / 1.35, 'OPTIONS', {
        fontSize: '30px',
        color: '#000',
        fontStyle: 'bold',
        backgroundColor: '#e38100aa',
        padding: {
          left: 23,
          right: 23,
          top: 20,
          bottom: 20,
        },
      }).setOrigin(0.5, 0.5);
    const optionsBttnHvr = this.add.text(width / 2,
      height / 1.35, 'OPTIONS', {
        fontSize: '31px',
        color: '#22d',
        fontStyle: 'bold',
        backgroundColor: '#e38100bb',
        padding: {
          left: 24,
          right: 24,
          top: 21,
          bottom: 21,
        },
      }).setOrigin(0.5, 0.5).setVisible(false);

    hover(playBtn, playBtnHvr);

    hover(rankBtn, rankBtnHvr);

    hover(optionsBttn, optionsBttnHvr);

    this.rabbit = this.add.sprite(270, 554, 'rabbit-nrm-n-hit');


    playBtn.on('pointerdown', () => {
      this.stop = true;
      this.scene.start('game');
    });

    rankBtn.on('pointerdown', () => {
      this.scene.start('scores');
    });

    optionsBttn.on('pointerdown', () => {
      this.scene.start('options');
    });

    if (this.sys.game.sound.sounds.length === 0) {
      this.sound.add('0.punchSound').setVolume(0.1);
      this.sound.add('1.enemyDieSound').setVolume(0.1);
      this.sound.add('2.bossHitSound').setVolume(0.3);
      this.sound.add('3.winSound').setVolume(0.1);
      this.sound.add('4.sceneSound').setVolume(0.1);
      this.sound.add('5.gameFlowSound', { loop: true }).setVolume(0.1);
      this.sound.add('6.gameOverSound').setVolume(0.1);
    }
    this.sys.game.sound.stopAll();

    Movement.player(this);

    if (!this.stop) {
      if (this.rabbit.anims !== undefined) {
        setTimeout(() => {
          if (this.rabbit.anims !== undefined) {
            this.rabbit.anims.play('right-run');
            this.sys.game.sound.sounds[5].play();
          }
        }, 2000);
      }
    }
  }
}