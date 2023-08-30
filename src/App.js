import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoteState from './context/Notes/Notestate';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import About from './components/About';
import Alert from './components/Alert';
import './App.css';
import AuthState from './context/Auth/AuthState';
import Profiles from './components/Profiles';

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (alertMessage, alertType) => {
    setAlert({
      alertMessage: alertMessage,
      alertType: alertType
    })
    setTimeout(() => {
      setAlert(null)
    }, 1500);
  }

  return (
    <>
      <AuthState>
        <NoteState>
          <BrowserRouter>
            <Navbar />
            <Alert alert={alert} />
            <div className="container">
              <Routes>
                <Route exact path="/" element={<Home showAlert={showAlert} />}></Route>
                <Route exact path="/about" element={<About />}></Route>
                <Route exact path="/login" element={<Login showAlert={showAlert} />} ></Route>
                <Route exact path="/signup" element={<Signup showAlert={showAlert} />}></Route>
                <Route exact path="/profile" element={<Profiles />}></Route>
              </Routes>
            </div>
          </BrowserRouter>
        </NoteState>
      </AuthState>
    </>
  );
}

export default App;
