var milkyway;
(function (milkyway) {
    (function (model) {
        var PinSymbol = (function () {
            function PinSymbol(name) {
                this.name = name;
            }
            PinSymbol.empty = new PinSymbol(null);
            return PinSymbol;
        })();
        model.PinSymbol = PinSymbol;
    })(milkyway.model || (milkyway.model = {}));
    var model = milkyway.model;
})(milkyway || (milkyway = {}));
