let cells = document.querySelectorAll('.row > div');
//console.log(cells);
let head = document.querySelector(".heading")
head.textContent = " ";
turn = true
let names_idx = {};
let idx_names = {};
gameOver = false;
for( let i = 0; i < cells.length; i++) {
    cells[i].addEventListener("click", cellClicked);
    //console.log(cells[i].className);
    names_idx[cells[i].className] = i;
    idx_names[i] = cells[i].className;

}



//console.log(names_idx);
//console.log(idx_names);

function cellClicked() {
    //console.log(names_idx[event.target.className]);
    
    event.srcElement.removeEventListener("click", cellClicked);
    if(turn) {
        event.target.textContent = "X";
    } else {
        event.target.textContent = "O";
    }
    turn = !turn;
    let val = checkWin(names_idx[event.target.className], event.target.textContent);
    if(val) {
        for( let i = 0; i < cells.length; i++) {
            cells[i].removeEventListener("click", cellClicked);
        }
    }

}

function checkWin(index, char) {
    col_num = index % 3;
    row_num = Math.floor(index/3);
    let val1 = checkRow(index, char);
    let val2 = checkCol(index, char);
    let val3 = checkDiagonals(char);
    let drawCondition = draw();
    if(drawCondition == true) {
        let head = document.querySelector(".heading");
        head.textContent = "Draw!";
        
    }
    if(val1 || val2 || val3){
        let head = document.querySelector(".heading");
        head.textContent = char + " wins";
        return true
    }
    else {
        return false;
    }
    
}

function checkRow(index, char) {
    index = index - (index % 3);
    for(let i = index; i < index + 3; i++ ) {
        if(cells[i].textContent !== char){
            return false
        }
    }
    //console.log(char + " wins");
    return true;
}

function checkCol(index, char) {
    index = index % 3;
    for(let i = index; i < 9; i = i + 3) {
        if(cells[i].textContent !== char) {
            return false
        }
    }
    //console.log(char + " wins");
    return true
}

function checkDiagonals(char){
    
    if((cells[0].textContent === char) && (cells[4].textContent === char) && (cells[8].textContent === char)){
        return true;
        
    }
    if((cells[2].textContent === char) && (cells[4].textContent === char) && (cells[6].textContent === char)){
        return true;
    }
    //console.log(char + " wins");
    return false;
}
function draw() {
    for(let i = 0; i < 9; i++) {
        if(cells[i].textContent === "") {
            return false
        }
    }
    return true;
}