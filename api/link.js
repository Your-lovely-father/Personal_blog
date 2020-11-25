let api = import('./apiUrl.js')
$(window).on("click", function() {
	$(".pop-up").hide();
});
$('#add').click(function() {
	var name = $('input[name=name]').val();
	var linkUrl = $('input[name=linkUrl]').val();
	var linkLogoUrl = $('input[name=linkLogoUrl]').val();
	var description = $('textarea[name=description]').val();
	var email = $('input[name=email]').val();
	if (name == '') {
		$('.pop-up').show()
		$('.describe').text('友链名称不能为空')
		return false;
	}
	if (linkUrl == '') {
		$('.pop-up').show()
		$('.describe').text('友链网址不能为空')
		return false;
	}
	if (linkLogoUrl == '') {
		$('.pop-up').show()
		$('.describe').text('LOGO地址不能为空')
		return false;
	}
	if (description == '') {
		$('.pop-up').show()
		$('.describe').text('友链描述不能为空')
		return false;
	}
	if (email == '') {
		$('.pop-up').show()
		$('.describe').text('联系邮箱不能为空')
		return false;
	}
	var data = {
		name: name,
		desc: description,
		url: linkUrl,
		postbox: email,
		icon: linkLogoUrl,
		type: 1,
		state: 0,
	};
	$.ajax({
		url: api + "/addLink",
		type: "POST",
		dataType: "json",
		data: data,
		success: function(data) {
			if (data.code == 0) {
				$('.pop-up').show()
				$('.describe').text('添加成功')
			}
		},
		error: function() {
			$('.pop-up').show()
			$('.describe').text('出错了......')
		},
	});
})
$(function() {
	$.ajax({
		url: api + "/getLinkList",
		type: "get",
		dataType: "json",
		success: function(data) {
			if (data.code == 0) {
				//拼接字符串
				var str = '';
				//对数据做遍历，拼接到页面显示
				var all = data.data.list;
				for (var i = 0; i < all.length; i++) {
					if (all[i].state == 1) {
						str +=
							`
							<li>
						     <div class="pd-lr-10">
						     	<a href=${all[i].url} target="_blank">
						     		<img src=${all[i].icon}>
						     		<h3>${all[i].name}</h3>
						     		<p class="solid"></p>
						     		<p>${all[i].desc}</p>
						     	</a>
						     </div>
							 </li>
						    `
					}
				}
				//放入页面的容器显示
				$('.link-list').html(str);
			}
		},
		error: function() {
			$('.pop-up').show()
			$('.describe').text('出错了......')
		},
	});
})
