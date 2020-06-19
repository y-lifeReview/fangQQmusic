$(function () {


    var info1 = $(".row .p1");
    var info11 = $(".row .p11");
    var info2 = $(".row .p2");
    var info22 = $(".row .p22");
    var info23 = $(".row .p23");

    // 昵称输入框
    $('.form-group input').eq(0).focus(function (e) {

        info1.hide()
        $(this).css("border", "1px solid #66AFE9");

        $(this).keyup(function (e) {
            if (this.value.length > 8) {
                info11.show()
                this.value = ""
            } else {
                info11.hide()
            }
        });

    });
    $('.form-group input').eq(0).blur(function (e) {
        info1.show()
        if (this.value == "") {
            info1.show()
            info11.hide()
            $(this).css("border", "1px solid red")
        } else {
            info1.hide()
        }
    });

    // 密码输入框
    $('.form-group input').eq(1).focus(function () {
        $(this).css("border", "1px solid #66AFE9");

        if (this.value == "") {
            info2.hide();

        }
        $(this).keyup(function (e) {
            if (this.value.length > 10) {
                info22.show()
                this.value = ""
            } else {
                info22.hide()
            }
            if (this.value.indexOf(" ") != -1) {
                info23.show();
                this.value = ""
            } else {
                info23.hide()
            }
        });

    });


    $('.form-group input').eq(1).blur(function (e) {
        if (this.value == "") {
            info2.show();
            info22.hide();
            info23.hide();
            $(this).css("border", "1px solid red")
        } else {
            info2.hide();
            $(".row .form-group .info").hide();
        }
    });




    // 注册功能
    var checkbox = document.getElementById("checkbox")
    checkbox.onclick = function () {
        //console.log("jaf")
        var btn = document.getElementById("loginbtn")
        if (this.checked == true) {
            btn.disabled = false
        } else {
            btn.disabled = true
        }
    };
    //先获取所有用户的对象//变成数组    
    if (window.localStorage.userArr) {
        //判断是否存在        
        var array = JSON.parse(window.localStorage.userArr);
    } else {
        array = []; //创建一个新数组    
    }

    var loginbtn = $("#loginbtn")
    loginbtn.bind("click", function (event) {
        event.preventDefault();
        var username = $("#name").val();
        var password = $("#password").val()
        var number = $("#number").val();
        if (username != "" && password != "" && number != "") {


            //遍历数组进行匹配        
            for (var i = 0; i < array.length; i++) {
                //判断是否有相同账号            
                if (username == array[i].username) {
                    alert("该账号已存在");
                    return;
                }
            }
            //创建对象        
            var obj = {
                username: username,
                password: password,
                number: number
            }
            array.push(obj);
            window.localStorage.setItem("userArr", JSON.stringify(array));
            alert("用户创建成功");
            var currentPageAry = location.pathname.split("/");
            var currentPage = currentPageAry[currentPageAry.length - 1];
            if (currentPage == "login.html") {

                window.location.href = "register.html"
            }

        } else {
            alert("请输入信息进行注册")
        }
    })



})