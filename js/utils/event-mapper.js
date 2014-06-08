/**
 * Event Mapper
 *
 * Utility method to translate raw information from the Google Analytics request
 * into a more friendly notation. It also adds a timestamp.
 *
 * (c) 2014 João Portela. The Analytics Interceptor extension may be freely
 * distributed under the MIT license.
 */

// direct translation map
var map = {
  'ec': 'category',
  'ea': 'action',
  'el': 'label',
  'ev': 'value'
};

// regex for grouping the dimensions and metrics
var regexMatchers = [
  {
    matcher: /^cd(\d*)$/,
    key: 'dimensions'
  },
  {
    matcher: /^cm(\d*)$/,
    key: 'metrics'
  }
];

// returns a timestamp in a friendly format
function getTimestamp () {
  var rawTimestamp = new Date();
  return rawTimestamp.getHours() + ':' + rawTimestamp.getMinutes() +
      ':' + rawTimestamp.getSeconds();
}

// applies the regex matchers by grouping dimensions/metrics under an array
function applyRegexMatchers(obj, key, value) {
  regexMatchers.some(function (item) {
    var result = item.matcher.exec(key);

    if (result && result.length === 2) {
      obj[item.key] = obj[item.key] || [];

      obj[item.key].push({
        index: result[1],
        value: value
      });

      return true;
    }
  });
}

module.exports = function (data) {
  var normalizedKey, key, value, obj = {
    timestamp: getTimestamp()
  };

  for (key in data) {
    value = window.decodeURI(data[key]);

    //if it's not an event, don't record it
    if (key === 't' && value !== 'event') {
      return;
    }

    normalizedKey = map[key];

    if (normalizedKey) {
      obj[normalizedKey] = value;
    }
    else {
      applyRegexMatchers(obj, key, value);
    }
  }

  return obj;
};
