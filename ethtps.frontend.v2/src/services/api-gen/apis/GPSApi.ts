// TODO: better import syntax?
import { BaseAPIRequestFactory } from "./baseapi"
import { Configuration } from "../configuration"
import { RequestContext, HttpMethod, ResponseContext } from "../http/http"
import { ObjectSerializer } from "../models/ObjectSerializer"
import { ApiException } from "./exception"
import { isCodeInRange } from "../util"
import { DataResponseModel } from "../models/ObjectSerializer"

import { DataPoint } from "../models/DataPoint"

/**
 * no description
 */
export class GPSApiRequestFactory extends BaseAPIRequestFactory {
  /**
   * @param provider
   * @param network
   * @param includeSidechains
   * @param year
   */
  public async aPIGPSGeMonthlyDataByYearGet(
    provider?: string,
    network?: string,
    includeSidechains?: boolean,
    year?: number,
    _options?: Configuration,
  ): Promise<RequestContext> {
    let _config = _options || this.configuration

    // Path Params
    const localVarPath = "/API/GPS/GeMonthlyDataByYear"

    // Make Request Context
    const requestContext = _config.baseServer.makeRequestContext(
      localVarPath,
      HttpMethod.GET,
    )
    requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

    // Query Params
    if (provider !== undefined) {
      requestContext.setQueryParam(
        "Provider",
        ObjectSerializer.serialize(provider, "string", ""),
      )
    }

    // Query Params
    if (network !== undefined) {
      requestContext.setQueryParam(
        "Network",
        ObjectSerializer.serialize(network, "string", ""),
      )
    }

    // Query Params
    if (includeSidechains !== undefined) {
      requestContext.setQueryParam(
        "IncludeSidechains",
        ObjectSerializer.serialize(includeSidechains, "boolean", ""),
      )
    }

    // Query Params
    if (year !== undefined) {
      requestContext.setQueryParam(
        "year",
        ObjectSerializer.serialize(year, "number", "int32"),
      )
    }

    return requestContext
  }

  /**
   * @param provider
   * @param network
   * @param includeSidechains
   * @param interval
   */
  public async aPIGPSGetGet(
    provider?: string,
    network?: string,
    includeSidechains?: boolean,
    interval?: string,
    _options?: Configuration,
  ): Promise<RequestContext> {
    let _config = _options || this.configuration

    // Path Params
    const localVarPath = "/API/GPS/Get"

    // Make Request Context
    const requestContext = _config.baseServer.makeRequestContext(
      localVarPath,
      HttpMethod.GET,
    )
    requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

    // Query Params
    if (provider !== undefined) {
      requestContext.setQueryParam(
        "Provider",
        ObjectSerializer.serialize(provider, "string", ""),
      )
    }

    // Query Params
    if (network !== undefined) {
      requestContext.setQueryParam(
        "Network",
        ObjectSerializer.serialize(network, "string", ""),
      )
    }

    // Query Params
    if (includeSidechains !== undefined) {
      requestContext.setQueryParam(
        "IncludeSidechains",
        ObjectSerializer.serialize(includeSidechains, "boolean", ""),
      )
    }

    // Query Params
    if (interval !== undefined) {
      requestContext.setQueryParam(
        "interval",
        ObjectSerializer.serialize(interval, "string", ""),
      )
    }

    return requestContext
  }

  /**
   * @param provider
   * @param network
   * @param includeSidechains
   */
  public async aPIGPSInstantGet(
    provider?: string,
    network?: string,
    includeSidechains?: boolean,
    _options?: Configuration,
  ): Promise<RequestContext> {
    let _config = _options || this.configuration

    // Path Params
    const localVarPath = "/API/GPS/Instant"

    // Make Request Context
    const requestContext = _config.baseServer.makeRequestContext(
      localVarPath,
      HttpMethod.GET,
    )
    requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

    // Query Params
    if (provider !== undefined) {
      requestContext.setQueryParam(
        "Provider",
        ObjectSerializer.serialize(provider, "string", ""),
      )
    }

    // Query Params
    if (network !== undefined) {
      requestContext.setQueryParam(
        "Network",
        ObjectSerializer.serialize(network, "string", ""),
      )
    }

    // Query Params
    if (includeSidechains !== undefined) {
      requestContext.setQueryParam(
        "IncludeSidechains",
        ObjectSerializer.serialize(includeSidechains, "boolean", ""),
      )
    }

    return requestContext
  }

  /**
   * @param provider
   * @param network
   * @param includeSidechains
   */
  public async aPIGPSMaxGet(
    provider?: string,
    network?: string,
    includeSidechains?: boolean,
    _options?: Configuration,
  ): Promise<RequestContext> {
    let _config = _options || this.configuration

    // Path Params
    const localVarPath = "/API/GPS/Max"

    // Make Request Context
    const requestContext = _config.baseServer.makeRequestContext(
      localVarPath,
      HttpMethod.GET,
    )
    requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

    // Query Params
    if (provider !== undefined) {
      requestContext.setQueryParam(
        "Provider",
        ObjectSerializer.serialize(provider, "string", ""),
      )
    }

    // Query Params
    if (network !== undefined) {
      requestContext.setQueryParam(
        "Network",
        ObjectSerializer.serialize(network, "string", ""),
      )
    }

    // Query Params
    if (includeSidechains !== undefined) {
      requestContext.setQueryParam(
        "IncludeSidechains",
        ObjectSerializer.serialize(includeSidechains, "boolean", ""),
      )
    }

    return requestContext
  }
}

export class GPSApiResponseProcessor {
  /**
   * Unwraps the actual response sent by the server from the response context and deserializes the response content
   * to the expected objects
   *
   * @params response Response returned by the server for a request to aPIGPSGeMonthlyDataByYearGet
   * @throws ApiException if the response code was not in [200, 299]
   */
  public async aPIGPSGeMonthlyDataByYearGet(
    response: ResponseContext,
  ): Promise<{ [key: string]: Array<DataResponseModel> }> {
    const contentType = ObjectSerializer.normalizeMediaType(
      response.headers["content-type"],
    )
    if (isCodeInRange("200", response.httpStatusCode)) {
      const body: { [key: string]: Array<DataResponseModel> } =
        ObjectSerializer.deserialize(
          ObjectSerializer.parse(await response.body.text(), contentType),
          "{ [key: string]: Array<DataResponseModel>; }",
          "",
        ) as { [key: string]: Array<DataResponseModel> }
      return body
    }

    // Work around for missing responses in specification, e.g. for petstore.yaml
    if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
      const body: { [key: string]: Array<DataResponseModel> } =
        ObjectSerializer.deserialize(
          ObjectSerializer.parse(await response.body.text(), contentType),
          "{ [key: string]: Array<DataResponseModel>; }",
          "",
        ) as { [key: string]: Array<DataResponseModel> }
      return body
    }

    throw new ApiException<string | Blob | undefined>(
      response.httpStatusCode,
      "Unknown API Status Code!",
      await response.getBodyAsAny(),
      response.headers,
    )
  }

  /**
   * Unwraps the actual response sent by the server from the response context and deserializes the response content
   * to the expected objects
   *
   * @params response Response returned by the server for a request to aPIGPSGetGet
   * @throws ApiException if the response code was not in [200, 299]
   */
  public async aPIGPSGetGet(
    response: ResponseContext,
  ): Promise<{ [key: string]: Array<DataResponseModel> }> {
    const contentType = ObjectSerializer.normalizeMediaType(
      response.headers["content-type"],
    )
    if (isCodeInRange("200", response.httpStatusCode)) {
      const body: { [key: string]: Array<DataResponseModel> } =
        ObjectSerializer.deserialize(
          ObjectSerializer.parse(await response.body.text(), contentType),
          "{ [key: string]: Array<DataResponseModel>; }",
          "",
        ) as { [key: string]: Array<DataResponseModel> }
      return body
    }

    // Work around for missing responses in specification, e.g. for petstore.yaml
    if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
      const body: { [key: string]: Array<DataResponseModel> } =
        ObjectSerializer.deserialize(
          ObjectSerializer.parse(await response.body.text(), contentType),
          "{ [key: string]: Array<DataResponseModel>; }",
          "",
        ) as { [key: string]: Array<DataResponseModel> }
      return body
    }

    throw new ApiException<string | Blob | undefined>(
      response.httpStatusCode,
      "Unknown API Status Code!",
      await response.getBodyAsAny(),
      response.headers,
    )
  }

  /**
   * Unwraps the actual response sent by the server from the response context and deserializes the response content
   * to the expected objects
   *
   * @params response Response returned by the server for a request to aPIGPSInstantGet
   * @throws ApiException if the response code was not in [200, 299]
   */
  public async aPIGPSInstantGet(
    response: ResponseContext,
  ): Promise<{ [key: string]: Array<DataPoint> }> {
    const contentType = ObjectSerializer.normalizeMediaType(
      response.headers["content-type"],
    )
    if (isCodeInRange("200", response.httpStatusCode)) {
      const body: { [key: string]: Array<DataPoint> } =
        ObjectSerializer.deserialize(
          ObjectSerializer.parse(await response.body.text(), contentType),
          "{ [key: string]: Array<DataPoint>; }",
          "",
        ) as { [key: string]: Array<DataPoint> }
      return body
    }

    // Work around for missing responses in specification, e.g. for petstore.yaml
    if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
      const body: { [key: string]: Array<DataPoint> } =
        ObjectSerializer.deserialize(
          ObjectSerializer.parse(await response.body.text(), contentType),
          "{ [key: string]: Array<DataPoint>; }",
          "",
        ) as { [key: string]: Array<DataPoint> }
      return body
    }

    throw new ApiException<string | Blob | undefined>(
      response.httpStatusCode,
      "Unknown API Status Code!",
      await response.getBodyAsAny(),
      response.headers,
    )
  }

  /**
   * Unwraps the actual response sent by the server from the response context and deserializes the response content
   * to the expected objects
   *
   * @params response Response returned by the server for a request to aPIGPSMaxGet
   * @throws ApiException if the response code was not in [200, 299]
   */
  public async aPIGPSMaxGet(
    response: ResponseContext,
  ): Promise<{ [key: string]: DataPoint }> {
    const contentType = ObjectSerializer.normalizeMediaType(
      response.headers["content-type"],
    )
    if (isCodeInRange("200", response.httpStatusCode)) {
      const body: { [key: string]: DataPoint } = ObjectSerializer.deserialize(
        ObjectSerializer.parse(await response.body.text(), contentType),
        "{ [key: string]: DataPoint; }",
        "",
      ) as { [key: string]: DataPoint }
      return body
    }

    // Work around for missing responses in specification, e.g. for petstore.yaml
    if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
      const body: { [key: string]: DataPoint } = ObjectSerializer.deserialize(
        ObjectSerializer.parse(await response.body.text(), contentType),
        "{ [key: string]: DataPoint; }",
        "",
      ) as { [key: string]: DataPoint }
      return body
    }

    throw new ApiException<string | Blob | undefined>(
      response.httpStatusCode,
      "Unknown API Status Code!",
      await response.getBodyAsAny(),
      response.headers,
    )
  }
}
