class API{
    constructor(endpoint){
        this.endpoint = endpoint;
    }

    async getTPS(provider, interval) {
        return await fetch(`${this.endpoint}/GetTPS?provider=${provider}&interval=${interval}`).then(response => response.json());
    }
}

export default API;