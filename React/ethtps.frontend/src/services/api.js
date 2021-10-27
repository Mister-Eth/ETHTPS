class API{
    constructor(endpoint){
        this.endpoint = endpoint;
    }

    async getTPS(provider, interval, network, includeSidechains) {
        return await fetch(this.buildTPSPath(provider, interval, network, includeSidechains)).then(response => response.json());
    }

    async getMaxTPS(provider) {
        return await fetch(`${this.endpoint}/MaxTPS?provider=${provider}`).then(response => response.json());
    }

    async getInstantTPS(includeSidechains) {
        return await fetch(`${this.endpoint}/InstantTPS?includeSidechains=${includeSidechains}`).then(response => response.json());
    }

    buildTPSPath(provider, interval, network, includeSidechains){
        return `${this.endpoint}/TPS?provider=${provider}&interval=${interval}&network=${network}&includeSidechains=${includeSidechains}`;
    }

    tpsDictionary = {};

    async getAllTPS(interval, network, includeSidechains){
         let key = interval + network + includeSidechains;
        if (this.tpsDictionary[key] === undefined){
            let providers = await this.getProviders();
            let fetchobj = providers.map(x => fetch(this.buildTPSPath(x.name, interval, network, includeSidechains)).then(response => response.json()));
            this.tpsDictionary[key] = await Promise.all(fetchobj);
        }
        return this.tpsDictionary[key];
    }

    async getProviders(){
        if (this.providers === undefined){
            this.providers = await fetch(`${this.endpoint}/Providers`).then(response => response.json());
        }
        return this.providers;
    }

    async getColorDict(){
        if (this.colorDict === undefined){
            this.colorDict = {};
            for(let p of await this.getProviders()){
                this.colorDict[p.name] = p.color;
            }
        }
        return this.colorDict;
    }

    async getProviderTypes(){
        if (this.providerTypes === undefined){
            this.providerTypes = await fetch(`${this.endpoint}/ProviderTypes`).then(response => response.json());
        }
        return this.providerTypes;
    }

    async getNetworks(){
        if (this.networks === undefined){
            this.networks = await fetch(`${this.endpoint}/Networks`).then(response => response.json());
        }
        return this.networks;
    }

    async getIntervals(){
        if (this.intervals === undefined){
            this.intervals = await fetch(`${this.endpoint}/Intervals`).then(response => response.json());
        }
        return this.intervals.map(this.toShortName);
    }

    toShortName(interval){
        switch(interval){
            case "OneHour":
                return "1h";
            case "OneDay":
               return "1d";
            case "OneWeek":
                return "1w";
            case "OneMonth":
                return "1m";
            default:
                return interval;
        }
    }

    toLongName(interval){
        switch(interval){
            case "1h":
                return "OneHour";
            case "1d":
               return "OneDay";
            case "1w":
                return "OneWeek";
            case "1m":
                return "OneMonth";
            default:
                return interval;
        }
    }
}

export default API;