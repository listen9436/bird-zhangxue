/**
 * Created by Administrator on 2016/9/29.
 */
$(function () {

    //自适应窗口大小
    var logo = null;
    $(window).resize(function () {
        var h = $(window).height() - 50;
        var w = $(window).width();
        $(".welcome,.ev,.main_warp,.gaishu-one").css({height: $(window).height()});
        $(".ev,.main_warp,.gaishu-one").css({height: h});
        $(".gaishu-one").css({width: w});
        if (slideindex) {
            clearInterval(logo);
            logo = setTimeout(function () {
                slideGoing = false;
                slideGo();
                goRight();
            }, 100);
        }
    });
    //欢迎动画
    setTimeout(function () {
        $(".welcome-content").animate({top: 43 + "%"}, 400, function () {
            $(this).find(".welcome_animate").each(function (i) {
                var that = $(this);
                setTimeout(function () {
                    that.show().addClass("animated fadeInUp")
                }, 200 * (i + 1));
            });
        });
        setTimeout(function () {
            $(".welcome").slideUp(600, function () {
                doublekill = true;
            });
        }, 2500);
    }, 4000);
    //双击欢迎页面后，自动收起
    var doublekill = false;
    $(".welcome").click(function () {
        if (doublekill) {
            $(".welcome").slideUp(600);
        } else {
            doublekill = true;
        }
    });

    //全屏滚动
    //设置各个整屏块儿的宽高
    var h = $(window).height() - 50;
    $(".main_warp,.ev").css({height: h});
    var slideindex = 0;//绑定页数

    var scrollFunc = function (event) {
        if (event.wheelDelta) {  //IE 谷歌
            if (event.wheelDelta > 0) {
                /*鼠标向上滚动*/
                slideUp();
            } else if (event.wheelDelta < 0) {
                if (doublekill) {
                    slideDown();
                }
            }
        } else if (event.detail) {
            if (event.detail > 0) {
                /*鼠标向下 (相反)*/
                if (doublekill) {
                    slideDown();
                }
            } else if (event.detail < 0) {
                slideUp();
            }
        }
    }
    //给页面绑定滑轮滚动事件
    if (document.addEventListener) {
        document.addEventListener("DOMMouseScroll", scrollFunc, false);
        /*火狐浏览器鼠标滚动事件监听*/
    }
    //滚动滑轮触发scrollFunc方法  (ie 谷歌鼠标滚动事件监听)*/
    window.onmousewheel = document.onmousewheel = scrollFunc;

    var slideGoing = false; //阀门（当上一个滚动完再执行下一个）
    var slideDelay = 0;//滑2次
    var slideTimer = null;
    //向下滚动
    function slideDown() {
        if (slideDelay < 1) {//这个判断用于检测第一次鼠标滚动，让第二次鼠标滚动的时候，再执行页面动效
            clearInterval(slideTimer);
            slideTimer = setTimeout(function () {
                slideDelay++;
            }, 100);//两次大于0.1秒间隔的滚动

        } else if (!slideGoing) {
            slideGoing = true;
            slideindex++;
            var b = $(".ev").size() - 1;
            if (slideindex > b) {
                slideindex = b; //到底就不能滑了
            }
            slideGo();
        }
    }

    //向上滚动
    function slideUp() {
        if (slideDelay < 1) {
            clearInterval(slideTimer);
            slideTimer = setTimeout(function () {
                slideDelay++;
            }, 100);
        } else if (!slideGoing) {
            slideGoing = true;
            slideindex--;
            if (slideindex < 0) {
                slideindex = 0;  //到头了
            }
            slideGo();
        }
    }

    //滚动方法
    function slideGo() {
        $(".warp_box").animate({top: "-" + slideindex * h}, 600, function () {
            slideGoing = false;  //关门
            slideDelay = 0;     //滚轮次数清零
        });

        if (slideindex == 0) {

        } else if (slideindex == 4) {
            $(".nav").find(".nav-one").removeClass("now").eq(slideindex - 1).addClass("now");
            $(".nav").find(".nav-one").eq(slideindex).addClass("now");
        } else {
            $(".nav").find(".nav-one").removeClass("now").eq(slideindex - 1).addClass("now");
        }
    }

    //导航栏小点
    $(".nav").find(".nav-one").click(function () {
        slideindex = $(this).index() + 1;

        if (slideindex == 5) {
            slideindex = 4;
        }
        if (slideindex != 6) {
            slideGo();
        }
    });

    //动画页的滚动(下按钮)
    $(".warp_welcome2").find(".tonext").click(function () {
        slideindex = 1;
        slideGo();
    });

    //概述 左右全屏滚动
    var w = $(window).width();
    $(".gaishu-one").css({width: w});
    $(".gaishu-one").css({height: h});
    var rigindex = 0;
    $(".warp_gaishu").find(".gaishu-left").click(function () {
        rigindex--;
        if (rigindex < 0) {
            rigindex = 0;
            $(".gaishu-left").animate({opacity: 0.3});
        } else {
            goRight();
        }
    });
    $(".warp_gaishu").find(".gaishu-right").click(function () {
        rigindex++;
        var x = $(".gaishu-one").size() - 1;
        if (rigindex > x) {
            rigindex = x;
            $(".gaishu-right").animate({opacity: 0.3});
        } else {
            goRight();
        }
    });
    function goRight() {
        $(".warp_gaishu").find("span").animate({opacity: 0.3}, 200);
        $(".gaishu_bigbox").animate({left: "-" + rigindex * w}, 600, function () {
            $(".warp_gaishu").find("span").animate({opacity: 1}, 200);
        });
    };
    //右按钮的抖动
    //setInterval(doudong, 1000);
    //function doudong() {
    //    $(this).css({})
    //}

    //对企业价值  角上的呼吸灯
    setInterval(function () {
//                $(".warp_jiazhi").find(".liang").animate({opacity:0},600,function () {
//                    $(".warp_jiazhi").find(".liang").animate({opacity:1},400);
//                })
        $(".warp_jiazhi").find(".liang").fadeIn(1200, function () {
            $(".warp_jiazhi").find(".liang").delay(100).fadeOut(400);
        })
    }, 1900);

    //小鸟掌云  滚动按钮
    $(".yunmove_right").click(function () {
        $(".yunmove_left").find("span").stop().animate({left: 78}, 400, function () {
            $(".yunmove_right").find("span").stop().animate({left: 0}, 400);
        });
        $(".zhangyun_bigbox").animate({left: -910}, 600);
    });
    $(".yunmove_left").click(function () {
        $(".yunmove_right").find("span").stop().animate({left: -78}, 400, function () {
            $(".yunmove_left").find("span").stop().animate({left: 0}, 400);
        });
        $(".zhangyun_bigbox").animate({left: 0}, 600);
    });

    //直接跳转到相应部分
    var indexHs = window.location.hash.substring(1);
    //hash值全部获取到，用substring把“#”去掉，只保留“#”后面的

    if (indexHs == 1 || indexHs == 2 || indexHs == 3 || indexHs == 4) {
        $(".welcome").slideUp(0,"easeOutStrong", function () {
            doublekill = true;
        });
        slideindex = indexHs;
        slideGo();
        window.location.hash = "";
    }
});
