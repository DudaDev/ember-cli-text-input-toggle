/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-cli-text-input-toggle',

  included: function (app) {
    app.import('vendor/text-input-toggle/style.css')
  }
};
