export interface IElectronAPI {
    loadPreferences: () => Promise<void>;
    setTitle: (title: string) => void;
    openFile: () => Promise<string>;
}

declare global {
    interface Window {
        electronAPI: IElectronAPI;
    }
}
