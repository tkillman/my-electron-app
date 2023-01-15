/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/latest/tutorial/process-model
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import './index.css';

// title 변경
console.log('👋 This message is being logged by "renderer.js", included via webpack');
const setButton = document.getElementById('btn');
const titleInput = document.getElementById('title');
setButton.addEventListener('click', () => {
    console.log('click', (<HTMLInputElement>titleInput).value);
    const title = (<HTMLInputElement>titleInput).value;
    window.electronAPI.setTitle(title);
});

// 파일제어
const btnFile = document.getElementById('btnFile');
const filePathElement = document.getElementById('filePath');
btnFile.addEventListener('click', async () => {
    const filePath = await window.electronAPI.openFile();
    filePathElement.innerText = filePath ?? '';
});

//sync 메시지 보내기
const btnSync = document.getElementById('btnSync');
btnSync.addEventListener('click', async () => {
    const resultBtnSync = await window.electronAPI.sendSync('ping sync');
    console.log('resultBtnSync', resultBtnSync);
});

//async 메시지 보내기
const btnASync = document.getElementById('btnASync');
btnASync.addEventListener('click', () => {
    window.electronAPI.sendAsync('ping async');
});

//카운터
const counter = document.getElementById('counter');
window.electronAPI.onUpdateCounter((_event, value) => {
    const oldValue = Number(counter.innerText);
    const newValue = oldValue + value;
    counter.innerText = newValue;
    _event.sender.send('counter-value', newValue);
});
