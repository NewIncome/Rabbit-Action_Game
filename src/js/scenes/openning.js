import Phaser from 'phaser';

export default class Openning extends Phaser.Scene {
  constructor() {
    super('openning');
  }

  preload() {
    // To Makes the Progress Bar
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);
    // To Make Loading... text
    const { width } = this.cameras.main;
    const { height } = this.cameras.main;
    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
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

    this.load.spritesheet('rabbit',
      '../assets/player&enemies/rabbit-sprite.png',
      { frameWidth: 54, frameHeight: 90 });
    for (let i = 0; i < 500; i += 1) {
      this.load.spritesheet(`rabbit ${Math.round(i / 5)}`,
        '../assets/player&enemies/rabbit-sprite.png',
        { frameWidth: 54, frameHeight: 90 });
    }

    // Event listeners from Phaser's LoaderPlugin
    this.load.on('progress', (value) => { // gives a value between 0-1

      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
      percentText.setText(`${Math.round(value * 100)}%`);
    });

    this.load.on('fileprogress', (file) => {
      this.assetText.setText(`Loading asset: ${file.key}`);
    });
    // 'complete' will only be emitted once all files are done loading
    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      this.assetText.destroy();
    });
  }

  create() {
    this.add.sprite(400, 300, 'rabbit');
    // this.add.image(400, 300, 'rock-b');
  }

  update() {
    this.input.on('pointerdown', () => {
      if (!this.assetText.active) {
        this.scene.start('game');
      }
    });
  }
}