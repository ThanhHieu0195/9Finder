var myApp = angular.module('myApp', ['ngRoute']);
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

myApp.controller('Abc', function($scope, $route, $templateCache, $location){
	$.get('index.php?c=find&a=getlisttypeservice', function(data) {
		json = $.parseJSON(data);
		$scope.dsloaidv = json.data;
	});

	$scope.loadaccount = function () {
		var username = $.cookie("username");
		var token = $.cookie("token");
		if (username && token) {
			$scope.account = {username:username, token: token};
		}
	};
	$scope.loadaccount();

	// show popup login, register 
	$scope.hidepopup = function(arr) {
		for (var i = 0; i < arr.length; i++) {
			p = arr[i];
			$(p).modal('hide');
		}
	};


	$scope.listtypeservice = [];
	$scope.services = null;
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

	adata = $scope.listtypeservice;
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

	$scope.logout = function() {
		$.get('index.php?c=login&a=logout', function(data, textStatus, xhr) {
			json = $.parseJSON(data);
			if (json.result == 1) {
				removeAllCookie();
				window.location = "";
			}
		});
	}

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

	$scope.search = function(){
		var listtypeservice = $scope.listtypeservice;
		var _name_type_service = $('#chosen').val();
		if (listtypeservice[_name_type_service]) {
			var _id_type_service = listtypeservice[_name_type_service][1];
			$.post('index.php?c=find&a=getlistdatabytype', {ln: ['id_service_type'], lv: [_id_type_service]}, function(data, textStatus, xhr) {
				json = $.parseJSON(data);
				$scope.services = json.data;
			});
			window.location.hash = "#/search";
		}
	};

	$scope.choose_service = function(){
		var listtypeservice = $scope.listtypeservice;
		var _name_type_service = $('#chosen').val();
		console.log(_name_type_service);
		if (listtypeservice[_name_type_service]) {
			var _id_type_service = listtypeservice[_name_type_service][1];
			$.post('index.php?c=find&a=getlistdatabytype', {ln: ['id_service_type'], lv: [_id_type_service]}, function(data, textStatus, xhr) {
				json = $.parseJSON(data);
				$scope.services = json.data;
			});

			var currentPageTemplate = $route.current.templateUrl;
			$templateCache.remove(currentPageTemplate);
			$route.reload();
		}else{
			window.location.hash = "#/search";
		}
	};

	$scope.choose_service_detail = function(){
		console.log("zo");
		var listtypeservice = $scope.listtypeservice;
		var _name_type_service = $('#chosen').val();
		console.log(_name_type_service);
		if (listtypeservice[_name_type_service]) {
			var _id_type_service = listtypeservice[_name_type_service][1];
			$.post('index.php?c=find&a=getlistdatabytype', {ln: ['id_service_type'], lv: [_id_type_service]}, function(data, textStatus, xhr) {
				json = $.parseJSON(data);
				$scope.services = json.data;
			});
			window.location.hash = "#/search";
		}
	};

	$scope.service_food = function(){
		// lấy danh sách các dịch vụ theo loại dịch vụ
		$.post('index.php?c=find&a=getlistdatabytype', {ln: ['id_service_type'], lv: ['1']}, function(data, textStatus, xhr) {
			json = $.parseJSON(data);
			$scope.services = json.data;
		});
		window.location.hash = "#/search";
	};

	$scope.service_coffee = function(){
		// lấy danh sách các dịch vụ theo loại dịch vụ
		$.post('index.php?c=find&a=getlistdatabytype', {ln: ['id_service_type'], lv: ['2']}, function(data, textStatus, xhr) {
			json = $.parseJSON(data);
			$scope.services = json.data;
		});
		window.location.hash = "#/search";
	};

	$scope.service_nightlife = function(){
		// lấy danh sách các dịch vụ theo loại dịch vụ
		$.post('index.php?c=find&a=getlistdatabytype', {ln: ['id_service_type'], lv: ['2']}, function(data, textStatus, xhr) {
			json = $.parseJSON(data);
			$scope.services = json.data;
		});
		window.location.hash = "#/search";
	};

	$scope.service_fun = function(){
		// lấy danh sách các dịch vụ theo loại dịch vụ
		$.post('index.php?c=find&a=getlistdatabytype', {ln: ['id_service_type'], lv: ['2']}, function(data, textStatus, xhr) {
			json = $.parseJSON(data);
			$scope.services = json.data;
		});
		window.location.hash = "#/search";
	};

	$scope.service_shopping = function(){
		// lấy danh sách các dịch vụ theo loại dịch vụ
		$.post('index.php?c=find&a=getlistdatabytype', {ln: ['id_service_type'], lv: ['2']}, function(data, textStatus, xhr) {
			json = $.parseJSON(data);
			$scope.services = json.data;
		});
		window.location.hash = "#/search";
	};

	var service_id;
	$scope.details = function(e){
		//service_id = $('#service_id').val();
        service_id = $(e.currentTarget).attr("serviceid");
        $scope.idservice = service_id;
        $scope.serviceName = $(e.currentTarget).attr("servicename");
        $scope.serviceProvince = $(e.currentTarget).attr("serviceprovince");
		// lấy tất cả comment của dịch vụ
		$.get('index.php?c=comment&a=getallcomment&ln=service_code&lv=' + service_id.toString(), function(data) {
			json = $.parseJSON(data);
			$scope.comments = json.data;
		});
		// lấy rating cho 1 địa điểm
		$.get('index.php?c=rating&a=get_rating_medium&ln=service_code&lv=1', function(data, textStatus, xhr) {
			json = $.parseJSON(data);
			$scope.rating = json.data;
		});
		// trả về mãng link hình ảnh
		$.get('index.php?c=service&a=load_album&ln=id_service&lv=' + service_id.toString(), function(data) {
			json = $.parseJSON(data);
			$scope.photos = json.data;
		});
		window.location.hash = "#/details";
	};

	$scope.comment = function(){
		var comment = $('#comment').val();
		console.log(service_id);
		//add comment
		$.post('index.php?c=comment&a=addcomment', {ln: ['service_code', 'content'], lv: [service_id, comment]}, function(data, textStatus, xhr) {
			json = $.parseJSON(data);
		});
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
