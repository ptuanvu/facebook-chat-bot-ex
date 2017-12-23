import { API_AI_TOKEN, FACEBOOK_ACCESS_TOKEN } from '../config';
import { callSendAPI, callApiSendMessage } from './sendAPI';
import { Players, Users, Utils, Variables, RecastAI } from '../lib';

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
      RecastAI.sendMessage(message)
      .then((res) => {
        console.log('RecastAI__', res);
        callApiSendMessage(senderId, res.reply());
      })
      .catch((err) => console.error('RecastAI_Error__', err));
    } else {
      Utils.sendTheMenu(senderId);
    }
  })
  .catch((err) => console.error(err));
};
