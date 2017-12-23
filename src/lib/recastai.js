import { RECAST_REQUEST_TOKEN } from '../config';
import recastai from 'recastai';

const RecastAI = {};
const recastClient = new recastai(RECAST_REQUEST_TOKEN);

RecastAI.sendMessage = ((message) => {
  return new Promise((resolve,reject) => {
    recastClient.textRequest(message)
    .then((res) => resolve(res))
    .catch((err) => reject(err));
  });
})

export default RecastAI;
