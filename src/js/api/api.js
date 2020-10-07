// const fetch = require('node-fetch');


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
    .then(json => console.log(json))
    .catch(err => console.log(err));
}

async function pushScores(userName, scoreVal) {
  let dat;
  const jsonScore = JSON.stringify({ user: userName, score: scoreVal });
  const options = {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: jsonScore,
  };
  await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/20n0xhB0lcNUfPpfJzUj/scores/',
    options)
    .then(response => response.json())
    .then(data => {
      dat = data;
      return dat;
    })
    .catch(err => err);

  console.log(dat);
  return dat;
}

async function getScores() {
  let dat;

  const options = {
    method: 'GET',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
  };
  await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/20n0xhB0lcNUfPpfJzUj/scores/',
    options)
    .then(response => response.json())
    .then(data => {
      dat = data;
      return dat;
    })
    .catch(err => err);

  let sortDat = [];
  sortDat = Object.entries(dat).sort((a, b) => {
    if (b[1].score > a[1].score) return 1;
    if (b[1].score < a[1].score) return -1;
    return 0;
  });

  console.log(sortDat);
  return sortDat;
}


// export { pushScores, getScores };

// For name: Test1, key: 20n0xhB0lcNUfPpfJzUj
// For this project name, key: TZYfRdsiWsUoxdQNKoTy