(function(stopwatch){
    if (!stopwatch) { throw new Error('stopwatch namespace not found'); }
    console.log('Ready to play!');

    var game = new stopwatch.Game(5);

    window.game = game;
})(stopwatch);
