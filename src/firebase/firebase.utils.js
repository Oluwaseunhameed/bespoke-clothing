import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBYjE9Xvi0WrLZ-eiKFC10vB2cCekfgNwc",
    authDomain: "bespoke-clothing.firebaseapp.com",
    databaseURL: "https://bespoke-clothing.firebaseio.com",
    projectId: "bespoke-clothing",
    storageBucket: "bespoke-clothing.appspot.com",
    messagingSenderId: "199611257817",
    appId: "1:199611257817:web:44e07deadb31704489ffc8"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
