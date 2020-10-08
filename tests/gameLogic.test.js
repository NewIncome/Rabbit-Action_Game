const { TestScheduler } = require('jest');
const GameLogic = require('../src/js/control/gameLogic');

test('returns a differential time in seconds', () => {
  GameLogic.time = 1602197543402;
  expect(GameLogic.koTime()).toBe(typeof 'number');
});