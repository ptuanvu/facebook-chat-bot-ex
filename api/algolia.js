const algoliasearch = require('algoliasearch');

const ALGOLIA_APP_ID = '8ZE08WC9FQ';
const ALGOLIA_SECRET_KEY = '4d05c2b0253bdf6fbebafe0bfe297abd';
const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_SECRET_KEY);

const playersIndex = client.initIndex('players');
const teamsIndex = client.initIndex('teams');

export function searchTeamName(query) {
  return new Promise(function(resolve, reject) {
    teamsIndex.search({ query, ignorePlurals: true }, function(err, content) {
      console.log(content.hits);
      if (content) {
        resolve(content.hits);
      } else {
        reject(new Error('Failed'))
      }
    });
  });;
}

export function searchPlayerName(query) {
  return new Promise(function(resolve, reject) {
    playersIndex.search({ query, ignorePlurals: true }, function(err, content) {
      console.log(content.hits);
      if (content) {
        resolve(content.hits);
      } else {
        reject(new Error('Failed'))
      }
    });
  });;
}
