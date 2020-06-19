
$(function(){

// 0、自定义滚动条
$("#content_list").mCustomScrollbar();
// 1、加载localstorage的数据
song();

// 2、加载歌曲列表
getPlayerlist()
// 加载歌曲列表
function getPlayerlist() {

    // 1、获取所有的歌曲列表
    var songLists = localStorage.getItem("song");
    // 2、将所有歌曲转换为数组
    var songs = JSON.parse(songLists)
    //console.log(songs)
    // 3、将歌曲进行遍历
    for (let index = 0; index < songs.length; index++) {
        // const element = array[index];
        // console.log(readFile(songs[index].lyric))
        //    4、遍历成功后创建歌曲
        var songmname = songs[index].mname;
        var songSinger = songs[index].singer;
        var songTime = songs[index].time;
        var songlrc = songs[index].lyric;
        //console.log(songlrc + ";")
        var item = ('<li class = "list_music">' +
            '<div class = "list_check" >' + '<input type = "checkbox" >' + '</div>' +
            '<div class = "list_number" >' + (index + 1) + '</div>' +
            '<div class = "list_name" >' + songmname + '</div>' +
            '<div class = "list_singer" >' + songSinger + '</div>' +
            ' <div class = "list_time" >' + songTime + ' </div>' +
            '</li>')
        // console.log(item)
        $("#content_list ul").append(item);
    }

}
// 3、用户名的改变
var currentUser = readCookie("currentUser")
// console.log(readCookie("currentUser"))
$(".user").html(currentUser)


// 4、页面根据id播放对应的歌曲

var id = getPageParamByName("id");
// console.log(id);
var info = findLocalStorageById("song", id);
// console.log(info);
document.querySelector("#music").src = info.content;
document.querySelector("#music_bg").src = info.music_bg;
document.querySelector("#music_name").innerHTML = info.mname;
document.querySelector("#singer_name").innerHTML = info.singer;
document.querySelector("#song").innerHTML = info.mname;
document.querySelector("#singer").innerHTML = info.singer;
document.querySelector("#all_time").innerHTML = info.time;
document.querySelector("#bg_player").style.backgroundImage = "url(\"" + info.music_bg + "\")"


// 5、歌词处理
var music = document.getElementById("music");
var lrc = info.lyric;
var oLRC = {
    ti: "", //歌曲名
    ar: "", //演唱者
    al: "", //专辑名
    by: "", //歌词制作人
    offset: 0, //时间补偿值，单位毫秒，用于调整歌词整体位置
    ms: [] //歌词数组{t:时间,c:歌词}
};

function createLrcObj() {
    var lrcs = lrc.split('<br>'); //用回车拆分成数组
    for (var i in lrcs) { //遍历歌词数组
        lrcs[i] = lrcs[i].replace(/(^\s*)|(\s*$)/g, ""); //去除前后空格
        var t = lrcs[i].substring(lrcs[i].indexOf("[") + 1, lrcs[i].indexOf("]")); //取[]间的内容
        var s = t.split(":"); //分离:前后文字
        if (isNaN(parseInt(s[0]))) { //不是数值
            for (var i in oLRC) {
                if (i != "ms" && i == s[0].toLowerCase()) {
                    oLRC[i] = s[1];
                }
            }
        } else { //是数值
            var arr = lrcs[i].match(/\[(\d+:.+?)\]/g); //提取时间字段，可能有多个
            var start = 0;
            for (var k in arr) {
                start += arr[k].length; //计算歌词位置
            }
            var content = lrcs[i].substring(start); //获取歌词内容
            for (var k in arr) {
                var t = arr[k].substring(1, arr[k].length - 1); //取[]间的内容
                var s = t.split(":"); //分离:前后文字
                oLRC.ms.push({ //对象{t:时间,c:歌词}加入ms数组
                    t: (parseFloat(s[0]) * 60 + parseFloat(s[1])).toFixed(3),
                    c: content
                });
            }
        }
    }
    oLRC.ms.sort(function (a, b) { //按时间顺序排序
        return a.t - b.t;
    });
    //console.log(oLRC.ms)
}
createLrcObj();

function showLRC() {
    var s = "";
    for (var i in oLRC.ms) { //遍历ms数组，把歌词加入列表
        s += '<li>' + oLRC.ms[i].c + '</li>';
        // console.log(oLRC.ms[i].c)
    }
    document.getElementById("lyric").innerHTML = s;
    for (var i in oLRC) { //查看解析结果
        // console.log(i, ":", oLRC.ms);
    }
}
showLRC();

var lineNo = 0; //当前行
var C_pos = 4; //C位
var offset = -20; //滚动距离（应等于行高）
var ul = document.getElementById("lyric"); //歌词容器列表

//高亮显示歌词当前行及文字滚动控制，行号为lineNo
function lineHigh() {
    var lis = ul.getElementsByTagName("li"); //歌词数组
    if (lineNo > 0) {
        lis[lineNo - 1].removeAttribute("class"); //去掉上一行的高亮样式
    }
    lis[lineNo].className = "lineHigh"; //高亮显示当前行

    //文字滚动
    if (lineNo > C_pos) {
        ul.style.transform = "translateY(" + (lineNo - C_pos) * offset + "px)"; //整体向上滚动一行高度
    }
}
function lineHigh2() {
    var lis = ul.getElementsByTagName("li"); //歌词数组
    if (lineNo > 0) {
        lis[lineNo].removeAttribute("class"); //去掉当前行的高亮样式
    }
    lis[lineNo-1].className = "lineHigh"; //高亮显示前一行
}

//滚回到开头，用于播放结束时
function goback() {
    document.querySelector("#lyric .lineHigh").removeAttribute("class");
    ul.style.transform = "translateY(0)";
    lineNo = 0;
}

//监听播放器的timeupdate事件，实现文字与音频播放同步
music.ontimeupdate = function () {
    if (lineNo == oLRC.ms.length)
        return;
    var curTime = music.currentTime; //播放器时间
    if (parseFloat(oLRC.ms[lineNo].t) <= curTime) {
        lineHigh(); //高亮当前行
        lineNo++;
    }else{
        lineHigh2();
        lineNo--;
    }
};

//监听播放器的ended事件，播放结束时回滚歌词
music.onended = function () {
    goback(); //回滚歌词
};

playM()

function playM() {
    if (music.paused) {
        music.play();
        button.className = "iconfont iconzanting playM";
        progressTime();
    } else {
        music.pause();
        button.className = "iconfont iconbofang playM";
    }
}
})
