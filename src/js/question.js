$(function() {
    var fTimeArray =new Array();
    $('#fpdate').on('click', function () {
        weui.datePicker({
            start: 1990,
            end: new Date().getFullYear(),
            onChange: function (result) {
                console.log(result.toString());
            },
            onConfirm: function (result) {
                console.log(result.toString());
                var year = result[0].label.replace("年","-");
                var month = result[1].label.replace("月","-");
                if(month.length <=2){
                    month = '0'+month;
                }
                var day = result[2].label.replace("日","");
                if(day.length <2){
                    day = '0'+day;
                }
                $('#fpdate').html(year + month + day);
                //触发获取时段
                //console.log(year + month + day);
                $.ajax({
                    //url: APPHOST + "auth",
                    url: APPHOST + "access/appointmentcount/list",
                    type: 'POST',
                    async: false,
                    data:{"fdate":year + month + day+" 00:00:00"},
                    dataType: 'json',
                    timeout: 15000, //超时时间：15秒
                    success: function (data) {
                        if(data.length > 0){
                            fTimeArray = new Array();
                            for(var i=0;i<data.length;i++){
                                var obj ={label:data[i].ftime,value:data[i].ftime};
                                fTimeArray.push(obj);
                            }
                        }else{
                            alertMsg("当前日期没有可预约的时段！");
                        }
                    },
                    error: function (xhr, errorType, error) {
                        alertMsg("失败："+errorType + ',' + error + ',' + JSON.stringify(xhr));
                    }
                });
            },
            title: '选择预约日期'
        });
    });

    $('#fptimeLabel').on('click', function () {
        weui.picker(fTimeArray, {
            onChange: function (result) {
                console.log(result);
            },
            onConfirm: function (result) {
                console.log(result[0].value);
                $("#fptimeLabel").html(result[0].label);
                $("#fptime").val(result[0].value);
            },
            title: '选择类型'
        });
    });

    $('#fTypeLabel').on('click', function () {
        weui.picker([{
            label: '投诉',
            value: 1
        }, {
            label: '咨询',
            value: 2
        }, {
            label: '建议',
            value: 3
        }, {
            label: '其他',
            value: 4
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
    if($("#fpdate").html()=="选择预约日期"){
        alertMsg("请选择预约日期");
        return ;
    }
    if($("#fptime").val()==""){
        alertMsg("请选择时间段");
        return ;
    }
    $.ajax({
        url: APPHOST + "access/question/addItem",
        type: 'POST',
        async: false,
        data:{"fType":$("#fType").val(),
            "fname":$("#fname").val(),
            "ftelephoneno":$("#ftelephoneno").val(),
            "fcarnotype":$("#fcarnotype").val(),
            "fcarno":$("#fcarno").val(),
            "fidcard":$("#fidcard").val(),
            "faddress":$("#faddress").val(),
            "fcontent":$("#fcontent").val()},
        dataType: 'json',
        timeout: 15000, //超时时间：15秒
        success: function (data) {
            if(data.code == "200"){
                alertMsg("意见反馈已提交！");
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
