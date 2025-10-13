import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import './App.css'
import { auth } from './firebase.init';
import { useState } from 'react';

const googleProvider = new GoogleAuthProvider();
const githubProvier = new GithubAuthProvider();

function App() {
  const [user, setUser] = useState(null);

  const hanleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then(result => {
        console.log(result.user);
        setUser(result.user)
      })
      .catch(err => console.log(err))
  }

  const handleGithubSignIn = () => {
    signInWithPopup(auth, githubProvier)
      .then(result => {
        console.log(result.user);
        setUser(result.user)
      })
      .catch(err => console.log(err))
  }

  const hanleSignOut = () => {
    signOut(auth)
      .then(() => setUser(null))
      .catch(err => console.log(err))
  }

  return (
    <>
      <h2>Firebase Login W/ Google and Github</h2>

      {
        user ?
          <button onClick={hanleSignOut}>Sign Out</button> :
          <div>
            <button onClick={hanleGoogleSignIn}>Sign in With Google</button>
            <button onClick={handleGithubSignIn}>Sign in With Github</button>
          </div>
      }

      {
        user &&
        <div>
          <h4>Name: {user.displayName !== null ? user.displayName : user.reloadUserInfo.screenName}</h4>
          <h4>Email: {user.email}</h4>
          <img src={user.photoURL} alt="User Image" />
        </div>
      }
    </>
  )
}

export default App
