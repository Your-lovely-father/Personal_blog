let api = import('./apiUrl.js')
$(window).on("click", function() {
	$(".pop-up").hide();
});
$(function() {
	//获取url中的参数
	function getUrlParam(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
		var r = window.location.search.substr(1).match(reg); //匹配目标参数
		if (r != null) return decodeURI(r[2]);
		return null; //返回参数值
	}
	//接收URL中的参数id
	id = getUrlParam('id');
	data = {
		id: id
	};
	$.ajax({
		url: api + "/getArticleDetail",
		type: "post",
		dataType: "json",
		data: data,
		success: function(data) {
			if (data.code == 0) {
				//拼接字符串
				var str = '';
				//对数据做遍历，拼接到页面显示
				var all = data.data.details_list;
				var allObjiect = data.data;
				for (var i = 0; i < all.length; i++) {
						str +=
							`
							<article class="article-list">
							    <section class="article-item">
								<aside class="title" style="line-height:1.5;">
									<h4>
										<a href="article.html">${allObjiect.title}</a>
									</h4>
								</aside>
								<div class="time mt10" style="padding-bottom:0;">
									<span class="day">${allObjiect.create_time.split('-')[2].substr(0,2)}</span>
									<span class="month fs-18">${allObjiect.create_time.split('-')[1]}<small class="fs-14">月</small></span>
									<span class="year fs-18">${allObjiect.create_time.split('-')[0]}</span>
								</div>
								<div class="content artiledetail" style="border-bottom: 1px solid #e1e2e0; padding-bottom: 20px;">
								   <div>
									  ${all[i].content}
								   </div>
									<div class="copyright mt20">
										<p class="f-toe fc-black">
											非特殊说明，本文版权归 王晓冷 所有，转载请注明出处.
										</p>
										<p class="f-toe">
											作者：
											<a href="javascript:void(0)" class="r-title">${all[i].author}</a>
										</p>
										<p class="f-toe">
											本文标题：
											<a href="javascript:void(0)" class="r-title">${allObjiect.title}</a>
										</p>
										<p class="f-toe">
											本文网址：
											<a href=${all[i].link} target="_blank">${all[i].link}</a>
										</p>
									</div>
								</div>                   
								<div class="bdsharebuttonbox share" data-tag="share_1">
									<ul>
										<li class="f-zan">
											<i class="layui-icon layui-icon-praise Size"></i>
										</li>
										<li class="f-cai">
											<i class="layui-icon layui-icon-tread Size"></i>
										</li>
									</ul>
								</div>
							</section>
						</article>
						`
				}
				//放入页面的容器显示
				$('.box_list').html(str);
			}
		},
		error: function() {
			$('.pop-up').show()
			$('.describe').text('出错了......')
		},
	});
})
