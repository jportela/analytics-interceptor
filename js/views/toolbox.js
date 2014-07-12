/**
 * Controls View
 *
 * View to render the controls toolbar
 * See templates/controls.hbs
 *
 * (c) 2014 João Portela. The Analytics Interceptor extension may be freely
 * distributed under the MIT license.
 */

var Backbone = require('backbone');
var Handlebars = require('handlebars');
var templates = require('../../templates/templates')(Handlebars);

module.exports = Backbone.View.extend({
  tagName: 'div',
  className: 'toolbox',
  template: templates['templates/controls.hbs'],
  events: {
    'click #clear': 'clearEvents'
  },


  initialize: function () {
    this.render();
  },

  render: function () {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },

  clearEvents: function () {
    this.model.reset();
  }
});
