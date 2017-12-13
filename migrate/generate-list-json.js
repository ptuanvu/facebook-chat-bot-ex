import { data } from './football-data';
const algoliasearch = require('algoliasearch');

const ALGOLIA_APP_ID = '8ZE08WC9FQ';
const ALGOLIA_SECRET_KEY = '4d05c2b0253bdf6fbebafe0bfe297abd';
const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_SECRET_KEY);
const playersIndex = client.initIndex('players');
const teamsIndex = client.initIndex('teams');

function parseData() {
  if (data.teams) {
    const dataArray = [];
    Object.keys(data.teams).forEach(function (key) {
      dataArray.push(data.teams[key]);
    });
    teamsIndex.addObjects(dataArray);
  }
  if (data.players) {
    const dataArray = [];
    Object.keys(data.players).forEach(function (key) {
      dataArray.push(data.players[key]);
    });
    playersIndex.addObjects(dataArray);
  }
}

parseData();
