# Video Viewer Application

This project is a video viewer application that allows users to select a directory containing MP4 videos. The application opens all selected videos in new windows, resizes them to tile and fill the window, and includes a single playback controller to control all videos simultaneously.

## Features

- Select a directory containing MP4 videos.
- Open all selected videos in separate windows.
- Resize videos to fit the window.
- Single playback controller to play, pause, and sync playback across all videos.

## Project Structure

```
video-viewer-app
├── src
│   ├── components
│   │   ├── VideoPlayer.tsx       # Handles individual video rendering and controls
│   │   ├── VideoController.tsx    # Provides a playback controller for all videos
│   │   └── DirectorySelector.tsx   # Allows users to select a directory of videos
│   ├── utils
│   │   └── videoUtils.ts          # Utility functions for video operations
│   ├── App.tsx                    # Main application component
│   └── index.tsx                  # Entry point of the application
├── public
│   └── index.html                 # Main HTML file
├── package.json                   # npm configuration file
├── tsconfig.json                  # TypeScript configuration file
└── README.md                      # Project documentation
```

## Installation

To run the application, you will need to have Node.js and npm installed on your machine. Follow the instructions below to install the required dependencies:
1. Install `nvm` (Node Version Manager) by following the instructions [here](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating):
   ```  
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
   ```
2. Verify the installation of nvm by following the instructions [here](https://github.com/nvm-sh/nvm?tab=readme-ov-file#verify-installation):
   ```
   command -v nvm
   ```
   which should output `nvm` if the installation was successful.
3. Install the required Node.js and npm by following the instructions [here](https://github.com/nvm-sh/nvm?tab=readme-ov-file#usage):
   ```   
   nvm install node # "node" is an alias for the latest version
   ```
4. [Verify the installation of Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm#checking-your-version-of-npm-and-nodejs) by running:
   ```
   node -v
   npm -v
   ```
   which should output the installed versions of Node.js and npm.
   
The application can now be installed by following the instructions below:
1. Clone the repository:
   ```
   git clone https://github.com/chrisarp/video-viewer-app
   ```
2. Navigate to the project directory:
   ```
   cd video-viewer-app
   ```
3. Install the dependencies:
   ```
   npm install
   ```

## Usage

1. Start the application:
   ```
   npm start
   ```
2. Use the directory selector to choose a folder containing MP4 videos.
3. Control playback using the provided playback controller.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.