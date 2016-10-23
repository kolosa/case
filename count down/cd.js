window.onload = function () {
    var oIn = document.getElementById("in");
    var oYear = oIn.getElementsByTagName("input")[0];
    var oMonth = oIn.getElementsByTagName("input")[1];
    var oDay = oIn.getElementsByTagName("input")[2];
    var oBtn = document.getElementById("go");
    var oTDay = document.getElementById("day");
    var oTHour= document.getElementById("hour");
    var oTMin = document.getElementById("min");
    var oTSec = document.getElementById("sec");
    var oTarTxt=document.getElementById("target").getElementsByTagName("strong")[0];

    function setDate(num,n){
        var str=""+num;
        while(str.length<n){
            str="0"+str;
        }
        return str;
    }

    oBtn.onclick = function () {
        oTarTxt.innerHTML=oYear.value+"年"+oMonth.value+"月"+oDay.value+"日";
        setInterval(undate,1000);
        undate()
    };

function undate(){
        var oDateEnd = new Date();
        var oDateNow = new Date();

        oDateEnd.setFullYear(parseInt(oYear.value));
        oDateEnd.setMonth(parseInt(oMonth.value) - 1);
        oDateEnd.setDate(parseInt(oDay.value));
        oDateEnd.setHours(0);
        oDateEnd.setMinutes(0);
        oDateEnd.setSeconds(0);

        var iRes = (oDateEnd.getTime() - oDateNow.getTime()) / 1000;
        if (iRes<0){
            return;
        }
        var iDay = parseInt(iRes / 86400);
        iRes %= 86400;
        var iHour = parseInt(iRes / 3600);
        iRes %= 3600;
        var iMin = parseInt(iRes / 60);
        iRes %= 60;
        var iSec = iRes;
        oTDay.innerHTML= setDate(iDay,3);
        oTHour.innerHTML= setDate(iHour,2);
        oTMin.innerHTML= setDate(iMin,2);
        oTSec.innerHTML= setDate(iSec,2);
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