import { callSendAPI, callApiSendMessage } from '../helpers/sendAPI';
import Variables from './variables';
const Utils = {};

Utils.sendTheMenu = (senderId) => {
  console.log('sendTheMenu__', senderId);
  const response = {
    "attachment": {
      "type": "template",
      "payload": {
        "template_type": "generic",
        "elements": [{
          "title": "My powerful main MENU",
          "subtitle": "Which one you wana know?",
          "buttons": [
            {
              "type": "postback",
              "title": "Football Teams",
              "payload": Variables.SEARCH_TEAM_INFO,
            },
            {
              "type": "postback",
              "title": "Football Players",
              "payload": Variables.SEARCH_PLAYER_INFO,
            },
            {
              "type": "postback",
              "title": "Chat with me",
              "payload": Variables.CHAT_WITH_ME,
            }
          ],
        }]
      }
    }
  };
  callSendAPI(senderId, response);
}

export default Utils;
