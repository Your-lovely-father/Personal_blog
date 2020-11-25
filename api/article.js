let api = import('./apiUrl.js')
$(window).on("click", function() {
	$(".pop-up").hide();
});
$(function() {
	$.ajax({
		url: api + "/getArticleList",
		type: "get",
		dataType: "json",
		success: function(data) {
			if (data.code == 0) {
				//拼接字符串
				var str = '';
				var top='';
				//对数据做遍历，拼接到页面显示
				var all = data.data.list;
				for (var i = 0; i < all.length; i++) {
					str +=
						`
							<article class="article-list bloglist" id="LAY_bloglist">
								<section class="article-item zoomIn article">
									<div class="fc-flag">${all[i].top == 1 ? '置顶' : '文章'}</div>
									<h5 class="title">
										<span class="fc-blue">${all[i].origin == 1 ? '原创' : '转载'}</span>
										<a href=${'read.html?id='+all[i]._id}>${all[i].title}</a>
									</h5>
									<div class="time">
										<span class="day">${all[i].create_time.split('-')[2].substr(0,2)}</span>
										<span class="month fs-18">${all[i].create_time.split('-')[1]}<span class="fs-14">月</span></span>
										<span class="year fs-18 ml10">${all[i].create_time.split('-')[0]}</span>
									</div>
									<div class="content">
										<a href=${'read.html?id='+all[i]._id} class="cover img-light">
											<img src=${all[i].img_url}>
										</a>
										${all[i].desc}
									</div>
									<div class="read-more">
										<a href=${'read.html?id='+all[i]._id} class="fc-black f-fwb">继续阅读</a>
									</div>
									<aside class="f-oh footer">
										<div class="f-fl tags">
											<span class="fa fa-tags fs-16"></span>
											<a class="tag">${all[i].tags}</a>
										</div>
										<div class="f-fr">
											<span class="read">
												<i class="fa fa-eye fs-16"></i>
												<i class="num">57</i>
											</span>
											<span class="ml20">
												<i class="layui-icon layui-icon-praise"></i>
												<a href="javascript:void(0)" class="num fc-grey">1</a>
											</span>
											<span class="read">
												<i class="layui-icon layui-icon-tread"></i>
												<i class="num">57</i>
											</span>
										</div>
									</aside>
								</section>
							</article>
					`
					if(all[i].top == 1){
						top+=`
							<li><a href="javascript:;">${all[i].title}</a></li>
						`;
					}	
				}
				//放入页面的容器显示
				$('.hot-list-article').html(top);
				$('.content_box').html(str);
			}
		},
		error: function() {
			$('.pop-up').show()
			$('.describe').text('出错了......')
		},
	});
})
$(function(){
	//列表
	$.ajax({
		url: "http://localhost:3000/getMessageList",
		type: "get",
		dataType: "json",
		success: function(data) {
			if (data.code == 0) {
				//拼接字符串
				var strYh = '';
				//对数据做遍历，拼接到页面显示
				var allYh = data.data.list;
				for (var i = 0; i < allYh.length; i++) {
					strYh +=
						`
						<dd>
							<a href="javasript:;">
							<img src=${allYh[i].avatar}>
							<cite>${allYh[i].name}</cite>
							</a>
						</dd>
						`
				}
				//放入页面的容器显示
				$('.vistor').html(strYh);
			}
		},
		error: function() {
			$('.pop-up').show()
			$('.describe').text('出错了......')
		},
	});
})