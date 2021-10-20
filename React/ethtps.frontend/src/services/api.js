class API{
    constructor(endpoint){
        this.endpoint = endpoint;
    }

    async getTPS(provider, interval) {
        return await fetch(`${this.endpoint}/GetTPS?provider=${provider}&interval=${interval}`).then(response => response.json());
    }

    async getProviders(){
        if (this.providers === null){
            this.providers = await fetch(`${this.endpoint}/Providers`).then(response => response.json());
        }
        return this.providers;
    }

    async getProviderTypes(){
        if (this.providerTypes === null){
            this.providerTypes = await fetch(`${this.endpoint}/ProviderTypes`).then(response => response.json());
        }
        return this.providerTypes;
    }

    async getNetworks(){
        if (this.networks === null){
            this.networks = await fetch(`${this.endpoint}/Networks`).then(response => response.json());
        }
        return this.networks;
    }

    async getIntervals(){
        if (this.intervals === null){
            this.intervals = await fetch(`${this.endpoint}/Intervals`).then(response => response.json());
        }
        return this.intervals;
    }
}

export default API;