const API_AI_TOKEN = '6092681cbab44a04af006ef35d92dada';
const FACEBOOK_ACCESS_TOKEN = 'EAAZA7ZC1ZBadngBAEyMdasXSb2fwDFDqpDMwSGUsoaRU9ifYA0PCUV0MQUef4U42MJeVodKrjZAZB3CHJ0rXmfVYmLZCxZAxiUUs3mzTLTAuZCVSY8VZBYdX7zGjjlPGmy3I6mvFhegYZBatfTMZCB9OiatUYwQcu9LZBZAlZAy0agzmZCswJ2PktdZAsbpZC';

const request = require('request');

const apiAiClient = require('apiai')(API_AI_TOKEN);

const callApiSendMessage = (senderId, text) => {
    console.log(text);
//     var request_body = {
//     "recipient": {
//       "id": senderId
//     },
//     "message": response
//   }

//   // Send the HTTP request to the Messenger Platform
//   request({
//     "uri": "https://graph.facebook.com/v2.6/me/messages",
//     "qs": { "access_token": FACEBOOK_ACCESS_TOKEN },
//     "method": "POST",
//     "json": request_body
//   }, (err, res, body) => {
//     if (!err) {
//       console.log('message sent!')
//     } else {
//       console.error("Unable to send message:" + err);
//     }
//   });
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

function sendTheMenu(senderId) {
  let response = {
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
  callApiSendMessage(senderId, response);
}

module.exports = (event) => {
    const senderId = event.sender.id;
    const message = event.message.text;
    switch (message) {
      case 'team_information':
        callApiSendMessage(senderId, "Give me a player name?");
        break;
      case 'player_information':
        callApiSendMessage(senderId, "Give me a team name?");
        break;
      default:
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
};
