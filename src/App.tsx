import './App.css';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { auth } from './lib/firebase';
import Todo  from './Components/Todo';
import { CustomButton } from './Components/Button/Button';
import { SignUpIn } from './Components/SignUpIn/SignUpIn';
import { User } from "firebase/auth";

function App() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
      
    })

    return () => unsubscribe();
  }, [])

    //Sign Up
    const signUp = () => {
      createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
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
        console.log('User signed out');
      })
      .catch(error => {
        console.error('Error signing out:', error);
      });
    }

    
    if (user ===undefined) {
      return <p>Loading...</p>
    }

    if (user===null)  return (
    <>

    <div>
          <>
          <p>Firestore Authentication</p>
          <SignUpIn 
            signIn={signIn}
            signUp={signUp}
            email={email}
            password={password}
            setEmail={setEmail}
            setPassword={setPassword}
          />
          </>
    </div>

    </>
  )
  
    return  (
      <div>
        <Todo user={user} />
        <div className='user-logged__container'>
          <p>Logged in as: {user.email}</p>
          <CustomButton label="Sign Out" hoverColor="red" onClick={logOut}/>
        </div>
      </div>
    
    )
  
}

export default App;
