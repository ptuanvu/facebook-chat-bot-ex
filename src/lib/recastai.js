import { RECAST_REQUEST_TOKEN } from '../config';
import recastai from 'recastai';

const RecastAI = {};
const recastClient = new recastai.request(RECAST_REQUEST_TOKEN, 'en');

RecastAI.sendMessage = ((message) => {
  return new Promise((resolve,reject) => {
    recastClient.converseText(message, { conversationToken: 'facebook-chatbot-ex'})
    .then((res) => resolve(res))
    .catch((err) => reject(err));
  });
})

export default RecastAI;
