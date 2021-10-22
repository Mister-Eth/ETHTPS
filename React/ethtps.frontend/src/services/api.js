class API{
    constructor(endpoint){
        this.endpoint = endpoint;

        fetch(`${this.endpoint}/Providers`).then(response => response.json()).then(x=> this.providers = x);
        fetch(`${this.endpoint}/ProviderTypes`).then(response => response.json()).then(x => this.providerTypes = x);
        fetch(`${this.endpoint}/Networks`).then(response => response.json()).then(x => this.networks = x);
        fetch(`${this.endpoint}/Intervals`).then(response => response.json()).then(x => this.intervals = x);
    }

    async getTPS(provider, interval, network, includeSidechains) {
        return await fetch(`${this.endpoint}/TPS?provider=${provider}&interval=${interval}&network=${network}&includeSidechains=${includeSidechains}`).then(response => response.json());
    }

    getProviders(){
        return this.providers;
    }

    getProviderTypes(){
        return this.providerTypes;
    }

    getNetworks(){
        return this.networks;
    }

    getIntervals(){
        return this.intervals;
    }
}

export default API;