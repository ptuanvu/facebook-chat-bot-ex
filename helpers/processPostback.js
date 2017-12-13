import { callSendAPI } from './sendAPI';
import { searchForResult } from './processMessages';

// Handles messaging_postbacks events
function handlePostback(sender_psid, received_postback) {
  let response;
  let payload = received_postback.payload;
  console.log('received_postback__', received_postback);
  switch (payload) {
    case 'team_information':
      response = { "text": "We are not support this now!" }
      break;
    case 'player_information':
      response = { "text": "Give me a player name!" }
      break;
    case 'user_hit_button_player':
      return searchForResult(sender_psid, received_postback.title);
    default:
      response = { "text": "I'm Vinh! Gâu gâu! Please select your answer again" }
  }

  // Send the message to acknowledge the postback
  callSendAPI(sender_psid, response);
}

export { handlePostback };
