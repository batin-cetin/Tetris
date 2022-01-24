var line_remove_sound = new Audio('line_remove.mp3');
function play_line_remove_sound(){
    line_remove_sound.play();
}

var put_sound = new Audio('put.mp3');
function play_put_sound(){
    put_sound.play();
}

var tetris_theme = new Audio('tetris_theme.mp3');
var music_is_playing = false;
function play_music(){
    tetris_theme.volume = 0.3;
    tetris_theme.play();
    tetris_theme.loop = true;
    music_is_playing = true;
}

var rotate_sound = new Audio('rotate.mp3');
function play_rotate_sound(){
    rotate_sound.play();
}