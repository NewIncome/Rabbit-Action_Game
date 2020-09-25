/* eslint-disable no-undef */
import Entity from './entity';

export default class Enemy extends Entity {
  constructor(scene, x, y, key) {
    super(scene, x, y, key, 'Enemy');

    this.setData('velocity', Phaser.Math.Between(-80, 80));
    this.setData('lives', 1);
  }

  setAnim() {
    if (this.body.velocity.x === 0) {
      this.body.velocity.x = this.getData('velocity');
    }
    if (this.body.velocity.x > 0) {
      this.anims.play('walkRgt-s', true);
    } else this.anims.play('walkLft-s', true);
  }

  onKill() {
    this.anims.play('enemy-hit');
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

    if (this.body.y > 700) {
      this.body.y = Phaser.Math.Between(-100, 0);
      this.body.x = Phaser.Math.Between(30, 800);
    }

    this.reappear();

    this.keepWalking();
  }
}

// const keepWalking = (group) => {
//   group.children.iterate((child, i) => {
//     child.setScale(0.2);
//   //   if (child.body.velocity.x === 0) {
//   //     if (i % 2 === 0) {
//   //       child.anims.play('walkRgt-s', true);
//   //       child.setVelocityX(60);
//   //     } else {
//   //       child.anims.play('walkLft-s', true);
//   //       child.setVelocityX(-60);
//   //     }
//   //   }
//   //   if (child.body.touching.right) {
//   //     child.anims.play('walkLft-s', true);
//   //     child.setVelocityX(-60);
//   //   } else if (child.body.touching.left) {
//   //     child.anims.play('walkRgt-s', true);
//   //     child.setVelocityX(60);
//   //   }
//   });
// };

// const reappear = (group) => {
//   group.children.iterate((child) => {
//     if (child.y > 700) {
//       child.y = Phaser.Math.Between(-100, 0);
//       child.x = Phaser.Math.Between(30, 800);
//       // child.body.updateFromGameObject();
//     }
//   });
// }