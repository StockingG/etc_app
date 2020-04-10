//const APPHOST = 'http://47.98.45.159:8082/famsApi/'; // 接口地址
//const APPHOST = 'http://114.67.83.203:8881/famsApi/'; // 接口地址
//const APPHOST = 'http://61.175.124.98:8082/famsApi/'; // 艺术学校接口地址
// const APPHOST = "http://111.231.200.131/etcApi/"; // 接口地址
const APPHOST = "localhost:8080/etcApi/"; // 接口地址
window.onload = function () {
  document.documentElement.style.fontSize =
    document.documentElement.clientWidth / 12.8 + "px";
};

$(document).ready(function () {
  // assets_details.html
  $(".Assets_ul>li h2").click(function () {
    if ($(this).siblings("ol").css("display") == "none") {
      /*$(this).siblings('ol').show();
			$(this).siblings('ol.data-visible').hide();*/
      $(this).siblings("ol").slideDown(300);
    } else {
      $(this).siblings("ol").slideUp(300);
      //$(this).siblings('ol.data-visible').hide();
    }
  });

  $(".Assets_ul_tab p").click(function () {
    $(this).addClass("on").siblings("p").removeClass("on");
    $(".Assets_ul_table")
      .eq($(this).index())
      .addClass("active")
      .siblings(".Assets_ul_table")
      .removeClass("active");
    $(".Assets_ul_tab_info")
      .eq($(this).index())
      .addClass("active")
      .siblings(".Assets_ul_tab_info")
      .removeClass("active");
  });

  // assets_choose.html   选择
  $(".Assets_list_bottom").click(function () {
    $(this).children("img").attr("src", "images/choose_on.png");
    $(this).addClass("on");
    $(this)
      .parent("li")
      .siblings("li")
      .children(".Assets_list_bottom")
      .children("img")
      .attr("src", "images/choose_no.png");
    $(this)
      .parent("li")
      .siblings("li")
      .children(".Assets_list_bottom")
      .removeClass("on");
  });
});
