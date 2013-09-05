$(document).ready(function(){
    var expiredTime=new Date('2013-10-1');
    var today=new Date();
    var isExpired = today > expiredTime;
    if(isExpired)
    {
        showMsg('has expired');
        return false;
    }
    var key_data= "key_data";
    var key_love = "key_love";
    var key_host = "key_host";
    var key_time = "key_time";
    var storage=chrome.storage.local;
    storage.get(key_data,function(res){
        var result=res[key_data];
        var love=result[key_love];
        var time=result[key_time];
        var loveLess=love.split(',');
        var heat=new Array(44,82,149,7,103,94,105);
        if(window.location.href.indexOf('202.115.133.161/sel_freesys/sel_freesys.php') !=- 1)
        {
            showMsg("恭喜你，成功进入强刷系统，本系统将 "+time+" 秒钟自动刷一次课");
            showMsg("配置信息：选择以下编号的课程=>"+love+" 间隔时间："+time+"秒");
            if(love=='')
            {
                showMsg("你当前没有配置想选的课，系统将尝试所有可以选择的课");
            }
            showMsg("注意：表格中只展示可选的和已选的课程");
            $(":checkbox").each(function(){
                var input=$(this);
                var num=parseInt(input.parents("td").siblings("td:eq(0)").html());
                var required=parseInt(input.parents("td").siblings("td:eq(9)").html());
                var now=parseInt(input.parents("td").siblings("td:eq(10)").html());
                var name=input.parents("td").siblings("td:eq(2)").html();
                if(love == '' && required>0 && now<required)
                {
                    var text=input.attr("onclick");
                    var result=text.match(/\'[^']*\'/gi);
                    if(result.length=4)
                    {
                        chooseLess(result[0],result[1],result[2],name);
                    }
                }
                else if(loveLess.indexOf(num.toString()) != -1)
                {
                    var text=input.attr("onclick");
                    var result=text.match(/\'[^']*\'/gi);
                    if(result.length=4)
                    {
                        chooseLess(result[0],result[1],result[2],name);
                    }
                }
                else if(!input.is(":checked"))
                {
                    input.parents("tr").hide();
                }
            });
            setTimeout(function(){window.location.reload();},time*1000);
        }
        else if(window.location.href.indexOf("202.115.133.161/login.php") != -1)
        {
            $("body").prepend('<li><a href="sel_freesys/sel_freesys.php" target="_blank">强刷任选课</a></li>');
        }
    });
});

function chooseLess(a,b,c,d)
{
    $.get("http://202.115.133.161/sel_freesys/freeexe.php",{kcbh:a.replace(/\'/gi,""),jxbh:b.replace(/\'/gi,""),zy:c.replace(/\'/gi,"")},function(res){
        if(res.indexOf('操作失败')!=-1){
            var result= res.match(/[任选课程][^<]*/gi);
            if(result.length>0)
            {
                showMsg(d+" 选入失败,失败原因："+result[0]);
            }
            else{
                //console.log(res);
            }
        }
        else if(res.indexOf('选入成功')!=-1)
        {
            showMsg(d+" 成功选入课程！恭喜你！");
        }
    });
}

function showMsg(msg)
{
    var time=new Date();
    var msg='<tr style="margin:2px 10px;"><td style="color:#e6a000;padding:5px;" colspan="14">'+getTime()+"=>"+msg+'</td></tr>'
    $("tbody").prepend(msg);
}

function getTime()
{
    var time=new Date();
    return time.getFullYear()+"-"+time.getDate()+"-"+time.getMonth()+" "+time.getHours()+":"+time.getMinutes()+":"+time.getSeconds();
}
