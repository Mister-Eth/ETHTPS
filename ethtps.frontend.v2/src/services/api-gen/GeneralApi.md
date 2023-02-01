# .GeneralApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**aPIV2AllDataGet**](GeneralApi.md#aPIV2AllDataGet) | **GET** /API/v2/AllData | 
[**aPIV2ColorDictionaryGet**](GeneralApi.md#aPIV2ColorDictionaryGet) | **GET** /API/v2/ColorDictionary | 
[**aPIV2GetIntervalsWithDataGet**](GeneralApi.md#aPIV2GetIntervalsWithDataGet) | **GET** /API/v2/GetIntervalsWithData | 
[**aPIV2GetUniqueDataYearsGet**](GeneralApi.md#aPIV2GetUniqueDataYearsGet) | **GET** /API/v2/GetUniqueDataYears | 
[**aPIV2InstantDataGet**](GeneralApi.md#aPIV2InstantDataGet) | **GET** /API/v2/InstantData | 
[**aPIV2IntervalsGet**](GeneralApi.md#aPIV2IntervalsGet) | **GET** /API/v2/Intervals | 
[**aPIV2MaxGet**](GeneralApi.md#aPIV2MaxGet) | **GET** /API/v2/Max | 
[**aPIV2NetworksGet**](GeneralApi.md#aPIV2NetworksGet) | **GET** /API/v2/Networks | 
[**aPIV2ProviderTypesColorDictionaryGet**](GeneralApi.md#aPIV2ProviderTypesColorDictionaryGet) | **GET** /API/v2/ProviderTypesColorDictionary | 
[**aPIV2ProvidersGet**](GeneralApi.md#aPIV2ProvidersGet) | **GET** /API/v2/Providers | 


# **aPIV2AllDataGet**
> AllDataModel aPIV2AllDataGet()


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .GeneralApi(configuration);

let body:.GeneralApiAPIV2AllDataGetRequest = {
  // string (optional)
  network: "Mainnet",
};

apiInstance.aPIV2AllDataGet(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **network** | [**string**] |  | (optional) defaults to 'Mainnet'


### Return type

**AllDataModel**

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

# **aPIV2ColorDictionaryGet**
> { [key: string]: string; } aPIV2ColorDictionaryGet()


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .GeneralApi(configuration);

let body:any = {};

apiInstance.aPIV2ColorDictionaryGet(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters
This endpoint does not need any parameter.


### Return type

**{ [key: string]: string; }**

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

# **aPIV2GetIntervalsWithDataGet**
> Array<string> aPIV2GetIntervalsWithDataGet()


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .GeneralApi(configuration);

let body:.GeneralApiAPIV2GetIntervalsWithDataGetRequest = {
  // string (optional)
  provider: "Provider_example",
  // string (optional)
  network: "Network_example",
  // boolean (optional)
  includeSidechains: true,
};

apiInstance.aPIV2GetIntervalsWithDataGet(body).then((data:any) => {
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

**Array<string>**

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

# **aPIV2GetUniqueDataYearsGet**
> Array<string> aPIV2GetUniqueDataYearsGet()


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .GeneralApi(configuration);

let body:.GeneralApiAPIV2GetUniqueDataYearsGetRequest = {
  // string (optional)
  provider: "Provider_example",
  // string (optional)
  network: "Network_example",
  // boolean (optional)
  includeSidechains: true,
};

apiInstance.aPIV2GetUniqueDataYearsGet(body).then((data:any) => {
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

**Array<string>**

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

# **aPIV2InstantDataGet**
> { [key: string]: any; } aPIV2InstantDataGet()


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .GeneralApi(configuration);

let body:.GeneralApiAPIV2InstantDataGetRequest = {
  // string (optional)
  provider: "Provider_example",
  // string (optional)
  network: "Network_example",
  // boolean (optional)
  includeSidechains: true,
  // string (optional)
  smoothing: "",
};

apiInstance.aPIV2InstantDataGet(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **provider** | [**string**] |  | (optional) defaults to undefined
 **network** | [**string**] |  | (optional) defaults to undefined
 **includeSidechains** | [**boolean**] |  | (optional) defaults to undefined
 **smoothing** | [**string**] |  | (optional) defaults to ''


### Return type

**{ [key: string]: any; }**

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

# **aPIV2IntervalsGet**
> Array<string> aPIV2IntervalsGet()


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .GeneralApi(configuration);

let body:any = {};

apiInstance.aPIV2IntervalsGet(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters
This endpoint does not need any parameter.


### Return type

**Array<string>**

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

# **aPIV2MaxGet**
> { [key: string]: any; } aPIV2MaxGet()


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .GeneralApi(configuration);

let body:.GeneralApiAPIV2MaxGetRequest = {
  // string (optional)
  provider: "Provider_example",
  // string (optional)
  network: "Network_example",
  // boolean (optional)
  includeSidechains: true,
};

apiInstance.aPIV2MaxGet(body).then((data:any) => {
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

**{ [key: string]: any; }**

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

# **aPIV2NetworksGet**
> Array<string> aPIV2NetworksGet()


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .GeneralApi(configuration);

let body:any = {};

apiInstance.aPIV2NetworksGet(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters
This endpoint does not need any parameter.


### Return type

**Array<string>**

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

# **aPIV2ProviderTypesColorDictionaryGet**
> { [key: string]: string; } aPIV2ProviderTypesColorDictionaryGet()


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .GeneralApi(configuration);

let body:any = {};

apiInstance.aPIV2ProviderTypesColorDictionaryGet(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters
This endpoint does not need any parameter.


### Return type

**{ [key: string]: string; }**

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

# **aPIV2ProvidersGet**
> Array<ProviderResponseModel> aPIV2ProvidersGet()


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .GeneralApi(configuration);

let body:.GeneralApiAPIV2ProvidersGetRequest = {
  // string (optional)
  subchainsOf: "subchainsOf_example",
};

apiInstance.aPIV2ProvidersGet(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **subchainsOf** | [**string**] |  | (optional) defaults to undefined


### Return type

**Array<ProviderResponseModel>**

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


