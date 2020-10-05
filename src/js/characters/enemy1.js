/* eslint-disable no-undef */
import Entity from './entity';

export default class Enemy1 extends Entity {
  constructor(scene, x, y, key) {
    super(scene, x, y, key, 'Enemy1');

    this.setData('velocity', Phaser.Math.Between(-80, 80));
    this.setData('enemyRank', 10);
    this.setData('lives', 1);
  }

  setAnim() {
    if (this.body.velocity.x === 0) {
      this.body.velocity.x = this.getData('velocity');
    }
    if (this.body.velocity.x > 0) {
      this.anims.play('walkRgt-s', true);
    } else this.anims.play('walkLft-s', true);
    this.hitSide();
  }

  hitSide() {
    if (this.body.velocity.y !== 0) {
      if (this.getData('side') === 'left') this.setFrame(2);
      else this.setFrame(0);
    }
  }

  onKill() {
    this.body.velocity.y = -200;
    this.hitSide();
    this.body.velocity.x = -200;
    setTimeout(() => {
      this.setData('lives', this.getData('lives') - 1);
      if (this.getData('lives') === 0) this.destroy();
    }, 1000);
  }

  reappear() {
    if (this.y > 700) {
      this.y = Phaser.Math.Between(-100, 0);
      this.x = Phaser.Math.Between(30, 800);
      // child.body.updateFromGameObject();
    }
  }

  keepWalking() {
    if (this.body.touching.right) {
      this.anims.play('walkLft-s', true);
      this.body.velocity.x = Phaser.Math.Between(-80, -30);
    } else if (this.body.touching.left) {
      this.anims.play('walkRgt-s', true);
      this.body.velocity.x = Phaser.Math.Between(30, 80);
    }
  }

  update() {
    this.scaleX = 0.25;
    this.scaleY = 0.25;

    this.setAnim();

    this.reappear();

    this.keepWalking();
  }
}