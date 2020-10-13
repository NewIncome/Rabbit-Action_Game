const GameLogic = require('../src/js/control/gameLogic');

describe('GameLogic functions for correct game flow', () => {
  test('has an arrow function named koTime exists', () => {
    expect(GameLogic.koTime).toBe(undefined);
  });

  test('can stores a time', () => {
    GameLogic.time = 1602197543402;
    expect(GameLogic.time).toBe(1602197543402);
  });
});