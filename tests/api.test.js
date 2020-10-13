import { pushScore, getScores } from '../src/js/api/api';

let fakeFetchCall;

beforeEach(() => {
  fakeFetchCall = false;
});

describe('Make API calls', () => {
  test('it has a GET call to obtain the scores', () => {
    const fakeFetch = (url) => {
      expect(url).toBe(
        'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/TZYfRdsiWsUoxdQNKoTy/scores/',
      );
      fakeFetchCall = true;
      const resp = {
        result: [{ user: 'Player1', score: 300 }],
      };

      return resp;
    };

    getScores(fakeFetch).then(resp => {
      expect(resp).toEqual({ user: 'Player1', score: 300 });
    }).then(r => r).catch(() => 'Error');
    expect(fakeFetchCall).toBe(true);
  });

  test('it has a POST call to push a score', () => {
    const fakeFetch = url => {
      expect(url).toBe(
        'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/TZYfRdsiWsUoxdQNKoTy/scores/',
      );
      fakeFetchCall = true;
      const resp = {
        result: [{ user: 'Player1', score: 300 }],
      };

      return resp;
    };

    pushScore('Player1', 59, fakeFetch)
      .then(r => { expect(r).toBeEqual({ result: 'Leaderboard score created correctly.' }); }).then(r => r).catch(() => 'Error');
    expect(fakeFetchCall).toBe(true);
  });
});