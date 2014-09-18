module milkyway.services {
    export class TimelineService {

        $http: ng.IHttpService

        constructor($http: ng.IHttpService) {
            this.$http = $http;
        }

        getTimelineAsync(): ng.IPromise<milkyway.model.TimelinePin[]> {
            return this.$http({
                method: 'POST',
                url: '/timeline'
            });
        }
    }

    milkyway.appModule.service("timeline", TimelineService);
} 