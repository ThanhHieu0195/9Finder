var myApp = angular.module('myApp', ['ngRoute', 'ngAnimate']);
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
	$scope.cssanimation = "libs/css/animation.css";
	/*----------  js  ----------*/

	$scope.loadPage = function() {
		$route.reload();
	};

	$scope.callpage = function() {
		if ($.cookie('callpage').length > 0) {
			window.location = $.cookie('callpage');
			$.cookie('callpage', ""); 
		}
	}

	if ($.cookie('callpage') != undefined ){
		$scope.callpage();
	}

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
				$.cookie('callpage', window.location);
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
	$scope.search = function(location=""){
		$.cookie('action', 'findbycondition');
		$.cookie('service', $('#service').val());
		$.cookie('location', $('#location').val());
		$.cookie('searchby', 0);
		if (location == "") {
			$scope.loadPage();
		} else {
			$scope.gotoPage(location);
		}
	};

	/*----------  find by service type  ----------*/
	
	$scope.findByServiceType = function(service_id, location=""){
		// lấy danh sách các dịch vụ theo loại dịch vụ
		$.cookie('action', 'findbytype');
		$.cookie('id_service_type', service_id);
		$.cookie('searchby', 0);
			if (location == "") {
			$scope.loadPage();
		} else {
			$scope.gotoPage(location);
		}
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
		var serviceHouseNumber = $(e.currentTarget).attr("servicehousenumber");
		var serviceWard = $(e.currentTarget).attr("serviceward");
		var serviceDistrict = $(e.currentTarget).attr("servicedistrict");
		var serviceWebsite = $(e.currentTarget).attr("serverwebsite");
		$.cookie('serviceid', service_id);
		$.cookie('servicename', serviceName);
		$.cookie('serviceprovince', serviceProvince);
		$.cookie('servicehousenumber', serviceHouseNumber);
		$.cookie('serviceward', serviceWard);
		$.cookie('servicedistrict', serviceDistrict);
		$.cookie('servicewebsite', serviceWebsite);
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
	var action = $.cookie('action');
	$scope.searchby = function(location="") {
		var searchby = $('#searchby').val();
		switch (searchby) {
			case 'Price':
				$.cookie('searchby', 1);
				break;
			case 'Location':
				$.cookie('searchby', 2);
				break;
			default:
				$.cookie('searchby', 0);
				break;
		}
		if (location == "") {
			$scope.loadPage();
		} else {
			$scope.gotoPage(location);
		}
	};

	switch (action) {
		case 'findbycondition':
			var service = $.cookie('service');
			var location = $.cookie('location');
			var searchby = $.cookie('searchby');
			var data = $.param({
		        ln: ['service', 'location', 'searchby'],
		        lv: [service, location, searchby]
		    });
		    var config = {
		        headers : {
		            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
		        }
		    }
		    $http.post('index.php?c=find&a=getlistdatabycondition', data, config).success(function(data) {
				json = data;
				$scope.services = json.data;
			});
			break;
		default:
			var id_service_type = $.cookie('id_service_type');
			var searchby = $.cookie('searchby');

			var data = $.param({
		        ln: ['id_service_type', 'searchby'],
		        lv: [id_service_type, searchby]
		    });

		    var config = {
		        headers : {
		            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
		        }
		    }

			$http.post('index.php?c=find&a=getlistdatabytype', data, config).success(function(data) {
				json = data;
				$scope.services = json.data;
			});
			break;
	}
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
	var servicehousenumber = $.cookie('servicehousenumber');
	var serviceward= $.cookie('serviceward');
	var servicedistrict = $.cookie('servicedistrict');
	var servicewebsite = $.cookie('servicewebsite');

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
 	$scope.serviceHouseNumber = servicehousenumber;
 	$scope.serviceWard = serviceward;
 	$scope.serviceDistrict = servicedistrict;
 	$scope.serviceWebsite = servicewebsite;
	// lấy tất cả comment của dịch vụ
	$http.get('index.php?c=comment&a=getallcomment&ln=service_code&lv=' + service_id.toString(), config).success(function(data) {
		json = data;
		console.log(data);
		$scope.comments = json.data;
		// lấy rating cho 1 địa điểm
		$http.get('index.php?c=rating&a=get_rating_medium&ln=service_code&lv=' + service_id.toString(), config).success(function(data, textStatus, xhr) {
			json = data;
			console.log(data);
			$scope.rating = json.data;
			// trả về mãng link hình ảnh
			$http.get('index.php?c=service&a=load_album&ln=id_service&lv=' + service_id.toString(), config).success(function(data) {
				json = data;
				console.log(data);
				$scope.photos = json.data;
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
									$scope.loadPage();
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
		});
	});
});
/*=====  End of detail service  ======*/
