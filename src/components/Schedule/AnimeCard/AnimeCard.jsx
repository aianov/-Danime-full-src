import React from 'react';
import styles from "../../TitleList/TitleList.module.css";
import {Link} from "react-router-dom";

const AnimeCard = ({ anime }) => {
    const path = `/anime/${anime.code}`;
    return (
        <Link
            to={path}
            className={styles.title}
            key={anime.code}
            data-description={anime.description}
        >
            <img
                className={styles.poster}
                src={`https://www.anilibria.tv${anime.posters.medium.url}`}
                alt="poster"
            />
            <div className={styles["title-name"]}>{anime.names.ru}</div>
            <div className={styles.genres}>{anime.genres.join(", ")}</div>
        </Link>
    );
};

export default AnimeCard;
