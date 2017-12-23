import { RECAST_REQUEST_TOKEN } from '../config';
import recastai from 'recastai';

const RecastAI = {};
var build = new recastai.build(RECAST_REQUEST_TOKEN, 'en')

RecastAI.sendMessage = ((message) => {
  return new Promise((resolve,reject) => {
    build.dialog({ type: 'text', content: message}, { conversationId: 'RECAST_REQUEST_TOKEN' })
    .then((res) => resolve(res))
    .catch((err) => reject(err));
  });
})

export default RecastAI;
