// TODO: better import syntax?
import { BaseAPIRequestFactory, RequiredError } from './baseapi';
import { Configuration } from '../configuration';
import { RequestContext, HttpMethod, ResponseContext, HttpFile } from '../http/http';
import { ObjectSerializer } from '../models/ObjectSerializer';
import { ApiException } from './exception';
import { canConsumeForm, isCodeInRange } from '../util';
import { DataResponseModel } from '../models/ObjectSerializer';

import { AllDataModel } from '../models/AllDataModel';
import { ProviderResponseModel } from '../models/ProviderResponseModel';

/**
 * no description
 */
export class GeneralApiRequestFactory extends BaseAPIRequestFactory {

    /**
     * @param network 
     */
    public async aPIV2AllDataGet(network?: string, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;


        // Path Params
        const localVarPath = '/API/v2/AllData';

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.GET);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

        // Query Params
        if (network !== undefined) {
            requestContext.setQueryParam("network", ObjectSerializer.serialize(network, "string", ""));
        }



        return requestContext;
    }

    /**
     */
    public async aPIV2ColorDictionaryGet(_options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // Path Params
        const localVarPath = '/API/v2/ColorDictionary';

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.GET);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")



        return requestContext;
    }

    /**
     * @param provider 
     * @param network 
     * @param includeSidechains 
     */
    public async aPIV2GetIntervalsWithDataGet(provider?: string, network?: string, includeSidechains?: boolean, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;




        // Path Params
        const localVarPath = '/API/v2/GetIntervalsWithData';

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.GET);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

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
     * @param provider 
     * @param network 
     * @param includeSidechains 
     */
    public async aPIV2GetUniqueDataYearsGet(provider?: string, network?: string, includeSidechains?: boolean, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;




        // Path Params
        const localVarPath = '/API/v2/GetUniqueDataYears';

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.GET);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

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
     * @param provider 
     * @param network 
     * @param includeSidechains 
     * @param smoothing 
     */
    public async aPIV2InstantDataGet(provider?: string, network?: string, includeSidechains?: boolean, smoothing?: string, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;





        // Path Params
        const localVarPath = '/API/v2/InstantData';

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.GET);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

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

        // Query Params
        if (smoothing !== undefined) {
            requestContext.setQueryParam("smoothing", ObjectSerializer.serialize(smoothing, "string", ""));
        }



        return requestContext;
    }

    /**
     */
    public async aPIV2IntervalsGet(_options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // Path Params
        const localVarPath = '/API/v2/Intervals';

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.GET);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")



        return requestContext;
    }

    /**
     * @param provider 
     * @param network 
     * @param includeSidechains 
     */
    public async aPIV2MaxGet(provider?: string, network?: string, includeSidechains?: boolean, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;




        // Path Params
        const localVarPath = '/API/v2/Max';

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.GET);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

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
     */
    public async aPIV2NetworksGet(_options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // Path Params
        const localVarPath = '/API/v2/Networks';

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.GET);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")



        return requestContext;
    }

    /**
     */
    public async aPIV2ProviderTypesColorDictionaryGet(_options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // Path Params
        const localVarPath = '/API/v2/ProviderTypesColorDictionary';

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.GET);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")



        return requestContext;
    }

    /**
     * @param subchainsOf 
     */
    public async aPIV2ProvidersGet(subchainsOf?: string, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;


        // Path Params
        const localVarPath = '/API/v2/Providers';

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.GET);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

        // Query Params
        if (subchainsOf !== undefined) {
            requestContext.setQueryParam("subchainsOf", ObjectSerializer.serialize(subchainsOf, "string", ""));
        }



        return requestContext;
    }

}

export class GeneralApiResponseProcessor {

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to aPIV2AllDataGet
     * @throws ApiException if the response code was not in [200, 299]
     */
    public async aPIV2AllDataGet(response: ResponseContext): Promise<AllDataModel> {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: AllDataModel = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "AllDataModel", ""
            ) as AllDataModel;
            return body;
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: AllDataModel = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "AllDataModel", ""
            ) as AllDataModel;
            return body;
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to aPIV2ColorDictionaryGet
     * @throws ApiException if the response code was not in [200, 299]
     */
    public async aPIV2ColorDictionaryGet(response: ResponseContext): Promise<{ [key: string]: string; }> {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: { [key: string]: string; } = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "{ [key: string]: string; }", ""
            ) as { [key: string]: string; };
            return body;
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: { [key: string]: string; } = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "{ [key: string]: string; }", ""
            ) as { [key: string]: string; };
            return body;
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to aPIV2GetIntervalsWithDataGet
     * @throws ApiException if the response code was not in [200, 299]
     */
    public async aPIV2GetIntervalsWithDataGet(response: ResponseContext): Promise<Array<string>> {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: Array<string> = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Array<string>", ""
            ) as Array<string>;
            return body;
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: Array<string> = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Array<string>", ""
            ) as Array<string>;
            return body;
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to aPIV2GetUniqueDataYearsGet
     * @throws ApiException if the response code was not in [200, 299]
     */
    public async aPIV2GetUniqueDataYearsGet(response: ResponseContext): Promise<Array<string>> {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: Array<string> = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Array<string>", ""
            ) as Array<string>;
            return body;
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: Array<string> = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Array<string>", ""
            ) as Array<string>;
            return body;
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to aPIV2InstantDataGet
     * @throws ApiException if the response code was not in [200, 299]
     */
    public async aPIV2InstantDataGet(response: ResponseContext): Promise<{ [key: string]: any; }> {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: { [key: string]: any; } = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "{ [key: string]: any; }", ""
            ) as { [key: string]: any; };
            return body;
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: { [key: string]: any; } = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "{ [key: string]: any; }", ""
            ) as { [key: string]: any; };
            return body;
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to aPIV2IntervalsGet
     * @throws ApiException if the response code was not in [200, 299]
     */
    public async aPIV2IntervalsGet(response: ResponseContext): Promise<Array<string>> {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: Array<string> = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Array<string>", ""
            ) as Array<string>;
            return body;
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: Array<string> = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Array<string>", ""
            ) as Array<string>;
            return body;
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to aPIV2MaxGet
     * @throws ApiException if the response code was not in [200, 299]
     */
    public async aPIV2MaxGet(response: ResponseContext): Promise<{ [key: string]: any; }> {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: { [key: string]: any; } = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "{ [key: string]: any; }", ""
            ) as { [key: string]: any; };
            return body;
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: { [key: string]: any; } = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "{ [key: string]: any; }", ""
            ) as { [key: string]: any; };
            return body;
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to aPIV2NetworksGet
     * @throws ApiException if the response code was not in [200, 299]
     */
    public async aPIV2NetworksGet(response: ResponseContext): Promise<Array<string>> {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: Array<string> = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Array<string>", ""
            ) as Array<string>;
            return body;
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: Array<string> = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Array<string>", ""
            ) as Array<string>;
            return body;
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to aPIV2ProviderTypesColorDictionaryGet
     * @throws ApiException if the response code was not in [200, 299]
     */
    public async aPIV2ProviderTypesColorDictionaryGet(response: ResponseContext): Promise<{ [key: string]: string; }> {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: { [key: string]: string; } = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "{ [key: string]: string; }", ""
            ) as { [key: string]: string; };
            return body;
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: { [key: string]: string; } = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "{ [key: string]: string; }", ""
            ) as { [key: string]: string; };
            return body;
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to aPIV2ProvidersGet
     * @throws ApiException if the response code was not in [200, 299]
     */
    public async aPIV2ProvidersGet(response: ResponseContext): Promise<Array<ProviderResponseModel>> {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: Array<ProviderResponseModel> = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Array<ProviderResponseModel>", ""
            ) as Array<ProviderResponseModel>;
            return body;
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: Array<ProviderResponseModel> = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Array<ProviderResponseModel>", ""
            ) as Array<ProviderResponseModel>;
            return body;
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

}
