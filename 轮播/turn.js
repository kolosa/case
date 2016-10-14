window.onload = function () {
    var aDiv=document.getElementById("wra");
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
            if (iNow == this.index) {
                return
            }
            iNow = this.index;
            turn()
        }
    }
    function turn(){
        for (i = 0; i < aLitli.length; i++) {

            aLitli[i].className = "iImg";
            clearInterval(aAll[i].timer);
            aAll[i].style.filter = 'alpha(opacity:0)';
            aAll[i].style.opacity = 0;
        }
        aLitli[iNow].className = "iImg border";
        startMove(aAll[iNow], {opacity: 100});
    }
    var timer=setInterval(function(){
        iNow++;
        if(iNow>= aLitli.length){
            iNow=0;
        }
        turn()
    },3000);
    aDiv.onmouseover=function(){
        clearInterval(timer);
    };
    aDiv.onmouseout=function(){
        timer=setInterval(function(){
            iNow++;
            if(iNow>= aLitli.length){
                iNow=0;
            }
            turn()
        },3000);
    }
    oBtnl.onclick = function () {
        if( iNowUlLeft==0){
            oBtnl.className="left"
            //双等，left是上一个
            return
        }
        oBtnr.className="right show";
        iNowUlLeft--;
        //aLitui.style.left =-170 * iNowUlLeft + "px";
        startMove(aLitui, {left: -170 * iNowUlLeft})
    };


    oBtnr.onclick = function () {
        if( iNowUlLeft==5){
            oBtnr.className="right";
            return
        }
        oBtnl.className="left show";
        //oBtnr.className="right show"
            iNowUlLeft++;
            //aLitui.style.left = -170 * iNowUlLeft + "px";
        startMove(aLitui, {left: -170 * iNowUlLeft})
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