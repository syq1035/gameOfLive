$(function(){
  let row = 50;
  let col = 50;
  function init(row,col){
    for(let i =0; i<row; i++){
      $('.gameboard').append(`<div class='board-row row-${i}'></div>`) 
      for(let j =0; j<col; j++){
        $(`.row-${i}`).append(`<button class='square row-${i}-col-${j}'></button>`)
      }
   
    }

  }

  function statusInit(row,col){
    var arr = new Array();
    var th = 0.3;
    for (var i =0; i<row; i++){
        arr[i] = new Array()
        for (var j =0; j<col; j++){
            if (Math.random()>th){
                arr[i][j] = 1;
                $(`.row-${i}-col-${j}`).css({"background-color":"yellow"});

            }else{
                arr[i][j] = 0;
                $(`.row-${i}-col-${j}`).css({"background-color":"red"});
            }
        }
    }
    for (var i =0; i<row; i++){
      for (var j =0; j<col; j++){
        if(arr[i,j]==0){
          $(`.row-${i}-col-${j}`).css({"background-color":"yellow"});
          console.log(i,j)
        }
        if(arr[i,j]==1){
          $(`.row-${i}-col-${j}`).css({"background-color":"red"});
          console.log(i,j)
        }
      }
    }
    //console.log(arr);
  }

  init(row,col);
  statusInit(row,col);

})
