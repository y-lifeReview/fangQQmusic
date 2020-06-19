    //剩余字数
    var maxstrlen = 300;

    function checkWords(c) {

        var len = maxstrlen;
        var str = c.value;
        var myLen = getStrleng(str);
        var leftnum = document.getElementById("textNum");
        if (myLen > len * 2) {
            c.value = str.substring(0, i + 1);
        } else {
            leftnum.innerHTML = Math.floor((len * 2 - myLen) / 2);
        }
    }

    function getStrleng(str) {
        myLen = 0;
        var i = 0;
        for (;
            (i < str.length) && (myLen <= maxstrlen * 2); i++) {
            if (str.charCodeAt(i) > 0 && str.charCodeAt(i) < 128)
                myLen++;
            else
                myLen += 2;
        }
        return myLen;
    }

    //更多框点击按钮显示，点击其他位置隐藏
    window.onload = function () {
        function $(id) {
            return document.getElementById(id);
        }
        document.onclick = function (_e) {
            $("infoMore").style.display = "none";
        }
        $("songMore").onclick = function (e) {
            $("infoMore").style.display = "block";
            e = e || event;
            stopFunc(e);
        }
        $("infoMore").onclick = function (e) {
            e = e || event;
            stopFunc(e);
        }

    }

    function stopFunc(e) {
        e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
    }

    


    //评论   
    function getTime() {
        var date = new Date();
        var month = date.getMonth() + 1;
        var da = date.getDate();
        var hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        var minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        var time = month + "月" + da + "日 " + hour + ":" + minute;
        return time;
    }

    var oPostBtn = document.getElementById("doPost");
    oPostBtn.onclick = function () {
        var newList = document.getElementById("newVeiw_list");
        var oInput = document.getElementById("myInput");
        if (oInput.value) {
            var myLi = document.createElement("li");
            myLi.id = "newV_list";
            var html = '<a href="" id="userPic">' + '<img src="assets/2.jpg" width="50px" height="50px" />' +
                '</a>' +
                '<h4 id="userName">' + '<a id="Name_text" href="">用户名</a>' +
                '</h4>' +
                '<p id="View_txt">' + oInput.value + '</p>' +
                '<div id="view_last">' +
                '<span id="view_time">' + getTime() + '</span>' +
                '<a href="javascript:void(0);" id="likes">' + '<i class="iconfont">&#xe680;</i>' + '<span id="like_new">0</span>' + '</a>' +
                '<a href="javascript:void(0);" id="discuss" class="discuss">' + '<i class="iconfont">&#xe635;</i> 回复' + '</a>' +
                '</div>'
            myLi.innerHTML = html;
            newList.appendChild(myLi);
            oInput.value = "期待你的神级评论......"


            //使留言先后顺序由下往上            
            var arrayLi = newList.getElementsByTagName("li"); //判断是否是第一个留言
            if (arrayLi.length > 0) {
                newList.insertBefore(myLi, arrayLi[0]);
            } else {
                newList.appendChild(myLi);
            }
            document.getElementById("newNum").innerHTML = arrayLi.length;
            document.getElementById("sumNum").innerHTML = arrayLi.length + 4;

        } else {
            alert("评论不能为空！");
        }
    }


    // 点赞
    $(function () {
        var i = 0;
        $(".likes").click(function () {
            if (i == 0) {
                var like_1 = $(this).children("span");
                like_1.html(parseFloat(like_1.text()) + 1);
                $(this).css({
                    "color": "#31c27c",
                    "text-decoration": "none"
                });
                i++;
            }
        })


        //根据点赞数量排序
        var likelist = $("#goodVeiw_list .goodV_list").get();
        likelist.sort(function (a, b) {
            var like_a = $(a).find('.like-1').text();
            var like_b = $(b).find('.like-1').text();
            if (like_a > like_b) return -1;
            if (like_a < like_b) return 1;
            return 0;
        });
        $("#goodVeiw_list").append(likelist);
    })


    //复制
    function copy() {
        var new_Lyrics = document.getElementById("lysTxt").innerText;
        var hidden_txt = document.getElementById("hidText");
        hidden_txt.value = new_Lyrics;
        hidden_txt.select();
        document.execCommand("copy");
    }


    //收起展开
    function showdiv() {
        var lrcHeight = showLRC() +100+"px";
        console.log(lrcHeight)
        document.getElementById("lyric_area").style.height = lrcHeight;
        document.getElementById('lyrics_more').innerHTML = "[收起]";
        document.getElementById('lyrics_more').href = "javascript:hidediv();";
        document.getElementById('lyrics_more').style = "text-decoration:none;"
    }

    function hidediv() {
        document.getElementById("lyric_area").style.height = "400px";
        document.getElementById('lyrics_more').innerHTML = "[展开]";
        document.getElementById('lyrics_more').href = "javascript:showdiv();";
        document.getElementById('lyrics_more').style = "text-decoration:none;"

    }


    // 回复功能
    $(function () {
        //页面加载完毕后开始执行的事件
        $(".discuss").click(function () {
            $(".reply_textarea").remove();
            $(this).parent().append("<div class='reply_textarea'><textarea class='relyInput'></textarea><br/><button class='doRely'>回复</button><button class='doCancel'>取消</button></div>");
            $(".doCancel").click(function () {
                $(".reply_textarea").css("display", "none");
            })

            $(".doRely").click(function () {
                $(".reply_textarea").css("display", "none");
                var newList = document.getElementById("newVeiw_list");
                var myLi = document.createElement("li");
                myLi.id = "newV_list";
                var html = '<a href="" id="userPic">' + '<img src="assets/2.jpg" width="50px" height="50px" />' +
                    '</a>' + '<h4 id="userName">' + '<a id="Name_text" href="">lifan</a>' +
                    '</h4>' + '<p id="View_txt">' +
                    '回复<a href="" id="relyUser">@用户名 </a>' + $(".relyInput")[0].value +
                    '</p>' + '<p>' + $(".View_txt")[0].innerHTML + '</p>' +
                    '<div id="view_last">' +
                    '<span id="view_time">' + getTime() + '</span>' +
                    '<a href="javascript:void(0);" id="likes">' + '<i class="iconfont">&#xe680;</i>' + '<span id="like_new">0</span>' + '</a>' +
                    '<a href="javascript:void(0);" id="discuss" class="discuss">' + '<i class="iconfont">&#xe635;</i> 回复' + '</a>' +
                    '</div>'

                myLi.innerHTML = html;
                newList.append(myLi);

                var arrayLi = newList.getElementsByTagName("li"); //判断是否是第一个留言 
                if (arrayLi.length > 0) {
                    newList.insertBefore(myLi, arrayLi[0]);
                } else {
                    newList.appendChild(myLi);
                }
                document.getElementById("newNum").innerHTML = arrayLi.length;
                document.getElementById("sumNum").innerHTML = arrayLi.length + 4;
            })
        });

        //页面最新评论数
        var arrayLi = $("#newVeiw_list").children("li");
        document.getElementById("newNum").innerHTML = arrayLi.length;
        document.getElementById("sumNum").innerHTML = arrayLi.length + 4;
    });