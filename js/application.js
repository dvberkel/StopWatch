(function(stopwatch){
    if (!stopwatch) { throw new Error('stopwatch namespace not found'); }
    console.log('Ready to play!');

    var game = new stopwatch.Game(5);
    var view = new stopwatch.GameView(game, document.getElementById('stopwatch'));

    function loop(){
        view.update();
        requestAnimationFrame(loop);
    }
    loop();

    window.game = game;
})(stopwatch);
