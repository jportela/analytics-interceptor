/**
 * Panel
 *
 * Initializer for the analytics panel. Includes interactions initializations.
 *
 * (c) 2014 João Portela. The Analytics Interceptor extension may be freely
 * distributed under the MIT license.
 */

var $ = require('jquery');
var Backbone = require('backbone');

var Panel = require('./views/panel.js');

Backbone.$ = $;

$(function () {

  new Panel({
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
