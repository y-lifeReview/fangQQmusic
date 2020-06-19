var index = 0; //歌曲索引
var time1; //定时器
var music = document.getElementById("music");
var music_bg = document.getElementById("music_bg")
var all_time = document.getElementById("all_time")//歌曲总时长
var ul = document.getElementById("lyric"); //歌词容器列表
var button = document.getElementsByClassName("playM")[0]
var bg_player = document.getElementById("bg_player");//背景
var musicsStr = localStorage.getItem("song");
var musics = JSON.parse(musicsStr);

function playM() {
    if (music.paused) {
        setTimeout(() => {
            music.play();
        }, 10 );
        button.className = "iconfont iconzanting playM";
        progressTime();
    } else {
        music.pause();
        button.className = "iconfont iconbofang playM";
        clearInterval(time1);
    }
}

function prevM() {
    clearInterval(time1);
    index--;
    if (index < 0) {
        index = musics.length - 1;
    }
    if (music.pause) {
        button.className = "iconfont iconzanting playM";

    } else {
        button.className = "iconfont iconbofang playM";
    }
    progressTime();
    getMusic();
    ul.style.transform = "translateY(0)";
    music.play();
}

function nextM() {
    clearInterval(time1);
    index++;
    if (index >= musics.length) {
        index = 0;
    }
    if (music.pause) {
        button.className = "iconfont iconzanting playM";
    } else {
        button.className = "iconfont iconbofang playM";

    }
    progressTime();
    getMusic();
    ul.style.transform = "translateY(0)";
    music.play();
}

function progressTime() {
    time1 = setInterval(function () {
        var lenth = music.duration;
        numTime();
        var currenttime = music.currentTime;
        setprogress.style.width = "" + parseFloat(currenttime / lenth) * 500 + "px";
        setProgressBtn.style.left = "" + parseFloat(currenttime / lenth) * 500 - 5 + "px";
        if (music.currentTime >= music.duration) {
            index++;
            if (index >= musics.length) {
                index = 0;
            }
            getMusic();
            ul.style.transform = "translateY(0)";
            music.play();
            console.log(index)
        }
    }, 1000)
}

function numTime() {
    var now_time = document.getElementById("now_time")
    if (music.currentTime < 10) {
        now_time.innerHTML = "0:0" + Math.floor(music.currentTime);
    } else
    if (music.currentTime < 60) {
        now_time.innerHTML = "0:" + Math.floor(music.currentTime);
    } else {
        var minet = parseInt(music.currentTime / 60);
        var sec = music.currentTime - minet * 60;
        if (sec < 10) {
            now_time.innerHTML = "0" + minet + ":" + "0" + parseInt(sec);
        } else {
            now_time.innerHTML = "0" + minet + ":" + parseInt(sec);
        }
    }
}

function getMusic() {
    music.src = musics[index].content;
    music_bg.src = musics[index].music_bg;
    bg_player.style.backgroundImage = "url(\"" + musics[index].music_bg + "\")"
    document.getElementById("music_name").innerHTML = musics[index].mname;
    document.getElementById("singer_name").innerHTML = musics[index].singer;
    document.getElementById("song").innerHTML = musics[index].mname;
    document.getElementById("singer").innerHTML = musics[index].singer;
    document.getElementById("lyric").innerHTML = musics[index].lyric;
    lrc = musics[index].lyric;
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
    }
    createLrcObj();

    function showLRC() {
        var s = "";
        for (var i in oLRC.ms) { //遍历ms数组，把歌词加入列表
            s += '<li>' + oLRC.ms[i].c + '</li>';
            // console.log(oLRC.ms[i].c)
        }
        document.getElementById("lyric").innerHTML = s;
        // for (var i in oLRC.ms) { //查看解析结果
        //      t.push(oLRC.ms[i].t)
        // }
        // console.log(t)
    }
    showLRC();

    lineNo = 0; //当前行
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
       // lis[lineNo-1].className = "lineHigh"; //高亮显示前一行
    }

    //滚回到开头，用于播放结束时
    function goback() {
        document.querySelector("#lyric .lineHigh").removeAttribute("class");
        ul.style.transform = "translateY(0)";
        lineNo = 0;
    }

    //监听播放器的timeupdate事件，实现文字与音频播放同步,当前播放位置改变时
    music.ontimeupdate = function () {
        if (lineNo == oLRC.ms.length)
            return;
        var curTime = music.currentTime; //播放器时间
        // console.log(lineNo,oLRC)
        if (parseFloat(oLRC.ms[lineNo].t)<= curTime) {
            lineHigh(); //高亮当前行
            lineNo++;
        }
        else{
            lineHigh2();
            lineNo--;
            if(lineNo<0){
                lineNo=0;
            }
        }
    };

    //监听播放器的ended事件，播放结束时回滚歌词
    music.onended = function () {
        goback(); //回滚歌词
        // console.log(lineNo)
    };
    if (music.readyState = "complete") {
        setTimeout(function () {
            var sec = parseInt(music.duration % 60);
            if (sec < 10) {
                all_time.innerHTML = "0" + parseInt(music.duration / 60) + ":" + "0" + sec;
            } else {
                all_time.innerHTML = "0" + parseInt(music.duration / 60) + ":" + sec;
            }
        }, 400);

    }

}

function muted() { //是否静音
    var Muted = document.getElementById("muted");
    if (music.muted) {
        music.muted = false;
        Muted.className = "iconfont iconshengyin1";
    } else {
        music.muted = true;
        Muted.className = "iconfont iconjingyin3";

    }
}

function loop() { //循环
    var Loop = document.getElementById("loop")
    if (music.loop) {
        music.loop = false;
        Loop.className = "iconfont iconliebiaoxunhuan loopM"
    } else {
        music.loop = true;
        Loop.className = "iconfont icondanquxunhuan3 loopM"
    }
}

//音量拖放
var totalVolume = document.getElementById("volume");
var volume = document.getElementById("setVolume");
var setVolumeBtn = document.getElementById("setVolumeBtn");

//拖动设置音量
setVolumeBtn.onmousedown = function (event) {
    var e = event || window.event; //浏览器兼容
    document.onmousemove = function () {
        changeVolume();
    };
};

function changeVolume(event) {
    var e = event || window.event;
    var volumeWidth = 0;
    //获取totalvolume相对于浏览器左侧的距离
    var tmp = totalVolume.offsetLeft;
    var val = totalVolume.offsetParent;
    while (val != null) {
        tmp += val.offsetLeft;
        val = val.offsetParent;
    }
    //clientx: 当事件被触发时鼠标指针向对于浏览器页面的水平坐标
    volumeWidth = e.clientX - tmp;
    //console.log(tmp)
    if (volumeWidth < 0) {
        volumeWidth = 0;
    } else if (volumeWidth > totalVolume.offsetWidth) {
        volumeWidth = totalVolume.offsetWidth;
    }
    volume.style.width = volumeWidth + "px";
    setVolumeBtn.style.left = volumeWidth - 5 + "px";
    setVolume();
}
//拖动后弹起鼠标不做任何操作
document.onmouseup = function () {
    document.onmousemove = null;
};
//点击音量条跳至相应音量
totalVolume.onclick = function () {
    changeVolume();
};

function setVolume() {
    var theTotalWidth = totalVolume.offsetWidth;
    var theWidth = volume.offsetWidth;
    music.volume = theWidth / theTotalWidth;
}

//进度条拖放及点击改变歌曲
var progress = document.getElementById("progress")
var setprogress = document.getElementById("setProgress");
var setProgressBtn = document.getElementById("setProgressBtn")
setProgressBtn.onmousedown = function (event) {
    clearInterval(time1)
    var e = event || window.event; //浏览器兼容
    document.onmousemove = function () {
        time2=setInterval(function(){
            clearInterval(time1);
        },
        10)
        changeProgress();
    };
};

function changeProgress(event) {
    var e = event || window.event;
    var progressWidth = 0;
    //获取progress相对于浏览器左侧的距离
    var tmp = progress.offsetLeft;
    var val = progress.offsetParent;
    while (val != null) {
        tmp += val.offsetLeft;
        val = val.offsetParent;
    }
    //clientx: 当事件被触发时鼠标指针向对于浏览器页面的水平坐标
    progressWidth = e.clientX - tmp;
    if (progressWidth < 0) {
        progressWidth = 0;
    } else if (progressWidth > progress.offsetWidth) {
        progressWidth = progress.offsetWidth;
    }
    setprogress.style.width = progressWidth + "px";
    setProgressBtn.style.left = progressWidth - 5 + "px";
    
}

setProgressBtn.onmouseup = function () {
    clearInterval(time1)
    setProgress();
    time1 = setInterval(function () {
        var lenth = music.duration;
        numTime();
        var currenttime = music.currentTime;
        setprogress.style.width = "" + parseFloat(currenttime / lenth) * 500 + "px";
        setProgressBtn.style.left = "" + parseFloat(currenttime / lenth) * 500 - 5 + "px";
        if (music.currentTime >= music.duration) {
            index++;
            if (index >= musics.length) {
                index = 0;
            }
            getMusic();
            ul.style.transform = "translateY(0)";
            music.play();
        }
    }, 100)
    document.onmousemove = null;
};
progress.onclick = function () {
    changeProgress();
    setProgress();
    time1 = setInterval(function () {
        var lenth = music.duration;
        numTime();
        var currenttime = music.currentTime;
        setprogress.style.width = "" + parseFloat(currenttime / lenth) * 500 + "px";
        setProgressBtn.style.left = "" + parseFloat(currenttime / lenth) * 500 - 5 + "px";
        if (music.currentTime >= music.duration) {
            index++;
            if (index >= musics.length) {
                index = 0;
            }
            getMusic();
            ul.style.transform = "translateY(0)";
            music.play();
        }
    }, 100)
};

function setProgress() {
    var theProgress = progress.offsetWidth;
    var theWidth = setprogress.offsetWidth;
    music.currentTime = (theWidth / theProgress) * music.duration;
}
