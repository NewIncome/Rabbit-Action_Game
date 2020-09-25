import Phaser from 'phaser';

const gEnemy = (() => {
  const createAll = (scene, qnt) => {
    scene.gEnemies = scene.physics.add.group({
      key: 'enemy1',
      repeat: qnt,
      setXY: {
        x: 150,
        y: 400,
        stepX: 200,
        stepY: -100,
      },
    });
  };

  const keepWalking = (group) => {
    group.children.iterate((child, i) => {
      child.setScale(0.2);
    //   if (child.body.velocity.x === 0) {
    //     if (i % 2 === 0) {
    //       child.anims.play('walkRgt-s', true);
    //       child.setVelocityX(60);
    //     } else {
    //       child.anims.play('walkLft-s', true);
    //       child.setVelocityX(-60);
    //     }
    //   }
    //   if (child.body.touching.right) {
    //     child.anims.play('walkLft-s', true);
    //     child.setVelocityX(-60);
    //   } else if (child.body.touching.left) {
    //     child.anims.play('walkRgt-s', true);
    //     child.setVelocityX(60);
    //   }
    });
  };

  const reappear = (group) => {
    group.children.iterate((child) => {
      if (child.y > 700) {
        child.y = Phaser.Math.Between(-100, 0);
        child.x = Phaser.Math.Between(30, 800);
        // child.body.updateFromGameObject();
      }
    });
  };

  return {
    createAll,
    keepWalking,
    reappear,
  };
})();

export default gEnemy;