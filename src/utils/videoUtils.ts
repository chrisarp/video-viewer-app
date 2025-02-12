export const isMP4 = (fileName: string): boolean => {
    return fileName.endsWith('.mp4');
};

export const getVideoMetadata = async (videoUrl: string): Promise<VideoMetadata> => {
    return new Promise((resolve, reject) => {
        const video = document.createElement('video');
        video.src = videoUrl;

        video.onloadedmetadata = () => {
            const metadata: VideoMetadata = {
                duration: video.duration,
                width: video.videoWidth,
                height: video.videoHeight,
            };
            resolve(metadata);
        };

        video.onerror = () => {
            reject(new Error('Error loading video metadata'));
        };
    });
};

export interface VideoMetadata {
    duration: number;
    width: number;
    height: number;
}