var milkyway;
(function (milkyway) {
    (function (home) {
        (function (MapToolboxMode) {
            MapToolboxMode[MapToolboxMode["Marker"] = 0] = "Marker";
            MapToolboxMode[MapToolboxMode["Line"] = 1] = "Line";
            MapToolboxMode[MapToolboxMode["Search"] = 2] = "Search";
        })(home.MapToolboxMode || (home.MapToolboxMode = {}));
        var MapToolboxMode = home.MapToolboxMode;

        var EditController = (function () {
            function EditController($scope, timeline) {
                var _this = this;
                this._scope = $scope;

                $scope.timeline = [];
                $scope.routes = [];
                $scope.selected = [];

                $scope.toolbox = [
                    { type: 0 /* Marker */, active: false },
                    { type: 1 /* Line */, active: false },
                    { type: 2 /* Search */, active: false }];
                $scope.toolboxMode = 2 /* Search */;
                $scope.doChangeToolbox = function (newMode) {
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
                this._pinLayer.on("click", function (e) {
                    $scope.$apply(function () {
                        _this.onPinClicked(e);
                    });
                });

                this._routeLayer.on("click", function (e) {
                    $scope.$apply(function () {
                        _this.onRouteClicked(e);
                    });
                });

                this.map.on("click", function (e) {
                    $scope.$apply(function () {
                        _this.onMapClicked(e);
                    });
                });

                $scope.doJoinPins = function () {
                    return _this.doJoinPinsIntoRoute();
                };
                $scope.doDeletePin = function (pin) {
                    return _this.deletePin(pin);
                };
                $scope.doDeletePins = function (pins) {
                    return _this.deletePins(pins);
                };
                $scope.doDeleteRoute = function (route) {
                    return _this.deleteRoute(route);
                };
                $scope.doDeleteRoutes = function (routes) {
                    return _this.deleteRoutes(routes);
                };

                $scope.$watchCollection('timeline', function () {
                    return _this.onTimelineChanged();
                });
                $scope.$watchCollection('selected', function (_new, _old) {
                    return _this.onSelectionChanged(_new, _old);
                });
                $scope.$watch("toolboxMode", function () {
                    return _this.onToolboxChanged();
                });

                $scope.doChangeColorForPin = function (pin, color) {
                    pin.style.color = color;
                    pin.refresh();
                };

                $scope.doChangeSymbolForPin = function (pin, symbol) {
                    pin.symbol = symbol;
                    pin.refresh();
                };

                $scope.doChangeColorForRoute = function (route, color) {
                    route.style.color = color;
                    route.refresh();
                };

                $scope.colors = ["red", "blue", "black", "green"];
                $scope.symbols = [
                    new milkyway.model.PinSymbol("bus"),
                    new milkyway.model.PinSymbol("automobile"),
                    new milkyway.model.PinSymbol("bicycle"),
                    new milkyway.model.PinSymbol("plane")
                ];
            }
            EditController.prototype.onMapClicked = function (e) {
                if (this._scope.selected.length != 0) {
                    this._scope.selected = [];

                    e.originalEvent.preventDefault();
                    return;
                }

                if (this._scope.toolboxMode == 0 /* Marker */) {
                    var c = e.latlng;
                    var pin = new milkyway.model.TimelinePin('New status', new milkyway.model.Geolocation('Loading address...', new milkyway.model.Coordinates(c.lat, c.lng)));
                    pin.refresh();

                    this.addPin(pin);
                }
            };

            EditController.prototype.addPin = function (pin) {
                var _this = this;
                this._scope.timeline.push(pin);

                pin.marker.on("drag", function (e) {
                    return _this.onPinDragging(pin);
                });

                this._pinLayer.addLayer(pin.marker);
            };

            EditController.prototype.onPinDragging = function (pin) {
            };

            EditController.prototype.deletePins = function (pins) {
                var _this = this;
                linq(pins).each(function (pin) {
                    _this.deletePin(pin);
                });
            };

            EditController.prototype.deletePin = function (pin) {
                var _this = this;
                var index = linq(this._scope.timeline).indexOf(pin);
                if (index != -1) {
                    this._scope.timeline.splice(index, 1);
                    this._pinLayer.removeLayer(pin.marker);
                    pin.marker.off("drag");

                    var routes = linq(this._scope.routes).where(function (route) {
                        return route.hasPin(pin);
                    }).toArray();
                    linq(routes).each(function (route) {
                        _this.deleteRoute(route);
                    });
                }

                index = linq(this._scope.selected).indexOf(pin);
                if (index != -1) {
                    this._scope.selected.splice(index, 1);
                }
            };

            EditController.prototype.addRoute = function (route) {
                this._scope.routes.push(route);
                this._routeLayer.addLayer(route.line);
            };

            EditController.prototype.deleteRoutes = function (routes) {
                var _this = this;
                linq(routes).each(function (route) {
                    _this.deleteRoute(route);
                });
            };

            EditController.prototype.deleteRoute = function (route) {
                var index = linq(this._scope.routes).indexOf(route);
                if (index != -1) {
                    this._scope.routes.splice(index, 1);
                    this._routeLayer.removeLayer(route.line);
                }

                index = linq(this._scope.selected).indexOf(route);
                if (index != -1) {
                    this._scope.selected.splice(index, 1);
                }
            };

            EditController.prototype.onPinClicked = function (e) {
                if (this._scope.selected.length != 0 && !(this._scope.selected[0] instanceof milkyway.model.TimelinePin)) {
                    this._scope.selected = [];
                }

                var pin = linq(this._scope.timeline).first(function (pin) {
                    return pin.marker == e.layer;
                });
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
            };

            EditController.prototype.onRouteClicked = function (e) {
                if (this._scope.selected.length != 0 && !(this._scope.selected[0] instanceof milkyway.model.TimelineRoute)) {
                    this._scope.selected = [];
                }

                var route = linq(this._scope.routes).first(function (route) {
                    return route.line == e.layer;
                });
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
            };

            EditController.prototype.onTimelineChanged = function () {
            };

            EditController.prototype.onSelectionChanged = function (newSelected, oldSelected) {
                if (newSelected.length != 0) {
                    if (newSelected[0] instanceof milkyway.model.TimelinePin) {
                        this._scope.toolboxMode = 0 /* Marker */;
                    } else if (newSelected[0] instanceof milkyway.model.TimelineRoute) {
                        this._scope.toolboxMode = 1 /* Line */;
                    }
                }

                if (newSelected.length != 0) {
                    if (newSelected[0] instanceof milkyway.model.TimelinePin) {
                        // grayout all non-selected pins and routes
                    } else if (newSelected[0] instanceof milkyway.model.TimelineRoute) {
                        // grayout all non-selected routes and pins
                    }
                } else {
                    // reset colors for all pins and routes
                }
            };

            EditController.prototype.doJoinPinsIntoRoute = function () {
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
            };

            EditController.prototype.onToolboxChanged = function () {
                var _this = this;
                angular.forEach(this._scope.toolbox, function (tab) {
                    tab.active = _this._scope.toolboxMode == tab.type;
                });
            };
            return EditController;
        })();
        home.EditController = EditController;
    })(milkyway.home || (milkyway.home = {}));
    var home = milkyway.home;
})(milkyway || (milkyway = {}));
