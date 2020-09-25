/* eslint-disable no-undef */
import Entity from './entity';

export default class Player extends Entity {
  constructor(scene, x, y, key) {
    super(scene, x, y, key, 'Player');

    this.setData('velocity', 200);
    this.setData('lives', 3);
  }

  moveUp() { this.body.velocity.y = -this.getData('velocity'); }

  moveDown() { this.body.velocity.y = this.getData('velocity'); }

  moveLeft() { this.body.velocity.x = -this.getData('velocity'); }

  moveRight() { this.body.velocity.x = this.getData('velocity'); }

  onHit() {
    this.scene.time.addEvent({
      delay: 100,
      callback() {

      },
      callbackScope: this,
      loop: false,
    });
  }

  update() {
    this.body.setVelocity(0, 0);

    this.x = this.scene.game.config.width * 0.07;
    this.y = this.scene.game.config.height * 0.45;

    this.setCollideWorldBounds(true);
    this.body.checkCollision.up = false;
    this.body.checkCollision.left = false;
    this.body.checkCollision.right = false;

    scene.add.text(this.x + 50, this.y, 'Speed:');
  }
}