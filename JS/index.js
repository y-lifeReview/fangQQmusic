checkIsLogin()
//checkIsLogin()

$(function () {
    song()


    // 登录时用户名的改变
    var currentUser = readCookie("currentUser")
    /*  console.log(readCookie("currentUser")) */
    $(".user").html(currentUser)


    // 下拉菜单
    $(".drop-menu").click(function (e) {
        e.preventDefault();
        $(".drops").slideDown(400)
    });
    $('.drop-menu').mouseleave(function () {
        $(".drops").slideUp(400)
    });


    // 注销
    $(".drops .cancel").click(function (e) {
        e.preventDefault();
        clearCookie("currentUser")
        /* console.log(clearCookie("currentUser")) */

        var currentPageAry = location.pathname.split("/");
        var currentPage = currentPageAry[currentPageAry.length - 1];
        if (currentPage == "index.html") {

            alert("注销成功，请立即登录")
            window.location.href = "register.html"
        } else if (currentPage == "user.html") {
            alert("注销成功，请立即登录")
            window.location.href = "register.html"
        }else if (currentPage == "point.html") {
            alert("注销成功，请立即登录")
            window.location.href = "register.html"
        }

    })

})



// 为触发该事件的节点添加id并将该id传入当前页面url的？后面

// 拿到触发事件的节点的id
function gotoPoint(event) {
    var setElem = event.target;
    var id = setElem.getAttribute("id");
    window.location.href = "point.html?id=" + id;
}
function gotoPlay(event) {
    var setElem = event.target;
    var id = setElem.getAttribute("id");
    window.location.href = "play.html?id=" + id;
}

// 拿到localStorage中满足条件的数据
findLocalStorageById = function (key, id) {
    var localStorageValueStr = localStorage.getItem(key);
    var items = JSON.parse(localStorageValueStr); //localStorage中的数据集合
    var findItem = items.find(function (item) { //find函数找到满足条件的第一个数组
        if (item.id == id) {
            return true;
        }
    })
    return findItem;

}