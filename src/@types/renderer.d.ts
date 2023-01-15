export interface IElectronAPI {
    loadPreferences: () => Promise<void>;
    setTitle: (title: string) => void;
    openFile: () => Promise<string>;
    sendSync: (msg: string) => Promise<string>;
    sendAsync: (msg: string) => void;
    onUpdateCounter: (callback: (event: Electron.IpcRendererEvent, value: any) => void) => void;
}

declare global {
    interface Window {
        electronAPI: IElectronAPI;
    }
}
