import { hover } from '../helpers/position-n-buttons';

// eslint-disable-next-line no-undef
export default class OptionsScene extends Phaser.Scene {
  constructor() {
    super('options');
  }

  init() {
    this.soundToggle = this.soundToggle === undefined ? true : this.soundToggle;
  }

  preload() {
    this.load.image('bg', '../assets/bg&objects/game-over-bg.png');
    this.load.image('checkedBox', '../assets/bg&objects/checked-box.png');
    this.load.image('unCheckedBox', '../assets/bg&objects/unChecked-box.png');
  }

  create() {
    const { width } = this.cameras.main;
    const { height } = this.cameras.main;
    this.add.image(width / 2, height / 3, 'bg').setScale(0.4);

    console.log(this.sys.game.sound.sounds);
    this.sys.game.sound.sounds[4].play();

    this.text = this.add.text(width / 2, 100, 'OPTIONS',
      { fontSize: 40, fontStyle: 'bold' }).setOrigin(0.5, 0.5);

    this.soundText = this.add.text((width / 2) + 20, 240,
      'Sound Enabled', { fontSize: 24 }).setOrigin(0.5, 0);
    this.soundButton = this.add.image((width / 2) - (this.soundText.width / 2) - 30,
      250, 'checkedBox');

    this.soundButton.setInteractive();

    this.soundButton.on('pointerdown', () => {
      this.soundToggle = !this.soundToggle;
    });

    const backBttn = this.add.text(width / 2,
      550, 'BACK', {
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
    const backBttnHvr = this.add.text(width / 2,
      550, 'BACK', {
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
    hover(backBttn, backBttnHvr);
    backBttn.on('pointerdown', () => {
      this.scene.start('openning');
    });
  }

  update() {
    if (this.soundToggle) {
      this.soundButton.setTexture('checkedBox');
      this.soundText.text = 'Sound Enabled';
      this.sound.setMute(false);
    } else {
      this.soundButton.setTexture('unCheckedBox');
      this.soundText.text = 'Sound Disabled';
      this.sound.setMute(true);
    }
  }
}