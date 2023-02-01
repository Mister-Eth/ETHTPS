import { FetchParams, Middleware, RequestContext } from "ethtps.api.client"
import { getAPIKey } from "../DependenciesIOC"

const _apiKeyHeaderName = "X-API-Key"

export class APIKeyMiddleware implements Middleware {
  public pre = (context: RequestContext): Promise<FetchParams | void> => {
    context.url =
      context.url +
      (!context.url.includes("?") ? "?" : "") +
      "&XAPIKEY=" +
      getAPIKey()
    return Promise.resolve(context)
  }
}
//type HeadersInit = [string, string][] | Record<string, string> | Headers;
