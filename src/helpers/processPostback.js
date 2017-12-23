import { callSendAPI } from './sendAPI';
import { Players, Users, Variables } from '../lib';

// Handles messaging_postbacks events
function handlePostback(sender_psid, received_postback) {
  let response;
  const payload = received_postback.payload;
  switch (payload) {
    case Variables.SEARCH_TEAM_INFO:
      Users.setVariable(sender_psid, Variables.USER_SEARCH_TYPE, Variables.SEARCH_TEAM_INFO);
      response = { "text": "Give me a team name!" }
      break;
    case Variables.SEARCH_PLAYER_INFO:
      Users.setVariable(sender_psid, Variables.USER_SEARCH_TYPE, Variables.SEARCH_PLAYER_INFO);
      response = { "text": "Give me a player name!" }
      break;
    case Variables.CHAT_WITH_ME:
      Users.setVariable(sender_psid, Variables.USER_SEARCH_TYPE, Variables.CHAT_WITH_ME);
      response = { "text": "Hello! :D" }
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
