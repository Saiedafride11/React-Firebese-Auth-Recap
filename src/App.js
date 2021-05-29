import './App.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useState } from 'react';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}else {
  firebase.app(); // if already initialized, use that one
} 

function App() {
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    photo: ''
  })
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const fbProvider = new firebase.auth.FacebookAuthProvider();
  const githubProvider = new firebase.auth.GithubAuthProvider();
  const twitterProvider = new firebase.auth.TwitterAuthProvider();

  const handleGoogleSignIn = () => {
    firebase.auth().signInWithPopup(googleProvider)
      .then(res => {
        const { displayName, email, photoURL } = res.user;
        // console.log(displayName, email, photoURL);
        const isSignedIn = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL
        }
        setUser(isSignedIn)
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage)
      });

  }
  const handleGoogleSignOut = () => {
    firebase.auth().signOut()
    .then(() => {
      const isSignedOut = {
        isSignedIn: false,
        name: '',
        email: '',
        photo: ''
      }
      setUser(isSignedOut)
    }).catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, errorMessage)
    });

  }

  const handleFacebookSignIn = () => {
    firebase.auth().signInWithPopup(fbProvider)
      .then((result) => {
        var credential = result.credential;
        var user = result.user;
        var accessToken = credential.accessToken;
        console.log('Facebook', user)
        setUser(user)
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log('Facebook Error', errorCode, errorMessage, email, credential)
      });
  }

  const handleGithubSignIn = () => {
    firebase.auth().signInWithPopup(githubProvider)
    .then((result) => {
      var credential = result.credential;
      var token = credential.accessToken;
      var user = result.user;
      console.log('Github User', user)
      setUser(user)
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
      console.log(errorCode, errorMessage, email, credential)
    });
  }

  const handleTwitterSignIn = () => {
    firebase.auth().signInWithPopup(twitterProvider)
    .then((result) => {
      var credential = result.credential;
      var token = credential.accessToken;
      var secret = credential.secret;
      var user = result.user;
      console.log(user);
      setUser(user)
    }).catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
      console.log('Twitter Error', errorCode, errorMessage, email, credential)
    });
  }
  return (
    <div className="App">
      {user.isSignedIn ? <button onClick={handleGoogleSignOut}>Sign Out</button> : 
      <button onClick={handleGoogleSignIn}>Sign In With Google</button>}
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <img src={user.photo} alt="" />
      <br />
      <button onClick={handleFacebookSignIn}>Sign In With Facebook</button>
      <p>Name: {user.displayName}</p>
      <p>Email: {user.email}</p>
      <img src={user.photoURL} alt="" />
      <br />
      <button onClick={handleGithubSignIn}>Sign In With Github</button>
      <p>Name: {user.displayName}</p>
      <p>Email: {user.email}</p>
      <img src={user.photoURL} alt="" />
      <br />
      <button onClick={handleTwitterSignIn}>Sign In With Twitter</button>
      <p>Name: {user.displayName}</p>
      <p>Email: {user.email}</p>
      <img src={user.photoURL} alt="" />

    </div>
  );
}

export default App;
