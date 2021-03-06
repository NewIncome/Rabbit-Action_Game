const Loader = (() => {
  const tiles = (scene, name, term, directory, numStart, qnt, ext) => {
    for (let i = 0; i < qnt; i += 1) {
      scene.load.image(`${name + term[i]}`, `${directory}${numStart + i}${ext}`);
    }
  };

  const player = (scene) => {
    scene.load.spritesheet('rabbit-nrm-n-hit',
      '../assets/player&enemies/rabbit-sprite_r-1(normal&hit).png',
      { frameWidth: 45, frameHeight: 76 });
    scene.load.spritesheet('rabbit-nrm-n-hit-left',
      '../assets/player&enemies/rabbit-sprite_l-0(normal&hit).png',
      { frameWidth: 45, frameHeight: 76 });
    scene.load.spritesheet('rabbit-right-run',
      '../assets/player&enemies/rabbit-sprite_r-2(run).png',
      { frameWidth: 50, frameHeight: 76 });
    scene.load.spritesheet('rabbit-right-jump',
      '../assets/player&enemies/rabbit-sprite_r-3(jump).png',
      { frameWidth: 61, frameHeight: 78 });
    scene.load.spritesheet('rabbit-left-run',
      '../assets/player&enemies/rabbit-sprite_l-1 (run).png',
      { frameWidth: 51, frameHeight: 76 });
    scene.load.spritesheet('rabbit-righ-punch',
      '../assets/player&enemies/rabbit-sprite_r-4(punch).png',
      { frameWidth: 60, frameHeight: 76 });
    scene.load.spritesheet('rabbit-left-jump',
      '../assets/player&enemies/rabbit-sprite_l-2 (jump).png',
      { frameWidth: 42, frameHeight: 77 });
    scene.load.spritesheet('rabbit-left-punch',
      '../assets/player&enemies/rabbit-sprite_l-3(punch).png',
      { frameWidth: 60, frameHeight: 76 });
  };

  const enemy1 = (scene) => {
    scene.load.spritesheet('enemy1',
      '../assets/player&enemies/land_monster.png',
      { frameWidth: 217, frameHeight: 172 });
    scene.load.spritesheet('enemy1-lft',
      '../assets/player&enemies/land_monster-left.png',
      { frameWidth: 217, frameHeight: 172 });
  };

  const enemy2 = (scene) => {
    scene.load.spritesheet('enemy2',
      '../assets/player&enemies/pink_monster.png',
      { frameWidth: 205, frameHeight: 174 });
    scene.load.spritesheet('enemy2-lft',
      '../assets/player&enemies/pink_monster-left.png',
      { frameWidth: 205, frameHeight: 174 });
  };

  const boss = (scene) => {
    scene.load.spritesheet('boss-walk-left',
      '../assets/player&enemies/boss_walk(1line).png',
      { frameWidth: 207.5, frameHeight: 116 });
    scene.load.spritesheet('boss-walk-right',
      '../assets/player&enemies/boss_walk(right).png',
      { frameWidth: 207.5, frameHeight: 116 });
  };

  return {
    tiles,
    player,
    enemy1,
    enemy2,
    boss,
  };
})();

export default Loader;