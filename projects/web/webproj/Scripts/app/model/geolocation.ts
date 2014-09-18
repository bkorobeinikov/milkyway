module milkyway.model {

    export class Coordinates {
        constructor(public lat: number, public lng: number) {
        }
    }

    export class Geolocation {
        constructor(public address: string, public coord: Coordinates) {

        }
    }
} 