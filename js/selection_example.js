var ex_i = 0,
    ex_j = 0;

var ex_array = [],
    ex_change_array = [];

var temp,
    newpos;

var prepared = function($bars) {
    for (var i = 0; i < ex_array.length; i++) {
        var min = $bars[i].css("height").pxno();
        var k = i,
            temp = $bars[i];

        for (var j = i + 1; j < ex_array.length; j++) {
            if (min > $bars[j].css("height").pxno()) {
                k = j;
                temp = $bars[j];
                min = $bars[j].css("height").pxno();
            }
        }

        ex_change_array[i] = k;
        $bars[k] = $bars[i];
        $bars[i] = temp;
    }
}

var ex_next = function($bars) {
    if (ex_i < ex_array.length-1) {
        newpos = ex_change_array[ex_i];

        move_bar($bars[ex_i], "", $bars[newpos].css("left").pxno());
        console.log($bars[newpos].css("left").pxno());
        move_bar($bars[ex_change_array[ex_i]], "", ex_i*wid+margin);

        temp = $bars[ex_i];
        $bars[ex_i] = $bars[newpos];
        $bars[newpos] = temp;

        ex_i++;

        newpos = ex_change_array[ex_i];

        $bars[ex_i-1].css(normal_style);
        $bars[newpos].css(hl_style);
    }
}

var ex_pre = function($bars) {
    if (ex_i > 0) {
        newpos = ex_change_array[ex_i];

        $bars[newpos].css(normal_style);
        $bars[ex_i-1].css(hl_style);

        ex_i--;

        newpos = ex_change_array[ex_i];

        move_bar($bars[ex_i], "", $bars[newpos].css("left").pxno());
        move_bar($bars[newpos], "", ex_i*wid+margin);

        temp = $bars[ex_i];
        $bars[ex_i] = $bars[newpos];
        $bars[newpos] = temp;        
    }
}