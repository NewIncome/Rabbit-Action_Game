/* eslint-disable no-undef */
import Entity from './entity';

export default class Boss extends Entity {
  constructor(scene, x, y, key) {
    super(scene, x, y, key, 'Boss');

    this.setData('velocity', Phaser.Math.Between(-100, 100));
    this.setData('side', 'right');
    this.setData('enemyRank', 30);
    this.setData('lives', 10);
  }

  update() {
    this.scaleX = 0.5;
    this.scaleY = 0.5;

    this.x = 100;
    this.y = 250;
  }
}