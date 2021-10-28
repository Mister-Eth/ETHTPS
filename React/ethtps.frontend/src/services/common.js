import APIV2Api from './api-gen/src/api/APIV2Api';
import ApiClient from './api-gen/src/ApiClient';

const globalApi = new APIV2Api(new ApiClient('http://localhost:10202'));
export {globalApi};