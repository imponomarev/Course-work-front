import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const DetailedFightPage = () => {
    const [fight, setFight] = useState(null);
    const [bets, setBets] = useState([]);
    const [betAmount, setBetAmount] = useState('');
    const [firstPokemonChoosen, setFirstPokemonChoosen] = useState(false);
    const navigate = useNavigate();
    const {fightId} = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fightResponse = await axios.get(`http://localhost:6969/fights/${fightId}`);
                setFight(fightResponse.data);

                const betsResponse = await axios.get(`http://localhost:6969/bets/by-fight/${fightId}`);
                setBets(betsResponse.data.bets);
            } catch (error) {
                console.error('Ошибка при получении данных:', error);
            }
        };

        fetchData();
    }, [fightId]);

    const handleBetSubmit = async () => {
        if (!betAmount) {
            alert('Пожалуйста, введите сумму ставки.');
            return;
        }
        try {
            await axios.post('http://localhost:6969/bets', {
                fightId,
                credits: betAmount,
                firstPokemonChoosen
            });
            alert('Ставка сделана!');

            const betsResponse = await axios.get(`http://localhost:6969/bets/by-fight/${fightId}`);
            setBets(betsResponse.data.bets);
        } catch (error) {
            alert('Ошибка при размещении ставки. Пожалуйста, попробуйте снова.');
        }
    };

    const handleStartFight = async () => {
        try {
            await axios.post(`http://localhost:6969/fights/start/${fightId}`);
            alert('Бой запущен!');
            navigate('/main');
        } catch (error) {
            alert('Ошибка при запуске боя. Пожалуйста, попробуйте снова.');
        }
    };

    if (!fight) {
        return <div>Загрузка информации о бое...</div>;
    }

    const handleReturn = () => {
        navigate('/main'); // Перенаправление на главную страницу
    };

    return (
        <div>
            <h2>Бой №{fight.id}</h2>
            <p>Первый Покемон: {fight.firstPokemon.name} (Типы: {fight.firstPokemon.types.join(', ')},
                Тренер: {fight.firstPokemon.trainer?.name}, Коэффициент: {fight.coefficientFirst.toFixed(2)})</p>
            <p>Второй Покемон: {fight.secondPokemon.name} (Типы: {fight.secondPokemon.types.join(', ')},
                Тренер: {fight.secondPokemon.trainer?.name}, Коэффициент: {fight.coefficientSecond.toFixed(2)})</p>
            <p>Место проведения: {fight.location.name}</p>
            <p>Статус боя: {fight.isCompleted ? 'Завершен' : 'Не завершен'}</p>
            {fight.firstWon && <p>Победил покемон номер {fight.firstWon ? 1 : 2}</p>}


            {!fight.isCompleted && (
                <>

                    <h3>Сделать ставку на бой</h3>
                    <input
                        type="number"
                        placeholder="Сумма ставки"
                        value={betAmount}
                        onChange={(e) => setBetAmount(e.target.value)}
                    />
                    <div>
                        <label>
                            <input
                                type="radio"
                                name="pokemonChoice"
                                checked={firstPokemonChoosen}
                                onChange={() => setFirstPokemonChoosen(true)}
                            />
                            Первый покемон
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="pokemonChoice"
                                checked={!firstPokemonChoosen}
                                onChange={() => setFirstPokemonChoosen(false)}
                            />
                            Второй покемон
                        </label>
                    </div>
                    <button onClick={handleBetSubmit}>Сделать ставку</button>
                    <button onClick={handleStartFight}>Запустить бой</button>
                </>
            )}
            <h3>Ставки на бой:</h3>
            {bets.map((bet) => (
                <div key={bet.id}>
                    <p>Сумма ставки: {bet.credits}</p>
                    <p>Ставка на первого покемона: {bet.firstPokemonChoosen ? 'Да' : 'Нет'}</p>
                </div>
            ))}
            <button onClick={handleReturn}>Вернуться на главную страницу</button>
        </div>
    );

};

export default DetailedFightPage;
