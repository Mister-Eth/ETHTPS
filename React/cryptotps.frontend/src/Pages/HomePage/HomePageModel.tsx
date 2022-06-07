import { ApplicationConfiguration } from "../../Models/ApplicationConfiguration";

export class HomePageModel {
    configuration: ApplicationConfiguration;

    constructor(configuration: ApplicationConfiguration){
        this.configuration = configuration;
    }
}