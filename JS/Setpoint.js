//1、 根据id进行歌曲信息匹排
var oLRC = {
    ti: "", //歌曲名
    ar: "", //演唱者
    al: "", //专辑名
    by: "", //歌词制作人
    offset: 0, //时间补偿值，单位毫秒，用于调整歌词整体位置
    ms: [] //歌词数组{t:时间,c:歌词}
};

function PointInfo() {
    var id = getPageParamByName("id");
    console.log(id)
    var info = findLocalStorageById("song", id);
    console.log(info)
    document.querySelector("#songPic").src = info.music_bg
    document.querySelector("#songName_txt").innerHTML = info.mname;
    document.querySelector("#songSing_text").innerHTML = info.singer;
    createLrcObj(info.lyric)
}
PointInfo();

function createLrcObj(lrc) {
    var lrcs = lrc.split('<br>'); //用回车拆分成数组
    for (var i in lrcs) { //遍历歌词数组
        lrcs[i] = lrcs[i].replace(/(^\s*)|(\s*$)/g, ""); //去除前后空格
        var arr = lrcs[i].match(/\[(\d+:.+?)\]/g); //提取时间字段，可能有多个
        var start = 0;
        for (var k in arr) {
            start += arr[k].length; //计算歌词位置
        }
        var content = lrcs[i].substring(start); //获取歌词内容
        for (var k in arr) {
            oLRC.ms.push({ //对象{t:时间,c:歌词}加入ms数组
                content
            });
        }
    }

}

function showLRC() {

    var songlist = ""
    for (var i in oLRC.ms) {
        songlist += '<li>' + oLRC.ms[i].content + '</li>'
    }
    document.querySelector("#lyrics").innerHTML = songlist;
    return songlist.length
}
showLRC()

// 2、根据页面的id，跳转、为播放页面传递id

function gotoPlay1() {
    var id = getPageParamByName("id")
    window.location.href = "play.html?id=" + id
}


// 添加音乐
addMusic()

function addMusic() {
    $("#addMusic").click(function (e) {
        e.preventDefault();

        var addList = JSON.parse(localStorage.getItem("addList")) || [];
        /* 这样如果JSON.parse(localStorage.getItem('addList'))一开始不是一个数组的话，push会报错 */
        var id = getPageParamByName("id")
        var info = findLocalStorageById("song", id)
        addList.push(
            info
        )
        localStorage.setItem("addList", JSON.stringify(addList));
        uniq(addList, "id")
        // 去重  
        function uniq(array, key) {
            var newobj = {};
            var newArr = [];
            for (let index = 0; index < array.length; index++) {
                var item = array[index];
                if (!newobj[item[key]]) {
                    newobj[item[key]] = newArr.push(item);
                }
            }
            localStorage.setItem("newArr", JSON.stringify(newArr));
        }
         toastr.success("添加成功");

    });
}