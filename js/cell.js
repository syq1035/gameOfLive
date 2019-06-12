var arr = new Array();
var N = 5;
var th = 0.5;
for (var i =0; i<N; i++){
    arr[i] = new Array()
    for (var j =0; j<N; j++){
        if (Math.random()>th){
            arr[i][j] = 1;
        }else{
            arr[i][j] = 0;
        }
    }
}

var direction=[-1,0,1];
function number_of_live_cell_in_neighborhood(current_state_array,pos_x,pox_y) {
    var count = 0;
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if (direction[i] == 0 && direction[j] == 0) {
                count += 0;
            } else if (pos_x + direction[i] < 0 || pos_x + direction[i] > N - 1) {
                count += 0;
            } else if (pox_y + direction[j] < 0 || pox_y + direction[j] > N - 1) {
                count += 0;
            } else {
                count += arr[pos_x + direction[i]][pox_y + direction[j]];
            }
        }
    }
    return count;
}

console.log(arr);
var is_change_state = 1;
while(is_change_state) {
    is_change_state = 0;
    var current_state_array = new Array();
    for (var i =0; i<N; i++){
        current_state_array[i] = new Array()
        for (var j =0; j<N; j++){
            current_state_array[i][j] = 0;
        }
    }
    for (var i = 0; i < N; i++) {
        for (var j = 0; j < N; j++) {
            // console.log(i.toString()+"  "+j.toString());
            var count = number_of_live_cell_in_neighborhood(arr,i, j);
            if (count == 3) {
                current_state_array[i][j] = 1;
                if (arr[i][j] == 0){
                    is_change_state =1;
                }
            } else if (count == 2) {
                current_state_array[i][j] = arr[i][j];
            } else {
                current_state_array[i][j] = 0;
                if (arr[i][j] == 1){
                    is_change_state =1;
                }
            }
        }
    }
    arr = current_state_array;
    // console.log(arr);
    console.log("====================")
    console.log(state);
}