// TODO: better import syntax?
import { BaseAPIRequestFactory, RequiredError } from './baseapi';
import { Configuration } from '../configuration';
import { RequestContext, HttpMethod, ResponseContext, HttpFile } from '../http/http';
import { ObjectSerializer } from '../models/ObjectSerializer';
import { ApiException } from './exception';
import { canConsumeForm, isCodeInRange } from '../util';
import { DataResponseModel } from '../models/ObjectSerializer';

import { DataType } from '../models/DataType';
import { HomePageResponseModel } from '../models/HomePageResponseModel';
import { TimeInterval } from '../models/TimeInterval';

/**
 * no description
 */
export class PageModelApiRequestFactory extends BaseAPIRequestFactory {

    /**
     * @param subchainsOf 
     * @param interval 
     * @param dataType 
     * @param provider 
     * @param network 
     * @param includeSidechains 
     */
    public async aPIPagesHomeGet(subchainsOf?: string, interval?: TimeInterval, dataType?: DataType, provider?: string, network?: string, includeSidechains?: boolean, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;







        // Path Params
        const localVarPath = '/API/Pages/Home';

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.GET);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

        // Query Params
        if (subchainsOf !== undefined) {
            requestContext.setQueryParam("SubchainsOf", ObjectSerializer.serialize(subchainsOf, "string", ""));
        }

        // Query Params
        if (interval !== undefined) {
            requestContext.setQueryParam("Interval", ObjectSerializer.serialize(interval, "TimeInterval", ""));
        }

        // Query Params
        if (dataType !== undefined) {
            requestContext.setQueryParam("DataType", ObjectSerializer.serialize(dataType, "DataType", ""));
        }

        // Query Params
        if (provider !== undefined) {
            requestContext.setQueryParam("Provider", ObjectSerializer.serialize(provider, "string", ""));
        }

        // Query Params
        if (network !== undefined) {
            requestContext.setQueryParam("Network", ObjectSerializer.serialize(network, "string", ""));
        }

        // Query Params
        if (includeSidechains !== undefined) {
            requestContext.setQueryParam("IncludeSidechains", ObjectSerializer.serialize(includeSidechains, "boolean", ""));
        }



        return requestContext;
    }

    /**
     * @param interval 
     * @param dataType 
     * @param provider 
     * @param network 
     * @param includeSidechains 
     */
    public async aPIPagesProviderGet(interval?: TimeInterval, dataType?: DataType, provider?: string, network?: string, includeSidechains?: boolean, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;






        // Path Params
        const localVarPath = '/API/Pages/Provider';

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.GET);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

        // Query Params
        if (interval !== undefined) {
            requestContext.setQueryParam("Interval", ObjectSerializer.serialize(interval, "TimeInterval", ""));
        }

        // Query Params
        if (dataType !== undefined) {
            requestContext.setQueryParam("DataType", ObjectSerializer.serialize(dataType, "DataType", ""));
        }

        // Query Params
        if (provider !== undefined) {
            requestContext.setQueryParam("Provider", ObjectSerializer.serialize(provider, "string", ""));
        }

        // Query Params
        if (network !== undefined) {
            requestContext.setQueryParam("Network", ObjectSerializer.serialize(network, "string", ""));
        }

        // Query Params
        if (includeSidechains !== undefined) {
            requestContext.setQueryParam("IncludeSidechains", ObjectSerializer.serialize(includeSidechains, "boolean", ""));
        }



        return requestContext;
    }

}

export class PageModelApiResponseProcessor {

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to aPIPagesHomeGet
     * @throws ApiException if the response code was not in [200, 299]
     */
    public async aPIPagesHomeGet(response: ResponseContext): Promise<HomePageResponseModel> {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: HomePageResponseModel = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "HomePageResponseModel", ""
            ) as HomePageResponseModel;
            return body;
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: HomePageResponseModel = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "HomePageResponseModel", ""
            ) as HomePageResponseModel;
            return body;
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to aPIPagesProviderGet
     * @throws ApiException if the response code was not in [200, 299]
     */
    public async aPIPagesProviderGet(response: ResponseContext): Promise<void> {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            return;
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: void = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "void", ""
            ) as void;
            return body;
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

}
