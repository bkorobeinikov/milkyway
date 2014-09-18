module milkyway.model {

    export class TimelineRoute extends Route {

        constructor(public point1: milkyway.model.TimelinePin, public point2: milkyway.model.TimelinePin) {
            super(point1, point2, new RouteStyle("blue", 5));
        }

        refresh() {
            super.refresh();
        }

        hasPin(pin: milkyway.model.TimelinePin) {
            return this.point1 == pin || this.point2 == pin;
        }
    }
} 