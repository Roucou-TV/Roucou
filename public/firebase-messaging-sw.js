importScripts('https://www.gstatic.com/firebasejs/8.2.7/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.2.7/firebase-messaging.js')

var firebaseConfig = {
  apiKey: <API-KEY>,
  authDomain: <AUTH-DOMAIN>,
  projectId: <PROJECT-ID>,
  storageBucket: <STORAGE-BUCKET>,
  messagingSenderId: <MESSAGING-SENDER-ID>,
  appId: <APP-ID>,
  measurementId: <MEASUREMENT-ID>
}

const app = firebase.initializeApp(firebaseConfig)