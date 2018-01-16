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
        if (a[i].includes("{")) {
            a[i] = a[i].splice(a[i].indexOf("{") + 1, 0, "if(ani_idx === 0 || !(ani_array[ani_idx-1].eq(a))){ani_array[ani_idx++] = a.slice();}");
        }else if(a[i].includes("}")){
            a[i] = a[i].splice(a[i].indexOf("}") + 1, 0, "if(ani_idx === 0 || !(ani_array[ani_idx-1].eq(a))){ani_array[ani_idx++] = a.slice();}");
        }
    }

    return a;
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
//下一步
var user_i = 0;

var user_change_array = [],
    tmp_array;

var user_next = function($bars) {
    if (user_i < ani_array.length-1) {

        tmp_array = $bars.slice();
        
        for (var i = 0; i < user_change_array[user_i].length; i++) {
            var oldpos = user_change_array[user_i][i][1];
            var newpos = user_change_array[user_i][i][0];

            move_bar($bars[oldpos], "", wid*newpos+margin);
            tmp_array[newpos] = $bars[oldpos];
        }

        for (var i = 0; i < $bars.length; i++) {
            $bars[i] = tmp_array[i];
        }

        user_i++;

        var oldhl = user_change_array[user_i-1][1][1];
        $bars[oldhl].css(normal_style);

        if(user_change_array[user_i].length == 2){
            var newhl = user_change_array[user_i][1][0];
            

            $bars[newhl].css(hl_style);
            
        }
    }
};
//上一步
var user_pre = function($bars) {
    if(user_i > 0){

        user_i--;

        tmp_array = $bars.slice();
        
        for (var i = 0; i < user_change_array[user_i].length; i++) {
            var oldpos = user_change_array[user_i][i][0];
            var newpos = user_change_array[user_i][i][1];

            move_bar($bars[newpos], "", wid*oldpos+margin);
            tmp_array[oldpos] = $bars[newpos];
        }

        for (var i = 0; i < $bars.length; i++) {
            $bars[i] = tmp_array[i];
        }

        if(user_change_array[user_i].length == 2){
            var newhl = user_change_array[user_i][1][0];
            $bars[newhl].css(hl_style);

            var oldhl = user_change_array[user_i+1][1][0];
            if(oldhl == newhl) oldhl = user_change_array[user_i][1][1];
            $bars[oldhl].css(normal_style);

            console.log(newhl, oldhl);
        }
    }
}