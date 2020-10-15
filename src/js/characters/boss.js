/* eslint-disable no-undef */
import Entity from './entity';

export default class Boss extends Entity {
  constructor(scene, x, y, key) {
    super(scene, x, y, key, 'Boss');

    this.setData('velocity', Phaser.Math.Between(-100, 100));
    this.setData('side', 'right');
    this.setData('enemyRank', 30);
    this.setData('lives', 80);
  }

  setAnim() {
    if (this.body.velocity.x === 0) {
      this.body.velocity.x = -this.getData('velocity');
    }
    if (this.body.velocity.x > 0) {
      this.anims.play('walk-right', true);
      this.setData('side', 'right');
    } else {
      this.anims.playReverse('walk-left', true);
      this.setData('side', 'left');
    }
  }

  reappear() {
    if (this.y > 700) {
      this.y = Phaser.Math.Between(-100, 0);
      this.x = Phaser.Math.Between(30, 800);
      this.body.velocity.x = Phaser.Math.Between(-100, 100);
    }
  }

  timeDelay() {
    this.scene.time.addEvent({
      delay: 10000,
      loop: true,
    });
  }

  onHit(actScene) {
    this.body.velocity.y = -200;
    this.body.velocity.x = -200;
    this.timeDelay();
    this.setData('lives', this.getData('lives') - 1);
    actScene.sys.game.sound.sounds[2].play();
    if (this.getData('lives') === 0) {
      this.destroy();
      actScene.scene.start('gameOver');
    }
    return this.getData('lives');
  }

  onDestroy() {
    this.scene.time.addEvent({
      delay: 1000,
      callback() {
        this.scene.start('gameOver');
      },
      callbackScope: this,
      loop: false,
    });
  }

  update() {
    this.scaleX = 1;
    this.scaleY = 1;

    this.setAnim();

    this.reappear();
  }
}