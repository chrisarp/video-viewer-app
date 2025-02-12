import React from 'react';

class VideoController extends React.Component {
    constructor(props) {
        super(props);
        this.videoPlayers = [];
    }

    playAll = () => {
        this.videoPlayers.forEach(player => player.play());
    };

    pauseAll = () => {
        this.videoPlayers.forEach(player => player.pause());
    };

    syncPlayback = (isPlaying) => {
        if (isPlaying) {
            this.playAll();
        } else {
            this.pauseAll();
        }
    };

    registerPlayer = (player) => {
        this.videoPlayers.push(player);
    };

    render() {
        return (
            <div>
                <button onClick={this.playAll}>Play All</button>
                <button onClick={this.pauseAll}>Pause All</button>
            </div>
        );
    }
}

export default VideoController;