import { WebsiteSocialMediaLinks } from "../../Models/WebsiteSocialMediaLinks";

export class HeaderModel {
    applicationName: string;
    socialMediaLinks: WebsiteSocialMediaLinks;

    constructor(applicationName: string, socialMediaLinks: WebsiteSocialMediaLinks) {
        this.applicationName = applicationName;
        this.socialMediaLinks = socialMediaLinks;
    }
}