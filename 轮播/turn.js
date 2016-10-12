window.onload = function () {
    var adiv = getClass("aImg");
    var aLi=getClass("iImg");

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