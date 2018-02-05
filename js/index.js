/**
 * Created by Administrator on 2016/9/23.
 */
$(function () {

    //加载头部、尾部页面
    $("#header").load("header.html");
    $("#footer").load("footer.html");

    //banner 小点
    $(".banner-box .middle").find("em").click(function () {
        $(this).addClass("now").siblings().removeClass("now");
        $(".banner-box").find(".change").eq($(this).index()).css("display", "block").siblings(".change").css("display", "none");
        indeximg = $(this).index();
    });

    //banner 左右按钮
    var indeximg = 0;
    $(".banner-box .button-box").find(".prev").click(function () {
        indeximg--;
        if (indeximg == -1) {
            indeximg = 2;
        }
        $(".button-box").find("em").eq(indeximg).addClass("now").siblings().removeClass("now");
        $(".banner-box").find(".change").eq(indeximg).css("display", "block").siblings(".change").css("display", "none");
    });
    $(".banner-box .button-box").find(".next").click(function () {
        indeximg++;
        if (indeximg == 3) {
            indeximg = 0;
        }
        $(".button-box").find("em").eq(indeximg).addClass("now").siblings().removeClass("now");
        $(".banner-box").find(".change").eq(indeximg).css("display", "block").siblings(".change").css("display", "none");
    });

    //chanpin 左侧边栏小点
    $(".chanpin_linebtn").click(function () {
        $(this).addClass("now").siblings().removeClass("now");
        $(".contents-one").eq($(this).index()).css("display", "block").siblings(".contents-one").css("display", "none");
        nowimg = $(this).index();
    });

    var nowimg = 0;
    //chanpin 左右按钮
    $(".chanpin-content").find(".prev").click(function () {
        nowimg--;
        if (nowimg == -1) {
            nowimg = 4;
        }
        $(".chanpin-content").find(".chanpin_linebtn").eq(nowimg).addClass("now").siblings(".chanpin_linebtn").removeClass("now");
        $(".contents-one").eq(nowimg).css("display", "block").siblings(".contents-one").css("display", "none");
    });
    $(".chanpin-content").find(".next").click(function () {
        nowimg++;
        if (nowimg == 5) {
            nowimg = 0;
        }
        $(".chanpin-content").find(".chanpin_linebtn").eq(nowimg).addClass("now").siblings(".chanpin_linebtn").removeClass("now");
        $(".contents-one").eq(nowimg).css("display", "block").siblings(".contents-one").css("display", "none");
    });

    //yewu 按钮抖动效果
    $(".one-top").find("img2").hover(function () {
        $(this).addClass("animated tada");
    }, function () {
        $(".one-top").find("img2").removeClass("animated tada");
    });

    $(".one-top").find(".yewuone-icon").hover(function () {
        $(this).addClass("animated tada");
    }, function () {
        $(".one-top").find(".yewuone-icon").removeClass("animated tada");
    });

    //yewu 中间图片点击
    $(".one-top").find("img").click(function () {
        $(this).parent().parent().siblings().find(".one-bottom").slideUp("fast");
        $(this).parent().siblings(".one-bottom").slideToggle("slow");
        $(this).siblings(".yewuone-icon").toggleClass("active");
        $(this).parent().parent().siblings().find(".yewuone-icon").removeClass("active");
    });

    //yewu  X ＋ 点击
    $(".yewuone-icon").click(function () {
        $(this).toggleClass("active");
        $(this).parent().parent().siblings().find(".yewuone-icon").removeClass("active");
        $(this).parent().parent().siblings().find(".one-bottom").slideUp("fast");
        $(this).parent().siblings(".one-bottom").slideToggle("slow");
    });

    //team 左右按钮
    var timer = null;
    var nexttimer = null;
    var prevtimer = null;
//            我们加一个定期器，setTimeout ,200一个缓冲的时候：
//            cleartimeOut , 防止竞争对手和无聊人等的恶意点击.
    $(".team-content").find(".next").click(function () {
        clearTimeout(nexttimer);
        nexttimer = setTimeout(nextTo,200);
    });
    $(".team-content").find(".prev").click(function () {
        clearTimeout(prevtimer);
        prevtimer = setTimeout(prevTo,200);
    });

    timer = setInterval(nextTo,3000);
    var xiaodian = 0;
    var number = $(".team_move").find(".move-one").size();
    function nextTo(){
        $(".team_move").animate({left:-1100},600,"backIn", function () {
            $(".team_move .move-one:first-child").appendTo($(".team_move"));
            $(".team_move").animate({left:0},0);
        });
        xiaodian++;
        if(xiaodian ==number){
            xiaodian = 0;
        }
        $(".team-content .middle").find("em").eq(xiaodian).addClass("now").siblings().removeClass("now");
    }
    function prevTo(){
        $(".team_move .move-one:last-child").insertBefore(".team_move .move-one:first-child");
        $(".team_move").animate({left:-1100},0, function () {
            $(".team_move").animate({left:0},600,"backOut");
        });
        xiaodian--;
        if(xiaodian == -1){
            xiaodian = number-1;
        }
        $(".team-content .middle").find("em").eq(xiaodian).addClass("now").siblings().removeClass("now");
    }
    //在盒子内关闭定时器
    $(".moveone-left").hover(function () {
        clearInterval(timer);
    }, function () {
        timer = setInterval(nextTo,3000);
    });
    //在按钮上也清除定时器
    $(".team-content").find(".button-box").hover(function () {
        clearInterval(timer);
    }, function () {
        timer = setInterval(nextTo,3000);
    });

    //联系   边框线
    $(".contact-input").find(".input-box,.input-textarea").click(function () {
        $(this).addClass("border1");
        //焦点事件
        $(this).focusout(function () {
            $(this).removeClass("border1");
        });
    });

    //返回顶部
    $(window).scroll(function () {
        if($(window).scrollTop() >= 500){
            $(".backTop").fadeIn("slow");
        }else {
            $(".backTop").fadeOut(0);
        }
    });
    $(".backTop").find(".scroll_top").click(function () {
        $("html,body").animate({scrollTop:0},300,"easeBothStrong");
        $(".backTop").animate({bottom:20000},1500,"easeBothStrong", function () {
            $(".backTop").css({bottom:160});
        });
    });
})
