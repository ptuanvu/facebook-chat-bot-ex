import { API_AI_TOKEN, FACEBOOK_ACCESS_TOKEN } from '../config';
import { callSendAPI, callApiSendMessage } from './sendAPI';
import { searchPlayerName } from '../api/algolia';

const request = require('request');
const apiAiClient = require('apiai')(API_AI_TOKEN);

const sendTheMenu = (senderId) => {
  const response = {
    "attachment": {
      "type": "template",
      "payload": {
        "template_type": "generic",
        "elements": [{
          "title": "Which one you want to know?",
          "subtitle": "Tap a button to answer.",
          "buttons": [
            {
              "type": "postback",
              "title": "Football Teams",
              "payload": "team_information",
            },
            {
              "type": "postback",
              "title": "Football Players",
              "payload": "player_information",
            }
          ],
        }]
      }
    }
  };
  callSendAPI(senderId, response);
}

const requestToAI_API = (senderId, message) => {
  const apiaiSession = apiAiClient.textRequest(message, {sessionId: 'facebook-chat-bot-ex'});
  apiaiSession.on('response', (response) => {
      console.log(response);
      var aiText = response.result.fulfillment.speech;
      if (response.result.metadata.intentName === 'players') {
          callApiSendMessage(senderId, aiText);
      } else {
          sendTheMenu(senderId);
      }
  });

  apiaiSession.on('error', error => console.log(error));
  apiaiSession.end();
}

const searchForResult = (senderId, message) => {
  searchPlayerName(message)
  .then((hits) => {
    // TODO: Search for team?
    if (!hits || hits.length === 0) { sendTheMenu(senderId); return; }
    if (hits.length > 5) { callApiSendMessage(senderId, 'So many matches! I can not display all of them.'); return; }
    if (hits.length > 1) {
      const buttons = hits.map((hit) => ({
        type: 'postback',
        title: hit.name,
        payload: 'user_hit_button_player'
      }));
      const response = {
        attachment: {
          type: 'template',
          payload: {
            template_type: 'generic',
            elements: [{
              title: 'Which one you want to know?',
              subtitle: 'Tap a button to answer.',
              buttons: buttons
            }]
          }
        }
      };

      callSendAPI(senderId, JSON.stringify(response));
      return;
    }
    const onlyOne = hits[0];
    const message = `
      Player name: ${ onlyOne.name },
      Jersey number: ${ onlyOne.jerseyNumber },
      Birthday: ${ onlyOne.dateOfBirth },
      National: ${ onlyOne.nationality },
      Position: ${ onlyOne.position }`;
    callApiSendMessage(senderId, message);
  })
  .catch((err) => {
    console.error(err);
  });
}

export function handleMessages(event) {
  const senderId = event.sender.id;
  const message = event.message.text;
  searchForResult(senderId, message);
};
