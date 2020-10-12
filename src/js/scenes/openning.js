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
    // To Makes the Progress Bar
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);

    const { width } = this.cameras.main;
    const { height } = this.cameras.main;

    progressBox.fillRect((width / 2) - 160,
      (height / 4) * 1.5, 320, 50);

    // To Make Loading... text
    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 100,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff',
      },
    }).setOrigin(0.5, 0.5);
    // To Make the Progress Percentage
    const percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    }).setOrigin(0.5, 0.5);
    // To Make the Name of Files Being loaded
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

    // Event listeners from Phaser's LoaderPlugin
    this.load.on('progress', (value) => {
      // gives a value between 0-1
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect((this.game.config.width / 2) - 150,
        (this.game.config.height / 4) * 1.55, 300 * value, 30);
      percentText.setText(`${Math.round(value * 100)}%`);
    });

    this.load.on('fileprogress', (file) => {
      this.assetText.setText(`Loading asset: ${file.key}`);
    });
    // 'complete' will only be emitted once all files are done loading
    this.load.on('complete', () => {
      setTimeout(() => {
        progressBar.destroy();
        progressBox.destroy();
        loadingText.destroy();
        percentText.destroy();
        this.assetText.destroy();
      }, 1500);
    });
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

    hover(playBtn, playBtnHvr);

    hover(rankBtn, rankBtnHvr);

    // Running rabbit
    this.rabbit = this.add.sprite(270, 554, 'rabbit-nrm-n-hit');

    // Check for clicks
    playBtn.on('pointerdown', () => {
      this.stop = true;
      this.scene.start('game');
    });

    rankBtn.on('pointerdown', () => {
      this.scene.start('scores');
    });


    Movement.player(this);

    console.log('Active Scene: ');
    console.log(this.scene.isActive('openning'));
    console.log(this.scene.isActive('game'));
    console.log(this.scene.isActive('gameOver'));
    console.log(this.scene.get('openning'));
    console.log(this.scene.systems.config);
    console.log(typeof this.scene.systems.config);

    if (!this.stop) {
      setTimeout(() => {
        this.rabbit.anims.play('right-run');
      }, 2000);
    }
  }
}