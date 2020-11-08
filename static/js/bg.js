$(function(){
    var tips;
    $('.layui-icon-theme').on({
        mouseenter:function(){
            var that = this;
            tips =layer.tips("<span style='color:#333;'>说明:点击随机切换背景</span>",that,{tips:[4,'#fff'],time:0,area: 'auto',maxWidth:500});
        },
        mouseleave:function(){
            layer.close(tips);
        }
    });
    function fn(){
        var backgRound = window.sessionStorage.getItem('bg')
        $(".header").css("background-image", backgRound);
    }
    fn()
    var sum = 1;
    $('.layui-icon-theme').click(function () {
        var random_bg = ++sum;
        if (random_bg == 4) {
            sum = 1
        }
        window.sessionStorage.setItem('sum', sum)
        var shu = window.sessionStorage.getItem('sum')
        var bg = 'url(  ../static/img/new_feed/bg_' + shu + '.jpg)';
        window.sessionStorage.setItem('bg', bg)
        var backgRound = window.sessionStorage.getItem('bg')
        $(".header").css("background-image", backgRound);
    })
})
