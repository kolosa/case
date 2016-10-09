window.onload=function(){
    var oImg=document.getElementById("img");
    var x=0;
    document.onmousedown=function(ev){
        var oEvent=ev||event;
        var disX=oEvent.clientX-x;
        document.onmousemove=function(ev){
            var oEvent=ev||event;
            x=oEvent.clientX-disX;
            var l=parseInt(-x/10);
            if(l>0){
                oImg.src="img/miaov ("+l%77+").jpg";
            }else {
                var y=l+-Math.floor(l/77)*77;
                oImg.src="img/miaov ("+y+").jpg";
            }

            return false;

        };
        document.onmouseup=function(){
            document.onmousemove=null;
            document.onmouseup=null;
        };
        return false
    }
};

