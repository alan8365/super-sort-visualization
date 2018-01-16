var ex_i = 0,
	ex_j = 0;

var ex_array = [],
	ex_change_array = [];

var temp;

var ex_next = function($bars){
	if(ex_i < ex_array.length){
		if(ex_array[ex_j] > ex_array[ex_j+1]){
			temp = ex_array[ex_j];
			ex_array[ex_j] = ex_array[ex_j+1]
			ex_array[ex_j+1] = temp;

			move_bar($bars[ex_j], "+=");
			move_bar($bars[ex_j+1], "-=");

			temp = $bars[ex_j];
			$bars[ex_j] = $bars[ex_j+1];
			$bars[ex_j+1] = temp;

			ex_change_array[ex_i][ex_j] = true;
		}else{
			ex_change_array[ex_i][ex_j] = false;
		}

		ex_j++;

		if(ex_j >= ex_array.length-ex_i){
			ex_i++;
			ex_j = 0;
		}

		$bars[ex_j].css(hl_style);
        //紅框運算，當j=0時a.length-i的位子取消紅框
        $bars[ex_j > 0 ? ex_j-1 : ex_array.length - ex_i].css(normal_style);
	}
}

var ex_pre = function($bars){
	if(ex_i >= 0 && !(ex_i === 0 && ex_j === 0)){
		if(ex_change_array[ex_i][ex_j-1]){
			temp = ex_array[ex_j];
			ex_array[ex_j] = ex_array[ex_j-1]
			ex_array[ex_j-1] = temp;

			move_bar($bars[ex_j], "-=");
			move_bar($bars[ex_j-1], "+=");

			temp = $bars[ex_j];
			$bars[ex_j] = $bars[ex_j-1];
			$bars[ex_j-1] = temp;
		}

		ex_j--;

		if(ex_j < 0){
			ex_i--;
			ex_j = ex_array.length-ex_i-1;
		}

		$bars[ex_j].css(hl_style);
        $bars[ex_j < ex_array.length-ex_i-1 ? ex_j+1 : 0].css(normal_style);
        console.log(ex_j, ex_j < ex_array.length-ex_i-2 ? ex_j+1 : 0);
	}
}