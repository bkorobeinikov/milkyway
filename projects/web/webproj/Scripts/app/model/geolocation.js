var milkyway;
(function (milkyway) {
    (function (model) {
        var Coordinates = (function () {
            function Coordinates(lat, lng) {
                this.lat = lat;
                this.lng = lng;
            }
            return Coordinates;
        })();
        model.Coordinates = Coordinates;

        var Geolocation = (function () {
            function Geolocation(address, coord) {
                this.address = address;
                this.coord = coord;
            }
            return Geolocation;
        })();
        model.Geolocation = Geolocation;
    })(milkyway.model || (milkyway.model = {}));
    var model = milkyway.model;
})(milkyway || (milkyway = {}));
