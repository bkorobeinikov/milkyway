var milkyway;
(function (milkyway) {
    (function (model) {
        var Pin = (function () {
            function Pin(latlng, symbol, style) {
                this.latlng = latlng;
                this.symbol = symbol;
                this.style = style;
                this.refresh();
            }
            Pin.prototype.refresh = function () {
                var _this = this;
                if (this.marker == null) {
                    this.marker = new L.Marker(this.latlng, {
                        draggable: true
                    });

                    this.marker.on("drag", function (e) {
                        _this.latlng = _this.marker.getLatLng();
                    });
                }

                this.marker.setIcon(L.VectorMarkers.icon({
                    icon: this.symbol.name,
                    markerColor: this.style.color
                }));
                this.marker.setLatLng(this.latlng);
            };
            return Pin;
        })();
        model.Pin = Pin;
    })(milkyway.model || (milkyway.model = {}));
    var model = milkyway.model;
})(milkyway || (milkyway = {}));
