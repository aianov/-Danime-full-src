import React, { useRef, useEffect } from 'react';
import Hls from 'hls.js';
import "./HlsPLayer.module.css";


//не используеться
const HlsPlayer = ({ url, preview }) => {
    const videoRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;

        if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(url);
            hls.attachMedia(video);
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = url;
        }
    }, [url]);

    return (
            <video width='100%'
                   height='100%'
                   poster={preview}
                   ref={videoRef}
                   controls
            />

    );
};

export default HlsPlayer;
