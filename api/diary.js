let api = import('./apiUrl.js')
$(window).on("click", function() {
	$(".pop-up").hide();
});
$(function() {
	$.ajax({
		url: api + "/getTimeAxisList",
		type: "get",
		dataType: "json",
		success: function(data) {
			if (data.code == 0) {
				//拼接字符串
				var str = '';
				//对数据做遍历，拼接到页面显示 data.data.list
				var all = data.data.list;
				var years = '';
				for (var i = 0; i < all.length; i++) {
					years = all[i].create_time.split('-')[0]
					str +=
						`
						 <div class="timeline-year">
							<div class="timeline-month">
								<ul>
									<li>
										<div class="h4 animated fadeInLeft">
											<p class="date">${all[i].create_time.split('-')[1]}月${all[i].create_time.split('-')[2].substr(0,2)}日</p>
										</div>
										<p class="dot-circle animated "><i class="fa fa-dot-circle-o"></i></p>
										<div class="content animated fadeInRight">${all[i].content}</div>
										<div class="clear"></div>
									</li>
								</ul>
							</div>
						</div>
						`
				}
				$('.zhanwei').before(`<h2 class='years'><a class="yearToggle">${years}年</a><i class="fa fa-caret-down fa-fw"></i></h2>`)
				$('.zhanwei').append(str);
				//放入页面的容器显示
				if (years == Number(years) + 1) {
						fuzhi()
				}
				function fuzhi() {
					$('.zhanwei').after(
						`<h2 class='yearsOne'><a class="yearToggle">${years}年</a><i class="fa fa-caret-down fa-fw"></i></h2>`)
					//拼接字符串
					var str1 = '';
					//对数据做遍历，拼接到页面显示 data.data.list
					var ajj = data.data.list;
					for (var j = 0; j < ajj.length; j++) {
						str1 +=
							`
								<div class="timeline-year">
									<div class="timeline-month">
										<ul>
											<li>
											<div class="h4 animated fadeInLeft">
												<p class="date">${ajj[j].create_time.split('-')[1]}8888月${ajj[j].create_time.split('-')[2].substr(0,2)}日</p>
											</div>
												<p class="dot-circle animated "><i class="fa fa-dot-circle-o"></i></p>
												<div class="content animated fadeInRight">${ajj[j].content}</div>
											<div class="clear"></div>
										</li>
									</ul>
								</div>
							</div>
						`
					}
					$('.yearsOne').after(str1);
				}

			}
		},
		error: function() {
			$('.pop-up').show()
			$('.describe').text('出错了......')
		},
	});
})
