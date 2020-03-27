function previewImg(fileId) {
    var img = new Image();
    img.src = APPHOST + 'access/file/downLoad?fileId='+fileId;
    var height = img.height + 50; //获取图片高度
    var width = img.width; //获取图片宽度
    var imgHtml = "<img src='" + Feng.ctxPath + 'access/file/downLoad?fileId='+fileId+ "' />";
    //弹出层
    layer.open({
        type: 1,
        shade: 0.8,
        offset: 'auto',
        area: [width + 'px',height+'px'],
        shadeClose:true,//点击外围关闭弹窗
        scrollbar: false,//不现实滚动条
        title: "图片预览", //不显示标题
        content: imgHtml, //捕获的元素，注意：最好该指定的元素要存放在body最外层，否则可能被其它的相对元素所影响
        cancel: function () {
            //layer.msg('捕获就是从页面已经存在的元素上，包裹layer的结构', { time: 5000, icon: 6 });
        }
    });
}
function previewImg(fileId,width,height) {
    if (dd.env.platform != "notInDingTalk") {
        dd.biz.util.previewImage({
            urls: [APPHOST + 'access/file/downLoad?fileId='+fileId],//图片地址列表
            current: APPHOST + 'access/file/downLoad?fileId='+fileId,//当前显示的图片链接
            onSuccess : function(result) {
                /**/
            },
            onFail : function(err) {}
        })
    }else{
        var img = new Image();
        img.src = APPHOST + 'access/file/downLoad?fileId='+fileId;
        var imgHtml = "<img src='" + APPHOST + 'access/file/downLoad?fileId='+fileId+ "' width='100%' height='90%'/>";
        //弹出层
        layer.open({
            type: 1,
            shade: 0.8,
            offset: 'auto',
            area: [width ,height],
            shadeClose:true,
            scrollbar: false,
            title: "图片预览", //不显示标题
            content: imgHtml, //捕获的元素，注意：最好该指定的元素要存放在body最外层，否则可能被其它的相对元素所影响
            cancel: function () {
                //layer.msg('捕获就是从页面已经存在的元素上，包裹layer的结构', { time: 5000, icon: 6 });
            }
        });
    }
}

function pdfPreview(fileId) {
    window.open('/pdf.html?file=' + APPHOST + 'access/file/downLoad?fileId='+fileId);
}

function downloadFile(fileId,fileName){
    const link = document.createElement('a');
    link.href = APPHOST + "access/file/downloadFile?fileId="+fileId;
    link.download = fileName; //下载
    link.click();

    /*if (dd.env.platform != "notInDingTalk") {
        dd.biz.util.downloadFile({
            url: APPHOST + "access/file/downloadFile", //要下载的文件的url
            name: fileName, //定义下载文件名字
            onProgress: function(msg){
                // 文件下载进度回调
            },
            onSuccess : function(result) {
                /!*
                  true
                *!/
            },
            onFail : function() {
                alertMsg("下载文件失败！");
            }
        })
    }else{
        var dlform = document.createElement('form');
        dlform.style = "display:none;";
        dlform.target = '';
        dlform.method = 'post';
        dlform.action = APPHOST + "access/file/downloadFile";
        var hdnFilePath = document.createElement('input');
        hdnFilePath.type = 'hidden';
        hdnFilePath.name = 'fileId';
        hdnFilePath.value = fileId;
        dlform.appendChild(hdnFilePath);
        document.body.appendChild(dlform);
        dlform.submit();
        document.body.removeChild(dlform);
    }*/
}
function receiptPreview(fileId,fileName){
    try{
        //alertMsg(fileId+" "+fileName);
        var spl = fileName.split(".");
        if(spl[spl.length-1].toLowerCase( ) =="pdf"){
            //alertMsg("pdfPreview:"+fileId);
            pdfPreview(fileId)
        }else if(spl[spl.length-1].toLowerCase( ) =="jpg" || spl[spl.length-1].toLowerCase( ) =="jpeg"
            ||spl[spl.length-1].toLowerCase( ) =="png"||spl[spl.length-1].toLowerCase( ) =="bmp"||spl[spl.length-1].toLowerCase( ) =="gif"){
            //alertMsg("previewImg:"+fileId);
            previewImg(fileId,'80%','80%');
        }else{
            //alertMsg("downloadFile1:"+fileId);
            downloadFile(fileId,fileName);
        }
    }catch (e){
        //alertMsg("downloadFile2:"+fileId);
        downloadFile(fileId,fileName);
    }
}
