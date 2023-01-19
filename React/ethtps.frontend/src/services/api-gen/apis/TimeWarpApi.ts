// TODO: better import syntax?
import { BaseAPIRequestFactory, RequiredError } from './baseapi';
import { Configuration } from '../configuration';
import { RequestContext, HttpMethod, ResponseContext, HttpFile } from '../http/http';
import { ObjectSerializer } from '../models/ObjectSerializer';
import { ApiException } from './exception';
import { canConsumeForm, isCodeInRange } from '../util';
import { DataResponseModel } from '../models/ObjectSerializer';

import { DataPoint } from '../models/DataPoint';
import { TimeWarpSyncProgressModel } from '../models/TimeWarpSyncProgressModel';

/**
 * no description
 */
export class TimeWarpApiRequestFactory extends BaseAPIRequestFactory {

    /**
     */
    public async aPITimeWarpGetEarliestDateGet(_options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // Path Params
        const localVarPath = '/API/TimeWarp/GetEarliestDate';

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.GET);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")



        return requestContext;
    }

    /**
     * @param provider 
     * @param network 
     * @param includeSidechains 
     * @param timestamp 
     * @param smoothing 
     * @param count 
     */
    public async aPITimeWarpGetGPSAtGet(provider?: string, network?: string, includeSidechains?: boolean, timestamp?: number, smoothing?: string, count?: number, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;







        // Path Params
        const localVarPath = '/API/TimeWarp/GetGPSAt';

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
        if (timestamp !== undefined) {
            requestContext.setQueryParam("timestamp", ObjectSerializer.serialize(timestamp, "number", "int64"));
        }

        // Query Params
        if (smoothing !== undefined) {
            requestContext.setQueryParam("smoothing", ObjectSerializer.serialize(smoothing, "string", ""));
        }

        // Query Params
        if (count !== undefined) {
            requestContext.setQueryParam("count", ObjectSerializer.serialize(count, "number", "int32"));
        }



        return requestContext;
    }

    /**
     * @param provider 
     * @param network 
     * @param includeSidechains 
     * @param timestamp 
     * @param smoothing 
     * @param count 
     */
    public async aPITimeWarpGetGasAdjustedTPSAtGet(provider?: string, network?: string, includeSidechains?: boolean, timestamp?: number, smoothing?: string, count?: number, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;







        // Path Params
        const localVarPath = '/API/TimeWarp/GetGasAdjustedTPSAt';

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
        if (timestamp !== undefined) {
            requestContext.setQueryParam("timestamp", ObjectSerializer.serialize(timestamp, "number", "int64"));
        }

        // Query Params
        if (smoothing !== undefined) {
            requestContext.setQueryParam("smoothing", ObjectSerializer.serialize(smoothing, "string", ""));
        }

        // Query Params
        if (count !== undefined) {
            requestContext.setQueryParam("count", ObjectSerializer.serialize(count, "number", "int32"));
        }



        return requestContext;
    }

    /**
     * @param provider 
     * @param network 
     * @param includeSidechains 
     */
    public async aPITimeWarpGetSyncProgressGet(provider?: string, network?: string, includeSidechains?: boolean, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;




        // Path Params
        const localVarPath = '/API/TimeWarp/GetSyncProgress';

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
     * @param timestamp 
     * @param smoothing 
     * @param count 
     */
    public async aPITimeWarpGetTPSAtGet(provider?: string, network?: string, includeSidechains?: boolean, timestamp?: number, smoothing?: string, count?: number, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;







        // Path Params
        const localVarPath = '/API/TimeWarp/GetTPSAt';

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
        if (timestamp !== undefined) {
            requestContext.setQueryParam("timestamp", ObjectSerializer.serialize(timestamp, "number", "int64"));
        }

        // Query Params
        if (smoothing !== undefined) {
            requestContext.setQueryParam("smoothing", ObjectSerializer.serialize(smoothing, "string", ""));
        }

        // Query Params
        if (count !== undefined) {
            requestContext.setQueryParam("count", ObjectSerializer.serialize(count, "number", "int32"));
        }



        return requestContext;
    }

}

export class TimeWarpApiResponseProcessor {

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to aPITimeWarpGetEarliestDateGet
     * @throws ApiException if the response code was not in [200, 299]
     */
    public async aPITimeWarpGetEarliestDateGet(response: ResponseContext): Promise<Date> {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: Date = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Date", "date-time"
            ) as Date;
            return body;
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: Date = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Date", "date-time"
            ) as Date;
            return body;
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to aPITimeWarpGetGPSAtGet
     * @throws ApiException if the response code was not in [200, 299]
     */
    public async aPITimeWarpGetGPSAtGet(response: ResponseContext): Promise<Array<DataPoint>> {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: Array<DataPoint> = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Array<DataPoint>", ""
            ) as Array<DataPoint>;
            return body;
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: Array<DataPoint> = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Array<DataPoint>", ""
            ) as Array<DataPoint>;
            return body;
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to aPITimeWarpGetGasAdjustedTPSAtGet
     * @throws ApiException if the response code was not in [200, 299]
     */
    public async aPITimeWarpGetGasAdjustedTPSAtGet(response: ResponseContext): Promise<Array<DataPoint>> {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: Array<DataPoint> = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Array<DataPoint>", ""
            ) as Array<DataPoint>;
            return body;
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: Array<DataPoint> = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Array<DataPoint>", ""
            ) as Array<DataPoint>;
            return body;
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to aPITimeWarpGetSyncProgressGet
     * @throws ApiException if the response code was not in [200, 299]
     */
    public async aPITimeWarpGetSyncProgressGet(response: ResponseContext): Promise<TimeWarpSyncProgressModel> {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: TimeWarpSyncProgressModel = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "TimeWarpSyncProgressModel", ""
            ) as TimeWarpSyncProgressModel;
            return body;
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: TimeWarpSyncProgressModel = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "TimeWarpSyncProgressModel", ""
            ) as TimeWarpSyncProgressModel;
            return body;
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to aPITimeWarpGetTPSAtGet
     * @throws ApiException if the response code was not in [200, 299]
     */
    public async aPITimeWarpGetTPSAtGet(response: ResponseContext): Promise<Array<DataPoint>> {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: Array<DataPoint> = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Array<DataPoint>", ""
            ) as Array<DataPoint>;
            return body;
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: Array<DataPoint> = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Array<DataPoint>", ""
            ) as Array<DataPoint>;
            return body;
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

}
