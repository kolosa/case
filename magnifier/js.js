window.onload=function(){
    var oMain=document.getElementById("main-id");
    var oMask=getClass("mask")[0];
    var oSmall=getClass("small")[0];
    var oFloat=getClass("float-move")[0];
    var oBig=getClass("big")[0];
    var oBigImg=oBig.getElementsByTagName("img")[0]

    oMask.onmouseover=function(){
        oFloat.style.display="block";
        oBig.style.display="block";
    };
    oMask.onmouseout=function(){
        oFloat.style.display="none";
        oBig.style.display="none";
    };
    oMask.onmousemove=function(){
        var ev=ev||event;
        var left=ev.clientX;
        var top=ev.clientY;
        var l=left-oMain.offsetLeft-oSmall.offsetLeft-oFloat.offsetWidth/2;
        var t=top-oMain.offsetTop-oSmall.offsetTop-oFloat.offsetHeight/2;
        var percentX=l/(oMask.offsetWidth-oFloat.offsetWidth);
        var percentY=t/(oMask.offsetHeight-oFloat.offsetHeight);

        if( l<0){
            l=0
        } else if(l>oMask.offsetWidth-oFloat.offsetWidth){
            oFloat.style.left=oMask.offsetWidth-oFloat.offsetWidth+"px"
        }
        else
        {
                oFloat.style.left=l+"px"
        }
        if(t<0){
            t=0
        }else if(t>oMask.offsetHeight-oFloat.offsetHeight) {
            oFloat.style.top = oMask.offsetHeight - oFloat.offsetHeight + "px"
        }else
            {
                oFloat.style.top=t+"px"
            }
        oBigImg.style.left=-percentX*(oBigImg.offsetWidth)+"px";
        oBigImg.style.top=-percentY*(oBigImg.offsetHeight)+"px";
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

//
//-oBig.offsetWidth)
//-oBig.offsetHeight
