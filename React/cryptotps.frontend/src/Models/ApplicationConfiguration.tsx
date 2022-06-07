import { Modes } from "./Enums";

export class ApplicationConfiguration {
    name: string;
    defaultMode: Modes;
    defaultProvider: string;
    defaultNetwork: string;

    constructor(name: string, defaultMode: Modes, defaultProvider: string, defaultNetwork: string) {
        this.name = name;
        this.defaultMode = defaultMode;
        this.defaultProvider = defaultProvider;
        this.defaultNetwork = defaultNetwork;
    }
}