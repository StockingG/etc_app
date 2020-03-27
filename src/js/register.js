$(function() {
    $("#registerBtn").on("click", function () {
        var userName =$("#userName").val();
        var password =$("#password").val();
        var passwordAgain =$("#passwordAgain").val();
        if(password != passwordAgain){
            alertMsg("两次密码不一致!");
            return;
        }

        $.ajax({
            //url: APPHOST + "auth",
            url: APPHOST + "access/register",
            type: 'POST',
            async: false,
            data:{"userName":userName,
                "password":password},
            dataType: 'json',
            timeout: 15000, //超时时间：15秒
            success: function (data) {
                if(data.code == "200"){
                    alertMsg("注册成功，将为您跳转到登录页面！");
                    window.location.href = "login.html";
                }else{
                    alertMsg("注册失败："+data.message);
                }
            },
            error: function (xhr, errorType, error) {
                alertMsg("注册失败："+errorType + ',' + error + ',' + JSON.stringify(xhr));
            }
        });
    });
});
