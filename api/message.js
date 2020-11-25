$(window).on("click", function() {
	$(".pop-up").hide();
});

layui.use(['element', 'jquery', 'form', 'layedit', 'flow'], function() {
	var element = layui.element;
	var form = layui.form;
	var $ = layui.jquery;
	var layedit = layui.layedit;
	var flow = layui.flow;
	//评论和留言的编辑器
	var editIndex = layedit.build('remarkEditor', {
		height: 150,
		tool: ['face', '|', 'link'],
	});
	$('#add').click(function() {
		var name = $('input[name=name]').val();
		var qq = $('input[name=qq]').val();
		if (name == '') {
			$('.pop-up').show()
			$('.describe').text('呢称不能为空')
			return false;
		}
		if (qq == '') {
			$('.pop-up').show()
			$('.describe').text('QQ不能为空')
			return false;
		}
		if (layedit.getContent(editIndex) == '') {
			$('.pop-up').show()
			$('.describe').text('留言内容不能为空')
			return false;
		}
		var cname = returnCitySN["cname"]; // 获取当前所在城市
		var btn=$('#add').text()
		if(btn.trim()=='提交留言'){
			var data = {
				name: name,
				avatar: `http://q2.qlogo.cn/headimg_dl?dst_uin=${qq}&spec=100`,
				content: layedit.getContent(editIndex),
				cname: cname
			}
			$.ajax({
				url: 'http://localhost:3000/addMessage',
				type: 'post',
				data: data,
				success: function(data) {
					if (data.code == 0) {
						list()
						$('.pop-up').show()
						$('.describe').text('添加评论成功')
					}
				},
				error: function() {
					$('.pop-up').show()
					$('.describe').text('出错了......')
				},
			});
		}else{
			var id =$("#yh").data("name")
			var updData = {
				name: name,
				avatar: `http://q2.qlogo.cn/headimg_dl?dst_uin=${qq}&spec=100`,
				content: layedit.getContent(editIndex),
				cname: cname,
				id:id,
				state:Number(0)
			}
			$.ajax({
				url:"http://localhost:3000/addReplyMessage",
				type: "POST",
				dataType: "json",
				data: updData,
				success: function(data) {
					if (data.code == 0) {
						list()
						$('.pop-up').show()
						$('.describe').text('回复评论成功')
					}
				},
				error: function() {
					$('.pop-up').show()
					$('.describe').text('出错了......')
				},
			});
		}
		
	})
});
function list(){
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
					xiangqing(allYh[i]._id)
					strYh +=
						`
						<li class="zoomIn article">
							<div class="comment-parent">
								<a name="remark-1"></a>
								<img src=${allYh[i].avatar} />
								<div class="info">
									<span class="username">${allYh[i].name}</span>
								</div>
								<div class="comment-content">
									${allYh[i].content}
								</div>
								<p class="info info-footer">
									<i class="fa fa-map-marker" aria-hidden="true"></i>
									<span>${allYh[i].cname}</span>
									<span class="comment-time">${allYh[i].create_time}</span>
									<a href="javascript:;" class="btn-reply" data-name=${allYh[i]._id} id="yh" data-targetid="1" data-targetname=${allYh[i].name}>回复</a>
								</p>
							</div>
							<hr />
						</li>
						`
				}
				//放入页面的容器显示
				$('#message-list').html(strYh);
			}
		},
		error: function() {
			$('.pop-up').show()
			$('.describe').text('出错了......')
		},
	});
}
list()


function xiangqing(id){
	//详情
	var data={
		id:id
	}
	$.ajax({
		url: "http://localhost:3000/getMessageDetail",
		type: "post",
		dataType: "json",
		data:data,
		success: function(data) {
			if (data.code == 0) {
				var allQt =data.data.reply_list
				//拼接字符串
				var strQt = '';
				for (var i = 0; i < allQt.length; i++) {
					console.log(allQt[i])
					if(allQt[i].state==1){
						$('.bozu').css({
							"font-size": "20px",
							"color": "#fcc000"
						})
					}
					strQt +=
						`
							<div class="comment-child">
								<a name="reply-1"></a>
								<img src=${allQt[i].avatar}>
								<div class="info">
									<span class="username bozu">${allQt[i].name}</span>
									<span style="padding-right:0;margin-left:-5px;">回复</span>
									<span class="username">姊姊</span>
									<span>${allQt[i].content}</span>
								</div>
								<p class="info">
									<i class="fa fa-map-marker" aria-hidden="true"></i>
									<span>${allQt[i].cname}</span>
									<span class="comment-time">${allQt[i].replyTime}</span>
									<a href="javascript:;" class="btn-reply" id='yh' data-targetid="2" data-targetname=${allQt[i].name}>回复</a>
								</p>
							</div>
						`
				}
				//放入页面的容器显示
				$('.comment-parent').after(strQt);
			}
		},
		error: function() {
			$('.pop-up').show()
			$('.describe').text('出错了......')
		},
	});
}
//回复
$(document).on('click','#yh',function() {
	$("html,body").animate({
		scrollTop: 0
	}, 500);
	$(".msg-remark").css("text-align", "left");
	$(".msg-remark h1").css({
		"font-weight": "0",
		"font-size": "1.2rem"
	});
	$(".msg-remark p").css({
		"color": "#1890ff",
	});
	$('.msg-remark h1').text('名称:'+$(this).parent().prev().prev().text()+';'+'内容:'+$(this).parent().prev().text())
	$('.msg-remark p').text('取消回复')
	$('#add').text('回复')
	$('.msg-remark p').click(function() {
		$(".msg-remark").css("text-align", "center");
		$(".msg-remark h1").css({
			"font-weight": "700",
			"font-size": "2rem"
		});
		$(".msg-remark p").css({
			"color": "#000",
		});
		$('.msg-remark h1').text('留言板')
		$('.msg-remark p').text('沟通交流，拉近你我！')
		$('#add').text('提交留言')
	})

})