import React, {useState} from 'react';
import Select from 'react-select';
import styles from "./VideoPlayer.module.css";
import VidstackPlayer from "../VidstackPlayer/VidstackPlayer";

function VideoPlayer({ player }) {
    const [episode, setEpisode] = useState(player.episodes.first);
    const [quality, setQuality] = useState(getMaxQuality());
    const [qualityText, setQualityText] = useState(getQualityText(quality));
    const [url, setURL] = useState(player.list[episode].hls[quality]);

    const episodes = Object.entries(player.list).map(([key, value]) => ({
        value: key,
        label: `Серия ${value.episode}`,
    }));

    const qualitys = Object.entries(player.list[episode].hls)
        .map(([key, value]) => {
            if (value !== null) {
                switch (key) {
                    case 'fhd':
                        return { value: key, label: '1080p' };
                    case 'hd':
                        return { value: key, label: '720p' };
                    case 'sd':
                        return { value: key, label: '480p' };
                    default:
                        return null;
                }
            }
            return null;
        })
        .filter(Boolean);

    function getMaxQuality() {
        const availableQualities = Object.entries(player.list[episode].hls)
            .filter(([key, value]) => value !== null)
            .map(([key]) => key);

        if (availableQualities.includes('fhd')) {
            return 'fhd';
        } else if (availableQualities.includes('hd')) {
            return 'hd';
        } else if (availableQualities.includes('sd')) {
            return 'sd';
        } else {
            return '';
        }
    }


    function getQualityText(quality) {
        switch (quality) {
            case 'fhd':
                return '1080p';
            case 'hd':
                return '720p';
            case 'sd':
                return '480p';
            default:
                return '';
        }
    }

    const handleEpisodeChange = (selectedOption) => {
        const { value: episode } = selectedOption;
        const url = player.list[episode].hls[quality];
        setEpisode(episode);
        setURL(url);
    };

    const handleQualityChange = (selectedOption) => {
        const { value: quality } = selectedOption;
        const qualityText = getQualityText(quality);
        const url = player.list[episode].hls[quality];
        setQuality(quality);
        setQualityText(qualityText);
        setURL(url);
    };




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






    return (
        <div>
            <div className={styles.selectors}>
                <Select
                    className={styles.selector}
                    value={{ value: episode, label: `Серия ${episode}` }}
                    options={episodes}
                    onChange={handleEpisodeChange}
                    styles={customStyles}
                    isSearchable={false}
                />
                <Select
                    className={styles.selector}
                    value={{ value: quality, label: `${qualityText}` }}
                    options={qualitys}
                    onChange={handleQualityChange}
                    styles={customStyles}
                    isSearchable={false}
                />
            </div>
            <VidstackPlayer url={`https://${player.host}${url}`} preview={`https://anilibria.tv${player.list[episode].preview}`}/>
        </div>
    );
}

export default VideoPlayer;
