/**
 * Panel View
 *
 * View to render the dev tools panel to display the interceptor controls.
 * See templates/interceptor.hbs
 *
 * (c) 2014 João Portela. The Analytics Interceptor extension may be freely
 * distributed under the MIT license.
 */

var $ = require('jquery');
var Backbone = require('backbone');
var Handlebars = require('handlebars');
var templates = require('../../templates/templates')(Handlebars);
var EventList = require('../collections/events');
var EventView = require('../views/event');
var ToolboxView = require('../views/toolbox');

module.exports = Backbone.View.extend({

  template: templates['templates/interceptor.hbs'],
  eventList: new EventList(),

  initialize: function () {
    this.controlsView = new ToolboxView({
      model: this.eventList
    });
    this.render();
    
    this.populateEventList();

    this.listenTo(this.eventList, 'add', this.addEvent);
    this.listenTo(this.eventList, 'reset', this.renderEmptyEvents);


  },

  render: function () {
    this.renderControls();
    this.renderEvents();
    return this;
  },

  renderControls: function () {
    this.controlsView.setElement(this.$('.toolbox')).render();
  },

  /* Renders the list of events */
  renderEvents: function () {
    this.eventList.each(this.addEvent, this);
  },

  /* Appends a new event to the event list */
  addEvent: function (item) {
    var view = new EventView({ model: item});
    this.$(".event-list").append(view.render().el);
  },

  renderEmptyEvents: function () {
    this.$(".event-list").empty();
  },

  populateEventList: function () {
    var eventList = this.eventList;
    chrome.devtools.network.getHAR(function (harLog) {
      if (harLog && harLog.entries) {
        harLog.entries.forEach(function (item) {
          eventList.populate(item.request);

        });
      }
    });

    chrome.devtools.network.onRequestFinished.addListener(function (request) {
      eventList.populate(request.request);
    });
  }
});
