import React, { Component } from 'react';

interface VideoPlayerProps {
    src: string;
}

interface VideoPlayerState {
    isPlaying: boolean;
}

class VideoPlayer extends Component<VideoPlayerProps, VideoPlayerState> {
    private videoRef: React.RefObject<HTMLVideoElement>;

    constructor(props: VideoPlayerProps) {
        super(props);
        this.state = {
            isPlaying: false,
        };
        this.videoRef = React.createRef();
    }

    play = () => {
        this.videoRef.current?.play();
        this.setState({ isPlaying: true });
    };

    pause = () => {
        this.videoRef.current?.pause();
        this.setState({ isPlaying: false });
    };

    resizeVideo = () => {
        const videoElement = this.videoRef.current;
        if (videoElement) {
            videoElement.style.width = '100%';
            videoElement.style.height = '100%';
        }
    };

    componentDidMount() {
        window.addEventListener('resize', this.resizeVideo);
        this.resizeVideo();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resizeVideo);
    }

    render() {
        return (
            <video ref={this.videoRef} src={this.props.src} controls />
        );
    }
}

export default VideoPlayer;