// 接口定义
var appUser;
$(function() {
    var token = getCookie("app_token");
    console.log(token);
    /*if(token == undefined || token ==null || token == "Bearer undefined"){
        window.location.href = "login.html";
    }else{
        getUserInfo(token);
    }*/
});


function getUserInfo(token) {
    $.ajax({
        url: APPHOST + "access/isLogin",
        type: 'POST',
        async: false,
        dataType: 'json',
        timeout: 15000, //超时时间：15秒
        headers: {
            Authorization: token
        },
        success: function (data) {
            if(data.code ="200"){
                appUser =  data.data;//window.location.href = "index.html";
                $("#userName").html("["+data.data.userName+"],欢迎您！");
            }else{
                window.location.href = "login.html";
            }
        },
        error: function (xhr, errorType, error) {
            alert(errorType + ',' + error + ',' + JSON.stringify(xhr));
            window.location.href = "login.html";
        }
    });
}
function auth(corpId){
        $.ajax({
            //url: APPHOST + "auth",
            url: APPHOST + "access/authTemp",
            type: 'GET',
            async: false,
            data:{"dingtalkId":"2213123"},
            dataType: 'json',
            timeout: 15000, //超时时间：15秒
            success: function (data) {
               var token = data.token;
                console.log(data.userName);
                $("#userName").html("["+data.userName+"],欢迎您！");
                setCookie("app_token","Bearer "+token);
                /*localStorage.setItem("token",token);
                console.log("token:"+token);*/
            },
            error: function (xhr, errorType, error) {
                console.log(errorType + ',' + error + ',' + JSON.stringify(xhr));
            }
        });
}
