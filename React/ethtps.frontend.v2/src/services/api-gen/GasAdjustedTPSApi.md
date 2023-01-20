# .GasAdjustedTPSApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**aPIGasAdjustedTPSGeMonthlyDataByYearGet**](GasAdjustedTPSApi.md#aPIGasAdjustedTPSGeMonthlyDataByYearGet) | **GET** /API/GasAdjustedTPS/GeMonthlyDataByYear | 
[**aPIGasAdjustedTPSGetGet**](GasAdjustedTPSApi.md#aPIGasAdjustedTPSGetGet) | **GET** /API/GasAdjustedTPS/Get | 
[**aPIGasAdjustedTPSInstantGet**](GasAdjustedTPSApi.md#aPIGasAdjustedTPSInstantGet) | **GET** /API/GasAdjustedTPS/Instant | 
[**aPIGasAdjustedTPSMaxGet**](GasAdjustedTPSApi.md#aPIGasAdjustedTPSMaxGet) | **GET** /API/GasAdjustedTPS/Max | 


# **aPIGasAdjustedTPSGeMonthlyDataByYearGet**
> { [key: string]: Array<DataResponseModel>; } aPIGasAdjustedTPSGeMonthlyDataByYearGet()


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .GasAdjustedTPSApi(configuration);

let body:.GasAdjustedTPSApiAPIGasAdjustedTPSGeMonthlyDataByYearGetRequest = {
  // string (optional)
  provider: "Provider_example",
  // string (optional)
  network: "Network_example",
  // boolean (optional)
  includeSidechains: true,
  // number (optional)
  year: 1,
};

apiInstance.aPIGasAdjustedTPSGeMonthlyDataByYearGet(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **provider** | [**string**] |  | (optional) defaults to undefined
 **network** | [**string**] |  | (optional) defaults to undefined
 **includeSidechains** | [**boolean**] |  | (optional) defaults to undefined
 **year** | [**number**] |  | (optional) defaults to undefined


### Return type

**{ [key: string]: Array<DataResponseModel>; }**

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

# **aPIGasAdjustedTPSGetGet**
> { [key: string]: Array<DataResponseModel>; } aPIGasAdjustedTPSGetGet()


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .GasAdjustedTPSApi(configuration);

let body:.GasAdjustedTPSApiAPIGasAdjustedTPSGetGetRequest = {
  // string (optional)
  provider: "Provider_example",
  // string (optional)
  network: "Network_example",
  // boolean (optional)
  includeSidechains: true,
  // string (optional)
  interval: "interval_example",
};

apiInstance.aPIGasAdjustedTPSGetGet(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **provider** | [**string**] |  | (optional) defaults to undefined
 **network** | [**string**] |  | (optional) defaults to undefined
 **includeSidechains** | [**boolean**] |  | (optional) defaults to undefined
 **interval** | [**string**] |  | (optional) defaults to undefined


### Return type

**{ [key: string]: Array<DataResponseModel>; }**

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

# **aPIGasAdjustedTPSInstantGet**
> { [key: string]: Array<DataPoint>; } aPIGasAdjustedTPSInstantGet()


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .GasAdjustedTPSApi(configuration);

let body:.GasAdjustedTPSApiAPIGasAdjustedTPSInstantGetRequest = {
  // string (optional)
  provider: "Provider_example",
  // string (optional)
  network: "Network_example",
  // boolean (optional)
  includeSidechains: true,
};

apiInstance.aPIGasAdjustedTPSInstantGet(body).then((data:any) => {
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

**{ [key: string]: Array<DataPoint>; }**

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

# **aPIGasAdjustedTPSMaxGet**
> { [key: string]: DataPoint; } aPIGasAdjustedTPSMaxGet()


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .GasAdjustedTPSApi(configuration);

let body:.GasAdjustedTPSApiAPIGasAdjustedTPSMaxGetRequest = {
  // string (optional)
  provider: "Provider_example",
  // string (optional)
  network: "Network_example",
  // boolean (optional)
  includeSidechains: true,
};

apiInstance.aPIGasAdjustedTPSMaxGet(body).then((data:any) => {
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

**{ [key: string]: DataPoint; }**

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


