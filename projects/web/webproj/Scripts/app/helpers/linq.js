var Linq = (function () {
    function Linq(collection) {
        this.collection = collection;
    }
    Linq.prototype.cast = function () {
        var result = [];

        for (var i = 0; i < this.collection.length; i++) {
            var item = this.collection[i];
            result.push(item);
        }

        return new Linq(result);
    };

    Linq.prototype.indexOf = function (item) {
        for (var i = 0; i < this.collection.length; i++) {
            if (this.collection[i] == item)
                return i;
        }

        return -1;
    };

    Linq.prototype.first = function (predicate, defVal) {
        for (var i = 0; i < this.collection.length; i++) {
            var item = this.collection[i];

            if (predicate(item) == true) {
                return item;
            }
        }

        return defVal;
    };

    Linq.prototype.last = function (predicate, defVal) {
        for (var i = this.collection.length - 1; i >= 0; i--) {
            var item = this.collection[i];

            if (predicate(item) == true) {
                return item;
            }
        }

        return defVal;
    };

    Linq.prototype.where = function (predicate) {
        var result = [];
        for (var i = 0; i < this.collection.length; i++) {
            var item = this.collection[i];

            if (predicate(item) == true) {
                result.push(item);
            }
        }

        return new Linq(result);
    };

    Linq.prototype.each = function (predicate) {
        var collection = this.collection.slice(0);
        for (var i = 0; i < collection.length; i++) {
            var item = collection[i];
            predicate(item);
        }
    };

    Linq.prototype.toArray = function () {
        return this.collection.slice(0);
    };
    return Linq;
})();

function linq(collection) {
    return new Linq(collection);
}
