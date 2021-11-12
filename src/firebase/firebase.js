import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import "firebase/storage"
import "firebase/messaging"

let fb = null
var fire = null
const firebaseConfig = {
  apiKey: process.env.VUE_APP_APIKEY,
  authDomain: process.env.VUE_APP_AUTHDOMAIN,
  databaseURL: process.env.VUE_APP_VUE_APP_DATABASEURL,
  projectId: process.env.VUE_APP_PROJECTID,
  storageBucket: process.env.VUE_APP_STORAGEBUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGINGSENDERID,
  appId: process.env.VUE_APP_APPID,
  measurementId: process.env.VUE_APP_MEASUREMENTID,
}

if (!fb) {
  fb = firebase.initializeApp(firebaseConfig)
}
//Ce code sera a essayé apres, mais il marche
// if (process.env.NODE_ENV == "development") {
//   console.log("Development on localhost, use Emulator");
//   fire = fb.firestore().settings({ host: "localhost:7000", ssl: false });
//   fb.auth().useEmulator("http://localhost:9099/");
// } else {
//   console.log(`Development on [${location.hostname}], use Emulator`);
//   fire = fb.firestore();
// }
fb.firestore()
  .enablePersistence()
  .catch(function(err) {
    if (err.code == "failed-precondition") {
      console.log("Impossible de permettre la persistance hors ligne a cause de plusieurs onglets ouverts")
    } else if (err.code == "unimplemented") {
      console.log("Ce navigateur ne permet pas la persistance!")
    }
  })

export const firestore = fire ?? fb.firestore()
export const storage = fb.storage()
export const auth = fb.auth()
export const messaging = fb.messaging()
