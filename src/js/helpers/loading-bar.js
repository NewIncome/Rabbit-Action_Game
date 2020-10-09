// eslint-disable-next-line no-unused-vars
import Phaser from 'phaser';

export default function preLoadBar(scene) {
  const progressBar = scene.add.graphics();
  const progressBox = scene.add.graphics();
  progressBox.fillStyle(0x222222, 0.8);
  // To Make Loading... text
  const { width } = scene.cameras.main;
  const { height } = scene.cameras.main;
  progressBox.fillRect(width / 2.8, height / 2.15, 320, 50);

  const loadingText = scene.make.text({
    x: width / 2,
    y: height / 2 - 50,
    text: 'Loading...',
    style: {
      font: '20px monospace',
      fill: '#ffffff',
    },
  }).setOrigin(0.5, 0.5);
  // To Make the Progress Percentage
  const percentText = scene.make.text({
    x: width / 2,
    y: height / 2 - 5,
    text: '0%',
    style: {
      font: '18px monospace',
      fill: '#ffffff',
    },
  }).setOrigin(0.5, 0.5);
  // To Make the Name of Files Being loaded
  scene.assetText = scene.make.text({
    x: width / 2,
    y: height / 2 + 50,
    text: '',
    style: {
      font: '18px monospace',
      fill: '#ffffff',
    },
  }).setOrigin(0.5, 0.5);


  // Event listeners from Phaser's LoaderPlugin
  scene.load.on('progress', (value) => {
    // gives a value between 0-1
    progressBar.clear();
    progressBar.fillStyle(0xffffff, 1);
    progressBar.fillRect(width / 2.65, height / 2.1, 300 * value, 30);
    percentText.setText(`${Math.round(value * 100)}%`);
  });

  scene.load.on('fileprogress', (file) => {
    scene.assetText.setText(`Loading asset: ${file.key}`);
  });
  // 'complete' will only be emitted once all files are done loading
  scene.load.on('complete', () => {
    progressBar.destroy();
    progressBox.destroy();
    loadingText.destroy();
    percentText.destroy();
    scene.assetText.destroy();
  });
}