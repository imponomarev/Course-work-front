import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegistrationPage = () => {
    const [userData, setUserData] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (event) => {
        setUserData({ ...userData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:6969/auth/signup', userData);
            navigate('/');
        } catch (error) {
            console.error('Ошибка при регистрации:', error);
        }
    };

    return (
        <div className="login">
            <h1>Регистрация</h1>
            <form onSubmit={handleSubmit} className="form">
                <div className="text-field">
                    <label htmlFor="username" className="text-field__label">Имя пользователя</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        className="text-field__input"
                        value={userData.username}
                        onChange={handleChange}
                        placeholder="Имя пользователя"
                        required
                    />
                </div>
                <div className="text-field">
                    <label htmlFor="password" className="text-field__label">Пароль</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="text-field__input"
                        value={userData.password}
                        onChange={handleChange}
                        placeholder="Пароль"
                        required
                    />
                </div>
                <button type="submit" className="submit-button">Зарегистрироваться</button>
            </form>
        </div>
    );
};

export default RegistrationPage;