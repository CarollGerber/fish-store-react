import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    
        apiKey: "AIzaSyAjCb7D_0XvJV9kztnqIzS2V18JvRZ4GHk",
        authDomain: "fish-store-project.firebaseapp.com",
        databaseURL: "https://fish-store-project.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

//This is a named export
export { firebaseApp };

//This is a default export
export default base;