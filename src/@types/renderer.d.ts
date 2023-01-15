export interface IElectronAPI {
    loadPreferences: () => Promise<void>;
    setTitle: (title: string) => void;
    openFile: () => Promise<string>;
    sendSync: (msg: string) => Promise<string>;
    sendAsync: (msg: string) => void;
}

declare global {
    interface Window {
        electronAPI: IElectronAPI;
    }
}
