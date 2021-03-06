/* global L */

'use strict';

var util = require('../util/util');

var ShareControl = L.Control.extend({
  initialize: function() {
    this._li = L.DomUtil.create('li', '');
    this._button = L.DomUtil.create('button', 'share', this._li);
    this._button.title = 'Share the map';
    L.DomEvent.addListener(this._button, 'click', this.share, this);

    return this;
  },
  addTo: function(map) {
    var toolbar = util.getChildElementsByClassName(map.getContainer().parentNode.parentNode, 'npmap-toolbar')[0];

    toolbar.childNodes[1].appendChild(this._li);
    toolbar.style.display = 'block';
    this._container = toolbar.parentNode.parentNode;
    this._map = map;
    util.getChildElementsByClassName(this._container.parentNode, 'npmap-map-wrapper')[0].style.top = '26px';
    return this;
  },
  share: function() {
    window.alert('The share tool has not yet been implemented.');
  }
});

L.Map.mergeOptions({
  shareControl: false
});
L.Map.addInitHook(function() {
  if (this.options.shareControl) {
    var options = {};

    if (typeof this.options.shareControl === 'object') {
      options = this.options.shareControl;
    }

    this.shareControl = L.npmap.control.share(options).addTo(this);
  }
});

module.exports = function(options) {
  return new ShareControl(options);
};
