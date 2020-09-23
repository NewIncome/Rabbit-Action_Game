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
      setXY: { x: 50, y: 100, stepX: 100 },
      setScale: 0.2,
    });
    scene.gEnemies.setScale(0.2);
  };


  return {
    load,
    createAll,
  };
})();

export default gEnemy