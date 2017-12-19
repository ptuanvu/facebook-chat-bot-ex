import { callSendAPI, callApiSendMessage } from '../helpers/sendAPI';

const Utils = {};

Utils.sendTheMenu = (senderId) => {
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

export default Utils;
