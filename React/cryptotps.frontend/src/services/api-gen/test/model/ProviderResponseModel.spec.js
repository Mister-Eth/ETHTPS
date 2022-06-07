/**
 * ETHTPS.API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD.
    define(['expect.js', process.cwd()+'/src/index'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    factory(require('expect.js'), require(process.cwd()+'/src/index'));
  } else {
    // Browser globals (root is window)
    factory(root.expect, root.EthtpsApi);
  }
}(this, function(expect, EthtpsApi) {
  'use strict';

  var instance;

  beforeEach(function() {
    instance = new EthtpsApi.ProviderResponseModel();
  });

  var getProperty = function(object, getter, property) {
    // Use getter method if present; otherwise, get the property directly.
    if (typeof object[getter] === 'function')
      return object[getter]();
    else
      return object[property];
  }

  var setProperty = function(object, setter, property, value) {
    // Use setter method if present; otherwise, set the property directly.
    if (typeof object[setter] === 'function')
      object[setter](value);
    else
      object[property] = value;
  }

  describe('ProviderResponseModel', function() {
    it('should create an instance of ProviderResponseModel', function() {
      // uncomment below and update the code to test ProviderResponseModel
      //var instance = new EthtpsApi.ProviderResponseModel();
      //expect(instance).to.be.a(EthtpsApi.ProviderResponseModel);
    });

    it('should have the property name (base name: "name")', function() {
      // uncomment below and update the code to test the property name
      //var instance = new EthtpsApi.ProviderResponseModel();
      //expect(instance).to.be();
    });

    it('should have the property color (base name: "color")', function() {
      // uncomment below and update the code to test the property color
      //var instance = new EthtpsApi.ProviderResponseModel();
      //expect(instance).to.be();
    });

    it('should have the property theoreticalMaxTPS (base name: "theoreticalMaxTPS")', function() {
      // uncomment below and update the code to test the property theoreticalMaxTPS
      //var instance = new EthtpsApi.ProviderResponseModel();
      //expect(instance).to.be();
    });

    it('should have the property type (base name: "type")', function() {
      // uncomment below and update the code to test the property type
      //var instance = new EthtpsApi.ProviderResponseModel();
      //expect(instance).to.be();
    });

    it('should have the property isGeneralPurpose (base name: "isGeneralPurpose")', function() {
      // uncomment below and update the code to test the property isGeneralPurpose
      //var instance = new EthtpsApi.ProviderResponseModel();
      //expect(instance).to.be();
    });

    it('should have the property isSubchainOf (base name: "isSubchainOf")', function() {
      // uncomment below and update the code to test the property isSubchainOf
      //var instance = new EthtpsApi.ProviderResponseModel();
      //expect(instance).to.be();
    });

  });

}));
