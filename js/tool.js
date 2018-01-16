//字串插入
String.prototype.splice = function(index, len, str) {
    return this.slice(0, index) + str + this.slice(index + Math.abs(len));
};
//去px
String.prototype.pxno = function() {
    var str = this.slice(0, this.indexOf("px"));

    return parseInt(str);
};
//陣列相等
Array.prototype.eq = function(a) {
    return this.toString() == a.toString();
};
//陣列交換
Array.prototype.swap = function(index1, index2){
    var temp = this[index1];
    this[index1] = this[index2];
    this[index2] = temp;
}