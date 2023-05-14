import React from 'react';
import './DesignV1.css';

function DesignV1({title, RefreshTitle, WatchAnime}) {

    const { names, posters, genres, description, status, type, season} = title;

    return (
        <div className='container'>
            <div className='anime-info'>
                <h2 className='name'>{names.ru}</h2>
                <img className='poster' src={`https://www.anilibria.tv${posters.original.url}`} alt={names.en} />
                <ul className='list'>
                    <li key={status.string}>{status.string}</li>
                    <li key={type.full_string}>{type.full_string}</li>
                    <li key={season.year}>{season.string + " " + season.year}</li>
                </ul>
                <ul className='list'>
                    {genres.map((genre) => (
                        <li key={genre}>{genre}</li>
                    ))}
                </ul>
                <p className='description'>{description}</p>
            </div>
            <div className='buttons'>
                <button onClick={RefreshTitle}>Обновить</button>
                <button onClick={WatchAnime}>Смотреть</button>
            </div>
        </div>
    );
}

export default DesignV1;
