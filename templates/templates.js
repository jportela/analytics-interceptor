module.exports = function(Handlebars) {

this["JST"] = this["JST"] || {};

this["JST"]["templates/event.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "<strong>Label</strong>: ";
  if (helper = helpers.label) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.label); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "<strong>Value</strong>: ";
  if (helper = helpers.value) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.value); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " ";
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <table class=\"dimensions\">\n      <tr>\n        <th>Index</th>\n        <th>Dimension Value</th>\n      </tr>\n      ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.dimensions), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </table>\n    ";
  return buffer;
  }
function program6(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n      <tr>\n        <td>";
  if (helper = helpers.index) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.index); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</td>\n        <td>";
  if (helper = helpers.value) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.value); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</td>\n      </tr>\n      ";
  return buffer;
  }

function program8(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <table class=\"metrics\">\n\n      <tr>\n        <th>Index</th>\n        <th>Metric Value</th>\n      </tr>\n      ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.metrics), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </table>\n    ";
  return buffer;
  }

  buffer += "<div class=\"header-container ui-expand\" data-target=\"#event-";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\n  <h2>";
  if (helper = helpers.category) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.category); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " - ";
  if (helper = helpers.action) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.action); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</h2>\n  <span class=\"event-timestamp\">@ ";
  if (helper = helpers.timestamp) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.timestamp); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span>\n</div>\n\n<div class=\"ui-expandable event-information\" id=\"event-";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\n  <p>";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.label), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</p>\n  <p>";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.value), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</p>\n  <div class=\"dimensions-container\">\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.dimensions), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.metrics), {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </div>\n</div>\n";
  return buffer;
  });

this["JST"]["templates/interceptor.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, self=this;

function program1(depth0,data) {
  
  
  return "\n      <button id=\"intercept\" class=\"toolbox-button\" value=\"off\">Disable</button>\n    ";
  }

function program3(depth0,data) {
  
  
  return "\n      <button id=\"intercept\" class=\"toolbox-button\" value=\"on\">Enable</button>\n    ";
  }

  buffer += "<header>\n  <h1>Analytics Interceptor</h1>\n  <div class=\"toolbox\">\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.enabled), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    <button id=\"clear\" class=\"toolbox-button\">Clear</button>\n  </div>\n</header>\n\n<ul class=\"event-list\">\n\n</ul>\n";
  return buffer;
  });

return this["JST"];

};