/**
 * Event model
 *
 * Models a Google Analytics event. Translates an intercepted request into a
 * events model
 *
 * See utils/event-mapper
 *
 * (c) 2014 João Portela. The Analytics Interceptor extension may be freely
 * distributed under the MIT license.
 */

var Backbone = require('backbone');
var EventMapper = require('../utils/event-mapper');

module.exports = Backbone.Model.extend({

  /* Builds the Google Analytics Event model
   *
   * data - the raw attributes from the GA request
   * options - if options.normalize = true, it will execute the EventMapper
   */
  constructor: function (data, options) {
    var key,
        normalizedKey,
        normalizedObj = {};

    if (options && options.normalize) {

      normalizedObj = EventMapper(data);
      normalizedObj.id = options.id;  //attributes an ID if it's sent on the options

      Backbone.Model.call(this, normalizedObj);
    }
    else {
      Backbone.Model.apply(this, Array.prototype.slice.call(arguments));
    }
  }
});
