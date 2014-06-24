/**
 * Popup View
 *
 * View to render the popup to display the interceptor controls.
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

Backbone.$ = $;

module.exports = Backbone.View.extend({

  template: templates['templates/interceptor.hbs'],
  tab: null,

  initialize: function () {
    if (!this.id) {
      this.$el.html("Could not find a window to attach. Please reopen the window");
    }
    else {
      //the Tabs is the shared object on the Background window object
      this.tabList = chrome.extension.getBackgroundPage().Tabs;

      // renders the selected tab information
      this.getSelectedTab(this.fetchTab);

      //when the tab is changed, render the interceptor for that tab
      this.listenTo(this.tabList, 'selectedTabChanged', function (tabId) {
        this.clearTab();
        this.fetchTab(tabId);
      }, this);
    }
  },

  render: function () {
    if (this.tab) {
      this.$el.html(this.template(this.tab.toJSON()));
      this.renderControls();
      this.renderEvents();
    }
    return this;
  },

  renderControls: function () {
    this.controlsView.setElement(this.$('.toolbox')).render();
  },

  /* Renders the list of events */
  renderEvents: function () {
    this.tab.eventList.each(this.addEvent, this);
  },

  clearTab: function () {
    if (this.tab) {
      this.tab.off();
    }
  },

  fetchTab: function (tabId) {
    // fetches the tab or creates a new model if it doesn't exist
    this.tab = this.tabList.get(tabId);

    if (!this.tab) {
      this.tab = this.tabList.add({ id: tabId });


      this.listenTo(this.tab, 'change:enabled', this.renderControls);
      this.listenTo(this.tab.eventList, 'add', this.addEvent);
      this.listenTo(this.tab.eventList, 'reset', this.renderEmptyEvents);
    }

    this.controlsView = new ToolboxView({ model: this.tab });

    this.render();
  },

  /* Appends a new event to the event list */
  addEvent: function (item) {
    var view = new EventView({ model: item});
    this.$(".event-list").append(view.render().el);
  },

  renderEmptyEvents: function () {
    this.$(".event-list").empty();
  },

  /* Utility for getting the selected tab */
  getSelectedTab: function (callback) {
    var self = this,
        id = this.id;
    chrome.tabs.query({'windowId': id, 'active': true}, function (result) {
      var tabId = '' + result[0].id;
      callback.call(self, tabId);
    });
  }
});
