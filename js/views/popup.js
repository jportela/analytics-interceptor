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

Backbone.$ = $;

module.exports = Backbone.View.extend({

  template: templates['templates/interceptor.hbs'],
  eventList: null,

  events: {
    'click #intercept': 'interceptEvents',
    'click #clear': 'clearEvents'
  },

  initialize: function () {
    var self = this;
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
        self.clearTab.call(self);
        self.fetchTab.call(self, tabId);
      });
    }
  },

  render: function (tab) {
    this.$el.html(this.template(tab.toJSON()));
  },

  /* Renders the list of events */
  renderEvents: function () {
    if (this.eventList) {
      this.eventList.each(this.addEvent, this);
    }
  },

  clearTab: function () {
    this.stopListening(this.eventList);
  },

  fetchTab: function (tabId) {
    // fetches the tab or create a new model if it doesn't exist
    var selectedTab = this.tabList.get(tabId) || this.tabList.add({ id: tabId });

    this.render(selectedTab);

    this.eventList = selectedTab.fetchEvents();


    this.renderEvents();

    this.listenTo(this.eventList, 'add', this.addEvent);
    this.listenTo(this.eventList, 'reset', this.renderEmptyEvents);

  },

  /* Appends a new event to the event list */
  addEvent: function (item) {
    var view = new EventView({ model: item});
    this.$(".event-list").append(view.render().el);
  },

  /* Handler for click on the Enable/Disable button */
  interceptEvents: function () {
    var target = $("#intercept");

    if (target.val() === 'on') {
      // TODO: do this on the model and automatically update the view
      target.val('off');
      target.html('Disable');

      // enables the interceptor
      this.getSelectedTab(function (tabId) {
        chrome.runtime.sendMessage({
          'cmd': 'enableInterceptor',
          'tabId': tabId
        });
      });
    }
    else {
      target.val('on');
      target.html('Enable');

      // disables the interceptor
      this.getSelectedTab(function (tabId) {
        chrome.runtime.sendMessage({
          'cmd': 'disableInterceptor',
          'tabId': tabId
        });
      });
    }
  },

  clearEvents: function () {
    this.getSelectedTab(function (tabId) {
      chrome.runtime.sendMessage({
        'cmd': 'clearEvents',
        'tabId': tabId
      });
    });
  },

  renderEmptyEvents: function () {
    this.$(".event-list").html('');
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
