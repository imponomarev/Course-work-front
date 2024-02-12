import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/MainPage.css';

const MainPage = () => {
    const [fights, setFights] = useState([]);
    const [userBalance, setUserBalance] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFightsAndBalance = async () => {
            try {
                const fightsResponse = await axios.get('http://localhost:6969/fights');
                setFights(fightsResponse.data.fights);


                const userBalanceResponse = await axios.get(`http://localhost:6969/user/balance`);
                setUserBalance(userBalanceResponse.data.balance);
            } catch (error) {
                console.error('Ошибка при получении данных:', error);
            }
        };

        fetchFightsAndBalance();
    }, []);

    const handleBetClick = (fightId) => {
        navigate('/bet', { state: { fightId: fightId } });
    };

    const goToProfile = () => {
        navigate('/profile');
    };

    return (
        <div>
            <div className="top-bar">
                <div className="balance">Баланс: {userBalance} кредитов</div>
                <div className="profile-icon" onClick={goToProfile}>Профиль</div>
            </div>
            <h1>Главная страница</h1>
            <button onClick={() => navigate('/create-fight')}>Создать бой</button>
            <button onClick={() => navigate('/top-up')}>Пополнить баланс</button>
            {fights.map((fight) => (
                <div key={fight.id}>
                    <h3>Бой №{fight.id}</h3>
                    <p>Первый Покемон: {fight.firstPokemon.name} (Тип: {fight.firstPokemon.type}, Тренер: {fight.firstPokemon.trainer?.name})</p>
                    <p>Коэффициент на победу: {fight.coefficientFirst.toFixed(2)}</p>
                    <p>Второй Покемон: {fight.secondPokemon.name} (Тип: {fight.secondPokemon.type}, Тренер: {fight.secondPokemon.trainer?.name})</p>
                    <p>Коэффициент на победу: {fight.coefficientSecond.toFixed(2)}</p>
                    <p>Место проведения: {fight.location.name}</p>
                    <p>Статус боя: {fight.isCompleted ? 'Завершен' : 'Не завершен'}</p>
                    <button onClick={() => handleBetClick(fight.id)}>Сделать ставку</button>
                </div>
            ))}
        </div>
    );
};

export default MainPage;