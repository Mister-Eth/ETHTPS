import { GeneralApi, GPSApi, TPSApi, GasAdjustedTPSApi, StatusApi, TimeWarpApi, PageModelApi } from './api-gen/src/index';
import ApiClient from './api-gen/src/ApiClient';
import InstantDataService from './InstantDataService';

export const client = new ApiClient('https://api.ethtps.info/');
export const globalGeneralApi = new GeneralApi(client);
export const globalGPSApi = new GPSApi(client);
export const globalTPSApi = new TPSApi(client);
export const globalGasAdjustedTPSApi = new GasAdjustedTPSApi(client);
export const globalStatusApi = new StatusApi(client);
export const globalInstantDataService = new InstantDataService();
export const globalTimeWarpApi = new TimeWarpApi(client);
export const globalPageModelApi = new PageModelApi(client);
export const formatModeName = function (mode) {
  if (mode !== "gasAdjustedTPS") {
    return mode.toUpperCase();
  }
  else {
    return "gas-adjusted TPS"
  }
}

export const isEmpty = function (obj) {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop))
      return false;
  }

  return true;
}

export const formatSmoothingName = function (smoothing) {
  smoothing = smoothing.replace("One", "1")
    .replace("Minute", "m")
    .replace("Hour", "h")
    .replace("Day", "d")
    .replace("Week", "w")
    .replace("Month", "mo")
  return smoothing;
}

export const capitalizeFirstLetter = function (string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const to2DecimalPlaces = function (num) {
  return Math.round((num + Number.EPSILON) * 100) / 100
}

export const addThousandsSeparators = function (number) {
  return parseFloat(number).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}