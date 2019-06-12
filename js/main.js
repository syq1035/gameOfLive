$(function(){
  var global_row = 50;
  var global_column = 50;
  var global_array_of_total_cells = new Array();

  function init_grids(){
    for(var row_index =0; row_index<global_row; row_index++){
      $('.gameboard').append(`<div class='board-row row-${row_index}'></div>`)
      for(var column_index =0; column_index<global_column; column_index++){
        $(`.row-${row_index}`).append(`<button class='square row-${row_index}-col-${column_index}'></button>`)
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
          $(`.row-${row_index}-col-${column_index}`).css({"background-color":"yellow"});
        }else{
          global_array_of_total_cells[row_index][column_index] = 0;
          $(`.row-${row_index}-col-${column_index}`).css({"background-color":"red"});
        }
      }
    }
  }

  function generate_zero_array_like_rol_column(){
    var zero_array = new Array();
    for (var row_index =0; row_index<global_row; row_index++){
      zero_array[row_index] = new Array()
      for (var column_index =0; column_index<global_column; column_index++){
        zero_array[row_index][column_index] = 0;
      }
    }
    return zero_array;
  }

  function get_number_of_live_cells_in_neighborhood(current_status_array,current_position_row_index,current_position_column_index) {
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

  function change_status(){
    var current_status_array = generate_zero_array_like_rol_column();
    for (var row_index = 0; row_index < global_row; row_index++) {
      for (var column_index = 0; column_index < global_column; column_index++) {
        var number_of_live_cells_in_neighborhood = get_number_of_live_cells_in_neighborhood(global_array_of_total_cells,row_index, column_index);
        if (number_of_live_cells_in_neighborhood == 3) {
          current_status_array[row_index][column_index] = 1;
        } else if (number_of_live_cells_in_neighborhood == 2) {
          current_status_array[row_index][column_index] = global_array_of_total_cells[row_index][column_index];
        }
      }
    }
    global_array_of_total_cells = current_status_array;
  }

  function cycle(){
    change_status();
    for (var row_index =0; row_index<global_row; row_index++){
      for (var column_index =0; column_index<global_column; column_index++){
        if(global_array_of_total_cells[row_index][column_index]==0){
          $(`.row-${row_index}-col-${column_index}`).css({"background-color":"red"});
        } else{
          $(`.row-${row_index}-col-${column_index}`).css({"background-color":"yellow"});
        }
      }
    }
  }

  init_grids();
  init_status_of_total_cells();
  var interval;
  $('.btnStart').click(function(){
    interval = setInterval(function(){
        cycle()
    },500);
  })
  $('.btnEnd').click(function(){
    clearInterval(interval);
  })
})
