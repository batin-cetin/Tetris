var game_grid = document.getElementById("tetris-grid");
var all_pieces = ['I', 'O', 'S', 'Z', 'L', 'J', 'T'];
var score = 0;

var current_piece = null;
function spawn_piece(){
    current_piece_type = all_pieces[Math.floor(Math.random() * 7)];
    switch(current_piece_type){
        case 'I': current_piece = new I_piece(); break;
        case 'O': current_piece = new O_piece(); break;
        case 'S': current_piece = new S_piece(); break;
        case 'Z': current_piece = new Z_piece(); break;
        case 'L': current_piece = new L_piece(); break;
        case 'J': current_piece = new J_piece(); break;
        case 'T': current_piece = new T_piece(); break;
    }
    draw_piece("full");
}
spawn_piece();

function draw_piece(fullness){
    var x = current_piece.x;
    var y = current_piece.y;
    var current_shape = current_piece.shape;
    for(var i = 0; i<current_shape.length; i++){
        for(var j=0; j<current_shape[0].length; j++){
            if (!(y+i >= 20 || x+j < 0 || x+j >= 10)){
                if (game_grid.rows[y+i].cells[x+j].innerHTML === 'D') continue;
            }
            if (fullness === "full"){
                if (current_shape[i][j] === ' ') continue;
                else {
                    game_grid.rows[y+i].cells[x+j].innerHTML = current_shape[i][j];
                    game_grid.rows[y+i].cells[x+j].style.backgroundColor = current_piece.color;
                }
            } else if (fullness === "empty") {
                if (y+i > 19 || x+j < 0 || x+j > 9) continue; 
                else {
                    game_grid.rows[y+i].cells[x+j].innerHTML = ' ';
                    game_grid.rows[y+i].cells[x+j].style.backgroundColor = "black";
                }
            } else throw "That fullness doesn't exist!";
        }
    }
}

var collision_history = [];
function collision(x, y){
    var current_shape = current_piece.shape;
    for(var i=0; i<current_shape.length; i++){
        for(var j=0; j<current_shape[0].length; j++){
            if ((y+i >= 20 || x+j < 0 || x+j >= 10) && current_shape[i][j] != ' '){
                if (y+i >= 20 && current_shape[i][j] != ' ') collision_history.push('put');
                return true;
            }
            if (!(y+i >= 20 || x+j < 0 || x+j >= 10)){
                if (game_grid.rows[y+i].cells[x+j].innerHTML === 'D' && current_shape[i][j] != ' '){
                    collision_history.push("put");
                    return true;
                }
            }
        }
    }
}

function move(direction){
    draw_piece("empty");
    if (direction === "down" && !collision(current_piece.x, current_piece.y+1)) current_piece.y += 1;
    else if (direction === "right" && !collision(current_piece.x+1, current_piece.y)) current_piece.x += 1;
    else if (direction === "left" && !collision(current_piece.x-1, current_piece.y)) current_piece.x -= 1;
    draw_piece("full");
}

function rotate(){
    draw_piece("empty");
    current_piece.rotate();
    if (collision(current_piece.x, current_piece.y)){
        current_piece.rotate();
        current_piece.rotate();
        current_piece.rotate();
        draw_piece("full");
        return;
    } else play_rotate_sound();
    draw_piece("full");
}

function clear_lines(){
    var lines_to_remove = []
    for(var i=0; i<20; i++){
        var include_line = true;
        for(var j=0; j<10; j++){
            if (game_grid.rows[i].cells[j].innerHTML === ' ') {
                include_line = false;
                break;
            }
        }
        if (include_line) lines_to_remove.push(i);
    }
    line_count = lines_to_remove.length;
    if (line_count > 0) {
        play_line_remove_sound();
        score += line_count
        document.getElementById('score').innerHTML = "Score: " + score;
    }
    for (const i of lines_to_remove) {
        for(var j = 0; j<10; j++){
            game_grid.rows[i].cells[j].innerHTML = ' ';
            game_grid.rows[i].cells[j].style.backgroundColor = "black";
        }
        move_grid_down(i);
    }
}

function move_grid_down(index){
    copy_of_game_grid = game_grid.cloneNode(true);
    for(var i=0; i<20; i++){
        for(var j=0; j<10; j++){
            if (i === 0){
                game_grid.rows[i].cells[j].innerHTML = ' ';
                game_grid.rows[i].cells[j].style.backgroundColor = "black";
            } else {
                game_grid.rows[i].cells[j].innerHTML = copy_of_game_grid.rows[i-1].cells[j].innerHTML;
                game_grid.rows[i].cells[j].style.backgroundColor =  copy_of_game_grid.rows[i-1].cells[j].style.backgroundColor;
            }
        }
        if (i === index) break;
    }
}

function put_piece(){
    for(var i=0; i<20; i++){
        for(var j=0; j<10; j++){
            if (game_grid.rows[i].cells[j].innerHTML != ' '){
                game_grid.rows[i].cells[j].innerHTML = 'D';
            }
        }
    }
    play_put_sound();
    clear_lines();
    spawn_piece();
}

document.onkeydown = function (event) {
    switch (event.keyCode) {
        case 37: //Left arrow
            move("left");
            if (!music_is_playing) play_music();
            break;
        case 38: //Up arrow
            rotate();
            break;
        case 39: //Right arrow
            move("right");
            if (!music_is_playing) play_music();
            break;
        case 40: //Down arrow
            move("down");
            if (!music_is_playing) play_music();
            break;
        /*
        case 13:
            put_piece();
            break;
        */
    }
 };

setInterval(function() { 
    move("down");
    put_piece_interval();
}, 800);

function put_piece_interval(){
    var x = current_piece.x;
    var y = current_piece.y;
    if(put_time) clearInterval(put_time);
        var put_time = setInterval(function(){
            collision(current_piece.x, current_piece.y+1);
    }, 50);
    if(collision_history.length > 15) {
        if (collision(current_piece.x, current_piece.y+1)){
            put_piece();
        }
        else{
            collision_history = [];
        }
    }
    collision_history = [];
}

 