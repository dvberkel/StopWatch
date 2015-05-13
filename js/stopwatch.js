(function(stopwatch){
    var Game = stopwatch.Game = function(seconds){
        this.target = 1000 * seconds; // in milliseconds
    };
})(window.stopwatch = window.stopwatch || {});
