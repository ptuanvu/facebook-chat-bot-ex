import { API_AI_TOKEN, FACEBOOK_ACCESS_TOKEN } from '../config';
import { callSendAPI } from './sendAPI';

const request = require('request');
const apiAiClient = require('apiai')(API_AI_TOKEN);


const callApiSendMessage = (senderId, text) => {
    request({
            url: 'https://graph.facebook.com/v2.6/me/messages',
            qs: { access_token: FACEBOOK_ACCESS_TOKEN },
            method: 'POST',
            json: {
                recipient: { id: senderId },
                message: { text },
            }
        });
};

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
          sendTheMenu(senderId);
      } else {
          callApiSendMessage(senderId, aiText);
      }
  });

  apiaiSession.on('error', error => console.log(error));
  apiaiSession.end();
}

export function handleMessages(event) {
  const senderId = event.sender.id;
  const message = event.message.text;
  requestToAI_API(senderId, message);
};
