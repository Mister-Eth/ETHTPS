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
    instance = new EthtpsApi.TPSGPSOCLH();
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

  describe('TPSGPSOCLH', function() {
    it('should create an instance of TPSGPSOCLH', function() {
      // uncomment below and update the code to test TPSGPSOCLH
      //var instance = new EthtpsApi.TPSGPSOCLH();
      //expect(instance).to.be.a(EthtpsApi.TPSGPSOCLH);
    });

    it('should have the property tps (base name: "tps")', function() {
      // uncomment below and update the code to test the property tps
      //var instance = new EthtpsApi.TPSGPSOCLH();
      //expect(instance).to.be();
    });

    it('should have the property gps (base name: "gps")', function() {
      // uncomment below and update the code to test the property gps
      //var instance = new EthtpsApi.TPSGPSOCLH();
      //expect(instance).to.be();
    });

  });

}));
