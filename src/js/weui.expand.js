$(function () {
  /* *
 * 图片上传
 * */
var uploadCount = 0,  //上传图片的数量
    uploadList = [],  //上传的图片
    uploadSuccessCount = 0;  //上传成功的数量
var uploadCountDom = document.getElementById("uploadCount");
weui.uploader('#uploader', {
    url:  APPHOST + "access/upload/files",  //你要上传的url地址
    auto: true,
    type: 'file',
    fileVal: 'fileVal',  //文件上传域的name，后台通过该name拿到传输的文件
    compress: {
        width: 1600,
        height: 1600,
        quality: .8
    },
    onBeforeQueued: function onBeforeQueued(files) {
        //上传前，对上传的情况做以下多个判断，保证合法性，可自行删改
        if (["image/jpg", "image/jpeg", "image/png", "image/gif"].indexOf(this.type) < 0) {
            weui.alert('请上传图片');
            return false;
        }
        if (this.size > 5 * 1024 * 1024) {
            weui.alert('请上传不超过5M的图片');
            return false;
        }
        if (files.length > 4) {
            //防止一下子选中过多文件
            weui.alert('最多只能上传4张图片，请重新选择');
            return false;
        }
        if (uploadCount + 1 > 4) {
            weui.alert('最多只能上传4张图片');
            return false;
        }
//        if (localStorage.userId == undefined) {
  //          weui.alert('请先登录!');
    //        return false;
      //  }

        ++uploadCount;
        uploadCountDom.innerHTML = uploadCount;
    },
    onQueued: function onQueued() {
        uploadList.push(this);
        //手动上传，如果不想选择完图片自动上传可以通过此方法改为手动不过上面的auto要改为false
        /*var self = this;
        $('#preview_confirm').on('click',function(){
            self.upload();
        });*/
    },
    onBeforeSend: function onBeforeSend(data, headers) {
        $("#submit_order").addClass("weui-btn_disabled");
        //return false; //阻止文件上传
    },
    onProgress: function onProgress(procent) {
        //console.log(this, procent);
    },
    onSuccess: function onSuccess(ret) {
     /*   if (ret.result == true) {
            uploadSuccessCount++;
            if (uploadSuccessCount == uploadCount) {
                //判断上传是否全部成功
                $("#submit_order").removeClass("weui-btn_disabled");
            }
        }
        var uploadID = this.id;
        $("#uploaderFiles li").each(function () {
            if ($(this).attr("data-id") == uploadID) {
                $(this).attr("DB-id", ret.DBId);  //图片后台对应的唯一编号
                $(this).attr("url", ret.url);  //图片存放地址
            }
        });
		*/
		 if (ret.code == 200) {
            uploadSuccessCount++;
            if (uploadSuccessCount == uploadCount) {
                //判断上传是否全部成功
                $("#submit_order").removeClass("weui-btn_disabled");
            }
        }
        var uploadID = this.id;
        $("#uploaderFiles li").each(function () {
            if ($(this).attr("data-id") == uploadID) {
                $(this).attr("db-id", ret.data[0].name);  //图片后台对应的唯一编号
                $(this).attr("url", ret.data[0].url);  //图片存放地址
            }
        });
        //console.log(this, ret);
    },
    onError: function onError(err) {
        console.log(this, err);
    }
});
});
