/**
 * Tab model
 *
 * Models a Tab on the browser window. It has a collection of Events.
 * Contains the request interceptor.
 *
 * (c) 2014 João Portela. The Analytics Interceptor extension may be freely
 * distributed under the MIT license.
 */

var Backbone = require('backbone');
var EventList = require('../collections/events');
var EventModel = require('../models/event');

module.exports = Backbone.Model.extend({
  eventList: null,            // list of GA events
  interceptorFunction: null,  // GA requests listener
  eventIdCounter: 0,          // counter to attribute unique IDs to events

  defaults: {
    enabled: false            // is the interceptor enabled?
  },

  initialize: function () {
    this.eventList = new EventList();
    this.on('change:enabled', this.enabledChange, this);
    this.listenTo(this.eventList, 'add', this.updateBadge, this);
    this.listenTo(this.eventList, 'reset', this.updateBadge, this);
  },

  fetchEvents: function () {
    return this.eventList;
  },

  enabledChange: function () {
    if (this.get('enabled')) {
      this.enableInterceptor();
    }
    else {
      this.disableInterceptor();
    }
  },

  /* Enables the Google Analytics request interceptor and starts
     recording events */
  enableInterceptor: function () {
    var self = this,
        filter = {
          urls: ["*://www.google-analytics.com/collect?*"],
          tabId: parseInt(this.get('id'), 10)
        };

    if (!this.interceptorFunction) {

      this.interceptorFunction = function () {
        self._interceptor.apply(self, Array.prototype.slice.call(arguments));
      };

      chrome.webRequest.onBeforeRequest.addListener(this.interceptorFunction, filter);
    }

  },

  /* Stops intercepting GA requests */
  disableInterceptor: function () {
    if (this.interceptorFunction) {
      chrome.webRequest.onBeforeRequest.removeListener(this.interceptorFunction);
      this.interceptorFunction = null;
    }
  },

  getEventCount: function () {
    return this.eventList ? this.eventList.length : null;
  },

  /* Destroys all events on the eventList collection */
  clearEvents: function () {
    this.eventList.reset();
  },

  /* Updates the badge with the events count from the selected tab */
  updateBadge: function () {
    var count = this.getEventCount(),
        id = parseInt(this.get('id'), 10);

    chrome.browserAction.setBadgeText({
      'text': '' + count,
      tabId: id
    });

  },

  /* Callback for the request interceptor. Adds new events to the collection  */
  _interceptor: function (details) {
    var data = this._parseQueryString(details.url);
    if (data) {
      this.eventIdCounter++;
      this.eventList.add(new EventModel(data, {
        normalize: true,
        id: this.eventIdCounter
      }).toJSON());
    }

  },

  /* Utility to parse the request query string into a key -> value object, since the
     relevant GA information is in the request parameters */
  _parseQueryString: function (url) {
    var splitted = url.split('?'),
        parametersString = splitted.length > 1 ? splitted[1] : null,
        data = {};

    if (parametersString) {
      splitted = parametersString.split('&');

      splitted.forEach(function (item) {
        var splitted = item.split('='),
            key,
            value;

        if (splitted.length === 2) {
          key = window.decodeURI(splitted[0]);
          value = window.decodeURI(splitted[1]);
          data[key] = value;
        }
      });

      return data;
    }

    return null;

  },

  /* Only store own attributes (for persistence in the future) */
  toJSON: function () {
    return {
      'enabled': this.get('enabled'),
      'id': this.get('id')
    };
  }

});
