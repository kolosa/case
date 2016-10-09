window.onload=function(){
    var oImg=document.getElementById("img");
    var x=0;
    document.onmousedown=function(ev){
        var oEvent=ev||event;
        var disX=oEvent.clientX-x;
        document.onmousemove=function(ev){
            var oEvent=ev||event;
            x=oEvent.clientX-disX;
            oImg.src="img/miaov ("+x%77+").jpg"

            return false

        }
        document.onmouseup=function(){
            document.onmousemove=null;
            document.onmouseup=null;
        }
        return false
    }
}

