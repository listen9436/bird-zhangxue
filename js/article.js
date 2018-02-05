/**
 * Created by Administrator on 2016/9/29.
 */
$(function () {

    $("#header").load("header.html");
    $("#footer").load("footer.html");

    //列表 pen
    $(".content_warp").find(".pen").click(function () {
        $(".title_list").animate({width: 100, backgroundPositionX: -100}, 0, function () {
            $(".title_list").animate({width: 780, backgroundPositionX: 0}, 1300, "easeOutStrong");
        });
    });

    /*点击喜欢文字按钮*/
    likeTipsArr = ["娘娘威武", "皇上万岁，万万岁", "爱死你啦、MUA~", "再点一下试试~"]; //把需要随机显示的提示写到这里
    ifLikebtnClicked = false; //赋值是否点击过，用于后面点击方法的判断，已经点击过的不能再点击
    $(".like_btn").click(function () {
        if (!ifLikebtnClicked) {
            ifLikebtnClicked = true;
            $(".like_tips").text(likeTipsArr[Math.floor(Math.random() * likeTipsArr.length)]);
            doMove();

        } else if (ifLikebtnClicked && $(".like_tips").text() == "再点一下试试~") { //此处用于提示再点一次只有的搞笑互动
            $(".like_tips").text("喊你点就点嗦~傻");
            doMove();
        }

        //提示框运动方法，如果要写相关其他dom操作，可以在方法中相应位置添加
        function doMove() {
            $(".like_tips").animate({"top": "0", opacity: "1"}, 600, "elasticOut", function () {
                $(".like_tips").delay(600).animate({"left": "-500px", opacity: "0"}, 600, "backIn", function () {
                    $(".like_tips").animate({"top": "379", "left": "258px", opacity: "0"}, 0);
                    $(".like_btn").addClass("like_btn_clicked");
                });
            });
        }
    });

    var shuju=articleData[getUrlParams("type")];
    if(getUrlParams("type")){
        $("#typeTitle").text(shuju.data.typeTitle);
        $("#typeEntitle").text(shuju.data.typeEntitle);
        $("#title").text(shuju.data.title);
        $("#updateTime").text(shuju.data.updateAt);
        $("#author").text(shuju.data.updateByFullName);
        $("#cover").attr("src",shuju.data.coverImg);
        $("#content").html(shuju.data.content);
    }
    //获取页面url传过来的参数
    function getUrlParams(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null)
            return r[2];
        else
            return "";
    }
});