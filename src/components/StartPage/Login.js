import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from './authService';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await authService.login(username, password);
            navigate('/main');
        } catch (err) {
            setError('Ошибка входа. Пожалуйста, проверьте ваши данные.');
        }
    };

    return (
        <div className={'login'}>
            <form onSubmit={handleSubmit}>
                <div class="text-field">
                    <label class="text-field__label" htmlFor="username">Логин:</label>
                    <input
                        class="text-field__input"
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Пароль:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Войти</button>
            </form>
            {error && <div>{error}</div>}
            <div>
                <a href="/register">Регистрация</a>
            </div>
        </div>
    );
};

export default Login;