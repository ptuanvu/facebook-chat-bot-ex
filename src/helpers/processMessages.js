import { API_AI_TOKEN, FACEBOOK_ACCESS_TOKEN } from '../config';
import { callSendAPI, callApiSendMessage } from './sendAPI';
import { Players, Users, Utils, Variables } from '../lib';

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
  if (message.toLowerCase() === '#menu') {
    return Utils.sendTheMenu(senderId);
  }

  Users.getVariable(senderId, Variables.USER_SEARCH_TYPE)
  .then((cache) => {
    console.log('getVariable__', cache);
    if (!cache) { return Utils.sendTheMenu(senderId); }

    if (cache.value === Variables.SEARCH_TEAM_INFO) {
      callApiSendMessage(senderId, 'We are not support team search!');
      Utils.sendTheMenu(senderId);
    } else if (cache.value === Variables.SEARCH_PLAYER_INFO) {
      Players.findPlayersByName(senderId, message);
    } else if (cache.value === Variables.CHAT_WITH_ME) {
      callApiSendMessage(senderId, 'My stupid parents do not teach me any thing about chating! Say fuck with Mr Vinh and Mr A.Tuan');
    } else {
      Utils.sendTheMenu(senderId);
    }
  })
  .catch((err) => console.error(err));
};
