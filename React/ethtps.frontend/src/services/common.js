import { GeneralApi, GPSApi, TPSApi } from './api-gen/src/index';
import ApiClient from './api-gen/src/ApiClient';

const client = new ApiClient('http://localhost:10202');
const globalGeneralApi = new GeneralApi(client);
const globalGPSApi = new GPSApi(client);
const globalTPSApi = new TPSApi(client);
export { globalGeneralApi, globalGPSApi, globalTPSApi };