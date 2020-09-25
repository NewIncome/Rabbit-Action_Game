/* eslint-disable no-undef */
import Entity from './entity';

export default class Enemy2 extends Entity {
  constructor(scene, x, y, key) {
    super(scene, x, y, key, 'Enemy2');

    this.setData('velocity', Phaser.Math.Between(-100, 100));
    this.setData('enemyRank', 30);
    this.setData('lives', 1);
  }

  setAnim() {
    if (this.body.velocity.x === 0) {
      this.body.velocity.x = this.getData('velocity');
    }
    if (this.body.velocity.x > 0) {
      this.anims.play('walkRgt-s_2', true);
    } else this.anims.play('walkLft-s_2', true);
  }

  onKill() {
    this.anims.play('enemy-hit_2');
    this.body.velocity.y = -200;
    this.scene.time.addEvent({ delay: 2000 });
    this.body.velocity.x = -200;
    this.scene.time.addEvent({ delay: 2000 });
    this.destroy();
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
      this.anims.play('walkLft-s_2', true);
      this.body.velocity.x = Phaser.Math.Between(-80, -30);
    } else if (this.body.touching.left) {
      this.anims.play('walkRgt-s_2', true);
      this.body.velocity.x = Phaser.Math.Between(30, 80);
    }
  }

  update() {
    this.scaleX = 0.27;
    this.scaleY = 0.27;

    this.setAnim();

    if (this.body.y > 700) {
      this.body.y = Phaser.Math.Between(-100, 0);
      this.body.x = Phaser.Math.Between(30, 800);
    }

    this.reappear();

    this.keepWalking();
  }
}