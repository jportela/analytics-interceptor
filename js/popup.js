/**
 * Popup
 *
 * Initializer for the popup. Includes interactions initializations.
 *
 * (c) 2014 João Portela. The Analytics Interceptor extension may be freely
 * distributed under the MIT license.
 */

var $ = require('jquery');
var Backbone = require('backbone');

var Popup = require('./views/popup.js');

Backbone.$ = $;

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

});
