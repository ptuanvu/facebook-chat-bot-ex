import { callSendAPI } from './sendAPI';
import { Players } from '../lib';

// Handles messaging_postbacks events
function handlePostback(sender_psid, received_postback) {
  let response;
  let payload = received_postback.payload;
  switch (payload) {
    case 'team_information':
      response = { "text": "We are not support this now!" }
      break;
    case 'player_information':
      response = { "text": "Give me a player name!" }
      break;
    default:
      // Handle postback with params
      if (payload.indexOf('player_more_information') !== -1) {
        const playerId = payload.slice(24);
        return Players.playerDetailById(sender_psid, playerId);
      }
      response = { "text": "I'm Vinh! Gâu gâu! Please select your answer again" }
  }

  // Send the message to acknowledge the postback
  callSendAPI(sender_psid, response);
}

export { handlePostback };
