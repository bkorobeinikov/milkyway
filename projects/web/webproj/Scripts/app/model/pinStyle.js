var milkyway;
(function (milkyway) {
    (function (model) {
        var PinStyle = (function () {
            function PinStyle(color, size) {
                this.color = color;
                this.size = size;
            }
            return PinStyle;
        })();
        model.PinStyle = PinStyle;
    })(milkyway.model || (milkyway.model = {}));
    var model = milkyway.model;
})(milkyway || (milkyway = {}));
