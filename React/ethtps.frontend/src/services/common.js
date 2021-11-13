import { GeneralApi, GPSApi, TPSApi } from './api-gen/src/index';
import ApiClient from './api-gen/src/ApiClient';
import InstantDataService from './InstantDataService';

const client = new ApiClient('http://localhost:10202/');
const globalGeneralApi = new GeneralApi(client);
const globalGPSApi = new GPSApi(client);
const globalTPSApi = new TPSApi(client);
const globalInstantDataService = new InstantDataService(); 
const formatModeName = function(mode) {
    if (mode !== "gasAdjustedTPS"){
      return mode.toUpperCase();
    }
    else{
      return "gas-adjusted TPS"
    }
  }

const capitalizeFirstLetter = function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

export { globalGeneralApi, globalGPSApi, globalTPSApi, globalInstantDataService, formatModeName, capitalizeFirstLetter };