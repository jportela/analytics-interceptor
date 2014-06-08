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

module.exports = Backbone.Collection.extend({
  model: EventModel
});
