$(function(){
  function init(row,col){
    for(let i =0; i<row; i++){
      $('.gameboard').append("<div class='board-row'><div>")  
    }
    for(let j =0; j<col; j++){
      $('.board-row').append("<button class='square'></button>")
    }

  }
  init(50,80);

})
