$(document).ready(function () {
    //201209020429
    if (true || localStorage.config === undefined) {
        var config = {
            love: '',
            heat: '',
            time: 30,
            user: '',
            pwd: ''
        };
        localStorage.config = JSON.stringify(config);
    }
    var config = JSON.parse(localStorage.config);

    $("#love").val(config.love);
    $("#time").val(config.time);
    $("#user").val(config.user);
    $("#pwd").val(config.pwd);
    $("#heat").val(config.heat);

    console.log(config.love);

    $("#save").click(function () {
        var love = $("#love").val();
        var time = $("#time").val();
        var user = $("#user").val();
        var pwd = $("#pwd").val();
        var heat = $("#heat").val();

        time = time <= 0 ? 30 : time;
        var saveConfig = {
            love: love,
            heat: heat,
            time: time,
            user: user,
            pwd: pwd
        };
        localStorage.config = JSON.stringify(saveConfig);
    });
});
