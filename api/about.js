let api = import('./apiUrl.js')
$(window).on("click", function() {
	$(".pop-up").hide();
});
$(function() {
	$.ajax({
		url: api + "/getAboutMe",
		type: "get",
		dataType: "json",
		success: function(data) {
			if (data.code == 0) {
				//拼接字符串
				var str = '';
				//对数据做遍历，拼接到页面显示
				var all = data.data.list;
				for (var i = 0; i < all.length; i++) {
					str +=
						`
							<div class="with">
							    <h3><span>${all[i].name}</span></h3><br>
							    <p>${all[i].content}</p>
							</div>
						    `
				}
				//放入页面的容器显示
				$('.container-inner').html(str);
			}
		},
		error: function() {
			$('.pop-up').show()
			$('.describe').text('出错了......')
		},
	});
})
