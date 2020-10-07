const fetch = require("node-fetch");

const gameName = {
  name: 'Rabbit vs The Aliens',
};

async function getScoreAPI() {
  const scorePost = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games', {
    method: 'post',
    body: JSON.stringify(gameName),
    headers: { 'Content-Type': 'application/json' },
  })
    .then(response => response.json())
    .then(json => console.log(json))
    .catch(err => console.log(err));
}

getScoreAPI();

console.log('Hey, it is working eh');

// For name: Test1, key: 20n0xhB0lcNUfPpfJzUj

// For this project name, key: TZYfRdsiWsUoxdQNKoTy