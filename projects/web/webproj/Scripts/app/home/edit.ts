module milkyway.home {

    export enum MapToolboxMode {
        Marker,
        Line,
        Search
    }

    export interface IEditScope extends ng.IScope {
        timeline: milkyway.model.TimelinePin[];
        routes: milkyway.model.TimelineRoute[];
        selected: Array<any>;

        toolbox: any[];
        toolboxMode: MapToolboxMode;
        doChangeToolbox(mode: MapToolboxMode);

        doJoinPins();
        doDeletePin(pin: milkyway.model.TimelinePin);
        doDeletePins(pins: milkyway.model.TimelinePin[]);
        doDeleteRoute(route: milkyway.model.TimelineRoute);
        doDeleteRoutes(routes: milkyway.model.TimelineRoute[]);

        colors: string[];
        symbols: milkyway.model.PinSymbol[];
        doChangeColorForPin(pin: milkyway.model.TimelinePin, color: string);
        doChangeSymbolForPin(pint: milkyway.model.TimelinePin, symbol: milkyway.model.PinSymbol);

        doChangeColorForRoute(pin: milkyway.model.TimelineRoute, color: string);
    }

    export class EditController {
        

        public map: L.mapbox.Map;

        private _pinLayer: L.FeatureGroup;
        private _routeLayer: L.FeatureGroup;

        private _scope : IEditScope;

        constructor($scope: IEditScope, timeline: milkyway.services.TimelineService) {

            this._scope = $scope;

            $scope.timeline = [];
            $scope.routes = [];
            $scope.selected = [];

            $scope.toolbox = [
                { type: MapToolboxMode.Marker, active: false },
                { type: MapToolboxMode.Line, active: false },
                { type: MapToolboxMode.Search, active: false }];
            $scope.toolboxMode = MapToolboxMode.Search;
            $scope.doChangeToolbox = newMode => {
                $scope.toolboxMode = newMode;
            };

            this.map = L.mapbox.map('app-map', milkyway.Constants.mapbox.mapid);
            this.map.fitWorld();

            this._pinLayer = new L.FeatureGroup([]);
            this._pinLayer.addTo(this.map);

            this._routeLayer = new L.FeatureGroup([]);
            this._routeLayer.addTo(this.map);

            /*timeline.getTimelineAsync().then((result) => {
                for (var index in result) {
                    var item = result[index];
                    this.addPin(item);
                }

                this.map.fitBounds(this._pinLayer.getBounds());
            });*/

            this._pinLayer.on("click", e => {
                $scope.$apply(() => {
                    this.onPinClicked(e);
                });
            });

            this._routeLayer.on("click", e => {
                $scope.$apply(() => {
                    this.onRouteClicked(e);
                });
            });

            this.map.on("click", e => {
                $scope.$apply(() => {
                    this.onMapClicked(e);
                });
            });

            $scope.doJoinPins = () => this.doJoinPinsIntoRoute();
            $scope.doDeletePin = (pin) => this.deletePin(pin);
            $scope.doDeletePins = (pins) => this.deletePins(pins);
            $scope.doDeleteRoute = (route) => this.deleteRoute(route);
            $scope.doDeleteRoutes = (routes) => this.deleteRoutes(routes);

            $scope.$watchCollection('timeline', () => this.onTimelineChanged());
            $scope.$watchCollection('selected', (_new, _old) => this.onSelectionChanged(_new, _old));
            $scope.$watch("toolboxMode", () => this.onToolboxChanged());

            $scope.doChangeColorForPin = (pin, color) => {
                pin.style.color = color;
                pin.refresh();
            };

            $scope.doChangeSymbolForPin = (pin, symbol) => {
                pin.symbol = symbol;
                pin.refresh();
            };

            $scope.doChangeColorForRoute = (route, color) => {
                route.style.color = color;
                route.refresh();
            }

            $scope.colors = ["red", "blue", "black", "green"];
            $scope.symbols = [
                new milkyway.model.PinSymbol("bus"),
                new milkyway.model.PinSymbol("automobile"),
                new milkyway.model.PinSymbol("bicycle"),
                new milkyway.model.PinSymbol("plane")
            ];
        }

        onMapClicked(e: any) {
            if (this._scope.selected.length != 0) {
                this._scope.selected = [];

                e.originalEvent.preventDefault();
                return;
            }

            if (this._scope.toolboxMode == MapToolboxMode.Marker) {
                var c = e.latlng;
                var pin = new milkyway.model.TimelinePin('New status',
                    new milkyway.model.Geolocation('Loading address...',
                        new milkyway.model.Coordinates(c.lat, c.lng)));
                pin.refresh();

                this.addPin(pin);
            }
        }

        addPin(pin: milkyway.model.TimelinePin) {
            this._scope.timeline.push(pin);

            pin.marker.on("drag", e => this.onPinDragging(pin));

            this._pinLayer.addLayer(pin.marker);
        }

        onPinDragging(pin: milkyway.model.TimelinePin) {
        }

        deletePins(pins: milkyway.model.TimelinePin[]) {
            linq(pins).each(pin => {
                this.deletePin(pin);
            });
        }

        deletePin(pin: milkyway.model.TimelinePin) {
            var index = linq(this._scope.timeline).indexOf(pin);
            if (index != -1) {
                this._scope.timeline.splice(index, 1);
                this._pinLayer.removeLayer(pin.marker);
                pin.marker.off("drag");

                var routes = linq(this._scope.routes).where(route => route.hasPin(pin)).toArray();
                linq(routes).each(route => {
                    this.deleteRoute(route);
                });
            }

            index = linq(this._scope.selected).indexOf(pin);
            if (index != -1) {
                this._scope.selected.splice(index, 1);
            }
        }

        addRoute(route: milkyway.model.TimelineRoute) {
            this._scope.routes.push(route);
            this._routeLayer.addLayer(route.line);
        }

        deleteRoutes(routes: milkyway.model.TimelineRoute[]) {
            linq(routes).each(route => {
                this.deleteRoute(route);
            });
        }

        deleteRoute(route: milkyway.model.TimelineRoute) {
            var index = linq(this._scope.routes).indexOf(route);
            if (index != -1) {
                this._scope.routes.splice(index, 1);
                this._routeLayer.removeLayer(route.line);
            }

            index = linq(this._scope.selected).indexOf(route);
            if (index != -1) {
                this._scope.selected.splice(index, 1);
            }
        }

        onPinClicked(e: any) {
            if (this._scope.selected.length != 0 && !(this._scope.selected[0] instanceof milkyway.model.TimelinePin)) {
                this._scope.selected = [];
            }

            var pin = linq(this._scope.timeline).first(pin => pin.marker == e.layer);
            if (e.originalEvent.ctrlKey) {
                var index = linq(this._scope.selected).indexOf(pin);
                if (index == -1) {
                    this._scope.selected.push(pin);
                } else {
                    this._scope.selected.splice(index, 1);
                }
            } else {
                this._scope.selected = [pin];
            }
        }

        onRouteClicked(e: any) {
            if (this._scope.selected.length != 0 && !(this._scope.selected[0] instanceof milkyway.model.TimelineRoute)) {
                this._scope.selected = [];
            }

            var route = linq(this._scope.routes).first(route => route.line == e.layer);
            if (e.originalEvent.ctrlKey) {
                var index = linq(this._scope.selected).indexOf(route);
                if (index == -1) {
                    this._scope.selected.push(route);
                } else {
                    this._scope.selected.splice(index, 1);
                }
            } else {
                this._scope.selected = [route];
            }
        }

        onTimelineChanged() {

        }

        onSelectionChanged(newSelected: any[], oldSelected: any[]) {
            if (newSelected.length != 0) {
                if (newSelected[0] instanceof milkyway.model.TimelinePin) {
                    this._scope.toolboxMode = MapToolboxMode.Marker;
                }
                else if (newSelected[0] instanceof milkyway.model.TimelineRoute) {
                    this._scope.toolboxMode = MapToolboxMode.Line;
                }
            }

            if (newSelected.length != 0) {
                if (newSelected[0] instanceof milkyway.model.TimelinePin) {
                // grayout all non-selected pins and routes
                }
                else if (newSelected[0] instanceof milkyway.model.TimelineRoute) {
                // grayout all non-selected routes and pins
                }
            } else {
                // reset colors for all pins and routes
            }
        }

        doJoinPinsIntoRoute() {
            if (this._scope.selected.length == 0 || !(this._scope.selected[0] instanceof milkyway.model.TimelinePin))
                return;

            var selected = this._scope.selected;

            var routes = [];
            for (var i = 1; i < selected.length; i++) {
                var point1 = selected[i - 1];
                var point2 = selected[i];

                var route = new milkyway.model.TimelineRoute(point1, point2);
                route.refresh();
                this.addRoute(route);
                routes.push(route);
            }
            this._scope.selected = routes;
        }

        onToolboxChanged() {
            angular.forEach(this._scope.toolbox, tab => {
                tab.active = this._scope.toolboxMode == tab.type;
            });
        }
    }

}