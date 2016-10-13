window.onload = function () {
    var aAll = document.getElementById("all").getElementsByTagName("li");
    var aWra = document.getElementById("wra").getElementsByTagName("li");
    var oBtnl = document.getElementById("pre");
    var oBtnr = document.getElementById("next");
    var aLitli = document.getElementById("nav").getElementsByTagName("li");
    var aLitui = document.getElementById("nav").getElementsByTagName("ul")[0];
    var iNow = 0;
    var iNowUlLeft = 0;
    var i = 0;
    for (i = 0; i < aLitli.length; i++) {
        aLitli[i].index = i;
        aLitli[i].onclick = function () {
            clearInterval();
            for (i = 0; i < aLitli.length; i++) {
                if (iNow == this.index) {
                    return
                }
                aLitli[i].className = "iImg";
                clearInterval(aAll[i].timer);
                aAll[i].style.filter = 'alpha(opacity:0)';
                aAll[i].style.opacity = 0;
            }
            this.className = "iImg border";
            startMove(aAll[this.index], {opacity: 100});
            iNow = this.index
        }
    }
    oBtnl.onclick = function () {
        if( iNowUlLeft==0){                    //双等，left是上一个
            return
        }
        iNowUlLeft--;
        aLitui.style.left =-170 * iNowUlLeft + "px";
    };


    oBtnr.onclick = function () {
        if( iNowUlLeft>=5){
            return
        }
            iNowUlLeft++;
            aLitui.style.left = -170 * iNowUlLeft + "px";
        }

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
function getStyle(obj, attr)
{
    if(obj.currentStyle)
    {
        return obj.currentStyle[attr];
    }
    else
    {
        return getComputedStyle(obj, false)[attr];
    }
}

function startMove(obj, json, fn)
{
    clearInterval(obj.timer);
    obj.timer=setInterval(function (){
        var bStop=true;
        for(var attr in json)
        {
            var iCur=0;

            if(attr=='opacity')
            {
                iCur=parseInt(parseFloat(getStyle(obj, attr))*100);
            }
            else
            {
                iCur=parseInt(getStyle(obj, attr));
            }
            var iSpeed=(json[attr]-iCur)/8;
            iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
            if(iCur!=json[attr])
            {
                bStop=false;
            }

            if(attr=='opacity')
            {
                obj.style.filter='alpha(opacity:'+(iCur+iSpeed)+')';
                obj.style.opacity=(iCur+iSpeed)/100;
            }
            else
            {
                obj.style[attr]=iCur+iSpeed+'px';
            }
        }

        if(bStop)
        {
            clearInterval(obj.timer);

            if(fn)
            {
                fn();
            }
        }
    }, 30)
}