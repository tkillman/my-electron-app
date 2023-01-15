// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    setTitle: (title: string) => ipcRenderer.send('set-title', title),
    openFile: () => ipcRenderer.invoke('dialog:openFile'),
    sendSync: (msg: string) => ipcRenderer.sendSync('synchronous-message', msg),
    sendAsync: (msg: string) => ipcRenderer.send('asynchronous-message', msg),
});

ipcRenderer.on('asynchronous-reply', (_event, arg) => {
    console.log(arg); // prints "pong" in the DevTools console
});
