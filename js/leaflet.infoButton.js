L.Control.InfoButton = L.Control.extend({
  options: {
    position: "topleft",
    title: "<h1>Leaflet</h1>",
    linkTitle: "Info",
    html: '<p>This map was generated by Leaflet.</p><p>Leaflet is a modern open-source JavaScript library for mobile-friendly interactive this._maps. It is developed by <a href="http://agafonkin.com/en">Vladimir Agafonkin</a> with a&nbsp;team of dedicated <a href="https://github.com/Leaflet/Leaflet/graphs/contributors">contributors</a>. Weighing just about <abbr title="33 KB gzipped &mdash; that\'s 123 KB minified and 218 KB in the source form, with 10 KB of CSS (2 KB gzipped) and 11 KB of images.">33 KB of JS</abbr>, it has all the <a href="features.html">features</a> most developers ever need for online this._maps.</p><p>Leaflet is designed with <em>simplicity</em>, <em>performance</em> and <em>usability</em> in mind. It works efficiently across all major desktop and mobile platforms out of the box, taking advantage of HTML5 and CSS3 on modern browsers while still being accessible on older ones. It can be extended with a huge amount of <a href="plugins.html">plugins</a>, has a beautiful, easy to use and <a href="reference.html" title="Leaflet API reference">well-documented API</a> and a simple, readable <a href="https://github.com/Leaflet/Leaflet" title="Leaflet GitHub repository">source code</a> that is a&nbsp;joy to <a href="https://github.com/Leaflet/Leaflet/blob/master/CONTRIBUTING.md" title="A guide to contributing to Leaflet">contribute</a> to.</p>',
    show: false,
  },

  onAdd: function (map) {
    this.container = L.DomUtil.create("div", "leaflet-bar leaflet-control");

    this.link = L.DomUtil.create(
      "a",
      "leaflet-bar-part leaflet-info-button",
      this.container
    );
    this.link.href = "#";
    this.link.title = this.options.linkTitle;
    this.link.innerHTML = "?";
    L.DomEvent.on(this.link, "click", this._click, this);

    this.infoWindowContainer = L.DomUtil.create(
      "div",
      "leaflet-infoWindow-container",
      this._map._container
    );
    this.infoWindowBlack = L.DomUtil.create(
      "div",
      "leaflet-infoWindow-black",
      this.infoWindowContainer
    );
    this.infoWindow = L.DomUtil.create(
      "div",
      "leaflet-infoWindow",
      this.infoWindowContainer
    );

    L.DomEvent.on(this.infoWindowContainer, "click", this._click, this);
    L.DomEvent.on(this.infoWindow, "click", this._stopClick, this);
    this.title = L.DomUtil.create("div", "leaflet-title", this.infoWindow);
    this.title.innerHTML = this.options.title;
    this.content = L.DomUtil.create("div", "leaflet-content", this.infoWindow);
    this.content.innerHTML = this.options.html;
    L.DomEvent.disableClickPropagation(this.infoWindow);
    L.DomEvent.disableClickPropagation(this.infoWindow);
    if (this.options.show) this._showInfo();
    return this.container;
  },
  _stopClick: function (e) {
    L.DomEvent.stopPropagation(e);
  },

  _click: function (e) {
    if (this.options.show == true) {
      this._hideInfo();
    } else {
      this._showInfo();
    }
  },
  _showInfo: function () {
    this.infoWindowContainer.style.display = "block";

    this.infoWindowBlack.style.animation = "showInfoContainer 0.2s";
    this.infoWindowBlack.style.webkitAnimationName = "showInfoContainer 0.2s";
    this.infoWindowBlack.style.opacity = "1";

    this.infoWindow.style.animation = "showInfo 0.5s";
    this.infoWindow.style.webkitAnimationName = "showInfo 0.5s";
    this.infoWindow.style.top = "10%";
    this.options.show = true;
    this._map.dragging.disable();
    this._map.touchZoom.disable();
    this._map.doubleClickZoom.disable();
    this._map.scrollWheelZoom.disable();
  },
  _hideInfo: function () {
    this.infoWindowBlack.style.animation = "hideInfoContainer 0.2s";
    this.infoWindowBlack.style.webkitAnimationName = "hideInfoContainer 0.2s";
    this.infoWindowBlack.style.opacity = "0";

    this.infoWindow.style.animation = "hideInfo 0.5s";
    this.infoWindow.style.webkitAnimationName = "hideInfo 0.5s";
    this.infoWindow.style.top = "-100%";

    var _this = this;
    setTimeout(function () {
      _this.infoWindowContainer.style.display = "none";
    }, 500);
    this.options.show = false;
    this._map.dragging.enable();
    this._map.touchZoom.enable();
    this._map.doubleClickZoom.enable();
    this._map.scrollWheelZoom.enable();
  },
});

L.control.infoButton = function (options) {
  var newControl = new L.Control.InfoButton(options);
  return newControl;
};
