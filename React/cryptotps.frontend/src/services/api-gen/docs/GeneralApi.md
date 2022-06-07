# EthtpsApi.GeneralApi

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



## aPIV2AllDataGet

> AllDataModel aPIV2AllDataGet(opts)



### Example

```javascript
import EthtpsApi from 'ethtps_api';

let apiInstance = new EthtpsApi.GeneralApi();
let opts = {
  'network': "'Mainnet'" // String | 
};
apiInstance.aPIV2AllDataGet(opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **network** | **String**|  | [optional] [default to &#39;Mainnet&#39;]

### Return type

[**AllDataModel**](AllDataModel.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/plain, application/json, text/json


## aPIV2ColorDictionaryGet

> {String: String} aPIV2ColorDictionaryGet()



### Example

```javascript
import EthtpsApi from 'ethtps_api';

let apiInstance = new EthtpsApi.GeneralApi();
apiInstance.aPIV2ColorDictionaryGet((error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

This endpoint does not need any parameter.

### Return type

**{String: String}**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/plain, application/json, text/json


## aPIV2GetIntervalsWithDataGet

> [String] aPIV2GetIntervalsWithDataGet(opts)



### Example

```javascript
import EthtpsApi from 'ethtps_api';

let apiInstance = new EthtpsApi.GeneralApi();
let opts = {
  'provider': "provider_example", // String | 
  'network': "network_example", // String | 
  'includeSidechains': true // Boolean | 
};
apiInstance.aPIV2GetIntervalsWithDataGet(opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **provider** | **String**|  | [optional] 
 **network** | **String**|  | [optional] 
 **includeSidechains** | **Boolean**|  | [optional] 

### Return type

**[String]**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/plain, application/json, text/json


## aPIV2GetUniqueDataYearsGet

> [String] aPIV2GetUniqueDataYearsGet(opts)



### Example

```javascript
import EthtpsApi from 'ethtps_api';

let apiInstance = new EthtpsApi.GeneralApi();
let opts = {
  'provider': "provider_example", // String | 
  'network': "network_example", // String | 
  'includeSidechains': true // Boolean | 
};
apiInstance.aPIV2GetUniqueDataYearsGet(opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **provider** | **String**|  | [optional] 
 **network** | **String**|  | [optional] 
 **includeSidechains** | **Boolean**|  | [optional] 

### Return type

**[String]**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/plain, application/json, text/json


## aPIV2InstantDataGet

> {String: Object} aPIV2InstantDataGet(opts)



### Example

```javascript
import EthtpsApi from 'ethtps_api';

let apiInstance = new EthtpsApi.GeneralApi();
let opts = {
  'provider': "provider_example", // String | 
  'network': "network_example", // String | 
  'includeSidechains': true, // Boolean | 
  'smoothing': "''" // String | 
};
apiInstance.aPIV2InstantDataGet(opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **provider** | **String**|  | [optional] 
 **network** | **String**|  | [optional] 
 **includeSidechains** | **Boolean**|  | [optional] 
 **smoothing** | **String**|  | [optional] [default to &#39;&#39;]

### Return type

**{String: Object}**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/plain, application/json, text/json


## aPIV2IntervalsGet

> [String] aPIV2IntervalsGet()



### Example

```javascript
import EthtpsApi from 'ethtps_api';

let apiInstance = new EthtpsApi.GeneralApi();
apiInstance.aPIV2IntervalsGet((error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

This endpoint does not need any parameter.

### Return type

**[String]**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/plain, application/json, text/json


## aPIV2MaxGet

> {String: Object} aPIV2MaxGet(opts)



### Example

```javascript
import EthtpsApi from 'ethtps_api';

let apiInstance = new EthtpsApi.GeneralApi();
let opts = {
  'provider': "provider_example", // String | 
  'network': "network_example", // String | 
  'includeSidechains': true // Boolean | 
};
apiInstance.aPIV2MaxGet(opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **provider** | **String**|  | [optional] 
 **network** | **String**|  | [optional] 
 **includeSidechains** | **Boolean**|  | [optional] 

### Return type

**{String: Object}**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/plain, application/json, text/json


## aPIV2NetworksGet

> [String] aPIV2NetworksGet()



### Example

```javascript
import EthtpsApi from 'ethtps_api';

let apiInstance = new EthtpsApi.GeneralApi();
apiInstance.aPIV2NetworksGet((error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

This endpoint does not need any parameter.

### Return type

**[String]**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/plain, application/json, text/json


## aPIV2ProviderTypesColorDictionaryGet

> {String: String} aPIV2ProviderTypesColorDictionaryGet()



### Example

```javascript
import EthtpsApi from 'ethtps_api';

let apiInstance = new EthtpsApi.GeneralApi();
apiInstance.aPIV2ProviderTypesColorDictionaryGet((error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

This endpoint does not need any parameter.

### Return type

**{String: String}**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/plain, application/json, text/json


## aPIV2ProvidersGet

> [ProviderResponseModel] aPIV2ProvidersGet(opts)



### Example

```javascript
import EthtpsApi from 'ethtps_api';

let apiInstance = new EthtpsApi.GeneralApi();
let opts = {
  'subchainsOf': "subchainsOf_example" // String | 
};
apiInstance.aPIV2ProvidersGet(opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **subchainsOf** | **String**|  | [optional] 

### Return type

[**[ProviderResponseModel]**](ProviderResponseModel.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/plain, application/json, text/json

