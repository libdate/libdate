import * as admin from 'firebase-admin';
import firebase_token from '../../env/dev/firebase_token.json';

export default class GithubTokenService  {
    init() {
        admin.initializeApp({
            credential: admin.credential.cert(firebase_token),
            databaseURL: "https://libdate-a54ca.firebaseio.com"
          });
    }

    async readToken(email) {
        let userSnapshot = await admin.ref(`/users/${email}`).once('value');

        if (userSnapshot) {
            let userData =userSnapshot.val();

            
        }
    }
}