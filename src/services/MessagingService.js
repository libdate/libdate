import { TokenKind } from 'graphql';
import _ from 'lodash';
var admin = require('firebase-admin');

const REGISTRATION_COLLECTION = 'library_registrations';

admin.initializeApp({
    credential: admin.credential.cert({
        "project_id": process.env.FIREBASE_PROJECT_ID,
        "private_key": process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        "client_email": process.env.FIREBASE_CLIENT_EMAIL,
    }),
});

export default class MessagingService {
    constructor() {
        this.db = admin.firestore();
    }
    async subscribe(library, userId) {
        let pushToken = await this.getPushToken(userId);
        let response = await admin.messaging().subscribeToTopic(pushToken, library);
        await this.addDistinctLibrary(library, userId);
        await this.saveToUserLibraryList(library, userId);
        return true;
    }

    async unsubscribe(library, pushToken) {
        let response = await admin.messaging().unsubscribeFromTopic(pushToken, library);
        return true;
    }

    gerUserRef(userId) {
        return this.db
            .collection('users')
            .doc(userId)
    }

    async getPushToken(userId) {
        const userSnapshot = await this.gerUserRef(userId).get();
        return userSnapshot.data().pushToken;
    }

    async addDistinctLibrary(library, userId) {
        let registrationsDoc = this.db
            .collection(REGISTRATION_COLLECTION)
            .doc('library_counts');

        let registrationsRef = await registrationsDoc.get()
        let registrations = registrationsRef.data();

        if (!registrations[library]) {
            registrations[library] = 0;
        }

        registrations[library]++;

        return registrationsDoc.set(registrations);
    }

    async saveToUserLibraryList(library, userId) {
        let userRef = this.gerUserRef(userId);

        let userSnapshot = await userRef.get();
        let userData = userSnapshot.data();

        userData.libraries = _.concat(userData.libraries || [], library);
        return await userRef.set(userData);
    }
}