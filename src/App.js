import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/StartPage/Login.js';
import BalanceTopUp from './components/Balance/BalanceTopUp.js';
import MainPage from './components/MainPage/MainPage.js';
import CreateFight from './components/CreateFight/CreateFight.js';
import UserProfile from "./components/UserProfile/UserProfile";
import RegistrationPage from "./components/StartPage/RegistrationPage";
import DetailedFightPage from './components/DetailedFightPage/DetailedFightPage.js';
import './App.css'
import axios from 'axios';

axios.defaults.withCredentials = true;

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<RegistrationPage />} />
                <Route path="/top-up" element={<BalanceTopUp />} />
                <Route path="/main" element={<MainPage />} />
                <Route path="/create-fight" element={<CreateFight />} />
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/fight/:fightId" element={<DetailedFightPage />} />
            </Routes>
        </Router>
    );
};

export default App;