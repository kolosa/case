window.onload=function(){
    var oLi=document.getElementById("oimg").getElementsByTagName("li");
    for(var i= 0;i<oLi.length;i++){
        oLi[i].style.left=i*130+"px";
    }
};

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
            fnMove=miaovDoMoveBuffer;
            break;
        case MOVE_TYPE.FLEX:
            fnMove=miaovDoMoveFlex;
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