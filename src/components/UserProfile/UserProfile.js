import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import authService from "../StartPage/authService";
import '../../styles/UserProfile.css';

const UserProfile = () => {
    const [user, setUser] = useState({ login: '', balance: 0 });
    const [bets, setBets] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userResponse = await axios.get(`http://localhost:6969/user/me`);
                setUser(userResponse.data);

                const betsResponse = await axios.get(`http://localhost:6969/bets`);
                setBets(betsResponse.data.bets);
            } catch (error) {
                console.error('Ошибка при получении данных о пользователе:', error);
            }
        };

        fetchUserData();
    }, []);

    const handleLogout = () => {
        authService.logout();
        navigate('/');
    };

    const handleReturn = () => {
        navigate('/main');
    };

    return (
        <div className="user-profile-page">
            <h2>Профиль пользователя</h2>
            <p>Логин: {user.login}</p>
            <p>Баланс: {user.balance.toFixed(2)}</p>
            <h3>Сделанные ставки:</h3>
            {bets.map((bet) => (
                <div key={bet.id} className="fight-card">
                    <p>Бой: {bet.fight.id}</p>
                    <p>Сумма ставки: {bet.credits}</p>
                    <p>Коэффициент: {bet.firstPokemonChoosen ? bet.fight.coefficientFirst.toFixed(2) : bet.fight.coefficientSecond.toFixed(2)}</p>
                    <p>Ставка на первого покемона: {bet.firstPokemonChoosen ? 'Да' : 'Нет'}</p>
                    <p>Бой завершен: {bet.fight.isCompleted ? 'Да' : 'Нет'}</p>
                    {bet.fight.firstWon && <p>Победил покемон номер {bet.fight.firstWon ? 1 : 2}</p>}
                </div>
            ))}
            <button onClick={handleReturn}>Вернуться на главную страницу</button>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default UserProfile;