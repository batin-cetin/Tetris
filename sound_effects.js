function play_line_remove_sound(){
    var line_remove_sound = new Audio('line_remove.mp3');
    line_remove_sound.play();
}

function play_put_sound(){
    var put_sound = new Audio('put.mp3');
    put_sound.play();
}

var music_is_playing = false;
function play_music(){
    var tetris_theme = new Audio('tetris_theme.mp3');
    tetris_theme.volume = 0.3;
    tetris_theme.play();
    tetris_theme.loop = true;
    music_is_playing = true;
}

function play_rotate_sound(){
    var rotate_sound = new Audio('rotate.mp3');
    rotate_sound.play();
}