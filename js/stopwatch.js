(function(stopwatch){
    var Game = stopwatch.Game = function(seconds){
        this.target = 1000 * seconds; // in milliseconds
        this.started = false;
        this.stopped = false;
    };
    Game.prototype.current = function(){
        if (this.started) {
            return (this.stopped ? this.stopTime: this.time) - this.startTime;
        }
        return 0;
    };
    Game.prototype.start = function(){
        if (!this.started) {
            this.started = true;
            this.startTime = new Date().getTime();
            this.time = this.startTime;
        }
    };
    Game.prototype.stop = function(){
        if (!this.stopped) {
            this.stopped = true;
            this.stopTime = new Date().getTime();
        }
    };
    Game.prototype.tick = function(){
        this.time = new Date().getTime();
    };
    Game.prototype.score = function(){
        return this.stopped ? Math.abs(this.target - (this.stopTime - this.startTime)): Number.POSITIVE_INFINITY;
    };

    var GameView = stopwatch.GameView = function(game, container){
        this.game = game;
        this.container = container;
        this.update();
    };
    GameView.prototype.update = function(){
        var target = this.container.querySelector('#target');
        target.innerHTML = this.game.target;
        var current = this.container.querySelector('#current');
        current.innerHTML = this.game.current();
        var score = this.container.querySelector('#score');
        score.innerHTML = this.game.score();
    };
})(window.stopwatch = window.stopwatch || {});
