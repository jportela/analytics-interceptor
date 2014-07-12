/**
 * Background
 *
 * Initializer for the extension Background. Handles the Tab collection and
 * receives commands from the popup view
 *
 * (c) 2014 João Portela. The Analytics Interceptor extension may be freely
 * distributed under the MIT license.
 */

var $ = require('jquery');
var Backbone = require('backbone');

Backbone.$ = $;

var TabList = require('./collections/tabs');
var TabModel = require('./models/tab');

// creates the Tabs collection. To be used by the popup view
window.Tabs = new TabList();
window.Tabs.registerListeners();
