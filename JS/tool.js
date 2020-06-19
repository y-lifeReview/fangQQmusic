// minutes保存分钟数
//_Tdom限制在什么目录下，默认全站
window.createCookie = function (name, value, minutes, _Tdom) {
    var Tdom = _Tdom || '/';
    var date, expires;
    if (minutes) {
        date = new Date();
        date.setTime(date.getTime() + (minutes * 60 * 1000)); //保存天数
        expires = '; expires=' + date.toGMTString(); //将data对象转换为字符串
    } else {
        expires = '';
    }
    // 注意cookie设置在本地文件加载方式下不生效
    document.cookie = name + '=' + value + expires + '; path=' + Tdom;
};

// 获取当前页面cookie的value
window.readCookie = function (name) {
    var nameEQ = name + '=';
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) == 0) {
            return c.substring(nameEQ.length, c.length);
        }
    }
 
};
// 获取当前页面cookie的value
/* function getCookie(cookie_name) {
    var allcookies = document.cookie;  //拿到所有的cookies
    var cookie_pos = allcookies.indexOf(cookie_name);//索引长度，开始索引的位置
    // 如果找到了索引，就代表cookie存在,否则不存在
    if (cookie_pos != -1) {
        // 把cookie_pos放在值的开始，只要给值加1即可
        //计算取cookie值得开始索引，加的1为“=”
        cookie_pos = cookie_pos + cookie_name.length + 1; 
        //计算取cookie值得结束索引
        var cookie_end = allcookies.indexOf(";", cookie_pos);
        
        if (cookie_end == -1) {
            cookie_end = allcookies.length;

        }
        //得到想要的cookie的值
        var value = allcookies.substring(cookie_pos, cookie_end); 
    }
    return value;
} */

// 删除当前页面cookie
function clearCookie(name) {
    window.createCookie(name,"",-1,"")
    console.log(document.cookie)   
}




// 判断是否登录
function checkIsLogin() {
    var currentUser = window.readCookie("currentUser");
    var currentPageAry = location.pathname.split("/");
    var currentPage = currentPageAry[currentPageAry.length - 1];
    // 当前是登录页，如果有currentUser，那么跳转到index
    // 当前是index页，如果无currentUser,那么跳转到登录页
    if (currentPage == "register.html") {
        if (currentUser && currentUser != "") {
            window.location.href = "index.html";
        }
    } else if (!currentUser || currentUser == "") {
        window.location.href = "register.html";
    }

}



// 页面之间根据id获取相应的值


// 1、拿到页面的id
function getPageParamByName(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    // 提取出id
    if (r != null) {    
        return unescape(r[2]);
    } else {
        return null;
    }
}


// 拿到localStorage中满足条件的数据
findLocalStorageById = function (key, id) {
    var localStorageValueStr = localStorage.getItem(key);
    var items = JSON.parse(localStorageValueStr);//localStorage中的数据集合
    var findItem = items.find(function (item) {//find函数找到满足条件的第一个数组
        if (item.id == id) {
            return true;
        }
    })
    return findItem;

}


