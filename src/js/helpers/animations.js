const movement = (() => {
  const player = (scene) => {
    // Animations-movement
    scene.anims.create({
      key: 'normal-l',
      frames: scene.anims.generateFrameNumbers('rabbit-nrm-n-hit-left',
        { start: 0, end: 3 }),
      frameRate: 5,
      repeat: 1,
    });
    scene.anims.create({
      key: 'normal-r',
      frames: scene.anims.generateFrameNumbers('rabbit-nrm-n-hit',
        { start: 0, end: 3 }),
      frameRate: 5,
      repeat: 1,
    });
    scene.anims.create({
      key: 'left-run',
      frames: scene.anims.generateFrameNumbers('rabbit-left-run',
        { start: 5, end: 0 }),
      frameRate: 12,
      repeat: -1,
    });
    scene.anims.create({
      key: 'right-run',
      frames: scene.anims.generateFrameNumbers('rabbit-right-run',
        { start: 0, end: 5 }),
      frameRate: 12,
      repeat: -1,
    });
    scene.anims.create({
      key: 'jump-s-l', // simple jump
      frames: [{ key: 'rabbit-left-jump', frame: 2 }],
      frameRate: 10,
    });
    scene.anims.create({
      key: 'jump-s-r', // simple jump
      frames: [{ key: 'rabbit-right-jump', frame: 3 }],
      frameRate: 10,
    });
    scene.anims.create({
      key: 'punch-left',
      frames: scene.anims.generateFrameNumbers('rabbit-left-punch',
        { start: 0, end: 4 }),
      frameRate: 10,
      repeat: -1,
    });
    scene.anims.create({
      key: 'punch-right',
      frames: scene.anims.generateFrameNumbers('rabbit-righ-punch',
        { start: 4, end: 0 }),
      // frames: [{ key: 'rabbit-right-punch', frame: 4 }],
      frameRate: 10,
      repeat: -1,
    });
  };

  const enemy1 = (scene) => {
    scene.anims.create({
      key: 'walkLft-s',
      frames: scene.anims.generateFrameNumbers('enemy1-lft',
        { start: 0, end: 1 }),
      frameRate: 2,
      repeat: -1,
    });
    scene.anims.create({
      key: 'walkRgt-s',
      frames: scene.anims.generateFrameNumbers('enemy1',
        { start: 1, end: 2 }),
      frameRate: 2,
      repeat: -1,
    });

    scene.anims.create({
      key: 'enemy-hit',
      frames: [{ key: 'enemy1', frame: 2 }],
      frameRate: 10,
    });
  };

  const enemy2 = (scene) => {
    scene.anims.create({
      key: 'walkLft-s_2',
      frames: scene.anims.generateFrameNumbers('enemy2-lft',
        { start: 0, end: 1 }),
      frameRate: 2,
      repeat: -1,
    });
    scene.anims.create({
      key: 'walkRgt-s_2',
      frames: scene.anims.generateFrameNumbers('enemy2',
        { start: 1, end: 2 }),
      frameRate: 2,
      repeat: -1,
    });

    scene.anims.create({
      key: 'enemy-hit_2',
      frames: [{ key: 'enemy2', frame: 2 }],
      frameRate: 10,
    });
  };

  const boss = (scene) => {
    scene.anims.create({
      key: 'walk-left',
      frames: scene.anims.generateFrameNumbers('boss-walk-left',
        { start: 0, end: 18 }),
      frameRate: 5,
      repeat: -1,
    });
    scene.anims.create({
      key: 'walk-right',
      frames: scene.anims.generateFrameNumbers('boss-walk-right',
        { start: 18, end: 0 }),
      frameRate: 5,
      repeat: -1,
    });

    // scene.anims.create({
    //   key: 'boss-hit-left',
    //   frames: [{ key: 'enemy2', frame: 2 }],
    //   frameRate: 10,
    // });
  };

  return {
    player,
    enemy1,
    enemy2,
    boss,
  };
})();

export default movement;