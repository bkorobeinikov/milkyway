var milkyway;
(function (milkyway) {
    (function (model) {
        (function (PinSize) {
            PinSize[PinSize["Small"] = 0] = "Small";
            PinSize[PinSize["Medium"] = 1] = "Medium";
            PinSize[PinSize["Large"] = 2] = "Large";
        })(model.PinSize || (model.PinSize = {}));
        var PinSize = model.PinSize;
    })(milkyway.model || (milkyway.model = {}));
    var model = milkyway.model;
})(milkyway || (milkyway = {}));
