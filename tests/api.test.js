import * as api from '../src/js/api/api';

describe('Make API calls', () => {
  test('it has a GET call to obtain the scores', () => {
    api.getScores()
      .then(r => { expect(r).toBeDefined(); });
  });

  test('it has a POST call to push a score', () => {
    api.pushScore('Player1', 59)
      .then(r => { expect(r).toBeDefined(); });
  });
});