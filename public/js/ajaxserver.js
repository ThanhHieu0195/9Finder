
// Kiểm tra tài khoản
$.get('index.php?c=login&a=checkaccount&ln=username,password&lv=admin,123456', function(data) {
	json = $.parseJSON(data);
	console.log(json);
});

// đăng kí tài khoản
$.post('index.php?c=login&a=register', {ln: ['username', 'password'], lv: ['minhnhi','123456']}, function(data, textStatus, xhr) {
	json = $.parseJSON(data);
	console.log(json);
});

// logout tài khoản
$.get('index.php?c=login&a=logout', function(data, textStatus, xhr) {
	json = $.parseJSON(data);
	console.log(json);
});

// 

// Lấy danh sách các loại dịch vụ
$.get('index.php?c=find&a=getlisttypeservice', function(data) {
	json = $.parseJSON(data);
	console.log(json);
});

// lấy danh sách các dịch vụ theo loại dịch vụ
$.post('index.php?c=find&a=getlistdatabytype', {ln: ['id_service_type','searchby'], lv: ['1', 0]}, function(data, textStatus, xhr) {
	json = $.parseJSON(data);
	console.log(json);
});


// lấy tất cả comment của dịch vụ
$.get('index.php?c=comment&a=getallcomment&ln=service_code&lv=1', function(data) {
	json = $.parseJSON(data);
	console.log(json);
});
// kiểm tra quyền thao tác với 1 một comment 
// 1: ...
// 0: không có quyền
$.get('index.php?c=comment&a=checkaccess&ln=id_comment&lv=1', function(data) {
	json = $.parseJSON(data);
	console.log(json);
});

// thêm 1 comment mới --> chức năng chỉ thành công khi đã đăng nhập
// 1 nếu thêm thành công
// 0 nếu thêm thất bại
// -1 nếu chưa đăng nhập
$.post('index.php?c=comment&a=addcomment', {ln: ['service_code', 'content'], lv: ['1', 'very good']}, function(data, textStatus, xhr) {
	json = $.parseJSON(data);
	console.log(json);
});


// xoa 1 comment mới --> chức năng chỉ thành công khi đã đăng nhập
// 1 nếu thêm thành công
// 0 nếu thêm thất bại
// -1 nếu chưa đăng nhập
$.post('index.php?c=comment&a=delcomment', {ln: 'id_comment', lv: '1'}, function(data, textStatus, xhr) {
	json = $.parseJSON(data);
	console.log(json);
});

// rating cá nhân cho một điểm
$.post('index.php?c=rating&a=set_rating', {ln: ['service_code', 'score'], lv: ['1', '3']}, function(data, textStatus, xhr) {
	json = $.parseJSON(data);
	console.log(json);
});

// lấy rating cho 1 địa điểm
$.get('index.php?c=rating&a=get_rating_medium&ln=service_code&lv=1', function(data, textStatus, xhr) {
	json = $.parseJSON(data);
	console.log(json);
});

// update website, price, phone của service. Chỉ admin mới sử dụng dc

// load tất cả ảnh của dịch vụ
// trả về mãng link hình ảnh
$.get('index.php?c=service&a=load_album&ln=id_service&lv=1', function(data) {
	json = $.parseJSON(data);
	console.log(json);
});


$.post('index.php?c=service&a=update_website', {ln: ['id_service', 'website'], lv: ['1', 'http://www.google.com']}, function(data, textStatus, xhr) {
	json = $.parseJSON(data);
	console.log(json);
});
$.post('index.php?c=service&a=update_price', {ln: ['id_service', 'price'], lv: ['1', '15.000']}, function(data, textStatus, xhr) {
	json = $.parseJSON(data);
	console.log(json);
});
$.post('index.php?c=service&a=update_phone', {ln: ['id_service', 'phone'], lv: ['1', '0909090909']}, function(data, textStatus, xhr) {
	json = $.parseJSON(data);
	console.log(json);
});

// thêm xóa sửa khuyến mãi
$.post('index.php?c=promote&a=addpromote', {ln: ['service_code', 'describe'], lv: ['1', 'giảm giá 20% vào ngày 30.12']}, function(data, textStatus, xhr) {
	json = $.parseJSON(data);
	console.log(json);
});

$.get('index.php?c=promote&a=getnewpromote&ln=service_code&lv=1', function(data, textStatus, xhr) {
	json = $.parseJSON(data);
	console.log(json);
});