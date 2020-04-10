var app = new Vue({
    el: '#app',
    data: {
      items: [
        
      ]
    },
    created: function(){
        var max=10, page=1;
        //进入页面加载
        this.items = load(page);  
        //滚动加载更多
        var loading = false;  //状态标记
        $(document.body).infinite().on("infinite", function() {  
            if(loading) return;  
            loading = true;  
            setTimeout(function() {  
                page=page+1;
                this.items = load(page);
                loading = false;  
            }, 1000);   //模拟延迟  
        });  
        function load(p){
            var token = getCookie("app_token");
            var appointmentData={"page":(p-1)*max,"pageSize":max}
            $.ajax({
                url: APPHOST + "access/user/question/list",
                type: 'POST',
                async: false,
                headers: {
                    Authorization: token,
                },
                data: JSON.stringify(appointmentData),
                processData: false,
                contentType: 'application/json',
                dataType: 'json',
                timeout: 15000, //超时时间：15秒
                success: function (data) {
                    if(data.code == "200"){
                        alertMsg(data.data);
                        return data.data;
                    }else{
                        alertMsg(data.message);
                    }
                },
                error: function (xhr, errorType, error) {
                    alertMsg("失败："+errorType + ',' + error + ',' + JSON.stringify(xhr));
                }
            });
        }
    }
  })