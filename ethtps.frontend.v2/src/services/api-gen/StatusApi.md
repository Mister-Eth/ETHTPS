# .StatusApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apiStatusGetBlockInfoProviderStatusGet**](StatusApi.md#apiStatusGetBlockInfoProviderStatusGet) | **GET** /api/Status/GetBlockInfoProviderStatus | 


# **apiStatusGetBlockInfoProviderStatusGet**
> { [key: string]: BlockInfoProviderStatusResult; } apiStatusGetBlockInfoProviderStatusGet()


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .StatusApi(configuration);

let body:.StatusApiApiStatusGetBlockInfoProviderStatusGetRequest = {
  // string (optional)
  provider: "Provider_example",
  // string (optional)
  network: "Network_example",
  // boolean (optional)
  includeSidechains: true,
};

apiInstance.apiStatusGetBlockInfoProviderStatusGet(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **provider** | [**string**] |  | (optional) defaults to undefined
 **network** | [**string**] |  | (optional) defaults to undefined
 **includeSidechains** | [**boolean**] |  | (optional) defaults to undefined


### Return type

**{ [key: string]: BlockInfoProviderStatusResult; }**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: text/plain, application/json, text/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Success |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)


