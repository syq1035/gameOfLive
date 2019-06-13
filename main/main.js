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

function generate_zero_array_like_rol_column(global_row, global_column){
  var zero_array = new Array();
  for (var row_index =0; row_index<global_row; row_index++){
    zero_array[row_index] = new Array()
    for (var column_index =0; column_index<global_column; column_index++){
      zero_array[row_index][column_index] = 0;
    }
  }
  return zero_array;
}

function get_number_of_live_cells_in_neighborhood(current_status_array,current_position_row_index, current_position_column_index, global_row, global_column) {
  var count_live_cells = 0;
  for (var axis_x = -1; axis_x <= 1; axis_x++) {
    for (var axis_y = -1; axis_y <= 1; axis_y++) {
      if (axis_x == 0 && axis_y == 0) {
        count_live_cells += 0;
      } else if (current_position_row_index + axis_x < 0 || current_position_row_index + axis_x > global_row - 1) {
        count_live_cells += 0;
      } else if (current_position_column_index + axis_y < 0 || current_position_column_index + axis_y > global_column - 1) {
        count_live_cells += 0;
      } else {
        count_live_cells += current_status_array[current_position_row_index + axis_x][current_position_column_index + axis_y];
      }
    }
  }
  return count_live_cells;
}

function change_status(global_array_of_total_cells){
  var global_row = global_array_of_total_cells.length;
  var global_column = global_array_of_total_cells[0].length;
  var current_status_array = generate_zero_array_like_rol_column(global_row,global_column);
  for (var row_index = 0; row_index < global_row; row_index++) {
    for (var column_index = 0; column_index < global_column; column_index++) {
      var number_of_live_cells_in_neighborhood = get_number_of_live_cells_in_neighborhood(global_array_of_total_cells,row_index, column_index,global_row,global_column);
      if (number_of_live_cells_in_neighborhood == 3) {
        current_status_array[row_index][column_index] = 1;
      } else if (number_of_live_cells_in_neighborhood == 2) {
        current_status_array[row_index][column_index] = global_array_of_total_cells[row_index][column_index];
      }
    }
  }
  global_array_of_total_cells = current_status_array;
  return global_array_of_total_cells;
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
  if(btn_row<global_row&&btn_col<global_column) {
    global_array_of_total_cells[btn_row][btn_col] = global_array_of_total_cells[btn_row][btn_col] == 0 ? 1 : 0;
    var color = e.target.style.backgroundColor;
    color = color == 'red' ? 'black' : 'red';
    e.target.style.backgroundColor = color;
  }
})

