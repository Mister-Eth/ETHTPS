import { Modes } from "./Enums";
import { WebsiteSocialMediaLinks } from "./WebsiteSocialMediaLinks";

export class ApplicationConfiguration {
    name: string;
    defaultMode: Modes;
    defaultProvider: string;
    defaultNetwork: string;
    websiteSocialMediaLinks: WebsiteSocialMediaLinks;

    constructor(name: string, defaultMode: Modes, defaultProvider: string, defaultNetwork: string, websiteSocialMediaLinks: WebsiteSocialMediaLinks) {
        this.name = name;
        this.defaultMode = defaultMode;
        this.defaultProvider = defaultProvider;
        this.defaultNetwork = defaultNetwork;
        this.websiteSocialMediaLinks = websiteSocialMediaLinks;
    }
}