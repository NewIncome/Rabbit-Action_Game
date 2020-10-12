// eslint-disable-next-line import/no-extraneous-dependencies
import '@babel/polyfill';

const gameName = {
  name: 'Rabbit vs The Aliens',
};

// eslint-disable-next-line no-unused-vars
async function getScoreAPI() {
  await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games', {
    method: 'post',
    body: JSON.stringify(gameName),
    headers: { 'Content-Type': 'application/json' },
  })
    .then(response => response.json())
    .then(json => json)
    .catch(err => err);
}

async function pushScore(userName, scoreVal) {
  let dat;
  const jsonScore = JSON.stringify({ user: userName, score: scoreVal });
  const options = {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: jsonScore,
  };
  await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/TZYfRdsiWsUoxdQNKoTy/scores/',
    options)
    .then(response => response.json())
    .then(data => {
      dat = data;
      return dat;
    })
    .catch(err => err);

  return dat;
}

async function getScores() {
  const options = {
    method: 'GET',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
  };
  const getResp = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/TZYfRdsiWsUoxdQNKoTy/scores/',
    options);
  const data = await getResp.json();

  let sortData = [];
  sortData = Object.entries(data)[0][1].sort((a, b) => {
    if (parseFloat(b.score) > parseFloat(a.score)) return -1;
    if (parseFloat(b.score) < parseFloat(a.score)) return 1;
    return 0;
  });

  return sortData;
}


export { pushScore, getScores };

// For name: Test1, key: 20n0xhB0lcNUfPpfJzUj
// For this project name, key: TZYfRdsiWsUoxdQNKoTy