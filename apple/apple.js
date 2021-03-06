window.onload=function(){
    var oLi=document.getElementById("oimg").getElementsByTagName("li");
    var aBtn=document.getElementById("img-nav").getElementsByTagName("a");
    var oDown=document.getElementById("img-nav").getElementsByTagName("span")[0];
    var oLiSave=[];
    var timer=null;
    var i=0;

    for(var i= 0;i<oLi.length;i++){
        oLi[i].style.left=i*130+"px";
    }
    for(var i= 0;i<oLi.length;i++){
        oLiSave[i]=oLi[i].offsetLeft;
    }
    aBtn[0].onclick=function ()
    {
        var i=oLi.length-1;

        clearTimeout(timer);

        function next()
    {
        var obj=oLi[i];
        if(i>=oLi.length/2)
        {
            startMove(oLi[i], {left: 900}, MOVE_TYPE.FLEX);
            timer=setTimeout(next, 100);
            i--;
        }
        else
        {
            timer=setTimeout(next2, 150);
        }
    }

    function next2()
    {
        if(i>=0)
        {
            startMove(oLi[i], {left: oLiSave[i]}, MOVE_TYPE.FLEX);
            timer=setTimeout(next2, 100);
        }
        i--;
    }

    next();
    startMove(oDown, {left: 435}, MOVE_TYPE.BUFFER);
}

	aBtn[1].onclick=function ()
    {
        var i=0;

        clearTimeout(timer);

        function next()
        {
            var obj=oLi[i];
            if(i<oLi.length/2)
            {
                startMove(oLi[i], {left: -200}, MOVE_TYPE.FLEX);
                timer=setTimeout(next, 100);
                i++;
            }
            else if(i==oLi.length/2)
            {
                timer=setTimeout(next2, 150);
            }
        }

        function next2()
        {
            if(i<oLi.length)
            {
                startMove(oLi[i], {left: oLiSave[i-oLi.length/2]}, MOVE_TYPE.FLEX);
                timer=setTimeout(next2, 100);
            }
            i++;
        }
        next();
        startMove(oDown, {left: 525}, MOVE_TYPE.BUFFER);
    };
    //存在定时器bug，解决方法，加入判断语句
    //aBtn[0].onclick=function(){
    //    i=oLi.length-1;
    //    clearTimeout(timer);
    //    startMove(oLi[i],{left:1600},MOVE_TYPE.FLEX)
    //    var timer=setInterval(
    //        function(){
    //            startMove(oLi[i--],{left:1600},MOVE_TYPE.FLEX);
    //            if(i<=oLi.length/2){
    //                clearInterval(timer);
    //                next();
    //            }
    //        },50);
    //    function next(){
    //        timer=setInterval(function(){
    //            startMove(oLi[i],{left:oLiSave[i]},MOVE_TYPE.FLEX);
    //            i--;
    //            if(i<0){
    //                clearInterval(timer);
    //            }
    //        },50)
    //    }
    //    startMove(oDown,{left:435},MOVE_TYPE.FLEX)
    //}
    //
    //
    //aBtn[1].onclick=function(){
    //    i=1;
    //    clearTimeout(timer);
    //    startMove(oLi[0],{left:-600},MOVE_TYPE.FLEX)
    //    var timer=setInterval(
    //        function(){
    //            startMove(oLi[i++],{left:-600},MOVE_TYPE.FLEX);
    //            if(i>=oLi.length/2){
    //                clearInterval(timer);
    //                next();
    //            }
    //        },50);
    //    function next(){
    //        timer=setInterval(function(){
    //            startMove(oLi[i],{left:oLiSave[i-oLi.length/2]},MOVE_TYPE.FLEX);
    //            i++;
    //            if(i>=oLi.length){
    //                clearInterval(timer);
    //            }
    //        },50)
    //    }
    //    startMove(oDown,{left:525},MOVE_TYPE.FLEX)
    //}

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

function css(obj, attr, value)
{
    if(arguments.length==2)
        return parseFloat(obj.currentStyle?obj.currentStyle[attr]:document.defaultView.getComputedStyle(obj, false)[attr]);
    else if(arguments.length==3)
        switch(attr)
        {
            case 'width':
            case 'height':
            case 'paddingLeft':
            case 'paddingTop':
            case 'paddingRight':
            case 'paddingBottom':
                value=Math.max(value,0);
            case 'left':
            case 'top':
            case 'marginLeft':
            case 'marginTop':
            case 'marginRight':
            case 'marginBottom':
                obj.style[attr]=value+'px';
                break;
            case 'opacity':
                obj.style.filter="alpha(opacity:"+value*100+")";
                obj.style.opacity=value;
                break;
            default:
                obj.style[attr]=value;
        }

    return function (attr_in, value_in){css(obj, attr_in, value_in)};
}

var MOVE_TYPE={
    BUFFER: 1,
    FLEX: 2
};
function startMove(obj, oTarget, iType, fnCallBack, fnDuring)
{
    var fnMove=null;
    if(obj.timer)
    {
        clearInterval(obj.timer);
    }

    switch(iType)
    {
        case MOVE_TYPE.BUFFER:
            fnMove=bufferMove;
            break;
        case MOVE_TYPE.FLEX:
            fnMove=flexMove;
            break;
    }

    obj.timer=setInterval(function (){
        fnMove(obj, oTarget, fnCallBack, fnDuring);
    }, 15);
}


function bufferMove(obj, oTarget, fnCallBack, fnDuring)
{
    var bStop=true;
    var attr='';
    var speed=0;
    var cur=0;

    for(attr in oTarget)
    {
        cur=css(obj, attr);
        if(oTarget[attr]!=cur)
        {
            bStop=false;

            speed=(oTarget[attr]-cur)/5;
            speed=speed>0?Math.ceil(speed):Math.floor(speed);

            css(obj, attr, cur+speed);
        }
    }

    if(fnDuring)fnDuring.call(obj);

    if(bStop)
    {
        clearInterval(obj.timer);
        obj.timer=null;

        if(fnCallBack)fnCallBack.call(obj);
    }
}

function flexMove(obj, oTarget, fnCallBack, fnDuring)
{
    var bStop=true;
    var attr='';
    var speed=0;
    var cur=0;

    for(attr in oTarget)
    {
        if(!obj.oSpeed)obj.oSpeed={};
        if(!obj.oSpeed[attr])obj.oSpeed[attr]=0;
        cur=css(obj, attr);
        if(Math.abs(oTarget[attr]-cur)>1 || Math.abs(obj.oSpeed[attr])>1)
        {
            bStop=false;

            obj.oSpeed[attr]+=(oTarget[attr]-cur)/5;
            obj.oSpeed[attr]*=0.7;
            var maxSpeed=65;
            if(Math.abs(obj.oSpeed[attr])>maxSpeed)
            {
                obj.oSpeed[attr]=obj.oSpeed[attr]>0?maxSpeed:-maxSpeed;
            }

            css(obj, attr, cur+obj.oSpeed[attr]);
        }
    }

    if(fnDuring)fnDuring.call(obj);

    if(bStop)
    {
        clearInterval(obj.timer);
        obj.timer=null;
        if(fnCallBack)fnCallBack.call(obj);
    }
}