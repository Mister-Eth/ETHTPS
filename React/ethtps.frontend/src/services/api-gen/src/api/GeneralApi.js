/**
 * ETHTPS.API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */


import ApiClient from "../ApiClient";
import AllDataModel from '../model/AllDataModel';
import ProviderResponseModel from '../model/ProviderResponseModel';

/**
* General service.
* @module api/GeneralApi
* @version 1.0
*/
export default class GeneralApi {

    /**
    * Constructs a new GeneralApi. 
    * @alias module:api/GeneralApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instance} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }


    /**
     * Callback function to receive the result of the aPIV2AllDataGet operation.
     * @callback module:api/GeneralApi~aPIV2AllDataGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/AllDataModel} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Object} opts Optional parameters
     * @param {String} opts.network  (default to 'Mainnet')
     * @param {module:api/GeneralApi~aPIV2AllDataGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/AllDataModel}
     */
    aPIV2AllDataGet(opts, callback) {
      opts = opts || {};
      let postBody = null;

      let pathParams = {
      };
      let queryParams = {
        'network': opts['network']
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = [];
      let contentTypes = [];
      let accepts = ['text/plain', 'application/json', 'text/json'];
      let returnType = AllDataModel;
      return this.apiClient.callApi(
        '/API/v2/AllData', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the aPIV2ColorDictionaryGet operation.
     * @callback module:api/GeneralApi~aPIV2ColorDictionaryGetCallback
     * @param {String} error Error message, if any.
     * @param {Object.<String, {String: String}>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {module:api/GeneralApi~aPIV2ColorDictionaryGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Object.<String, {String: String}>}
     */
    aPIV2ColorDictionaryGet(callback) {
      let postBody = null;

      let pathParams = {
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = [];
      let contentTypes = [];
      let accepts = ['text/plain', 'application/json', 'text/json'];
      let returnType = {'String': 'String'};
      return this.apiClient.callApi(
        '/API/v2/ColorDictionary', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the aPIV2GetIntervalsWithDataGet operation.
     * @callback module:api/GeneralApi~aPIV2GetIntervalsWithDataGetCallback
     * @param {String} error Error message, if any.
     * @param {Array.<String>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Object} opts Optional parameters
     * @param {String} opts.provider 
     * @param {String} opts.network 
     * @param {Boolean} opts.includeSidechains 
     * @param {module:api/GeneralApi~aPIV2GetIntervalsWithDataGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<String>}
     */
    aPIV2GetIntervalsWithDataGet(opts, callback) {
      opts = opts || {};
      let postBody = null;

      let pathParams = {
      };
      let queryParams = {
        'Provider': opts['provider'],
        'Network': opts['network'],
        'IncludeSidechains': opts['includeSidechains']
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = [];
      let contentTypes = [];
      let accepts = ['text/plain', 'application/json', 'text/json'];
      let returnType = ['String'];
      return this.apiClient.callApi(
        '/API/v2/GetIntervalsWithData', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the aPIV2GetUniqueDataYearsGet operation.
     * @callback module:api/GeneralApi~aPIV2GetUniqueDataYearsGetCallback
     * @param {String} error Error message, if any.
     * @param {Array.<String>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Object} opts Optional parameters
     * @param {String} opts.provider 
     * @param {String} opts.network 
     * @param {Boolean} opts.includeSidechains 
     * @param {module:api/GeneralApi~aPIV2GetUniqueDataYearsGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<String>}
     */
    aPIV2GetUniqueDataYearsGet(opts, callback) {
      opts = opts || {};
      let postBody = null;

      let pathParams = {
      };
      let queryParams = {
        'Provider': opts['provider'],
        'Network': opts['network'],
        'IncludeSidechains': opts['includeSidechains']
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = [];
      let contentTypes = [];
      let accepts = ['text/plain', 'application/json', 'text/json'];
      let returnType = ['String'];
      return this.apiClient.callApi(
        '/API/v2/GetUniqueDataYears', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the aPIV2InstantDataGet operation.
     * @callback module:api/GeneralApi~aPIV2InstantDataGetCallback
     * @param {String} error Error message, if any.
     * @param {Object.<String, {String: Object}>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Object} opts Optional parameters
     * @param {String} opts.provider 
     * @param {String} opts.network 
     * @param {Boolean} opts.includeSidechains 
     * @param {String} opts.smoothing  (default to '')
     * @param {module:api/GeneralApi~aPIV2InstantDataGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Object.<String, {String: Object}>}
     */
    aPIV2InstantDataGet(opts, callback) {
      opts = opts || {};
      let postBody = null;

      let pathParams = {
      };
      let queryParams = {
        'Provider': opts['provider'],
        'Network': opts['network'],
        'IncludeSidechains': opts['includeSidechains'],
        'smoothing': opts['smoothing']
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = [];
      let contentTypes = [];
      let accepts = ['text/plain', 'application/json', 'text/json'];
      let returnType = {'String': Object};
      return this.apiClient.callApi(
        '/API/v2/InstantData', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the aPIV2IntervalsGet operation.
     * @callback module:api/GeneralApi~aPIV2IntervalsGetCallback
     * @param {String} error Error message, if any.
     * @param {Array.<String>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {module:api/GeneralApi~aPIV2IntervalsGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<String>}
     */
    aPIV2IntervalsGet(callback) {
      let postBody = null;

      let pathParams = {
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = [];
      let contentTypes = [];
      let accepts = ['text/plain', 'application/json', 'text/json'];
      let returnType = ['String'];
      return this.apiClient.callApi(
        '/API/v2/Intervals', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the aPIV2MaxGet operation.
     * @callback module:api/GeneralApi~aPIV2MaxGetCallback
     * @param {String} error Error message, if any.
     * @param {Object.<String, {String: Object}>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Object} opts Optional parameters
     * @param {String} opts.provider 
     * @param {String} opts.network 
     * @param {Boolean} opts.includeSidechains 
     * @param {module:api/GeneralApi~aPIV2MaxGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Object.<String, {String: Object}>}
     */
    aPIV2MaxGet(opts, callback) {
      opts = opts || {};
      let postBody = null;

      let pathParams = {
      };
      let queryParams = {
        'Provider': opts['provider'],
        'Network': opts['network'],
        'IncludeSidechains': opts['includeSidechains']
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = [];
      let contentTypes = [];
      let accepts = ['text/plain', 'application/json', 'text/json'];
      let returnType = {'String': Object};
      return this.apiClient.callApi(
        '/API/v2/Max', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the aPIV2NetworksGet operation.
     * @callback module:api/GeneralApi~aPIV2NetworksGetCallback
     * @param {String} error Error message, if any.
     * @param {Array.<String>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {module:api/GeneralApi~aPIV2NetworksGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<String>}
     */
    aPIV2NetworksGet(callback) {
      let postBody = null;

      let pathParams = {
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = [];
      let contentTypes = [];
      let accepts = ['text/plain', 'application/json', 'text/json'];
      let returnType = ['String'];
      return this.apiClient.callApi(
        '/API/v2/Networks', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the aPIV2ProviderTypesColorDictionaryGet operation.
     * @callback module:api/GeneralApi~aPIV2ProviderTypesColorDictionaryGetCallback
     * @param {String} error Error message, if any.
     * @param {Object.<String, {String: String}>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {module:api/GeneralApi~aPIV2ProviderTypesColorDictionaryGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Object.<String, {String: String}>}
     */
    aPIV2ProviderTypesColorDictionaryGet(callback) {
      let postBody = null;

      let pathParams = {
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = [];
      let contentTypes = [];
      let accepts = ['text/plain', 'application/json', 'text/json'];
      let returnType = {'String': 'String'};
      return this.apiClient.callApi(
        '/API/v2/ProviderTypesColorDictionary', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the aPIV2ProvidersGet operation.
     * @callback module:api/GeneralApi~aPIV2ProvidersGetCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/ProviderResponseModel>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Object} opts Optional parameters
     * @param {String} opts.subchainsOf 
     * @param {module:api/GeneralApi~aPIV2ProvidersGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/ProviderResponseModel>}
     */
    aPIV2ProvidersGet(opts, callback) {
      opts = opts || {};
      let postBody = null;

      let pathParams = {
      };
      let queryParams = {
        'subchainsOf': opts['subchainsOf']
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = [];
      let contentTypes = [];
      let accepts = ['text/plain', 'application/json', 'text/json'];
      let returnType = [ProviderResponseModel];
      return this.apiClient.callApi(
        '/API/v2/Providers', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }


}
