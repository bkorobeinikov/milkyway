module milkyway.model {
    export class Pin {

        marker: L.Marker;

        selected: boolean;

        constructor(public latlng: L.LatLng, public symbol: PinSymbol, public style: PinStyle) {
            this.refresh();
        }

        refresh() {
            if (this.marker == null) {
                this.marker = new L.Marker(this.latlng, {
                    draggable: true
                });

                this.marker.on("drag", e => {
                    this.latlng = this.marker.getLatLng();
                });
            }

            this.marker.setIcon(L.VectorMarkers.icon({
                icon: this.symbol.name,
                markerColor: this.style.color
            }));
            this.marker.setLatLng(this.latlng);
        }
    }
} 