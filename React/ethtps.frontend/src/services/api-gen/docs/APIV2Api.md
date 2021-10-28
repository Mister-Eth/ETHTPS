# EthtpsApi.APIV2Api

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**aPIV2HomePageModelGet**](APIV2Api.md#aPIV2HomePageModelGet) | **GET** /API/v2/HomePageModel | 
[**aPIV2InstantTPSGet**](APIV2Api.md#aPIV2InstantTPSGet) | **GET** /API/v2/InstantTPS | 
[**aPIV2IntervalsGet**](APIV2Api.md#aPIV2IntervalsGet) | **GET** /API/v2/Intervals | 
[**aPIV2MaxTPSGet**](APIV2Api.md#aPIV2MaxTPSGet) | **GET** /API/v2/MaxTPS | 
[**aPIV2NetworksGet**](APIV2Api.md#aPIV2NetworksGet) | **GET** /API/v2/Networks | 
[**aPIV2ProviderTypesGet**](APIV2Api.md#aPIV2ProviderTypesGet) | **GET** /API/v2/ProviderTypes | 
[**aPIV2ProvidersGet**](APIV2Api.md#aPIV2ProvidersGet) | **GET** /API/v2/Providers | 
[**aPIV2RecalculateMaxTPSGet**](APIV2Api.md#aPIV2RecalculateMaxTPSGet) | **GET** /API/v2/RecalculateMaxTPS | 
[**aPIV2TPSGet**](APIV2Api.md#aPIV2TPSGet) | **GET** /API/v2/TPS | 



## aPIV2HomePageModelGet

> HomePageViewModel aPIV2HomePageModelGet(opts)



### Example

```javascript
import EthtpsApi from 'ethtps_api';

let apiInstance = new EthtpsApi.APIV2Api();
let opts = {
  'network': "'Mainnet'" // String | 
};
apiInstance.aPIV2HomePageModelGet(opts, (error, data, response) => {
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

[**HomePageViewModel**](HomePageViewModel.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/plain, application/json, text/json


## aPIV2InstantTPSGet

> [TPSResponseModel] aPIV2InstantTPSGet(opts)



### Example

```javascript
import EthtpsApi from 'ethtps_api';

let apiInstance = new EthtpsApi.APIV2Api();
let opts = {
  'includeSidechains': true // Boolean | 
};
apiInstance.aPIV2InstantTPSGet(opts, (error, data, response) => {
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
 **includeSidechains** | **Boolean**|  | [optional] [default to true]

### Return type

[**[TPSResponseModel]**](TPSResponseModel.md)

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

let apiInstance = new EthtpsApi.APIV2Api();
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


## aPIV2MaxTPSGet

> [TPSResponseModel] aPIV2MaxTPSGet(opts)



### Example

```javascript
import EthtpsApi from 'ethtps_api';

let apiInstance = new EthtpsApi.APIV2Api();
let opts = {
  'provider': "provider_example" // String | 
};
apiInstance.aPIV2MaxTPSGet(opts, (error, data, response) => {
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

### Return type

[**[TPSResponseModel]**](TPSResponseModel.md)

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

let apiInstance = new EthtpsApi.APIV2Api();
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


## aPIV2ProviderTypesGet

> [String] aPIV2ProviderTypesGet()



### Example

```javascript
import EthtpsApi from 'ethtps_api';

let apiInstance = new EthtpsApi.APIV2Api();
apiInstance.aPIV2ProviderTypesGet((error, data, response) => {
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


## aPIV2ProvidersGet

> [ProviderResponseModel] aPIV2ProvidersGet()



### Example

```javascript
import EthtpsApi from 'ethtps_api';

let apiInstance = new EthtpsApi.APIV2Api();
apiInstance.aPIV2ProvidersGet((error, data, response) => {
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

[**[ProviderResponseModel]**](ProviderResponseModel.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/plain, application/json, text/json


## aPIV2RecalculateMaxTPSGet

> String aPIV2RecalculateMaxTPSGet()



### Example

```javascript
import EthtpsApi from 'ethtps_api';

let apiInstance = new EthtpsApi.APIV2Api();
apiInstance.aPIV2RecalculateMaxTPSGet((error, data, response) => {
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

**String**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/plain, application/json, text/json


## aPIV2TPSGet

> [TPSResponseModel] aPIV2TPSGet(opts)



### Example

```javascript
import EthtpsApi from 'ethtps_api';

let apiInstance = new EthtpsApi.APIV2Api();
let opts = {
  'provider': "provider_example", // String | 
  'interval': "interval_example", // String | 
  'network': "network_example", // String | 
  'includeSidechains': true // Boolean | 
};
apiInstance.aPIV2TPSGet(opts, (error, data, response) => {
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
 **interval** | **String**|  | [optional] 
 **network** | **String**|  | [optional] 
 **includeSidechains** | **Boolean**|  | [optional] [default to true]

### Return type

[**[TPSResponseModel]**](TPSResponseModel.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/plain, application/json, text/json

