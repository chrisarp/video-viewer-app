const { ipcRenderer } = require('electron');

ipcRenderer.on('load-videos', (event, videoPaths) => {
    const videoContainer = document.getElementById('video-container');
    const videos = videoPaths.map(videoPath => {
        const videoElement = document.createElement('video');
        videoElement.src = videoPath;
        videoElement.controls = true;
        videoContainer.appendChild(videoElement);
        return videoElement;
    });

    const playAllButton = document.getElementById('play-all');
    const pauseAllButton = document.getElementById('pause-all');
    const playbackSlider = document.getElementById('playback-slider');
    const loopAllCheckbox = document.getElementById('loop-all');

    playAllButton.addEventListener('click', () => {
        videos.forEach(video => video.play());
    });

    pauseAllButton.addEventListener('click', () => {
        videos.forEach(video => video.pause());
    });

    playbackSlider.addEventListener('input', () => {
        const value = playbackSlider.value;
        videos.forEach(video => {
            video.currentTime = (video.duration * value) / 100;
        });
    });

    loopAllCheckbox.addEventListener('change', () => {
        const loop = loopAllCheckbox.checked;
        videos.forEach(video => {
            video.loop = loop;
        });
    });

    const updateSlider = () => {
        const currentTime = videos.reduce((sum, video) => sum + video.currentTime, 0) / videos.length;
        const duration = videos.reduce((sum, video) => sum + video.duration, 0) / videos.length;
        playbackSlider.value = (currentTime / duration) * 100;
    };

    videos.forEach(video => {
        video.addEventListener('timeupdate', updateSlider);
    });

    const resizeVideos = () => {
        const containerWidth = videoContainer.clientWidth;
        const videoWidth = containerWidth / Math.floor(containerWidth / 200);
        videos.forEach(video => {
            video.style.width = `${videoWidth - 10}px`;
            video.style.height = 'auto';
        });
    };

    window.addEventListener('resize', resizeVideos);
    resizeVideos();

    document.addEventListener('keydown', (event) => {
        if (event.code === 'Space') {
            event.preventDefault();
            const isPlaying = videos.some(video => !video.paused);
            if (isPlaying) {
                videos.forEach(video => video.pause());
            } else {
                videos.forEach(video => video.play());
            }
        }
    });
});
