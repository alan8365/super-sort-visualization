//變數初始化
var max = 32,
    roof = 18;
    wid = 20,
    margin = 5,
    speed = 100;
//特殊顯示的長條圖css
var hl_style = {
    "background": "#2a6cd6",
    "z-index": "-1"
};
//平常的長條圖css
var normal_style = {
    "background": "#739cdd",
    "z-index": "-1"
};
//隨機陣列初始化
var array_init = function(a, top=roof) {
    top -= 5;
    for (var i = 0; i < max; i++) {
        a[i] = Math.floor((Math.random() * top + 5) * 10);
    }
};
//隨機不重複陣列初始化
var array_notre_init = function(a, top=roof){
    var x;
    top -= 5;
    for (var i = 0; i < max; i++) {
        x = Math.floor((Math.random() * top + 5) * 10);
        while(a.includes(x)){
            x = Math.floor((Math.random() * top + 5) * 10);
        }
        a[i] = x;
    }
}
//陣列洗牌
var array_shuffle = function(a){
    var temp;

    for(var i = a.length-1;i > 0;i--){
        var x = Math.floor(Math.random()*(i+1) );
        a.swap(x, i);
    }
}

var change_array_init = function(ch){
    for(var i = 0;i < max;i++){
        ch[i] = [];
    }
}
//顯示出一個長條圖
var print_bar = function(x, y, pos) {
    $("<div>")
        .addClass("bar")
        .css("height", x + "px") //高度為x/10
        .css("left", y * wid + margin + "px") //位置為y*寬度s
        .html(y)
        .appendTo(pos);
};
//顯示出所有長條圖
var print_bars = function(a, pos="body") {
    for (var i = 0; i < a.length; i++) {
        print_bar(a[i], i, pos);
    }
}
//獲得指定的bar
var get_bars = function(pos=""){
    var $bars = $(pos + " .bar");
    
    for (var i = 0; i < $bars.length; i++) {
        $bars[i] = $($bars[i]);
    }

    return $bars;
}
//移除bars
var remove_bars = function($bars){
    for (var i = 0; i < $bars.length; i++) {
        $bars[i].remove();
    }
}

// 獲得bar高度好像很多餘以後留著看
// var get_bar_height = function($bars){
//     return $bars.css('height').pxno();
// }

//移動bar
var move_bar = function($bar, direction="", distance=wid){
    $bar.animate({
        left:direction + distance + "px"
    }, speed);
}

//hight light初始化
var hl_init = function(bar){
    bar.css(hl_style);
}
