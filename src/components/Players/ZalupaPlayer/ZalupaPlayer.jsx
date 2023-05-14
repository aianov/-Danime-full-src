import React, { useState } from 'react';
import Select from 'react-select';
import styles from "./ZalupaPlayer.module.css";

function ZalupaPlayer({ player }) {
    const [episode, setEpisode] = useState(player.episodes.first);
    const [url, setURL] = useState(player.rutube[episode].rutube_id);

    if(url !== player.rutube[episode].rutube_id){
        setEpisode(player.episodes.first);
        setURL(player.rutube[episode].rutube_id);
    }

    const episodes = Object.keys(player.rutube).map((key) => {
        return {
            value: key,
            label: `Серия ${key}`,
        };
    });

    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            backgroundColor: '#1D1D1D',
            color: '#FFFFFF',
            border: state.isFocused ? '2px solid #1D1D1D' : '2px solid #1D1D1D',
            boxShadow: state.isFocused ? 'none' : 'none',
            '&:hover': {
                border: state.isFocused ? '2px solid #1D1D1D' : '2px solid #1D1D1D'
            }
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused ? '#212121' : '#1D1D1D',
            color: '#FFFFFF',
            '&:hover': {
                backgroundColor: '#212121'
            }
        }),
        singleValue: (provided, state) => ({
            ...provided,
            color: 'white'
        }),
        indicatorSeparator: () => ({
            display: 'none'
        }),
        menu: (provided, state) => ({
            ...provided,
            backgroundColor: '#1D1D1D',
            marginTop: '2px',
            borderRadius: '4px'
        })
    };

    const handleEpisodeChange = (selectedOption) => {
        const episode = selectedOption.value;
        const url = player.rutube[episode].rutube_id;
        setEpisode(episode);
        setURL(url);
    };

    return (
        <div>
            <div className={styles.selectors}>
                <Select
                    className={styles.selector}
                    value={{ value: episode, label: `Серия ${episode}` }}
                    options={episodes}
                    onChange={handleEpisodeChange}
                    styles={customStyles}
                />
            </div>
            <iframe
                title="zalupa"
                src={`https://rutube.ru/embed/${url}?skinColor=da124c`}
                webkitAllowFullScreen
                mozallowfullscreen
                allowFullScreen
                width="100%"
                height="461px"
                frameBorder="0"/>
        </div>
    );
}

export default ZalupaPlayer;
