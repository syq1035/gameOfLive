const main = require('../main/operationForGameOfLive');
var global_row = 30;
var global_column = 50;
var speed = 500;
var global_array_of_total_cells = new Array();

function init_grids(){
  for(var row_index =0; row_index<global_row; row_index++){
    $('.gameboard').append(`<div class='board-row' id='row-${row_index}'></div>`)
    for(var column_index =0; column_index<global_column; column_index++){
      $(`#row-${row_index}`).append(`<button class='square' id='row-${row_index}-col-${column_index}'></button>`)
    }
  }
}

function init_status_of_total_cells(){
  var ratio_of_live_cells = 0.7;
  for (var row_index =0; row_index<global_row; row_index++){
    global_array_of_total_cells[row_index] = new Array()
    for (var column_index =0; column_index<global_column; column_index++){
      if (Math.random()>ratio_of_live_cells){
        global_array_of_total_cells[row_index][column_index] = 1;
        $(`#row-${row_index}-col-${column_index}`).css({"background-color":"red"});
      }else{
        global_array_of_total_cells[row_index][column_index] = 0;
        $(`#row-${row_index}-col-${column_index}`).css({"background-color":"#242424"});
      }
    }
  }
}

function cycle(){
  global_array_of_total_cells=change_status(global_array_of_total_cells);
  for (var row_index =0; row_index<global_row; row_index++){
    for (var column_index =0; column_index<global_column; column_index++){
      if(global_array_of_total_cells[row_index][column_index]==0){
        $(`#row-${row_index}-col-${column_index}`).css({"background-color":"#242424"});
      } else{
        $(`#row-${row_index}-col-${column_index}`).css({"background-color":"red"});
      }
    }
  }
}

init_grids();
init_status_of_total_cells();
var interval;
$('#start').click(function(){
  interval = setInterval(function(){
      cycle();
  },speed);
})
$('#end').click(function(){
  clearInterval(interval);
})
$('#reset').click(function(){
  clearInterval(interval);
  $('.board-row').remove();
  init_grids();
  init_status_of_total_cells();
})
$('#reset').click(function(){
  clearInterval(interval);
  $('.board-row').remove();
  init_grids();
  init_status_of_total_cells();
})
$('#row').blur(function(){
  var value = $('#row').val();
  if(value!=""){
    global_row = parseInt(value);
    $('.board-row').remove();
    init_grids();
    init_status_of_total_cells();
  }
})
$('#col').blur(function(){
  var value = $('#col').val();
  if(value!=""){
    global_row = parseInt(value);
    $('.board-row').remove();
    init_grids();
    init_status_of_total_cells();
  }
})
$('#speed').blur(function(){
  var value = $('#speed').val();
  if(value!=""){
    speed = value;
  }
})
$('.board-row').click(function(e){
  var id = e.target.getAttribute("id");
  var idString = id.split("-");
  var btn_row = parseInt(idString[1]);
  var btn_col = parseInt(idString[3]);
  global_array_of_total_cells[btn_row][btn_col] = global_array_of_total_cells[btn_row][btn_col] == 0? 1:0;
  var color = e.target.style.backgroundColor;
  color = color=='red'? 'black':'red';
  e.target.style.backgroundColor = color;
})

