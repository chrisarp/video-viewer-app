import React from 'react';

class VideoController extends React.Component {
    constructor(props) {
        super(props);
        this.videoPlayers = [];
        this.state = {
            playbackRate: 1,
        };
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

    setPlaybackRate = (event) => {
        const rate = parseFloat(event.target.value);
        this.setState({ playbackRate: rate });
        this.videoPlayers.forEach(player => player.setPlaybackRate(rate));
    };

    render() {
        return (
            <div>
                <button onClick={this.playAll}>Play All</button>
                <button onClick={this.pauseAll}>Pause All</button>
                <select onChange={this.setPlaybackRate} value={this.state.playbackRate}>
                    <option value="0.25">0.25X</option>
                    <option value="0.5">0.5X</option>
                    <option value="0.75">0.75X</option>
                    <option value="1">1X</option>
                    <option value="1.25">1.25X</option>
                    <option value="1.5">1.5X</option>
                    <option value="1.75">1.75X</option>
                    <option value="2">2X</option>
                </select>
            </div>
        );
    }
}

export default VideoController;