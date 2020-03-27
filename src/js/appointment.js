$(function() {

    /*$('#fpdate').on('click', function () {
        var fDateArray =new Array();
        $.ajax({
            //url: APPHOST + "auth",
            url: APPHOST + "access/appointmentcount/dateList",
            type: 'POST',
            async: false,
            dataType: 'json',
            timeout: 15000, //超时时间：15秒
            success: function (data) {
                if(data.length > 0){
                    fDateArray = new Array();
                    for(var i=0;i<data.length;i++){
                        var obj ={label:data[i].substring(0,10),value:data[i].substring(0,10)};
                        fDateArray.push(obj);
                    }
                    weui.picker(fDateArray, {
                        onChange: function (result) {
                            console.log(result);
                        },
                        onConfirm: function (result) {
                            console.log(result[0].value);
                            $("#fpdate").html(result[0].value);
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
    });

    $('#fptimeLabel').on('click', function () {
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

    $('#fTypeLabel').on('click', function () {
        weui.picker([{
            label: '个人',
            value: 1
        }, {
            label: '单位',
            value: 2
        }, {
            label: '其他',
            value: 3
        }], {
            onChange: function (result) {
                console.log(result);
            },
            onConfirm: function (result) {
                console.log(result[0].value);
                $("#fTypeLabel").html(result[0].label);
                $("#fType").val(result[0].value);
            },
            title: '选择类型'
        });
    });

    $('#fcarnotypeLabel').on('click', function () {
        weui.picker([{
            label: '蓝',
            value: 1
        }, {
            label: '黄',
            value: 2
        }, {
            label: '绿',
            value: 3
        },{
            label: '其他',
            value: 4
        }], {
            onChange: function (result) {
                console.log(result);
            },
            onConfirm: function (result) {
                console.log(result[0].value);
                $("#fcarnotypeLabel").html(result[0].label);
                $("#fcarnotype").val(result[0].value);
            },
            title: '选择类型'
        });
    });
});

function addItem(){
    if($("#fType").val()==""){
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
    }
    /*if($("#fpdate").html()=="选择预约日期"){
        alertMsg("请选择预约日期");
        return ;
    }
    if($("#fptime").val()==""){
        alertMsg("请选择时间段");
        return ;
    }*/
    var appointmentData = {"fType":$("#fType").val(),
        "fname":$("#fname").val(),
        "ftelephoneno":$("#ftelephoneno").val(),
        "fcarnotype":$("#fcarnotype").val(),
        "fcarno":$("#fcarno").val(),
        "fidcard":$("#fidcard").val(),
        "faddress":$("#faddress").val()};
    sessionStorage.setItem("appointmentData", JSON.stringify(appointmentData));
    window.location.href = "appointment_selecttime.html";
    /*$.ajax({
        url: APPHOST + "access/appointment/addItem",
        type: 'POST',
        async: false,
        data:{"fType":$("#fType").val(),
            "fname":$("#fname").val(),
            "ftelephoneno":$("#ftelephoneno").val(),
            "fcarnotype":$("#fcarnotype").val(),
            "fcarno":$("#fcarno").val(),
            "fidcard":$("#fidcard").val(),
            "faddress":$("#faddress").val(),
            "fpdate":$("#fpdate").html(),
            "fptime":$("#fptime").val()},
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
    });*/
};
