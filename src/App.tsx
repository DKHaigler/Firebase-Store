import './App.css';
import { SignUpIn } from './Components/SignUpIn/SignUpIn';
import { Header } from './Components/Layout/Header/header';
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
          <p>Task Manager</p>
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

      <Header 
      user={user}
      />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/tasks" element={<TasksPage user={user}/>} />

        <Route path="/inbox" element={<InboxPage />} />
      </Routes>

    </BrowserRouter>
    )
}
export default App;
