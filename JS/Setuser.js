function getPlayerlist() {

    // 1、获取所有的歌曲列表
    var songLists = localStorage.getItem("newArr");
    // 2、将所有歌曲转换为数组
    var songs = JSON.parse(songLists)
    //console.log(songs)
    // 3、将歌曲进行遍历
    if (songs != null) {
        for (let index = 0; index < songs.length; index++) {

            //    4、遍历成功后创建歌曲
            var songmname = songs[index].mname;
            var songSinger = songs[index].singer;
            var songTime = songs[index].time;
            var item = ('<li class = "list_music" id="list_music" >' +
                '<div class = "list_check" >' + '<input type = "checkbox" >' + '</div>' +
                '<div class = "list_name" >' + songmname + '</div>' +
                '<div class = "list_singer" >' + songSinger + '</div>' +
                ' <div class = "list_time" >' + songTime + ' </div>' +
                '</li>')

            console.log(item)
            $("ul.list").append(item);
        }
    } else {
        $(".infoEmpty").html("你的歌曲为空，快去添加吧~~")
    }


}
getPlayerlist()

// 删除页面歌曲
function deleteAI(e) {
    // 找到被选中的歌曲
    var list_Music = $(".list_music")
    // 找到input
    var del = $(".list_music input")
    for (let index = 0; index < list_Music.length; index++) {
        // const element = array[index];
        if (del[index].checked) {
            list_Music[index].remove()
        }
    }

}

// 全选
function choseAll() {
    // 找到input
    var del = $(".list_music input")
    for (let index = 0; index < del.length; index++) {
        if (del[index].checked == true) {
            del[index].checked = false
        } else {
            del[index].checked = true
        }
    }
}


// 播放
function gotoPlay2() {

    // 1、获取所有的歌曲列表
    var songLists = localStorage.getItem("newArr");
    // 2、将所有歌曲转换为数组
    var songs = JSON.parse(songLists)

    var list_music = document.getElementsByClassName("list_music")
    for (let index = 0; index < list_music.length; index++) {
        list_music[index].setAttribute("id", songs[index].id)
        console.log(list_music[index])
    }
    // 找到被选中的歌曲
    var list_Music = $(".list_music")
    // 找到input
    var del = $(".list_music input")
    for (let index = 0; index < list_Music.length; index++) {
        if (del[index].checked) {
            window.location.href = "play.html?id=" + (list_music[index].getAttribute("id"))
        }
    }
}