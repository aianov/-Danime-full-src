import React, { useState } from 'react';
import styles from "./Login.module.css";
import logo from "../../images/logo.svg";
import {Link} from "react-router-dom";

const Login = ({ onLoggedIn }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [shouldReload, setShouldReload] = useState(false);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData();
            formData.append('mail', email);
            formData.append('passwd', password);

            const response = await fetch('https://www.anilibria.tv/public/login.php', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (data.err !== 'ok') {
                setError(data.mes);
            } else {
                localStorage.setItem('userKey', data.sessionId);
                setShouldReload(true);
                onLoggedIn();
            }

        } catch (error) {
            console.error(error);
        }
    };

    if (shouldReload) {
        return null;
    }

    return (
        <div className={styles.conteiner}>
            <Link to="/">
                <img className={styles.logo} src={logo} alt="logo" />
            </Link>
            <form onSubmit={handleSubmit} className={styles.form}>
                {error && <p className={styles.error}>{error}</p>}
                <input className={styles.input} required="" type="text" name="mail" value={email} onChange={handleEmailChange} placeholder="Никнейм или почта" />
                <input className={styles.input} required="" type="password" name="passwd" value={password} onChange={handlePasswordChange} placeholder="Пароль" />
                <button className={styles.button} type="submit">Войти</button>
            </form>
            <a className={styles.a} href="https://www.anilibria.tv/pages/cp.php" target="_blank" rel="noreferrer">*Регистрация доступна на сайте AniLibria.TV!</a>
        </div>
    );
};

export default Login;
