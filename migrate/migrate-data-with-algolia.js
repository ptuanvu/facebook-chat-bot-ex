import { data } from './football-data-1';
const algoliasearch = require('algoliasearch');

const ALGOLIA_APP_ID = '8ZE08WC9FQ';
const ALGOLIA_SECRET_KEY = '4d05c2b0253bdf6fbebafe0bfe297abd';
const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_SECRET_KEY);
const playersIndex = client.initIndex('players');
const teamsIndex = client.initIndex('teams');

let KEYS;
let INTERVAL = 0;
let CUR = 0;
let D = [];
let IS_RUNNING = false;
let MAX_LENGTH = 0;

function parseData() {
  if (data.players) {
    KEYS = Object.keys(data.players);
    MAX_LENGTH = KEYS.length;
    INTERVAL = 0;
    CUR = 0;
  }
}

function getArrayDataFrom(begin, end) {
  let res = [];
  for (let i = begin; i < end; i++) {
    const key = KEYS[i];
    res.push(data.players[key]);
  }
  return res;
}

function syncData() {
  setInterval(function () {
    if (IS_RUNNING) {
      console.log('WAITING____');
      return;
    }

    if (INTERVAL >= MAX_LENGTH) {
      console.log('END____');
      return;
    }
    console.log('INTERVAL_RUN_', INTERVAL);
    const arrayData = getArrayDataFrom(INTERVAL, Math.min(INTERVAL + 1000, MAX_LENGTH));
    IS_RUNNING = true;
    playersIndex.addObjects(arrayData, function(err, content) {
      if (err) {  console.error(err); throw err; }
      IS_RUNNING = false;
      INTERVAL += 1000;
    });
  }, 100);
}

parseData();
syncData();
