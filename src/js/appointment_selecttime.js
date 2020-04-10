var appointmentData;
$(function() {
    appointmentData = JSON.parse(sessionStorage.getItem("appointmentData"));
    //console.log(objAfter,typeof objAfter);
    var fDateArray = new Array();
    $.ajax({
        //url: APPHOST + "auth",
        url: APPHOST + "access/appointmentcount/dateList",
        type: 'POST',
        async: false,
        dataType: 'json',
        timeout: 15000, //超时时间：15秒
        success: function (data) {
            if(data.length > 0){
                for(var i=0;i<data.length;i++){
                    var obj ={label:data[i].substring(0,10),value:data[i].substring(0,10)};
                    fDateArray.push(obj);
                }
                $("#fpdate").html(data[0].substring(0,10));
                initTime();
            }else{
                alertMsg("不存在可预约的日期！");
            }
        },
        error: function (xhr, errorType, error) {
            alertMsg("失败："+errorType + ',' + error + ',' + JSON.stringify(xhr));
        }
    });

    $('#fpdate').on('click', function () {
        weui.picker(fDateArray, {
            onChange: function (result) {
                console.log(result);
            },
            onConfirm: function (result) {
                console.log(result[0].value);
                $("#fpdate").html(result[0].value);
                initTime();
            },
            title: '选择时间段'
        });
    });


    /*$('#fptimeLabel').on('click', function () {
        if($("#fpdate").html() =="选择预约日期"){
            alertMsg("请先选择预约日期！");
            return ;
        }
        var fTimeArray =new Array();
        $.ajax({
            //url: APPHOST + "auth",
            url: APPHOST + "access/appointmentcount/list",
            type: 'POST',
            async: false,
            data:{"fdate":$("#fpdate").html()},
            dataType: 'json',
            timeout: 15000, //超时时间：15秒
            success: function (data) {
                if(data.length > 0){
                    fTimeArray = new Array();
                    for(var i=0;i<data.length;i++){
                        var obj ={label:data[i].ftime,value:data[i].ftime};
                        fTimeArray.push(obj);
                    }
                    weui.picker(fTimeArray, {
                        onChange: function (result) {
                            console.log(result);
                        },
                        onConfirm: function (result) {
                            console.log(result[0].value);
                            $("#fptimeLabel").html(result[0].label);
                            $("#fptime").val(result[0].value);
                        },
                        title: '选择时间段'
                    });
                }else{
                    alertMsg("不存在可预约的日期！");
                }
            },
            error: function (xhr, errorType, error) {
                alertMsg("失败："+errorType + ',' + error + ',' + JSON.stringify(xhr));
            }
        });
    });*/
});

function initTime() {
    var fTimeArray =new Array();
    $.ajax({
        //url: APPHOST + "auth",
        url: APPHOST + "access/appointmentcount/list",
        type: 'POST',
        async: false,
        data:{"fdate":$("#fpdate").html()},
        dataType: 'json',
        timeout: 15000, //超时时间：15秒
        success: function (data) {
            if(data.length > 0){
                fTimeArray = new Array();
                var htmlStr ="";
                for(var i=0;i<data.length;i++){
                    var id = data[i].fID;
                    var state ="";
                    var stateClass="";
                    if(data[i].fcount == data[i].fmax){ //红色
                        state ="已满";
                        stateClass ="red";
                    }else if(data[i].fcount < data[i].fmax && data[i].fcount >= data[i].fbusy){ //黄色
                        state ="繁忙";
                        stateClass ="orange";
                    }else if(data[i].fcount < data[i].fbusy && data[i].fcount >= data[i].fnobusy){ //蓝色
                        state ="正常";
                        stateClass ="blue";
                    }else if(data[i].fcount < data[i].fnobusy){ //绿色
                        state ="空闲";
                        stateClass ="green";
                    }
                    htmlStr +="<label class=\"weui-cell weui-check__label\" for=\""+id+"\">"+
                                "<div class=\"weui-cell__hd\" style='color: "+stateClass+"'><label class=\"weui-label\">"+state+"</label></div>"+
                                "<div class=\"weui-cell__bd\">"+
                                    "<p>"+data[i].ftime+"</p>"+
                                "</div>"+
                                "<div class=\"weui-cell__ft\">"+
                                    "<input type=\"radio\" class=\"weui-check\" value='"+data[i].ftime+"' name=\"ftime\" id=\""+id+"\"/>"+
                                    "<span class=\"weui-icon-checked\"></span>"+
                                "</div>"+
                            "</label>";

                }
                $("#timeRadioGroup").html(htmlStr);
            }else{
                alertMsg("不存在可预约的日期！");
            }
        },
        error: function (xhr, errorType, error) {
            alertMsg("失败："+errorType + ',' + error + ',' + JSON.stringify(xhr));
        }
    });
}

function addItem(){
    /*if($("#fType").val()==""){
        alertMsg("请选择类型");
        return ;
    }
    if($("#fname").val()==""){
        alertMsg("请输入反映人姓名");
        return ;
    }
    if($("#ftelephoneno").val()==""){
        alertMsg("请输入联系电话");
        return ;
    }
    if($("#fcarnotype").val()==""){
        alertMsg("请选择车牌类型");
        return ;
    }
    if($("#fcarno").val()==""){
        alertMsg("请输入车牌");
        return ;
    }else{
        var carno = $("#fcarno").val();
        console.log(carno.length);
        if(carno.length < 7 || carno.length > 8){
            alertMsg("请输入正确车牌");
            return ;
        }
    }
    if($("#fidcard").val()==""){
        alertMsg("请输入身份证号码");
        return ;
    }else{
        var fidcard = $("#fidcard").val();
        console.log(fidcard.length);
        if(fidcard.length != 18 ){
            alertMsg("请输入正确身份证号码");
            return ;
        }
    }*/
    /*if($("#fpdate").html()=="选择预约日期"){
        alertMsg("请选择预约日期");
        return ;
    }
    if($("#fptime").val()==""){
        alertMsg("请选择时间段");
        return ;
    }*/
    /*var appointmentData = {"fType":$("#fType").val(),
        "fname":$("#fname").val(),
        "ftelephoneno":$("#ftelephoneno").val(),
        "fcarnotype":$("#fcarnotype").val(),
        "fcarno":$("#fcarno").val(),
        "fidcard":$("#fidcard").val(),
        "faddress":$("#faddress").val()};
    sessionStorage.setItem("appointmentData", appointmentData);
    window.location.href = "appointment_selecttime.html";*/
    appointmentData.fpdate = $("#fpdate").html();
    var radios = document.getElementsByName("ftime");
    var value = "";
    for(var i=0;i<radios.length;i++){
        if(radios[i].checked == true){
            value = radios[i].value;
            break;
        }
    }
    if(value ==""){
        alertMsg("请选择时间段");
        return ;
    }
    appointmentData.fptime = value;
    var token = getCookie("app_token");
    $.ajax({
        url: APPHOST + "access/appointment/addItem",
        type: 'POST',
        async: false,
        data:appointmentData,
        headers: {
            Authorization: token,
        },
        dataType: 'json',
        timeout: 15000, //超时时间：15秒
        success: function (data) {
            if(data.code == "200"){
                alertMsg("预约已提交！");
                window.location.href = "index.html";
            }else{
                alertMsg(data.message);
            }
        },
        error: function (xhr, errorType, error) {
            alertMsg("失败："+errorType + ',' + error + ',' + JSON.stringify(xhr));
        }
    });
};
