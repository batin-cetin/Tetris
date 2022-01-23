function rotate_piece(shape){
    new_shape = [];
    for(var i=0; i<shape.length; i++){
        var column = [];
        for(var j=0; j<shape[0].length; j++){
            column.push(shape[j][i]);
        }
        new_shape.unshift(column);
    }
    return new_shape;
}

class I_piece{
    constructor(){
        this.x = 3;
        this.y = 0;
        this.shape = [[' ', ' ', 'I', ' '], [' ', ' ', 'I', ' '], [' ', ' ', 'I', ' '], [' ', ' ', 'I', ' ']];
        this.color = "cyan";
    }
    rotate(){
        this.shape = rotate_piece(this.shape);
    }
}

class O_piece{
    constructor(){
        this.x = 3;
        this.y = 0;
        this.shape = [['O', 'O'], ['O', 'O']];
        this.color = "yellow";
    }
    rotate(){
        this.shape = rotate_piece(this.shape);
    }
}

class S_piece{
    constructor(){
        this.x = 3;
        this.y = 0;
        this.shape = [[' ', 'S', 'S'], ['S', 'S', ' '], [' ', ' ', ' ']];
        this.color = "red";
    }
    rotate(){
        this.shape = rotate_piece(this.shape);
    }
}

class Z_piece{
    constructor(){
        this.x = 3;
        this.y = 0;
        this.shape = [['Z', 'Z', ' '], [' ', 'Z', 'Z'], [' ', ' ', ' ']];
        this.color = "green";
    }
    rotate(){
        this.shape = rotate_piece(this.shape);
    }
}

class L_piece{
    constructor(){
        this.x = 3;
        this.y = 0;
        this.shape = [[' ', 'L', ' '], [' ', 'L', ' '], [' ', 'L', 'L']];
        this.color = "orange";
    }
    rotate(){
        this.shape = rotate_piece(this.shape);
    }
}

class J_piece{
    constructor(){
        this.x = 3;
        this.y = 0;
        this.shape = [[' ', 'J', ' '], [' ', 'J', ' '], ['J', 'J', ' ']];
        this.color = "pink";
    }
    rotate(){
        this.shape = rotate_piece(this.shape);
    }
}

class T_piece{
    constructor(){
        this.x = 3;
        this.y = 0;
        this.shape = [[' ', ' ', ' '], ['T', 'T', 'T'], [' ', 'T', ' ']];
        this.color = "purple";
    }
    rotate(){
        this.shape = rotate_piece(this.shape);
    }
}