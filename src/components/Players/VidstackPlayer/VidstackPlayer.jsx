import 'vidstack/styles/defaults.css';


import {MediaOutlet, MediaPlayer} from '@vidstack/react';

const VidstackPlayer = ({ url, preview }) => {

    return (
        <MediaPlayer
            // aspect-ratio={16 / 9}
            src={url}
            poster={preview}
            controls
            width='100%'
            height='100%'

            keyShortcuts={{
                togglePaused: 'k Space',
                toggleMuted: 'm',
                toggleFullscreen: 'f',
                togglePictureInPicture: 'i',
                toggleCaptions: 'c',
                seekBackward: 'ArrowLeft',
                seekForward: 'ArrowRight',
                volumeUp: 'ArrowUp',
                volumeDown: 'ArrowDown',
            }}

        >
            {/* ^ remove `controls` attribute if you're designing a custom UI */}
            <MediaOutlet />

        </MediaPlayer>
    );
};

export default VidstackPlayer;