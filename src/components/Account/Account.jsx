import React, { useEffect, useState } from 'react';
import styles from './Account.module.css';
import Login from '../Login/Login';
import axios from 'axios';
import loadingStyles from '../TakeRandomAnime/TakeRandomAnime.module.css';

const Account = () => {
    const [userKey, setUserKey] = useState(localStorage.getItem('userKey'));
    const [accountInfo, setAccountInfo] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(`https://api.anilibria.tv/v3/user?session=${userKey}`);
                setAccountInfo(data);
            } catch (error) {
                console.error(error);
            }
        };

        if (userKey !== null) {
            fetchData();
        } else {
            setAccountInfo('userKey empty');
        }
    }, [userKey]);

    const handleLogout = () => {
        localStorage.clear();
        setUserKey(null);
    };

    if (accountInfo === null) {
        return (
            <div className={loadingStyles['loading-container']}>
                <h2>Loading...</h2>
            </div>
        );
    }

    return userKey === null ? (
        <Login onLoggedIn={() => setUserKey(localStorage.getItem('userKey'))} />
    ) : (
        <div className={styles.container}>
            <div className={styles.card}>
                <img src={`https://www.anilibria.tv${accountInfo.avatar_original}`} alt="avatar" className={styles.avatar} />
                <h2 className={styles.title}>{accountInfo.login}</h2>
                <p className={styles.subtitle}>Зритель Danime</p>
                <button className={styles.button} onClick={handleLogout}>
                    Выйти из аккаунта
                </button>
            </div>
        </div>
    );
};

export default Account;
