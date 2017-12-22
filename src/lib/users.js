import Firebase from '../api/firebase';
const Users = {};

Users.setVariable = (senderId, name, value) => {
  console.log('SET_VARIABLE__', senderId, name, value);
  return Firebase.database.ref(`users/${ senderId }`).set({ id: senderId, name, value });
}

Users.getVariable = (senderId, name) => {
  console.log('GET_VARIABLE__', senderId, name);
  return new Promise((resolve, reject) => {
    Firebase.database.ref(`users/${ senderId }`)
    .once('value')
    .then((snapshot) => resolve(snapshot && snapshot.val()))
    .catch((err) => reject(err));
  });
}

export default Users;
