import './App.css';
import { SignUpIn } from './Components/UI/SignUpIn/SignUpIn';
import { Header } from './Components/Layout/Header/Header';
import { useAuth } from './context/AuthContext';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/Homepage/HomePage";
import TasksPage from "./pages/TasksPage/TasksPage";
import InboxPage from "./pages/InboxPage/InboxPage";



function App() {
  const { user, loading, signIn, signUp} = useAuth() 

    if (loading) {
      return <p>Loading...</p>
    }

    if (!user) {
      return (
    <>
    <div>
          <>
          <div className="title">
            <h1>Team Task Manager</h1>
          </div>
          <SignUpIn
          signIn={signIn}
          signUp={signUp}
          />
          </>
    </div>
    </>
      )
    }
    return  (
      <BrowserRouter>
      <div className="app-container">

        <Header 
        user={user}
        />

        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/tasks" element={<TasksPage user={user}/>} />

          <Route path="/inbox" element={<InboxPage />} />
        </Routes>

      </div>
    </BrowserRouter>
    )
}
export default App;
