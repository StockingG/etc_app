$(function () {
  $("#loginBtn").on("click", function () {
    var userName = $("#userName").val();
    var password = $("#password").val();
    $.ajax({
      //url: APPHOST + "auth",
      url: APPHOST + "access/login",
      type: "POST",
      async: false,
      data: { userName: userName, password: password },
      dataType: "json",
      timeout: 15000, //超时时间：15秒
      success: function (data) {
        if (data.code == "200") {
          var token = data.data.token;
          setCookie("app_token", "Bearer " + token);
          setCookie("app_userName", data.data.userName);
          window.location.href = "index.html";
          /* console.log();
                    $("#userName").html("["+data.userName+"],欢迎您！");*/
        } else {
          alertMsg("失败：" + data.message);
        }
      },
      error: function (xhr, errorType, error) {
        alertMsg(
          "失败：" + errorType + "," + error + "," + JSON.stringify(xhr)
        );
      },
    });
  });
});
