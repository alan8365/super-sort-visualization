//字串以{為基底切割
var cutter = function(str){
    var str_arr = [];
    var i = 0;

    while(str.includes("{") || str.includes("}")){

        if(str.includes("{")){
            str_arr[i] = str.slice(0, str.indexOf("{")+1 );
            str = str.slice(str.indexOf("{")+1 );
        }else{
            str_arr[i] = str.slice(0, str.indexOf("}")+1 );
            str = str.slice(str.indexOf("}")+1 )
        }

        i++;
    }

    str_arr[i] = str;

    return str_arr;
}
//加入檢查陣列
var append_check = function(a) {
    a[0] = a[0].splice(0, 0, "var ani_array=[];var ani_idx=0;");

    for (var i = 0; i < a.length; i++) {
        if (a[i].includes("for")) {
            a[i] = a[i].splice(a[i].indexOf("{") + 1, 0, "if(ani_idx === 0 || !(ani_array[ani_idx-1].eq(a))){ani_array[ani_idx++] = a.slice();}");
        }
        if(a[i].includes("}")){
            a[i] = a[i].splice(a[i].indexOf("}") + 1, 0, "if(ani_idx === 0 || !(ani_array[ani_idx-1].eq(a))){ani_array[ani_idx++] = a.slice();}");
        }
    }

    return a;
}
//消除紀錄陣列重複性
var remove_repeat_in_array = function(array){
    for (var i = 0; i < array.length; i++) {
        for (var j = 0; j < array[i].length; j++) {
            if(array[i].indexOf(array[i][j]) != array[i].lastIndexOf(array[i][j]) ){
                array[i] = undefined;
                break;
            }
        }
    }

    var k = 0;
    var newarray = [];

    for (var i = 0; i < array.length; i++) {
        if (array[i] != undefined){
            newarray[k++] = array[i];
        }
    }

    return newarray;
}
//紀錄交換
var record_swap = function(array){
    var k = 0;
    var record_array = [];
    for (var i = 1; i < array.length; i++) {
        for (var j = 0; j < array[i].length; j++) {
            if(array[i][j] != array[i-1][j]){
                if(record_array[i-1] == undefined) record_array[i-1]=[];
                record_array[i-1].push([j, array[i-1].indexOf(array[i][j])]);
            }
        }
    }

    return record_array;
}
//統整內容並輸入html
var submit = function(str, pos="#user_output_script") {
    str = cutter(str);
    str = append_check(str);

    var code = "";

    for (var i = 0; i < str.length; i++) {
        code += str[i];
    }

    $(pos).html("<script>" + code + "</" + "script>");
}

var hl_array_init = function(array) {
    var hl_array = [];

    for (var i = 0; i < array.length; i++) {
        hl_array[i] = 0;

        for(var j = 0; j < array[i].length; j++){
            if(hl_array[i] < array[i][j][0]){
                hl_array[i] = array[i][j][0];
            }
        }
    }

    return hl_array;
}
//下一步
var user_i = 0,
    user_hl_i = 0;

var user_change_array,
    user_hl_array,
    tmp_array;

var user_next = function($bars) {
    if (user_i < user_change_array.length) {

        tmp_array = $bars.slice();
        
        for (var i = 0; i < user_change_array[user_i].length; i++) {
            var oldpos = user_change_array[user_i][i][1];
            var newpos = user_change_array[user_i][i][0];

            if(user_hl_i < newpos){
                user_hl_i = newpos;
            }

            move_bar($bars[oldpos], "", wid*newpos+margin);
            tmp_array[newpos] = $bars[oldpos];
        }

        for (var i = 0; i < $bars.length; i++) {
            $bars[i] = tmp_array[i];
            $bars[i].css(normal_style);
        }

        $bars[user_hl_array[user_i]].css(hl_style);

        user_i++;

        
    }
};
//上一步
var user_pre = function($bars) {
    if(user_i > 0){

        user_i--;

        tmp_array = $bars.slice();
        
        for (var i = 0; i < user_change_array[user_i].length; i++) {
            var oldpos = user_change_array[user_i][i][1];
            var newpos = user_change_array[user_i][i][0];

            move_bar($bars[newpos], "", wid*oldpos+margin);
            tmp_array[oldpos] = $bars[newpos];
        }

        for (var i = 0; i < $bars.length; i++) {
            $bars[i] = tmp_array[i];
            $bars[i].css(normal_style);
        }

        $bars[user_hl_array[user_i-1]].css(hl_style);
    }
}