var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var milkyway;
(function (milkyway) {
    (function (model) {
        var TimelineRoute = (function (_super) {
            __extends(TimelineRoute, _super);
            function TimelineRoute(point1, point2) {
                _super.call(this, point1, point2, new model.RouteStyle("blue", 5));
                this.point1 = point1;
                this.point2 = point2;
            }
            TimelineRoute.prototype.refresh = function () {
                _super.prototype.refresh.call(this);
            };

            TimelineRoute.prototype.hasPin = function (pin) {
                return this.point1 == pin || this.point2 == pin;
            };
            return TimelineRoute;
        })(model.Route);
        model.TimelineRoute = TimelineRoute;
    })(milkyway.model || (milkyway.model = {}));
    var model = milkyway.model;
})(milkyway || (milkyway = {}));
