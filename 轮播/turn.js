window.onload = function () {
    var aImg = getClass("iImg");
    var i = 0
    setInterval(function () {
        for (i; i < aImg.length;i++) {
            aImg[i].parent().className += "on"
        }
    }, 30)
}
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