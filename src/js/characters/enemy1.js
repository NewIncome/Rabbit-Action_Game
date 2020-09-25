/* eslint-disable no-undef */
import Entity from './entity';

export default class Enemy extends Entity {
  constructor(scene, x, y, key) {
    super(scene, x, y, key, 'Enemy');

    this.setData('velocity', Phaser.Math.Between(-100, 100));
    this.setData('lives', 1);
    // this.setSize(50, 50);
  }

  onKill() {
    this.anims.play('enemy-hit');
  }

  update() {
    this.body.velocity.x = this.getData('velocity');

    if (this.body.y > 700) {
      this.body.y = Phaser.Math.Between(-100, 0);
      this.body.x = Phaser.Math.Between(30, 800);
    }
  }
}

// const gEnemy = (() => {
//   const createAll = (scene, qnt) => {
//     scene.gEnemies = scene.physics.add.group({
//       key: 'enemy1',
//       repeat: qnt,
//       setXY: {
//         x: 150,
//         y: 400,
//         stepX: 200,
//         stepY: -100,
//       },
//     });
//   };

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