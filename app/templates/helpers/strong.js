module.exports.strong = function(options) {
  return '<strong>'  + options.fn(this) + '</strong>';
};