$(function () {

    // 效果
    $('.song_tj').mousemove(function () {
        $(".song_tj .carousel-control").show(500)
    });
    $(".song_tj").mouseleave(function () {
        $(".song_tj .carousel-control").hide(500)
    });
    $('.jctj').mousemove(function () {
        $(".jctj .carousel-control").show(500)
    });
    $(".jctj").mouseleave(function () {
        $(".jctj .carousel-control").hide(500)
    });

    // animate动画
    new WOW().init();

})