const { TestScheduler } = require('jest');
const GameLogic = require('../src/js/control/gameLogic');

test('an arrow function named koTime exists', () => {
  expect(GameLogic.koTime).toBe(undefined);
});

test('stores a time', () => {
  GameLogic.time = 1602197543402;
  expect(GameLogic.time).toBe(1602197543402);
});