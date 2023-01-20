# .PageModelApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**aPIPagesHomeGet**](PageModelApi.md#aPIPagesHomeGet) | **GET** /API/Pages/Home | 
[**aPIPagesProviderGet**](PageModelApi.md#aPIPagesProviderGet) | **GET** /API/Pages/Provider | 


# **aPIPagesHomeGet**
> HomePageResponseModel aPIPagesHomeGet()


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .PageModelApi(configuration);

let body:.PageModelApiAPIPagesHomeGetRequest = {
  // string (optional)
  subchainsOf: "SubchainsOf_example",
  // TimeInterval (optional)
  interval: 0,
  // DataType (optional)
  dataType: 0,
  // string (optional)
  provider: "Provider_example",
  // string (optional)
  network: "Network_example",
  // boolean (optional)
  includeSidechains: true,
};

apiInstance.aPIPagesHomeGet(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **subchainsOf** | [**string**] |  | (optional) defaults to undefined
 **interval** | **TimeInterval** |  | (optional) defaults to undefined
 **dataType** | **DataType** |  | (optional) defaults to undefined
 **provider** | [**string**] |  | (optional) defaults to undefined
 **network** | [**string**] |  | (optional) defaults to undefined
 **includeSidechains** | [**boolean**] |  | (optional) defaults to undefined


### Return type

**HomePageResponseModel**

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

# **aPIPagesProviderGet**
> void aPIPagesProviderGet()


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .PageModelApi(configuration);

let body:.PageModelApiAPIPagesProviderGetRequest = {
  // TimeInterval (optional)
  interval: 0,
  // DataType (optional)
  dataType: 0,
  // string (optional)
  provider: "Provider_example",
  // string (optional)
  network: "Network_example",
  // boolean (optional)
  includeSidechains: true,
};

apiInstance.aPIPagesProviderGet(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **interval** | **TimeInterval** |  | (optional) defaults to undefined
 **dataType** | **DataType** |  | (optional) defaults to undefined
 **provider** | [**string**] |  | (optional) defaults to undefined
 **network** | [**string**] |  | (optional) defaults to undefined
 **includeSidechains** | [**boolean**] |  | (optional) defaults to undefined


### Return type

**void**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Success |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)


