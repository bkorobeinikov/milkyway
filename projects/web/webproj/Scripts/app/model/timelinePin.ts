module milkyway.model {
    export class TimelinePin extends Pin {

        constructor(public status: string, public location: Geolocation, public happenedAt: Moment) {
            super(new L.LatLng(location.coord.lat, location.coord.lng), PinSymbol.empty, new PinStyle("blue", PinSize.Medium));
        }

        refresh() {
            super.refresh();

            if (this.location == null)
                return;

            this.marker.bindPopup(this.location.address);
        }
    }
} 