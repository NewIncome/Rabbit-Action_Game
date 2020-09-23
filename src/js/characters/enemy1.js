import Phaser from 'phaser';

const gEnemy = (() => {
  const load = (scene) => {
    scene.load.spritesheet('enemy1',
      '../assets/player&enemies/land_monster.png',
      { frameWidth: 217, frameHeight: 172 });
    scene.load.spritesheet('enemy1-lft',
      '../assets/player&enemies/land_monster-left.png',
      { frameWidth: 217, frameHeight: 172 });
  };

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
      if (i % 2 === 0) {
        child.anims.play('walkRgt-s', true);
        child.setVelocityX(60);
      } else {
        child.anims.play('walkLft-s', true);
        child.setVelocityX(-60);
      }
    });
  };

  const reapear = (group) => {
    group.children.iterate((child) => {
      if (child.y > 700) {
        child.y = Phaser.Math.Between(-100, 0);
        child.x = Phaser.Math.Between(30, 800);
        // child.body.updateFromGameObject();
      }
    });
  };


  return {
    load,
    createAll,
    keepWalking,
    reapear,
  };
})();

export default gEnemy;