import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import styles from './DesignV2.module.css';
import axios from "axios";
import loadingStyles from "../../TakeRandomAnime/TakeRandomAnime.module.css";
import VideoPlayer from "../../Players/VideoPlayer/VideoPlayer";
import ZalupaPlayer from "../../Players/ZalupaPlayer/ZalupaPlayer";
import Header from "../../Headers/NewHeader/NewHeader";

function DesignV2({randomTitle}) {

    const params = useParams();


    const [title, setTitle] = useState(null);


    useEffect(() => {
        
        if(params.code !== undefined){
            axios
                .get(`https://api.anilibria.tv/v3.0/title?code=${params.code}&remove=torrents`)
                .then((res) => setTitle(res?.data))
                .catch((err) => console.error(err))
        }
        else {
            setTitle(randomTitle);
        }
        
    }, [params.code, randomTitle]);


    if (!title) {
        return <div className={loadingStyles["loading-container"]}><h2>Loading...</h2></div>;
    }


    const {id, names, genres, description, status, type, season, player } = title;


    let date = "";
    if(season.string){
        date += season.string + " ";
    }
    if(season.year){
        date += season.year;
    }


    let zalupaPlayer = false;
    if(Object.keys(player.list).length === 0){
        zalupaPlayer = true;
    }
    
    
    return (
        <div>
            <Header isTitle={true}/>
            <div className={styles["outer-container"]}>
                <div className={styles.container}>
                    <div>
                        <img className={styles.poster} src={`https://api.litelibria.com/posters/${id}.webp`} alt={names.en} />
                        <div className={styles["anime-specifications"]}>
                            <p className={styles.ppp}><strong className={styles["name-spec"]}>Статус: </strong>{status.string}</p>
                            <p className={styles.ppp}><strong className={styles["name-spec"]}>Жанры: </strong>{genres.join(', ')}</p>
                            <p className={styles.ppp}><strong className={styles["name-spec"]}>Год релиза: </strong>{date}</p>
                            <p className={styles.ppp}><strong className={styles["name-spec"]}>Тип: </strong>{type.full_string}</p>
                        </div>
                    </div>
                    <div>
                        <div className={styles["title-name-description"]}>
                            <h2 className={styles.name}>{names.ru}</h2>
                            <p className={styles.description}>{description}</p>
                        </div>
                        <div className={styles.player}>
                            {zalupaPlayer ? (
                                <ZalupaPlayer player={player} />
                            ) : (
                                <VideoPlayer player={player} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DesignV2;
