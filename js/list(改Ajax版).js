/**
 * Created by Administrator on 2016/11/10.
 */
/**
 * Created by Administrator on 2016/9/29.
 */
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
    $("#listMore").click(function () {
        if (k<3){
            laogao();
        }
    });
    laogao();
    var k = 0;
    //加载更多的方法
    function laogao() {
        var xhr = new XMLHttpRequest();
        xhr.open("get", "js/listData.json");
        xhr.send(null);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    if (k == 0) {
                        $("#articleList").html("");
                    }
                    var result = xhr.responseText;
                    var result1 = JSON.parse(result);
                    var result2 = result1[k].data.list;
                    for (var i = 0; i < result2.length; i++) {
                        var item = $("#itemHtml").html()
                            .replace("$articleId$", result2[i].sysId)
                            .replace("$articleCover$", result2[i].coverImg)
                            .replace("$articleTitle$", result2[i].title)
                            .replace("$updateTime$", result2[i].creatAt)
                            .replace("$describe$", result2[i].describe);
                        $("#articleList").append(item);
                    }
                    //没有更多数据
                    var num = Math.ceil(result1[k].data.count/result1[k].data.pageSize);
                    // console.log(num);
                    if(k >= num-1){
                        $("#listMore").css({opacity:0.3});
                        $('.nomore_img').attr('src', 'images/list_gomore_bg_nomore.jpg');
                    }
                    k++;
                }
            }
        }
    }
    //点击每个加载相应的数据
    //使用 delegate() 方法的事件处理程序适用于当前或未来的元素（比如新创建或新添加进来的元素）。
    $("#articleList").delegate(".content_one", "click", function () {
        window.open("article.html?type=xiaoniaoNews" + $(this).attr("articleid"));
    });

});