var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var milkyway;
(function (milkyway) {
    (function (model) {
        var TimelinePin = (function (_super) {
            __extends(TimelinePin, _super);
            function TimelinePin(status, location, happenedAt) {
                _super.call(this, new L.LatLng(location.coord.lat, location.coord.lng), model.PinSymbol.empty, new model.PinStyle("blue", 1 /* Medium */));
                this.status = status;
                this.location = location;
                this.happenedAt = happenedAt;
            }
            TimelinePin.prototype.refresh = function () {
                _super.prototype.refresh.call(this);

                if (this.location == null)
                    return;

                this.marker.bindPopup(this.location.address);
            };
            return TimelinePin;
        })(model.Pin);
        model.TimelinePin = TimelinePin;
    })(milkyway.model || (milkyway.model = {}));
    var model = milkyway.model;
})(milkyway || (milkyway = {}));
