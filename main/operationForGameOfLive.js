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
module.exports =change_status;