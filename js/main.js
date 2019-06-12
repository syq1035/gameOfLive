$(function(){
  let row = 10;
  let col = 10;
  var arr = new Array();

  //初始化网格
  function init(row,col){
    for(let i =0; i<row; i++){
      $('.gameboard').append(`<div class='board-row row-${i}'></div>`) 
      for(let j =0; j<col; j++){
        $(`.row-${i}`).append(`<button class='square row-${i}-col-${j}'></button>`)
      }
   
    }

  }
//初始化生命状态
function initStatus(row,col){
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
}

function number_of_live_cell_in_neighborhood(current_state_array,pos_x,pox_y,row,col) {
  var direction=[-1,0,1];
  var count = 0;
  for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
          if (direction[i] == 0 && direction[j] == 0) {
              count += 0;
          } else if (pos_x + direction[i] < 0 || pos_x + direction[i] > row - 1) {
              count += 0;
          } else if (pox_y + direction[j] < 0 || pox_y + direction[j] > col - 1) {
              count += 0;
          } else {
              count += arr[pos_x + direction[i]][pox_y + direction[j]];
          }
      }
  }
  return count;
}
function changeStatus(row,col){
    var is_change_state = 1;
    while(is_change_state) {
        is_change_state = 0;
        var current_state_array = new Array();
        for (var i =0; i<row; i++){
            
            current_state_array[i] = new Array()
            for (var j =0; j<col; j++){
                current_state_array[i][j] = 0;
            }
        }
        for (var i = 0; i < row; i++) {
            for (var j = 0; j < col; j++) {
                // console.log(i.toString()+"  "+j.toString());
                var count = number_of_live_cell_in_neighborhood(arr,i, j,row,col);

                if (count == 3) {
                    current_state_array[i][j] = 1;
                    if (arr[i][j] == 0){
                        is_change_state = 1;
                    }
                } else if (count == 2) {
                    current_state_array[i][j] = arr[i][j];
                } else {
                    current_state_array[i][j] = 0;
                    if (arr[i][j] == 1){
                        is_change_state =1;
                    }
                }
                //console.log(current_state_array)
            }
        }
        arr = current_state_array;
    }
    console.log("ccccc")
    console.log(arr);
}

function cycle(row,col){
    changeStatus(row,col);
    for (var i =0; i<row; i++){
        for (var j =0; j<col; j++){
            console.log(arr[i,j]);
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
    console.log(arr);

}
  init(row,col);
  initStatus(row,col);
  cycle(row,col);
  //setInterval(cycle(),1000);
  $('.btn').click(function(){
    setInterval(cycle(row,col),1000);
  })
})
