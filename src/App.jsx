import './App.css';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { db, auth, app } from './lib/firebase';
import Todo  from './Components/Todo';
import { CustomButton } from './Components/Button/Button';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        //User is signed in
        setUser(currentUser);
      } else {
        //User is signed out
        setUser(null)
      }
    })

    return () => unsubscribe();
  })

    //Sign Up
    const signUp = () => {
      createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        setUser(userCredential.user);
        console.log('User signed up:', userCredential.user);
      })
      .catch(error => {
        console.error('Error signing up:', error);
      });
    }

    //Sign In
    const signIn = () => {
      signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        setUser(userCredential.user);
        console.log('User signed in:', userCredential.user);
      })
      .catch(error => {
        console.error('Error signing in:', error);
      });
    }
    //Sign out
    const logOut = () => {
      signOut(auth)
      .then(() => {
        setUser(null);
        console.log('User signed out');
      })
      .catch(error => {
        console.error('Error signing out:', error);
      });
    }
   return (
    <>

    <div>
      {
        !user && (
          <>
          <p>Firestore Authentication</p>
          <input type='text' placeholder='Email' value={email} onChange={(event) => setEmail(event.target.value)}/>
          <input type='password' placeholder='Password' value={password} onChange={(event) => setPassword(event.target.value)}/>
            <CustomButton label="Sign Up" hoverColor="green" onClick={signUp}/>
            <CustomButton label="Sign in" hoverColor="green" onClick={signIn}/>
            
          </>
        )
      }
    </div>

    {
      user && (
        <div>
          <Todo user={user} />
          <div className='user-logged__container'>
            <p>Logged in as: {user.email}</p>
            <CustomButton label="Sign Out" hoverColor="red" onClick={logOut}/>
          </div>
        </div>
      
      )
    }
    </>
  )
}

export default App;
