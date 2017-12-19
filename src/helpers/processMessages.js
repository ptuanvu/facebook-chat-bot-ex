import { API_AI_TOKEN, FACEBOOK_ACCESS_TOKEN } from '../config';
import { callSendAPI, callApiSendMessage } from './sendAPI';
import { Players } from '../lib';

const request = require('request');
const apiAiClient = require('apiai')(API_AI_TOKEN);


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

export function handleMessages(event) {
  const senderId = event.sender.id;
  const message = event.message.text;
  Players.findPlayersByName(senderId, message);
};
