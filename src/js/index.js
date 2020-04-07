$(function () {
  function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    // console.log(reg);
    var r = decodeURI(window.location.search).substr(1).match(reg); //匹配目标参数
    // console.log(window.location.search.substr(1).match(reg));
    if (r != null) return unescape(r[2]);
    return null; //返回参数值
  }

  function getAuthUrl() {
    var code = null;
    $.ajax({
      url: APPHOST + "access/wx/auth/access_token",
      type: "GET",
      async: false,
      data: { url: "http://www.panshi.ltd/clj", state: "123" },
      dataType: "json",
      timeout: 15000, //超时时间：15秒
      success: function (data) {
        if (data.code == "200") {
          console.log(data);
          code = data.data;
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
    return token;
  }

  function getAccessToken(code) {
    var token = null;
    $.ajax({
      url: APPHOST + "access/wx/auth/access_token",
      type: "POST",
      async: false,
      data: { code: code },
      dataType: "json",
      timeout: 15000, //超时时间：15秒
      success: function (data) {
        if (data.code == "200") {
          console.log(data);
          var token = data.data.accessToken;
          console.log(token);
          setCookie("accessToken", token);
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
    return token;
  }

  function getUserInfo(code) {
    var user_wx = null;
    $.ajax({
      url: APPHOST + "access/wx/auth/user_info",
      type: "POST",
      async: false,
      data: { code: code, lang: "zh_CN" },
      dataType: "json",
      timeout: 15000, //超时时间：15秒
      success: function (data) {
        if (data.code == "200") {
          console.log(data);
          user_wx = data.data;
          setCookie("user_wx", user_wx);
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
    return user_wx;
  }
  if ($.isEmptyObject(getUrlParam("code"))) {
    window.location.href =
      "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxead3b68e7ba06a6d&redirect_uri=http%3a%2f%2fwww.panshi.ltd%2fclj&response_type=code&scope=snsapi_base&state=123#wechat_redirect";
  } else {
    var code = getUrlParam("code");
    console.log(code);
    var token = getAccessToken(code);
    console.log(token);
    var user_info = getUserInfo(code);
    console.log(user_info);
  }
});
