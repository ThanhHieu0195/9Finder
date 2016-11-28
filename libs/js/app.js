var myApp = angular.module('myApp', ['ngRoute']);
/*==============================
=            config            =
==============================*/
myApp.config(function($routeProvider){
	$routeProvider
	.when('/', {
		templateUrl: 'public/find.html'
	})
	.when('/login', {
		templateUrl: 'public/login.html'
	})
	.when('/register', {
		templateUrl: 'public/register.html'
	})
	.when('/details', {
		templateUrl: 'public/details.html'
	})
	.when('/search', {
		templateUrl: 'public/findResult.html'
	});
});
/*=====  End of config  ======*/


/*============================
=            main            =
============================*/



/*=====  End of main  ======*/

myApp.controller('Abc', function($scope, $http, $route, $templateCache, $location){
	/*----------  css  ----------*/
	$scope.cssapp = "libs/css/app.css";
	/*----------  js  ----------*/

	/*----------  load accout sign  ----------*/
	$scope.loadaccount = function () {
		var username = $.cookie("username");
		var token = $.cookie("token");
		if (username && token) {
			$scope.account = {username:username, token: token};
		}
	};
	$scope.loadaccount();

	/*----------  loadtype service  ----------*/
	$scope.listtypeservice = [];

	$scope.getlisttypeservice = function () {
		$.get('index.php?c=find&a=getlisttypeservice', function(data) {
			json = $.parseJSON(data);
			var data = json.data;
			for (var i = 0; i < data.length; i++) {
				var obj = data[i];
				data[obj.name] = [obj.name, obj.id_service_type];
			}
			$scope.listtypeservice = data;
		});
	}
	$scope.getlisttypeservice();

	/*----------  function login  ----------*/
	$scope.login = function(){
		var username = $('#username').val();
		var password = $('#password').val();

		$.post('index.php?c=login&a=checkaccount', {ln: ['username', 'password'], lv: [username, password]}, function(data, textStatus, xhr) {
			json = $.parseJSON(data);
			if (json.result == 1) {
				addAccountToCookie(username, json.data.token_id)
				$scope.username = username;
				window.location = "";
			} else {
				alert("Username or Password incorrect");
			}
		});
	};

	/*----------  goto page login  ----------*/
	$scope.pagelogin = function() {
		window.location = "#login";
	}

	$scope.pagefind = function() {
		window.location = "#/";
	}

	$scope.page_findresult = function() {
		window.location = "#/search";
	}
	/*----------  goto page  ----------*/
	$scope.gotoPage = function(location){
		window.location.hash = location;
	};
	/*----------  logout account  ----------*/
	$scope.logout = function() {
		$.get('index.php?c=login&a=logout', function(data, textStatus, xhr) {
			json = $.parseJSON(data);
			if (json.result == 1) {
				removeAllCookie();
				window.location = "";
			}
		});
	}
	/*----------  register  ----------*/
	$scope.register = function() {
		var username = $('#register_username').val();
		var password = $('#register_password').val();

		$.post('index.php?c=login&a=register', {ln: ['username', 'password'], lv: [username, password]}, function(data, textStatus, xhr) {
			json = $.parseJSON(data);
			if (json.result == 1) {
				alert("Đăng kí tài khoản thành công");
				$scope.username = username;
				window.location = "";
			} else {
				alert("Đăng kí tài khoản thất bại");
			}
		});
	}

	/*----------  find by condition  ----------*/
	
	$scope.search = function(){
		var listtypeservice = $scope.listtypeservice;
		var _name_type_service = $('#chosen').val();

		if (listtypeservice[_name_type_service]) {
			$.cookie('id_service_type', listtypeservice[_name_type_service][1]);
			$scope.gotoPage("#/search");
		}
	};

	/*----------  find by service type  ----------*/
	
	$scope.findByServiceType = function(service_id){
		// lấy danh sách các dịch vụ theo loại dịch vụ
		$.cookie('id_service_type', service_id);
		$scope.gotoPage("#/search");
	};
	



	var service_id;
	$scope.details = function(e){
  //      	service_id = $(e.currentTarget).attr("serviceid");
  //       $scope.idservice = service_id;
  //       $scope.serviceName = $(e.currentTarget).attr("servicename");
  //       $scope.serviceProvince = $(e.currentTarget).attr("serviceprovince");
		// // lấy tất cả comment của dịch vụ
		// $.get('index.php?c=comment&a=getallcomment&ln=service_code&lv=' + service_id.toString(), function(data) {
		// 	json = $.parseJSON(data);
		// 	$scope.comments = json.data;
		// });
		// // lấy rating cho 1 địa điểm
		// $.get('index.php?c=rating&a=get_rating_medium&ln=service_code&lv=1', function(data, textStatus, xhr) {
		// 	json = $.parseJSON(data);
		// 	$scope.rating = json.data;
		// });
		// // trả về mãng link hình ảnh
		// $.get('index.php?c=service&a=load_album&ln=id_service&lv=' + service_id.toString(), function(data) {
		// 	json = $.parseJSON(data);
		// 	$scope.photos = json.data;
		// });
		// window.location.hash = "#/details";

		var service_id = $(e.currentTarget).attr("serviceid");
		var serviceName = $(e.currentTarget).attr("servicename");
		var serviceProvince = $(e.currentTarget).attr("serviceprovince");
		$.cookie('serviceid', service_id);
		$.cookie('servicename', serviceName);
		$.cookie('serviceprovince', serviceProvince);
		$scope.gotoPage("#/details");
	};

	/*----------  add comment  ----------*/
	// $scope.comment = function(){
	// 	var comment = $('#comment').val();
	// 	if ($scope.account) {
	// 		$.post('index.php?c=comment&a=addcomment', {ln: ['service_code', 'content'], lv: [service_id, comment]}, function(data, textStatus, xhr) {
	// 			console.log(data);
	// 			json = $.parseJSON(data);
	// 			if (json.result == 1){
	// 				var listcomment = [];
	// 				$.get('index.php?c=comment&a=getallcomment&ln=service_code&lv=' + service_id.toString(), function(data) {
	// 					json = $.parseJSON(data);
	// 					listcomment = json.data;
	// 					console.log(listcomment);
	// 					$('#content-comment').html(
	// 						'<div class="panel panel-default" style="padding: 10px;">' +
	// 						'<div class="media">' +
	// 						'<div class="media-left">' +
	// 						'<img src="http://www.w3schools.com/bootstrap/img_avatar1.png" class="media-object" style="width:45px">' +
	// 						'</div>' +
	// 						'<div class="media-body">' +
	// 						'<h4 class="media-heading">' + listcomment[0].comment_by + '<small><i>Posted on February 19, 2016 chua co du lieu</i></small></h4>' +
	// 						'<a class="glyphicon glyphicon-remove" style="float: right;" ng-click="remove_comment($event)" idcomment="' + listcomment[0].id_comment + '"></a>' +
	// 						'<p>' + listcomment[0].content + '</p>' +
	// 						'</div>' +
	// 						'</div>' +
	// 						'<hr>' + 
	// 						'</div>' +
	// 						$('#content-comment').html());
	// 				});
	// 			}
	// 		});
	// 	} else {
	// 		alert('You are not login!');
	// 	}
	// };

	/*----------  remove comment  ----------*/
	// $scope.remove_comment = function(e){
	// 	var id_comment = $(e.currentTarget).attr("idcomment");
	// 	//xoa comment
	// 	$.post('index.php?c=comment&a=delcomment', {ln: 'id_comment', lv: id_comment}, function(data, textStatus, xhr) {
	// 		json = $.parseJSON(data);
	// 		console.log(json);
	// 	});
	// 	//load lai trang
	// 	//load lai danh sach comment
	// 	$.get('index.php?c=comment&a=getallcomment&ln=service_code&lv=' + service_id.toString(), function(data) {
	// 		json = $.parseJSON(data);
	// 		console.log(json.data);
	// 		$scope.comments = json.data;
	// 	});
	// 	//window.location.hash = "#/details";
	// 	var currentPageTemplate = $route.current.templateUrl;
	// 	$templateCache.remove(currentPageTemplate);
	// 	$route.reload();
	// };

	/*===========================
	=            map            =
	===========================*/
	
	$scope.show_map = function(x, y) {
		var x = parseFloat(x);
		var y = parseFloat(y);
		initMap(x, y, 15);
	};
	
	/*=====  End of map  ======*/
	
});

/*==============================
=            search            =
==============================*/
myApp.controller('searchCtl', function ($scope, $route, $templateCache, $location){

	/*----------  show popup login, register  ----------*/
	$scope.hidepopup = function(arr) {
		for (var i = 0; i < arr.length; i++) {
			p = arr[i];
			$(p).modal('hide');
		}
	};

});
/*=====  End of search  ======*/

/*==================================
=            findresult            =
==================================*/
myApp.controller('search-result-Ctl', function ($scope, $http, $route, $templateCache, $location){
    var id_service_type = $.cookie('id_service_type');
	var data = $.param({
        ln: ['id_service_type'],
        lv: [id_service_type]
    });

    var config = {
        headers : {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
        }
    }

	$http.post('index.php?c=find&a=getlistdatabytype', data, config).success(function(data) {
		json = data;
		$scope.services = json.data;
		console.log(data);
	});
});
/*=====  End of findresult  ======*/

/*======================================
=            detail service            =
======================================*/

myApp.controller('detail-Ctl', function ($scope, $http, $route, $templateCache, $location){
	$scope.comments = [];
	$scope.rating = 1;
	$scope.photos = [];

	var service_id = $.cookie('serviceid');
	var servicename = $.cookie('servicename');
	var serviceprovince = $.cookie('serviceprovince');

	var data = $.param({
        ln: ['service_code'],
        lv: [service_id]
    });

    var config = {
        headers : {
             'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
         }
     }
 	$scope.idservice = service_id;
 	$scope.serviceName = servicename;
 	$scope.serviceProvince = serviceprovince;
	// lấy tất cả comment của dịch vụ
	$http.get('index.php?c=comment&a=getallcomment&ln=service_code&lv=' + service_id.toString(), config).success(function(data) {
		json = data;
		console.log(data);
		$scope.comments = json.data;
	});
	// lấy rating cho 1 địa điểm
	$http.get('index.php?c=rating&a=get_rating_medium&ln=service_code&lv=' + service_id.toString(), config).success(function(data, textStatus, xhr) {
		json = data;
		console.log(data);
		$scope.rating = json.data;
	});
	// trả về mãng link hình ảnh
	$http.get('index.php?c=service&a=load_album&ln=id_service&lv=' + service_id.toString(), config).success(function(data) {
		json = data;
		console.log(data);
		$scope.photos = json.data;
	});

	/*----------  add comment  ----------*/
	$scope.comment = function(){
		var comment = $('#comment').val();
		if ($scope.account) {
			$.post('index.php?c=comment&a=addcomment', {ln: ['service_code', 'content'], lv: [service_id, comment]}, function(data, textStatus, xhr) {
				console.log(data);
				json = $.parseJSON(data);
				if (json.result == 1){
					var listcomment = [];
					$.get('index.php?c=comment&a=getallcomment&ln=service_code&lv=' + service_id.toString(), function(data) {
						json = $.parseJSON(data);
						listcomment = json.data;
						console.log(listcomment);
						$('#content-comment').html(
							'<div class="panel panel-default" style="padding: 10px;">' +
							'<div class="media">' +
							'<div class="media-left">' +
							'<img src="http://www.w3schools.com/bootstrap/img_avatar1.png" class="media-object" style="width:45px">' +
							'</div>' +
							'<div class="media-body">' +
							'<h4 class="media-heading">' + listcomment[0].comment_by + '<small><i>Posted on February 19, 2016 chua co du lieu</i></small></h4>' +
							'<a class="glyphicon glyphicon-remove" style="float: right;" ng-click="remove_comment($event)" idcomment="' + listcomment[0].id_comment + '"></a>' +
							'<p>' + listcomment[0].content + '</p>' +
							'</div>' +
							'</div>' +
							'<hr>' + 
							'</div>' +
							$('#content-comment').html());
					});
				}
			});
		} else {
			alert('You are not login!');
		}
	};

	/*----------  remove comment  ----------*/
	$scope.remove_comment = function(e){
		var id_comment = $(e.currentTarget).attr("idcomment");
		//xoa comment
		$.post('index.php?c=comment&a=delcomment', {ln: 'id_comment', lv: id_comment}, function(data, textStatus, xhr) {
			json = $.parseJSON(data);
			console.log(json);
		});
		//load lai trang
		//load lai danh sach comment
		$.get('index.php?c=comment&a=getallcomment&ln=service_code&lv=' + service_id.toString(), function(data) {
			json = $.parseJSON(data);
			console.log(json.data);
			$scope.comments = json.data;
		});
		//window.location.hash = "#/details";
		var currentPageTemplate = $route.current.templateUrl;
		$templateCache.remove(currentPageTemplate);
		$route.reload();
	};
});
/*=====  End of detail service  ======*/
