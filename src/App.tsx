import React, { useState } from 'react';
import DirectorySelector from './components/DirectorySelector';
import VideoController from './components/VideoController';
import VideoPlayer from './components/VideoPlayer';

const App = () => {
    const [videoFiles, setVideoFiles] = useState<string[]>([]);

    const handleDirectorySelect = (files: string[]) => {
        setVideoFiles(files);
    };

    return (
        <div>
            <h1>Video Viewer Application</h1>
            <DirectorySelector onDirectorySelect={handleDirectorySelect} />
            <VideoController videoFiles={videoFiles} />
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {videoFiles.map((file, index) => (
                    <VideoPlayer key={index} videoSrc={file} />
                ))}
            </div>
        </div>
    );
};

export default App;