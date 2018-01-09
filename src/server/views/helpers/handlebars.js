const _ = require('lodash');
const Handlerbars = require('handlebars');

const helpers = {
  json(obj, pretty = false) {
    var d;
    if (pretty) {
      d = JSON.stringify(obj, null, 2);
    } else {
      d = JSON.stringify(obj);
    }
    return new Handlerbars.SafeString(d);
  },

  adjustedPage(currentPage, pageSize, newPageSize) {
    const firstId = (currentPage - 1) * pageSize;
    return _.ceil(firstId / newPageSize) + 1;
  },

  block(name) {
    var blocks = this._blocks;
        content = blocks && blocks[name];
    return content ? content.join('\n') : null;
  },

  contentFor: function(name, options) {
    var blocks = this._blocks || (this._blocks = {});
        block = blocks[name] || (blocks[name] = []);
    block.push(options.fn(this));
  },

  encodeIdAttr: function (id) {
      return id.replace(/:| /g, "");
  }
};

module.exports = function registerHelpers(hbs) {
  _.each(helpers, (fn, helper) => {
    hbs.registerHelper(helper, fn);
  });
};
