export default function rabbitLoad(scene) {
  scene.load.spritesheet('rabbit-nrm-n-hit',
    '../assets/player&enemies/rabbit-sprite_r-1(normal&hit).png',
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
  scene.load.spritesheet('rabbit-left-jump',
    '../assets/player&enemies/rabbit-sprite_l-2 (jump).png',
    { frameWidth: 42, frameHeight: 77 });
}