/**
 * Tabs collection
 *
 * Collection containing all information of a selected tab. For convenience,
 * tab related listeners (from Chrome) are registered here.
 *
 * See models/tab
 *
 * (c) 2014 João Portela. The Analytics Interceptor extension may be freely
 * distributed under the MIT license.
 */

var Backbone = require('backbone');
var TabModel = require('../models/tab');

module.exports = Backbone.Collection.extend({
  model: TabModel,
  selectedTab: null,  //the currently selected tab

  //register chrome listeners for tab changes
  registerListeners: function () {
    var self = this;
    chrome.tabs.onRemoved.addListener(function () {
      self.tabRemoved.apply(self, Array.prototype.slice.call(arguments));
    });
    chrome.tabs.onSelectionChanged.addListener(function () {
      self.tabSelectionChanged.apply(self, Array.prototype.slice.call(arguments));
    });
  },

  /* Destroys all tabs on the collection */
  clearTabs: function () {
    this.reset();
  },

  /* Callback for removed tab */
  tabRemoved: function (tabId, status) {
    var model;
    // if the window is closing, all tabs will be cleared
    if (status.isWindowClosing) {
      this.clearTabs();
    }
    else {
      model = this.get('' + tabId);

      this.remove(model);
    }
  },

  /* Callback for the selected tab change */
  tabSelectionChanged: function (tabId) {
    var model = this.get('' + tabId);
    this.selectedTab = '' + tabId;

    if (model && model.get('enabled')) {
      //updates the badge with the event count
      model.updateBadge();
    }
    else {
      //if there's no model yet, the badge will be cleared
      this.clearBadge(tabId);
    }
    //triggers a custom event for the popup view to update itself
    this.trigger('selectedTabChanged', this.selectedTab);
  },

  /* Clears the badge */
  clearBadge: function (tabId) {
    chrome.browserAction.setBadgeText({
      'text': '',
      tabId: tabId
    });
  }

});
