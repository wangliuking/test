/**
 * 基站配置
 */
if (!("xh" in window)) {
	window.xh = {};
};
var frist = 0;
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
xh.load = function() {
	var app = angular.module("app", []);
	var bsId = $("#bsId").val();
	var name = $("#name").val();
	var pageSize = $("#page-limit").val();

	app.controller("bs", function($scope, $http) {
		xh.maskShow();
		$scope.count = "20";//每页数据显示默认值
		$scope.operationMenu=true; //菜单变色
		$http.get("../../bs/list?bsId="+bsId+"&name="+name+"&start=0&limit="+pageSize).
		success(function(response){
			xh.maskHide();
			$scope.data = response.items;
			$scope.totals = response.totals;
			xh.pagging(1, parseInt($scope.totals), $scope);
		});
		/* 刷新数据 */
		$scope.refresh = function() {
			$("#bsId").val("");
			$("#name").val("");
			$scope.search(1);
		};
		/* 显示修改基站model */
		$scope.editModel = function(id) {
			$scope.editData = $scope.data[id];
			$scope.type = $scope.editData.type.toString();
			$scope.level = $scope.editData.level.toString();
		};
		/* 显示修改基站model */
		$scope.showEditModel = function() {
			var checkVal = [];
			$("[name='tb-check']:checkbox").each(function() {
				if ($(this).is(':checked')) {
					checkVal.push($(this).attr("index"));
				}
			});
			if (checkVal.length != 1) {
				swal({
					title : "提示",
					text : "只能选择一条数据",
					type : "error"
				});
				return;
			}
			/* $scope.edit(parseInt(checkVal[0])); */
			$("#edit").modal('show');
			$scope.editData = $scope.data[parseInt(checkVal[0])];
			$scope.type = $scope.editData.type.toString();
			$scope.level = $scope.editData.level.toString();
		};
		/* 删除基站 */
		$scope.delBs = function(id) {
			swal({
				title : "提示",
				text : "确定要删除该站点吗？",
				type : "info",
				showCancelButton : true,
				confirmButtonColor : "#DD6B55",
				confirmButtonText : "确定",
				cancelButtonText : "取消"
			/*
			 * closeOnConfirm : false, closeOnCancel : false
			 */
			}, function(isConfirm) {
				if (isConfirm) {
					$.ajax({
						url : '../../bs/del',
						type : 'post',
						dataType : "json",
						data : {
							bsId : id
						},
						async : false,
						success : function(data) {
							if (data.success) {
								toastr.success("删除站点成功", '提示');
								$scope.refresh();
							} else {
								swal({
									title : "提示",
									text : "删除站点失败",
									type : "error"
								});
							}
						},
						error : function() {
							$scope.refresh();
						}
					});
				}
			});
		};
		/* 查询数据 */
		$scope.search = function(page) {
			var pageSize = $("#page-limit").val();
			var bsId = $("#bsId").val();
			var name = $("#name").val();
			var start = 1, limit = pageSize;
			frist = 0;
			page = parseInt(page);
			if (page <= 1) {
				start = 0;

			} else {
				start = (page - 1) * pageSize;
			}
			console.log("limit=" + limit);
			xh.maskShow();
			$http.get("../../bs/list?bsId="+bsId+"&name="+name+"&start="+start+"&limit="+limit).
			success(function(response){
				xh.maskHide();
				$scope.data = response.items;
				$scope.totals = response.totals;
				xh.pagging(page, parseInt($scope.totals), $scope);
			});
		};
		//分页点击
		$scope.pageClick = function(page, totals, totalPages) {
			var pageSize = $("#page-limit").val();
			var bsId = $("#bsId").val();
			var name = $("#name").val();
			var start = 1, limit = pageSize;
			page = parseInt(page);
			if (page <= 1) {
				start = 0;
			} else {
				start = (page - 1) * pageSize;
			}
			xh.maskShow();
			$http.get("../../bs/list?bsId="+bsId+"&name="+name+"&start="+start+"&limit="+pageSize).
			success(function(response){
				xh.maskHide();
				$scope.start = (page - 1) * pageSize + 1;
				$scope.lastIndex = page * pageSize;
				if (page == totalPages) {
					if (totals > 0) {
						$scope.lastIndex = totals;
					} else {
						$scope.start = 0;
						$scope.lastIndex = 0;
					}
				}
				$scope.data = response.items;
				$scope.totals = response.totals;
			});
			
		};
	});
};
/* 添加基站信息 */
xh.add = function() {
	var appElement = document.querySelector('[ng-controller=bs]');
	var $scope = angular.element(appElement).scope();
	$.ajax({
		url : '../../bs/add',
		type : 'POST',
		dataType : "json",
		async : true,
		data:{
			formData:xh.serializeJson($("#addForm").serializeArray()) //将表单序列化为JSON对象
		},
		success : function(data) {

			if (data.result == 0) {
				$('#add').modal('hide');

				for (var i = 1; i < 10; i++) {
					console.log(1);
				}
				xh.refresh();
				toastr.success("添加基站成功", '提示');

			} else {
				swal({
					title : "提示",
					text : "失败",
					type : "error"
				});
			}
		},
		error : function() {
		}
	});
};
/* 修改基站信息 */
xh.update = function() {
	$.ajax({
		url : '../../bs/update',
		type : 'POST',
		dataType : "json",
		async : false,
		data:{
			formData:xh.serializeJson($("#updateForm").serializeArray()) //将表单序列化为JSON对象
		},
		success : function(data) {
			if (data.result === 1) {
				$('#edit').modal('hide');
				toastr.success("更新基站成功", '提示');
				xh.refresh();

			} else {
				swal({
					title : "提示",
					text : "更新基站失败",
					type : "error"
				});
			}
		},
		error : function() {
		}
	});
};
/* 批量删除基站 */
xh.delMore = function() {
	var checkVal = [];
	$("[name='tb-check']:checkbox").each(function() {
		if ($(this).is(':checked')) {
			checkVal.push($(this).attr("value"));
		}
	});
	if (checkVal.length < 1) {
		swal({
			title : "提示",
			text : "请至少选择一条数据",
			type : "error"
		});
		return;
	}
	$.ajax({
		url : '../../bs/del',
		type : 'post',
		dataType : "json",
		data : {
			bsId : checkVal.join(",")
		},
		async : false,
		success : function(data) {
			if (data.success) {
				toastr.success("删除站点成功", '提示');
				xh.refresh();
			} else {
				swal({
					title : "提示",
					text : "失败",
					type : "error"
				});
			}
		},
		error : function() {
		}
	});
};

// 刷新数据
xh.refresh = function() {
	var appElement = document.querySelector('[ng-controller=bs]');
	var $scope = angular.element(appElement).scope();
	// 调用$scope中的方法
	$scope.refresh();

};
/* 数据分页 */
xh.pagging = function(currentPage, totals, $scope) {
	var pageSize = $("#page-limit").val();
	var totalPages = (parseInt(totals, 10) / pageSize) < 1 ? 1 : Math
			.ceil(parseInt(totals, 10) / pageSize);
	var start = (currentPage - 1) * pageSize + 1;
	var end = currentPage * pageSize;
	if (currentPage == totalPages) {
		if (totals > 0) {
			end = totals;
		} else {
			start = 0;
			end = 0;
		}
	}
	$scope.start = start;
	$scope.lastIndex = end;
	$scope.totals = totals;
	if (totals > 0) {
		$(".page-paging").html('<ul class="pagination"></ul>');
		$('.pagination').twbsPagination({
			totalPages : totalPages,
			visiblePages : 10,
			version : '1.1',
			startPage : currentPage,
			onPageClick : function(event, page) {
				if (frist == 1) {
					$scope.pageClick(page, totals, totalPages);
				}
				frist = 1;

			}
		});
	}

};
/*$http({
method : "POST",
url : "../../bs/list",
data : {
	bsId : bsId,
	name : name,
	start : start,
	limit : pageSize
},
headers : {
	'Content-Type' : 'application/x-www-form-urlencoded'
},
transformRequest : function(obj) {
	var str = [];
	for ( var p in obj) {
		str.push(encodeURIComponent(p) + "="
				+ encodeURIComponent(obj[p]));
	}
	return str.join("&");
}
}).success(function(response) {
xh.maskHide();
$scope.data = response.items;
$scope.totals = response.totals;
});*/
