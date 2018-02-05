/**
 * Created by Administrator on 2016/9/29.
 */
var GLOBAL = GLOBAL || {};
$(function () {

    //加载头部尾部
    $("#header").load("header.html");
    $("#footer").load("footer.html");

    //列表 pen
    $(".content_warp").find(".pen").click(function () {
        $(".title_list").animate({width: 100, backgroundPositionX: -100}, 0, function () {
            $(".title_list").animate({width: 1100, backgroundPositionX: 0}, 1300, "easeOutStrong");
        });
    });

    //返回顶部
    $(window).scroll(function () {
        if ($(window).scrollTop() >= 500) {
            $(".backTop").fadeIn("slow");
        } else {
            $(".backTop").fadeOut(0);
        }
    })
    $(".backTop").find(".scroll_top").click(function () {
        $("html,body").animate({scrollTop: 0}, 300, "easeBothStrong");
        $(".backTop").animate({bottom: 20000}, 1500, "easeBothStrong", function () {
            $(".backTop").css({bottom: 160});
        });
    });

    //点击加载更多
    $("#articleList").delegate(".content_one", "click", function () {
        window.open("article.html?" + "type=" + getUrlParams("type") + "&articleId=" + $(this).attr("articleId"), "_blank");
    });

    loadArticleList();

    $("#listMore").click(function () {

        if (GLOBAL.pageStart < GLOBAL.pageCount) {
            loadArticleList();
        }

    });
})

//加载列表数据方法
function loadArticleList() {
    //先ajax请求数据，然后就行下面的操作，此处数据先写好在了listData.js里，可以直接使用，格式和服务器返回的json一致。
    if (!GLOBAL.pageStart) {
        $("#articleList").html("");
        GLOBAL.pageStart = 0;
    }
    var itemHtml = '';
    var result = listData["listData0" + GLOBAL.pageStart]; //此数据在listData.js里
    var list = result.data.list;
    if (!list || !list.length) {
        $("#articleList").html("暂时没有内容，敬请期待！");
    } else {
        var updateTime;
        for (var i = 0; i < list.length; i++) {
            updateTime = list[i].updateAt || list[i].creatAt;
            itemHtml = $("#itemHtml").html().replace("$articleCover$", list[i].coverImg)
                .replace("$articleId$", list[i].sysId)
                .replace("$articleTitle$", list[i].title)
                .replace("$updateTime$", updateTime ? updateTime.substr(0, 10) : "")
                .replace("$describe$", list[i].describe);
            $("#articleList").append(itemHtml);
        }
    }

    //用于加载下一页时使用
    GLOBAL.pageStart = result.data.pageStart + 1;
    GLOBAL.pageCount = Math.ceil(result.data.count / result.data.pageSize);
    if (GLOBAL.pageStart >= GLOBAL.pageCount) {
        $("#listMore").css("opacity", "0.3")
        $('.nomore_img').attr('src', 'images/list_gomore_bg_nomore.jpg');
    }
}

