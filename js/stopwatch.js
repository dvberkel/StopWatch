(function(stopwatch){
    var Game = stopwatch.Game = function(seconds){
        this.target = 1000 * seconds; // in milliseconds
    };

    var GameView = stopwatch.GameView = function(game, container){
        this.game = game;
        this.container = container;
        this.update();
    };
    GameView.prototype.update = function(){
        var target = this.container.querySelector('#target');
        target.innerHTML = this.game.target;
    };
})(window.stopwatch = window.stopwatch || {});
