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
    'click #intercept': 'interceptEvents',
    'click #clear': 'clearEvents'
  },


  initialize: function () {
    this.render();
  },

  render: function () {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },

  /* Handler for click on the Enable/Disable button */
  interceptEvents: function () {
    var target = this.$("#intercept");

    // enables the interceptor
    if (target.val() === 'on') {
      this.enableInterceptor();
    }
    else {
      this.disableInterceptor();
    }

  },

  clearEvents: function () {
    this.model.eventList.reset();
  },

  enableInterceptor: function () {
    this.model.set('enabled', true);
  },

  disableInterceptor: function () {
    this.model.set('enabled', false);
  },

});
