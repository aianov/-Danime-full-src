import React, { useEffect, useState } from 'react';
import styles from './TakeRandomAnime.module.css';
import axios from 'axios';
import DesignV2 from "../TitleInfoDesigns/v2/DesignV2";


function TakeRandomAnime() {
    const [title, setTitle] = useState(null);


    const RefreshTitle = () => {
        axios
            .get(`https://api.anilibria.tv/v3/title/random`)
            .then((res) => setTitle(res?.data))
            .catch((err) => console.error(err));
    };

    useEffect(() => {
        RefreshTitle();
    }, []);

    if (!title) {
        return <div className={styles['loading-container']}><h2>Loading...</h2></div>;
    }

    return (
        <div>
            <DesignV2 randomTitle={title}></DesignV2>
            <div className={styles.buttons}>
                <button className={styles.buttonnn} onClick={RefreshTitle}>Обновить</button>
            </div>
        </div>
    );
}

export default TakeRandomAnime;
