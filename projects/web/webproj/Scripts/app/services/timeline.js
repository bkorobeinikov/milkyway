var milkyway;
(function (milkyway) {
    (function (services) {
        var TimelineService = (function () {
            function TimelineService($http) {
                this.$http = $http;
            }
            TimelineService.prototype.getTimelineAsync = function () {
                return this.$http({
                    method: 'POST',
                    url: '/timeline'
                });
            };
            return TimelineService;
        })();
        services.TimelineService = TimelineService;

        milkyway.appModule.service("timeline", TimelineService);
    })(milkyway.services || (milkyway.services = {}));
    var services = milkyway.services;
})(milkyway || (milkyway = {}));
