/**
 * 机房环境监控
 */
if (!("xh" in window)) {
	window.xh = {};
};
require.config({
	paths : {
		echarts : '../../lib/echarts'
	}
});
var appElement = document.querySelector('[ng-controller=emh]');
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
/*初始化数据*/
xh.initialize = function() {
	var app = angular.module("app", []);
	app.controller("emh", function($scope, $http) {
		xh.maskShow();
		$scope.count = "15";//每页数据显示默认值
		$scope.monitorMenu=true; //菜单变色
		/*获取基站信息*/
		$http.get("../../bs/allBsInfo").
		success(function(response){
			xh.maskHide();
			$scope.bsData = response.items;
		});
		/*获取基站环监信息*/
		var bsId=$("#bsId").val();
		$http.get("../../emh/oneBsEmh?bsId=1").
		success(function(response){
			xh.maskHide();
			$scope.emhData = response.items;
			$scope.smoky=$scope.emhData[5].sig_value==1?true:false;
			$scope.door=$scope.emhData[1].sig_value==1?true:false;
			$scope.fire=$scope.emhData[4].sig_value==1?true:false;
			$scope.water=$scope.emhData[8].sig_value==1?true:false;
			$scope.acv=$scope.emhData[2].sig_value;
			$scope.aci=$scope.emhData[3].sig_value;
			$scope.dcv=$scope.emhData[0].sig_value;
			$scope.dci=$scope.emhData[0].sig_value;
		});
		/* AC电压 */
		xh.loadAcv();
		xh.loadAci();
		xh.loadDcv();
		xh.loadDci();
	});
};
/* AC电压*/
xh.loadAcv = function() {
	// 设置容器宽高
	  var resizeBarContainer = function() {
	  $("#acv-div").width(parseInt($("#acv-div").parent().width()) - 20);
	  /*$("#temp-div").height(300);*/
	  resizeBarContainer();
	  };
	var $scope = angular.element(appElement).scope();
	// 基于准备好的dom，初始化echarts实例
	var chart = null;
	if (chart != null) {
		chart.clear();
		chart.dispose();
	}
	require([ 'echarts', 'echarts/chart/gauge' ], function(ec) {
		chart = ec.init(document.getElementById('acv-div'));
		/*chart.showLoading({
			text : '正在努力的读取数据中...'
		});*/
		var option = {
			    tooltip : {
			        formatter: "{a} <br/>{b} : {c}V"
			    },
			    series : [
			        {
			            name:'AC电压',
			            type:'gauge',
			            splitNumber: 10,       // 分割段数，默认为5
			            axisLine: {            // 坐标轴线
			                lineStyle: {       // 属性lineStyle控制线条样式
			                    color: [[0.2, '#62cb31'],[0.8, '#48b'],[1, '#ff4500']], 
			                    width: 2
			                }
			            },
			            axisTick: {            // 坐标轴小标记
			                splitNumber: 10,   // 每份split细分多少段
			                length :5,        // 属性length控制线长
			                lineStyle: {       // 属性lineStyle控制线条样式
			                    color: 'auto'
			                }
			            },
			            axisLabel: {           // 坐标轴文本标签，详见axis.axisLabel
			                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
			                    color: 'auto'
			                }
			            },
			            splitLine: {           // 分隔线
			                show: true,        // 默认显示，属性show控制显示与否
			                length :10,         // 属性length控制线长
			                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
			                    color: 'auto'
			                }
			            },
			            pointer : {
			                width : 5
			            },
			            data:[{value: $scope.acv, name: 'AC电压'}]
			        }
			    ]
			};


		chart.setOption(option);

	});
};
/* AC电流*/
xh.loadAci = function() {
	// 设置容器宽高
	  var resizeBarContainer = function() {
	  $("#aci-div").width(parseInt($("#aci-div").parent().width()) - 20);
	  /*$("#temp-div").height(300);*/
	  resizeBarContainer();
	  };
	var $scope = angular.element(appElement).scope();
	// 基于准备好的dom，初始化echarts实例
	var chart = null;
	if (chart != null) {
		chart.clear();
		chart.dispose();
	}
	require([ 'echarts', 'echarts/chart/gauge' ], function(ec) {
		chart = ec.init(document.getElementById('aci-div'));
		/*chart.showLoading({
			text : '正在努力的读取数据中...'
		});*/
		var option = {
			    tooltip : {
			        formatter: "{a} <br/>{b} : {c}I"
			    },
			    series : [
			        {
			            name:'AC电流',
			            type:'gauge',
			            splitNumber: 10,       // 分割段数，默认为5
			            axisLine: {            // 坐标轴线
			                lineStyle: {       // 属性lineStyle控制线条样式
			                    color: [[0.2, '#62cb31'],[0.8, '#48b'],[1, '#ff4500']], 
			                    width: 2
			                }
			            },
			            axisTick: {            // 坐标轴小标记
			                splitNumber: 10,   // 每份split细分多少段
			                length :5,        // 属性length控制线长
			                lineStyle: {       // 属性lineStyle控制线条样式
			                    color: 'auto'
			                }
			            },
			            axisLabel: {           // 坐标轴文本标签，详见axis.axisLabel
			                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
			                    color: 'auto'
			                }
			            },
			            splitLine: {           // 分隔线
			                show: true,        // 默认显示，属性show控制显示与否
			                length :10,         // 属性length控制线长
			                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
			                    color: 'auto'
			                }
			            },
			            pointer : {
			                width : 5
			            },
			            data:[{value: $scope.aci, name: 'AC电流'}]
			        }
			    ]
			};


		chart.setOption(option);

	});
};
/* DC电压*/
xh.loadDcv = function() {
	// 设置容器宽高
	  var resizeBarContainer = function() {
	  $("#dcv-div").width(parseInt($("#dcv-div").parent().width()) - 20);
	  /*$("#temp-div").height(300);*/
	  resizeBarContainer();
	  };
	var $scope = angular.element(appElement).scope();
	// 基于准备好的dom，初始化echarts实例
	var chart = null;
	if (chart != null) {
		chart.clear();
		chart.dispose();
	}
	require([ 'echarts', 'echarts/chart/gauge' ], function(ec) {
		chart = ec.init(document.getElementById('dcv-div'));
		/*chart.showLoading({
			text : '正在努力的读取数据中...'
		});*/
		var option = {
			    tooltip : {
			        formatter: "{a} <br/>{b} : {c}V"
			    },
			    series : [
			        {
			            name:'DC电压',
			            type:'gauge',
			            splitNumber: 10,       // 分割段数，默认为5
			            axisLine: {            // 坐标轴线
			                lineStyle: {       // 属性lineStyle控制线条样式
			                    color: [[0.2, '#62cb31'],[0.8, '#48b'],[1, '#ff4500']], 
			                    width: 2
			                }
			            },
			            axisTick: {            // 坐标轴小标记
			                splitNumber: 10,   // 每份split细分多少段
			                length :5,        // 属性length控制线长
			                lineStyle: {       // 属性lineStyle控制线条样式
			                    color: 'auto'
			                }
			            },
			            axisLabel: {           // 坐标轴文本标签，详见axis.axisLabel
			                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
			                    color: 'auto'
			                }
			            },
			            splitLine: {           // 分隔线
			                show: true,        // 默认显示，属性show控制显示与否
			                length :10,         // 属性length控制线长
			                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
			                    color: 'auto'
			                }
			            },
			            pointer : {
			                width : 5
			            },
			            data:[{value: $scope.dcv, name: 'DC电压'}]
			        }
			    ]
			};


		chart.setOption(option);

	});
};
/* DC电流*/
xh.loadDci = function() {
	// 设置容器宽高
	  var resizeBarContainer = function() {
	  $("#dci-div").width(parseInt($("#dci-div").parent().width()) - 20);
	  /*$("#temp-div").height(300);*/
	  resizeBarContainer();
	  };
	var $scope = angular.element(appElement).scope();
	// 基于准备好的dom，初始化echarts实例
	var chart = null;
	if (chart != null) {
		chart.clear();
		chart.dispose();
	}
	require([ 'echarts', 'echarts/chart/gauge' ], function(ec) {
		chart = ec.init(document.getElementById('dci-div'));
		/*chart.showLoading({
			text : '正在努力的读取数据中...'
		});*/
		var option = {
			    tooltip : {
			        formatter: "{a} <br/>{b} : {c}I"
			    },
			    series : [
			        {
			            name:'DC电流',
			            type:'gauge',
			            splitNumber: 10,       // 分割段数，默认为5
			            axisLine: {            // 坐标轴线
			                lineStyle: {       // 属性lineStyle控制线条样式
			                    color: [[0.2, '#62cb31'],[0.8, '#48b'],[1, '#ff4500']], 
			                    width: 2
			                }
			            },
			            axisTick: {            // 坐标轴小标记
			                splitNumber: 10,   // 每份split细分多少段
			                length :5,        // 属性length控制线长
			                lineStyle: {       // 属性lineStyle控制线条样式
			                    color: 'auto'
			                }
			            },
			            axisLabel: {           // 坐标轴文本标签，详见axis.axisLabel
			                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
			                    color: 'auto'
			                }
			            },
			            splitLine: {           // 分隔线
			                show: true,        // 默认显示，属性show控制显示与否
			                length :10,         // 属性length控制线长
			                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
			                    color: 'auto'
			                }
			            },
			            pointer : {
			                width : 5
			            },
			            data:[{value: $scope.aci, name: 'DC电压'}]
			        }
			    ]
			};


		chart.setOption(option);

	});
};
/* 有功功率*/
xh.loadPow = function() {
	// 设置容器宽高
	  var resizeBarContainer = function() {
	  $("#dci-div").width(parseInt($("#dci-div").parent().width()) - 20);
	  /*$("#temp-div").height(300);*/
	  resizeBarContainer();
	  };
	var $scope = angular.element(appElement).scope();
	// 基于准备好的dom，初始化echarts实例
	var chart = null;
	if (chart != null) {
		chart.clear();
		chart.dispose();
	}
	require([ 'echarts', 'echarts/chart/gauge' ], function(ec) {
		chart = ec.init(document.getElementById('dci-div'));
		/*chart.showLoading({
			text : '正在努力的读取数据中...'
		});*/
		var option = {
			    tooltip : {
			        formatter: "{a} <br/>{b} : {c}%"
			    },
			    series : [
			        {
			            name:'业务指标',
			            type:'gauge',
			            splitNumber: 10,       // 分割段数，默认为5
			            axisLine: {            // 坐标轴线
			                lineStyle: {       // 属性lineStyle控制线条样式
			                    color: [[0.2, '#62cb31'],[0.8, '#48b'],[1, '#ff4500']], 
			                    width: 2
			                }
			            },
			            axisTick: {            // 坐标轴小标记
			                splitNumber: 10,   // 每份split细分多少段
			                length :5,        // 属性length控制线长
			                lineStyle: {       // 属性lineStyle控制线条样式
			                    color: 'auto'
			                }
			            },
			            axisLabel: {           // 坐标轴文本标签，详见axis.axisLabel
			                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
			                    color: 'auto'
			                }
			            },
			            splitLine: {           // 分隔线
			                show: true,        // 默认显示，属性show控制显示与否
			                length :10,         // 属性length控制线长
			                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
			                    color: 'auto'
			                }
			            },
			            pointer : {
			                width : 5
			            },
			            data:[{value: $scope.aci, name: 'DC电压'}]
			        }
			    ]
			};


		chart.setOption(option);

	});
};
/* 添加用户*/
xh.add = function() {
	$.ajax({
		url : '../../web/user/add',
		type : 'POST',
		dataType : "json",
		async : true,
		data : $("#addForm").serializeArray(),
		success : function(data) {

			if (data.success) {
				$('#add').modal('hide');
				xh.refresh();
				toastr.success(data.message, '提示');

			} else {
				swal({
					title : "提示",
					text : data.message,
					type : "error"
				});
			}
		},
		error : function() {
		}
	});
};
