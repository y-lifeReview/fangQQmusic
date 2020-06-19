$(function () {

    $(".modal .regbtn").click(function (e) {
        e.preventDefault();
        var username = $("#name").val();
        var password = $("#password").val();
        if (username == "" && password == "") {
            alert("账号/密码为空,请继续输入")
        } else {
            // checkLogin(username,password)
            handleLogin();
        }
    });

    function handleLogin() {
        var username = $("#name").val();
        var password = $("#password").val();
        if (checkLogin(username, password)) {
            //为了记住登录状态，将已经登录的用户增加到cookie,并设置过期时间
            window.createCookie("currentUser", username, 60)
            //跳转
            window.location.href = "index.html";
        } else {
            $(".modal .modal-body p").show()
        }
    }

    function checkLogin(user, pass) {

        // 1、获取所有用户
        var usersStr = localStorage.getItem("userArr"); //获取所有用户
        var users = JSON.parse(usersStr); //将所有用户转换为数组
        console.log(users)

        if (users == null) {
            alert("用户不存在,请尽快注册")
        }
        // 2、获取当前用户   find//获取满足条件的第一个数组元素
        var currentUser = users.find(function (one) {
            if (one.username == user) {
                return true; //输入的用户在集合中
            }
        })
        if (!currentUser || pass != currentUser.password) {

            return false; //输入的用户不在
        }
        return true
    }

})