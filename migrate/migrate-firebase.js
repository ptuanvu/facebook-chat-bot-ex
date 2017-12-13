import * as firebase from 'firebase';
const request = require('request');
const uuidv4 = require('uuid/v4');

const config = {
    apiKey: "AIzaSyCOCcbzxlUQEkyZJNHPE4nGtJnfYAOzUbQ",
    authDomain: "footballdata-76240.firebaseapp.com",
    databaseURL: "https://footballdata-76240.firebaseio.com",
    projectId: "footballdata-76240",
    storageBucket: "",
    messagingSenderId: "903602941103"
  };
firebase.initializeApp(config);
var database = firebase.database();


const header = { 'X-Auth-Token': '8f5e26f29ec6417796b33a7713c725ba' }
const MAX_TEAM_NUMBER = 110;
let INTERVAL_NUMBER_1 = 110;
let INTERVAL_NUMBER_2 = 110;
let DOING1 = false;
let DOING2 = false;
let FLAG_API_MAX_REQUEST = false;


function saveTeamData(data, teamId) {
  firebase.database().ref('teams/' + teamId).set({
    id: teamId,
    name: data.name,
    code: data.code,
    shortName : data.shortName,
    squadMarketValue: data.squadMarketValue,
    crestUrl: data.crestUrl,
    extends: data._links.self.href,
  });
}

function savePlayerData(data, playerId, teamId) {
  firebase.database().ref('players/' + playerId).set({
    id: playerId,
    teamId: teamId,
    name: data.name,
    position: data.position,
    jerseyNumber : data.jerseyNumber,
    dateOfBirth: data.dateOfBirth,
    nationality: data.nationality,
    contractUntil: data.contractUntil,
    marketValue: data.marketValue,
  });
}

function syncTeamsData(number, tId) {
  const url = `http://api.football-data.org/v1/teams/${number}`;
  const options = { url: url, headers: header };

  request(options, function (error, response, body) {
    DOING1=false;
    if (error) { console.error(error); return; }

    console.log('syncTeamsData__', number);
    let data;
    try {
      data = JSON.parse(body);
    } catch (e) {
      console.log('ERROR_PARSE_JSON__', e);
      return;
    }
    if (response && response.statusCode === 200) {
      INTERVAL_NUMBER_1++;
      saveTeamData(JSON.parse(body), tId);
    } else {
      var maxRequestError = data.error.match(/You reached your request limit/i);
      if (maxRequestError && !FLAG_API_MAX_REQUEST) { flagAsMaxRequest(); }
      if (!maxRequestError) { INTERVAL_NUMBER_1++; }
      return;
    }
  });
}

function syncTeamPlayersData(number, tId) {
  const url = `http://api.football-data.org/v1/teams/${number}/players`;
  const options = { url: url, headers: header };

  request(options, function (error, response, body) {
    DOING2=false;
    if (error) { console.error(error); return; }

    console.log('syncTeamsPLAYERData__', number);
    let data;
    try {
      data = JSON.parse(body);
    } catch (e) { console.log('ERROR_PARSE_JSON__', e); return; }

    if (response && response.statusCode === 200) {
      const data = JSON.parse(body);
      if (data && data.players) {
        INTERVAL_NUMBER_2++;
        savePlayersSync(data.players, tId);
      }
    } else {
      var maxRequestError = data.error.match(/You reached your request limit/i);
      if (maxRequestError && !FLAG_API_MAX_REQUEST) { flagAsMaxRequest(); }
      if (!maxRequestError) { INTERVAL_NUMBER_2++; }
      return;
    }
  });
}

function savePlayersSync(players, tId) {
  let i = 0;
  while (i < players.length) {
    const pId = uuidv4();
    savePlayerData(players[i], pId, tId);
    i++;
  }
}

function flagAsMaxRequest() {
  FLAG_API_MAX_REQUEST = true;
  setTimeout(function () {
    FLAG_API_MAX_REQUEST = false;
  }, 60000);
}
let TEAM_IDS = [];

function initTeamId() {
  for (let i = 0; i <= MAX_TEAM_NUMBER; i++) {
    TEAM_IDS.push(uuidv4());
  }
  console.log('TEAM_IDS', TEAM_IDS);
}

function syncData() {
  initTeamId();
  setInterval(function () {
    if (FLAG_API_MAX_REQUEST || DOING1 || DOING2) { console.log('WAITING___'); return; }

    if (INTERVAL_NUMBER_1 <= MAX_TEAM_NUMBER) {
      DOING1 = true;
      syncTeamsData(INTERVAL_NUMBER_1, TEAM_IDS[INTERVAL_NUMBER_1]);
    }
    if (INTERVAL_NUMBER_2 <= MAX_TEAM_NUMBER) {
      DOING2 = true;
      syncTeamPlayersData(INTERVAL_NUMBER_2, TEAM_IDS[INTERVAL_NUMBER_2]);
    }
  }, 500);
}

syncData();
