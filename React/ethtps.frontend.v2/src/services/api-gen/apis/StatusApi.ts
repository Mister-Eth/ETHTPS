// TODO: better import syntax?
import { BaseAPIRequestFactory } from "./baseapi"
import { Configuration } from "../configuration"
import { RequestContext, HttpMethod, ResponseContext } from "../http/http"
import { ObjectSerializer } from "../models/ObjectSerializer"
import { ApiException } from "./exception"
import { isCodeInRange } from "../util"

import { BlockInfoProviderStatusResult } from "../models/BlockInfoProviderStatusResult"

/**
 * no description
 */
export class StatusApiRequestFactory extends BaseAPIRequestFactory {
  /**
   * @param provider
   * @param network
   * @param includeSidechains
   */
  public async apiStatusGetBlockInfoProviderStatusGet(
    provider?: string,
    network?: string,
    includeSidechains?: boolean,
    _options?: Configuration,
  ): Promise<RequestContext> {
    let _config = _options || this.configuration

    // Path Params
    const localVarPath = "/api/Status/GetBlockInfoProviderStatus"

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

export class StatusApiResponseProcessor {
  /**
   * Unwraps the actual response sent by the server from the response context and deserializes the response content
   * to the expected objects
   *
   * @params response Response returned by the server for a request to apiStatusGetBlockInfoProviderStatusGet
   * @throws ApiException if the response code was not in [200, 299]
   */
  public async apiStatusGetBlockInfoProviderStatusGet(
    response: ResponseContext,
  ): Promise<{ [key: string]: BlockInfoProviderStatusResult }> {
    const contentType = ObjectSerializer.normalizeMediaType(
      response.headers["content-type"],
    )
    if (isCodeInRange("200", response.httpStatusCode)) {
      const body: { [key: string]: BlockInfoProviderStatusResult } =
        ObjectSerializer.deserialize(
          ObjectSerializer.parse(await response.body.text(), contentType),
          "{ [key: string]: BlockInfoProviderStatusResult; }",
          "",
        ) as { [key: string]: BlockInfoProviderStatusResult }
      return body
    }

    // Work around for missing responses in specification, e.g. for petstore.yaml
    if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
      const body: { [key: string]: BlockInfoProviderStatusResult } =
        ObjectSerializer.deserialize(
          ObjectSerializer.parse(await response.body.text(), contentType),
          "{ [key: string]: BlockInfoProviderStatusResult; }",
          "",
        ) as { [key: string]: BlockInfoProviderStatusResult }
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
