module milkyway.model {
    export class Route {
        line: L.Polyline;

        selected: boolean;

        constructor(public point1: Pin, public point2: Pin, public style: RouteStyle) {
            
        }

        refresh() {
            if (this.line == null) {
                this.line = new L.Polyline([this.point1.latlng, this.point2.latlng]);

                this.point1.marker.on("drag", e => this.onPinDragging(e));
                this.point2.marker.on("drag", e => this.onPinDragging(e));
            }

            this.line.setStyle({
                color: this.style.color,
                weight: this.style.weight
            });
            this.line.setLatLngs([this.point1.latlng, this.point2.latlng]);
        }

        private onPinDragging(e: L.LeafletEvent) {
            this.refresh();
        }
    }
} 