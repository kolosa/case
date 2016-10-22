window.onload=function(){
    var oIn=document.getElementById("in");
    var oYear=oIn.getElementsByTagName("input")[0];
    var oMonth=oIn.getElementsByTagName("input")[1];
    var oDay=oIn.getElementsByTagName("input")[2];
    var oBtn=document.getElementById("go");

    var oDateEnd=new Date()
    oDateEnd.setFullYear(parseInt(oYear.value));
    oDateEnd.setMonth(parseInt(oMonth.value)-1);
    oDateEnd.setDate(parseInt(oDay.value));


};
function getClass(name) {
    if (document.getElementsByClassName) {
        return document.getElementsByClassName(name)
    } else {
        var el = [],
            _el = document.getElementsByTagName('*');
        for (var i = 0; i < _el.length; i++) {
            if (_el[i].className == name) {
                el[el.length] = _el[i];
            }
        }
        return el;
    }
}
