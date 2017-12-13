import { callSendAPI } from './sendAPI';

// Handles messaging_postbacks events
function handlePostback(sender_psid, received_postback) {
  let response;
  let payload = received_postback.payload;

  switch (payload) {
    case 'team_information':
      response = { "text": "Give me a player name!" }
      break;
    case 'player_information':
      response = { "text": "Give me a team name!" }
      break;
    default:
      response = { "text": "I'm Vinh! Gâu gâu! Please select your answer again" }
  }

  // Send the message to acknowledge the postback
  callSendAPI(sender_psid, response);
}

export { handlePostback };
