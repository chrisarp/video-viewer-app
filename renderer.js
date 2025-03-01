const { ipcRenderer } = require('electron');

ipcRenderer.on('load-videos', (event, videoPaths) => {
    const videoContainer = document.getElementById('video-container');
    const videos = videoPaths.map(videoPath => {
        const videoElement = document.createElement('video');
        videoElement.src = videoPath;
        videoElement.controls = true;
        videoElement.title = videoPath; // Add this line to set the title attribute
        videoContainer.appendChild(videoElement);
        return videoElement;
    });

    const playPauseButton = document.getElementById('play-pause');
    const playbackSlider = document.getElementById('playback-slider');
    const loopAllCheckbox = document.getElementById('loop-all');
    const playbackSpeedSelect = document.getElementById('playback-speed');

    playPauseButton.addEventListener('click', () => {
        const isPlaying = videos.some(video => !video.paused);
        if (isPlaying) {
            videos.forEach(video => video.pause());
        } else {
            videos.forEach(video => video.play());
        }
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

    const updateSpeedDisplay = () => {
        const speedDisplay = document.getElementById('speed-display');
        if (speedDisplay) {
            speedDisplay.textContent = `Speed: ${videos[0].playbackRate.toFixed(1)}x`;
        }
    };

    playbackSpeedSelect.addEventListener('change', () => {
        const speed = parseFloat(playbackSpeedSelect.value);
        videos.forEach(video => {
            video.playbackRate = speed;
        });
        updateSpeedDisplay();
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
        const gapSize = 5;
        // const videoWidth = containerWidth / Math.floor(containerWidth / 200);
        const videoWidth = (containerWidth - gapSize) / Math.floor(containerWidth / (200 + gapSize));
        videos.forEach(video => {
            video.style.width = `${videoWidth - gapSize}px`;
            video.style.height = 'auto';
        });
    };

    window.addEventListener('resize', resizeVideos);
    resizeVideos();

    document.addEventListener('keydown', (event) => {
        if (event.code === 'Space') {
            event.preventDefault();
            playPauseButton.click();
        } else if (event.key === 'l' || event.key === 'L') {
            const newLoopState = !videos[0].loop;
            videos.forEach(video => {
                video.loop = newLoopState;
            });
            loopAllCheckbox.checked = newLoopState;
            console.log(`Looping is now ${newLoopState ? 'enabled' : 'disabled'}`);
        } else if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
            const options = Array.from(playbackSpeedSelect.options);
            const currentIndex = options.findIndex(option => option.value == playbackSpeedSelect.value);
            let newIndex;
            if (event.key === 'ArrowUp') {
                newIndex = Math.min(currentIndex + 1, options.length - 1);
            } else {
                newIndex = Math.max(currentIndex - 1, 0);
            }
            playbackSpeedSelect.selectedIndex = newIndex;
            const newSpeed = parseFloat(playbackSpeedSelect.value);
            videos.forEach(video => {
                video.playbackRate = newSpeed;
            });
            updateSpeedDisplay();
            console.log(`Playback speed changed to ${newSpeed}`);
        } else if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            videos.forEach(video => {
                video.pause();
                const frameTime = 1 / 30; // Assuming 30 FPS
                if (event.key === 'ArrowLeft') {
                    video.currentTime = Math.max(video.currentTime - frameTime, 0);
                } else {
                    video.currentTime = Math.min(video.currentTime + frameTime, video.duration);
                }
            });
            console.log(`Moved ${event.key === 'ArrowLeft' ? 'backward' : 'forward'} by one frame`);
        }
    });

    // Initial call to set the speed display
    updateSpeedDisplay();
});
