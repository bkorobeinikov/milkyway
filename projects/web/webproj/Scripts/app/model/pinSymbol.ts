module milkyway.model {
    export class PinSymbol {
        constructor(public name: string) {
        }

        public static empty: PinSymbol = new PinSymbol(null);
    }
}