const pos = require('../src/js/helpers/position-n-buttons');

describe('This helper provides functions for buttons and text', () => {
  test('it returns an empty string if a Player Name is undefined', () => {
    expect(pos.strIs(undefined)).toBe('');
  });

  test('it converts seconds to minutes if seconds are more than 60', () => {
    expect(pos.numIs(95)).toBe('1.58 mins');
  });

  test('it returns a num with \'secs\' if the num is lower than 60', () => {
    expect(pos.numIs(55)).toBe('55.00 secs');
  });
});