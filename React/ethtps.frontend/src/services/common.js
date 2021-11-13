import { GeneralApi, GPSApi, TPSApi } from './api-gen/src/index';
import ApiClient from './api-gen/src/ApiClient';
import InstantDataService from './InstantDataService';

const globalGeneralApi = new GeneralApi(client);
const globalGPSApi = new GPSApi(client);
const globalTPSApi = new TPSApi(client);
const globalInstantDataService = new InstantDataService(); 
export { globalGeneralApi, globalGPSApi, globalTPSApi, globalInstantDataService };