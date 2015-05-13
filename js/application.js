(function(stopwatch){
    if (!stopwatch) { throw new Error('stopwatch namespace not found'); }
    console.log('Ready to play!');

    var game = new stopwatch.Game(5);
    var view = new stopwatch.GameView(game, document.getElementById('stopwatch'));

    function loop(){
        game.tick();
        view.update();
        requestAnimationFrame(loop);
    }
    loop();

    document.body.addEventListener('keydown', function(event){
        if (event.keyCode == 32 /* space */) {
            game.start();
        }
    });
    document.body.addEventListener('keyup', function(event){
        if (event.keyCode == 32 /* space */) {
            game.stop();
        }
    });
    document.body.addEventListener('keypress', function(event){
        if (event.charCode == 114 /* R */) {
            game.reset();
        }
    });

    window.game = game;
})(stopwatch);
