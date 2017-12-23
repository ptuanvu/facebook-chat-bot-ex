import { API_AI_TOKEN, FACEBOOK_ACCESS_TOKEN } from '../config';
import { callSendAPI, callApiSendMessage } from './sendAPI';
import { Players } from '../lib';

const request = require('request');

export function handleMessages(event) {
  const senderId = event.sender.id;
  const message = event.message.text;
  Players.findPlayersByName(senderId, message);
};
