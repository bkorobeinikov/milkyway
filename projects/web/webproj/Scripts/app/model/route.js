var milkyway;
(function (milkyway) {
    (function (model) {
        var Route = (function () {
            function Route(point1, point2, style) {
                this.point1 = point1;
                this.point2 = point2;
                this.style = style;
            }
            Route.prototype.refresh = function () {
                var _this = this;
                if (this.line == null) {
                    this.line = new L.Polyline([this.point1.latlng, this.point2.latlng]);

                    this.point1.marker.on("drag", function (e) {
                        return _this.onPinDragging(e);
                    });
                    this.point2.marker.on("drag", function (e) {
                        return _this.onPinDragging(e);
                    });
                }

                this.line.setStyle({
                    color: this.style.color,
                    weight: this.style.weight
                });
                this.line.setLatLngs([this.point1.latlng, this.point2.latlng]);
            };

            Route.prototype.onPinDragging = function (e) {
                this.refresh();
            };
            return Route;
        })();
        model.Route = Route;
    })(milkyway.model || (milkyway.model = {}));
    var model = milkyway.model;
})(milkyway || (milkyway = {}));
