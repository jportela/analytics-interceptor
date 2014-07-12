/**
 * Devtools
 *
 * Initializer for the extension devtools. Handles the Tab collection and
 * receives commands from the popup view
 *
 * (c) 2014 João Portela. The Analytics Interceptor extension may be freely
 * distributed under the MIT license.
 */
/*
var $ = require('jquery');
var Backbone = require('backbone');

Backbone.$ = $;

var TabList = require('./collections/tabs');
var TabModel = require('./models/tab');
*/
chrome.devtools.panels.create("Analytics",
    "img/icon.png",
    "panel.html",
    function(panel) {
      // code invoked on panel creation
    }
);

/*
// creates the Tabs collection. To be used by the popup view
window.Tabs = new TabList();
window.Tabs.registerListeners();

$(function () {
  //window ID is sent to the popup on the #hash
  var windowId = location.hash ? parseInt(location.hash.slice(1), 10) : null;

  new Popup({
    id: windowId,
    el: '#content'
  });

  // expandable interaction
  $('body').on('click', '.ui-expand', function (e) {
    var target;
    e.preventDefault();
    target = $(this).attr('data-target');
    $(target).toggleClass('is-expanded');
  });

});*/
