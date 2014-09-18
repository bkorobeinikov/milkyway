var milkyway;
(function (milkyway) {
    (function (model) {
        var RouteStyle = (function () {
            function RouteStyle(color, weight) {
                this.color = color;
                this.weight = weight;
            }
            return RouteStyle;
        })();
        model.RouteStyle = RouteStyle;
    })(milkyway.model || (milkyway.model = {}));
    var model = milkyway.model;
})(milkyway || (milkyway = {}));
