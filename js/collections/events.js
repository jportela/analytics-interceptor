/**
 * Events collection
 *
 * Collection containing all Google Analytics events from a Tab.
 * See models/event
 *
 * (c) 2014 João Portela. The Analytics Interceptor extension may be freely
 * distributed under the MIT license.
 */

var Backbone = require('backbone');
var EventModel = require('../models/event');
var ANALYTICS_REGEX = /^http(s)?:\/\/www.google-analytics.com\/collect\?/;

module.exports = Backbone.Collection.extend({
  model: EventModel,
  _idCounter: 0,

  populate: function (request) {
    if (request) {
      var queryString = request.queryString;
      if (ANALYTICS_REGEX.test(request.url)) {
        if (queryString) {
          var event = new EventModel(queryString, {
            normalize: true,
            id: this._generateId()
          });
          if (event) {
            this.add(event.toJSON());
          }
        }
      }
    }
  },

  _generateId: function () {
    return ++this._idCounter;
  }
});
