(function(stopwatch){
    var Observable = function(){
        this.observers = {};
    };
    Observable.prototype.on = function(event, callback){
        (this.observers[event] = this.observers[event] || []).push(callback);
    };
    Observable.prototype.emit = function(event){
        var data = Array.prototype.slice.call(arguments, 1);
        (this.observers[event] || []).forEach(function(observer){
            observer.apply(undefined, data);
        });
    };

    var Game = stopwatch.Game = function(seconds){
        Observable.call(this);
        this.target = 1000 * seconds; // in milliseconds
        this.reset();
    };
    Game.prototype = Object.create(Observable.prototype);
    Game.prototype.constructor = Game;
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
            this.emit('stopped', this.score());
        }
    };
    Game.prototype.tick = function(){
        this.time = new Date().getTime();
    };
    Game.prototype.score = function(){
        return this.stopped ? Math.abs(this.target - (this.stopTime - this.startTime)): Number.POSITIVE_INFINITY;
    };
    Game.prototype.reset = function(){
        if (this.stopped) {
            this.started = false;
            this.stopped = false;
        }
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

    var HighScore = stopwatch.HighScore = function(top){
        this.top = top || 10;
        this.best = [];
    };
    HighScore.prototype.registerScore = function(score){
        this.best.push(score);
        this.best.sort();
        this.best.splice(this.top, 1);
    };
})(window.stopwatch = window.stopwatch || {});
