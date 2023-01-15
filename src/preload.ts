// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    setTitle: (title: string) => ipcRenderer.send('set-title', title),
    openFile: () => ipcRenderer.invoke('dialog:openFile'),
    sendSync: (msg: string) => ipcRenderer.sendSync('synchronous-message', msg),
    sendAsync: (msg: string) => ipcRenderer.send('asynchronous-message', msg),
    onUpdateCounter: (callback: any) => ipcRenderer.on('update-counter', callback),
});

ipcRenderer.on('asynchronous-reply', (_event, arg) => {
    console.log(arg); // prints "pong" in the DevTools console
});

// window.addEventListener('DOMContentLoaded', () => {
//     const counter = document.getElementById('counter');
//     ipcRenderer.on('update-counter', (_event, value) => {
//         const oldValue = Number(counter.innerText);
//         const newValue = oldValue + value;
//         counter.innerText = newValue;
//     });
// });
