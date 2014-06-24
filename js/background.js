/**
 * Background
 *
 * Initializer for the extension Background. Handles the Tab collection and
 * receives commands from the popup view
 *
 * (c) 2014 João Portela. The Analytics Interceptor extension may be freely
 * distributed under the MIT license.
 */

var $ = require('jquery');
var Backbone = require('backbone');

Backbone.$ = $;

var TabList = require('./collections/tabs');
var TabModel = require('./models/tab');

// creates the Tabs collection. To be used by the popup view
window.Tabs = new TabList();
window.Tabs.registerListeners();

// Handler for the Popup view messages
/*chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    var tab = window.Tabs.get(request.tabId);
    if (request.cmd === 'enableInterceptor') {

      tab = tab || window.Tabs.add(new TabModel({id: request.tabId}));

      tab.enableInterceptor();
    }
    else if (request.cmd === 'disableInterceptor') {
      if (tab) {
        tab.disableInterceptor();
      }
    }
    else if (request.cmd === 'clearEvents') {
      tab = window.Tabs.get(request.tabId);
      if (tab) {
        tab.clearEvents();
      }
    }
});*/

// opens a dock like window with the popup view
chrome.browserAction.onClicked.addListener(function (tab) {
  chrome.windows.create({
      url: 'popup.html#' + tab.windowId,
      left: 0,
      top: parseInt(screen.availHeight / 2, 10) || 400,
      width: parseInt(screen.availWidth, 10) || 800,
      height: parseInt(screen.availHeight / 2, 10) || 400,
      type: 'popup'
  });
});
