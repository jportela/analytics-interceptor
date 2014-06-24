/**
 * Event View
 *
 * View to render a Google Analytics event.
 * See templates/event.hbs
 *
 * (c) 2014 João Portela. The Analytics Interceptor extension may be freely
 * distributed under the MIT license.
 */

var Backbone = require('backbone');
var Handlebars = require('handlebars');
var templates = require('../../templates/templates')(Handlebars);

module.exports = Backbone.View.extend({
  tagName: 'li',
  className: 'event-item',
  template: templates['templates/event.hbs'],

  initialize: function () {
    this.render();
  },

  render: function () {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
});
