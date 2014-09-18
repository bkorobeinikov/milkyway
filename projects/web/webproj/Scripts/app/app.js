var milkyway;
(function (milkyway) {
    milkyway.appModule = angular.module('milkyway', ['ui.sortable', 'ui.bootstrap']);
    milkyway.Constants = {
        mapbox: {
            mapid: 'bobasoft.jd7h3kdh'
        }
    };
    L.mapbox.accessToken = 'pk.eyJ1IjoiYm9iYXNvZnQiLCJhIjoidV94VGd4RSJ9.EyyTqAzrfDtfoIPXn14abQ';
})(milkyway || (milkyway = {}));
