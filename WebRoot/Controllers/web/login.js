if (!("xh" in window)) {
	window.xh = {};
};
toastr.options = {
		"debug" : false,
		"newestOnTop" : false,
		"positionClass" : "toast-top-center",
		"closeButton" : true,
		/* 动态效果 */
		"toastClass" : "animated fadeInRight",
		"showDuration" : "300",
		"hideDuration" : "1000",
		/* 消失时间 */
		"timeOut" : "1000",
		"extendedTimeOut" : "1000",
		"showMethod" : "fadeIn",
		"hideMethod" : "fadeOut",
		"progressBar" : true,
};
/* 登录系统 */
xh.login = function() {
	$("#login-btn").val("登录中。。。");
	$("#login-btn").toggleClass("disabled");
	$.ajax({
		url : '../web/login',
		type : 'post',
		dataType : "json",
		data : $("#loginForm").serializeArray(),
		async : false,
		success : function(data) {
			if (data.success) {
				window.location.href = "operations/userstatus.html";
			} else {
				swal({
					title : "提示",
					text : "用户名或者密码错误!",
					type : "error"
				});
				$("#login-btn").val("登录");
				$("#login-btn").toggleClass("disabled");
			}
		},
		error : function() {
			$("#login-btn").val("登录");
			$("#login-btn").toggleClass("disabled");

		}
	});
}