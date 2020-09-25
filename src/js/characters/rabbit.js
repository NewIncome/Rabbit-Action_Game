/* eslint-disable no-undef */
import Entity from './entity';

export default class Player extends Entity {
  constructor(scene, x, y, key) {
    super(scene, x, y, key, 'Player');

    this.setData('velocity', 200);
    this.setData('lives', 3);
    this.setData('side', 'right');
    this.body.gravityScale = 500;
    this.body.checkCollision.up = false;
    this.body.checkCollision.left = false;
    this.body.checkCollision.right = false;
  }

  moveLeft() {
    this.body.velocity.x = -this.getData('velocity');
    this.anims.play('left-run', true);
    this.setData('side', 'left');
  }

  moveRight() {
    this.body.velocity.x = this.getData('velocity');
    this.anims.play('right-run', true);
    this.setData('side', 'right');
  }

  turnLeft() {
    this.anims.play('normal-l', true);
  }

  turnRight() {
    this.anims.play('normal-r', true);
  }

  jumpLeft() {
    this.body.velocity.y = -this.getData('velocity') - 100;
    this.anims.play('jump-s-l');
  }

  jumpRight() {
    this.body.velocity.y = -this.getData('velocity') - 100;
    this.anims.play('jump-s-r');
  }

  punchLeft() {
    this.anims.play('punch-left');
    this.body.setVelocityX(-10);
  }

  punchRight() {
    this.anims.play('punch-right');
    this.body.setVelocityX(10);
  }

  onHit() {
    this.scene.time.addEvent({
      delay: 100,
      callback() {

      },
      callbackScope: this,
      loop: false,
    });
  }

  getVelX() { return this.body.velocity.x; }

  getVelY() { return this.body.velocity.y; }

  update() {
    this.body.setVelocity(0, 0);

    this.x = this.scene.game.config.width * 0.5;
    this.y = this.scene.game.config.height * 0.5;

    this.setCollideWorldBounds(true);

    scene.add.text(this.x + 50, this.y, 'Speed:');
  }
}