const { app, BrowserWindow, dialog, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;
let videoWindow;

function createMainWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    mainWindow.loadFile('index.html');

    mainWindow.on('closed', function () {
        mainWindow = null;
    });
}

function createVideoWindow(videoPaths) {
    videoWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    videoWindow.loadFile('videos.html');

    videoWindow.webContents.on('did-finish-load', () => {
        videoWindow.webContents.send('load-videos', videoPaths);
    });

    videoWindow.on('closed', function () {
        videoWindow = null;
    });
}

app.on('ready', createMainWindow);

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function () {
    if (mainWindow === null) {
        createMainWindow();
    }
});

ipcMain.on('select-directory', async (event) => {
    const result = await dialog.showOpenDialog(mainWindow, {
        properties: ['openDirectory']
    });

    if (!result.canceled) {
        const directoryPath = result.filePaths[0];
        const videoPaths = fs.readdirSync(directoryPath)
            .filter(file => file.endsWith('.mp4'))
            .map(file => path.join(directoryPath, file));

        createVideoWindow(videoPaths);
    }
});
