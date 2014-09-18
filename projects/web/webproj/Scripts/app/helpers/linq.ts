class Linq<T> {
    constructor(public collection: Array<T>) {
    }

    cast<T1>(): Linq<T1> {
        var result: Array<T1> = [];

        for (var i = 0; i < this.collection.length; i++) {
            var item = this.collection[i];
            result.push(<T1><any>item);
        }

        return new Linq(result);
    }

    indexOf(item: T) {
        for (var i = 0; i < this.collection.length; i++) {
            if (this.collection[i] == item)
                return i;
        }

        return -1;
    }

    first(predicate: (x:T) => boolean, defVal?: any ): T {
        for (var i = 0; i < this.collection.length; i++) {
            var item = this.collection[i];
              
            if (predicate(item) == true) {
                return item;
            }
        }

        return defVal;
    }

    last(predicate: (x:T) => boolean, defVal?: any ): T {
        for (var i = this.collection.length - 1; i >= 0; i--) {
            var item = this.collection[i];

            if (predicate(item) == true) {
                return item;
            }
        }

        return defVal;
    }

    where(predicate: (x: T) => boolean): Linq<T> {
        var result: Array<T> = [];
        for (var i = 0; i < this.collection.length; i++) {
            var item = this.collection[i];

            if (predicate(item) == true) {
                result.push(item);
            }
        }

        return new Linq(result);
    }

    each(predicate: (x: T) => void): void {
        var collection = this.collection.slice(0);
        for (var i = 0; i < collection.length; i++) {
            var item = collection[i];
            predicate(item);
        }
    }

    toArray(): Array<T> {
        return this.collection.slice(0);
    }
} 

function linq<T>(collection: Array<T>) {
    return new Linq(collection);
}

