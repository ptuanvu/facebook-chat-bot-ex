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

let IS_RUNNING = false;
let TOTAL_PAGE = 671;
let INTERVAL_NUMBER_0 = 1;
const BASE_URL = 'https://www.easports.com/fifa/ultimate-team/api/fut';

function syncPlayersData() {
  const url = `${ BASE_URL }/item?page=${ INTERVAL_NUMBER_0 }`;
  const options = { url };

  request(options, function (error, response, body) {
    IS_RUNNING = false;
    if (error) { console.error(error); return; }
    console.log('syncTeamsData__', INTERVAL_NUMBER_0);
    if (response && response.statusCode === 200) {
      INTERVAL_NUMBER_0++;
      try {
        const data = JSON.parse(body);
        const players = data.items;
        if (!players || players.length === 0) { return; }
        players.forEach(player => savePlayerData(player));
      } catch (e) {
        console.log('ERROR_PARSE_JSON__', e);
        return;
      }
    } else {
      INTERVAL_NUMBER_0++;
      return;
    }
  });
}

function savePlayerData(player) {
  const pId = uuidv4();

  firebase.database().ref('players/' + player.baseId).set({
    id: player.baseId,
    teamId: player.club && player.club.id,
    teamName: player.club && player.club.name,
    teamAbbrName: player.club && player.club.abbrName,
    headshotImgUrl: player.headshotImgUrl,
    commonName: player.commonName,
    firstName: player.firstName,
    lastName: player.lastName,
    name: player.name,
    position: player.position,
    dateOfBirth: player.birthdate,
    nationality: player.nation && player.nation.abbrName,
    height: player.height,
    weight: player.weight,
    age: player.age,
    foot: player.foot,
    quality: player.quality
  });
}

function syncData() {
  setInterval(function () {
    if (IS_RUNNING) { console.log('WAITING___'); return; }

    if (INTERVAL_NUMBER_0 <= TOTAL_PAGE) {
      IS_RUNNING = true;
      syncPlayersData(INTERVAL_NUMBER_0);
    }
  }, 100);
}

syncData();
