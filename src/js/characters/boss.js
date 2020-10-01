/* eslint-disable no-undef */
import Entity from './entity';

export default class Boss extends Entity {
  constructor(scene, x, y, key) {
    super(scene, x, y, key, 'Boss');

    this.setData('velocity', Phaser.Math.Between(-100, 100));
    this.setData('side', 'right');
    this.setData('enemyRank', 30);
    this.setData('lives', 100);
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
    // this.hitSide();
  }

  // hitSide() {
  //   if (this.body.velocity.y !== 0) {
  //     if (this.getData('side') === 'left') this.setFrame(2);
  //     else this.setFrame(0);
  //   }
  // }

  timeDelay() {
    this.scene.time.addEvent({
      delay: 10000,
      loop: true,
    });
  }

  onHit() {
    this.body.velocity.y = -200;
    // this.hitSide();
    this.body.velocity.x = -200;
    this.timeDelay();
    this.setData('lives', this.getData('lives') - 1);
    if (this.getData('lives') === 0) this.destroy();
  }

  reappear() {
    if (this.y > 700) {
      this.y = Phaser.Math.Between(-100, 0);
      this.x = Phaser.Math.Between(30, 800);
      this.body.velocity.x = Phaser.Math.Between(-100, 100);
      // child.body.updateFromGameObject();
    }
  }

  // keepWalking() {
  //   if (this.body.touching.right) {
  //     this.anims.play('walk-left', true);
  //     this.body.velocity.x = Phaser.Math.Between(-80, -30);
  //   } else if (this.body.touching.left) {
  //     this.anims.play('walk-right', true);
  //     this.body.velocity.x = Phaser.Math.Between(30, 80);
  //   }
  // }

  update() {
    this.scaleX = 1;
    this.scaleY = 1;

    // this.keepWalking();
    this.setAnim();

    this.reappear();
  }
}