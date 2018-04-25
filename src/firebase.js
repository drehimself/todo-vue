import firebase from 'firebase'
import 'firebase/firestore'

const config = {
  apiKey: "AIzaSyBKio8JVV0v4jGp0NsUcvd5QkvqZnob4WE",
  authDomain: "todos-286ec.firebaseapp.com",
  databaseURL: "https://todos-286ec.firebaseio.com",
  projectId: "todos-286ec",
  storageBucket: "todos-286ec.appspot.com",
  messagingSenderId: "1095467175752"
}

const firebaseApp = firebase.initializeApp(config)

const firestore = firebaseApp.firestore()
firestore.settings({ timestampsInSnapshots: true })

export default firestore
