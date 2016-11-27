--database: 9finder

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";



/* CREATEA TABLES */
CREATE TABLE `account` (
  `token_id` char(24) COLLATE utf8_unicode_ci NOT NULL,
  `username` varchar(24) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(48) COLLATE utf8_unicode_ci NOT NULL,
  `fullname` varchar(48) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(48)  COLLATE utf8_unicode_ci,
  `avatar` varchar(48) COLLATE utf8_unicode_ci,
  `level` int(1) NOT NULL,
  PRIMARY KEY(`token_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;



CREATE TABLE `account_level` (
  `level` int(1) NOT NULL,
  `describe` varchar(24) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY(`level`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


CREATE TABLE `service_type_keyword`
(
	`id_service_type_keyword` char(24) COLLATE utf8_unicode_ci NOT NULL,
	`keyword` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
	`service_code` int(11) NOT NULL,
	PRIMARY KEY(`id_service_type_keyword`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `service_type`
(
	`id_service_type` int(11) auto_increment NOT NULL,
	`name` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
	PRIMARY KEY(`id_service_type`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;



CREATE TABLE `service`
(
	`id_service` int(11) auto_increment NOT NULL,
	`service_code` int(11)  NOT NULL,
	`place_name_code` int(11)  NOT NULL,
	`house_number` varchar(8)  NOT NULL,
	`street_code` int(11)  NOT NULL,
	`ward_code` int(11)  NOT NULL,
	`district_code` int(11)  NOT NULL,
	`province_code` int(11)  NOT NULL,
	`website` varchar(200) COLLATE utf8_unicode_ci,
	`kinhdo` double,
	`vido` double,
	`remark` text(1000) COLLATE utf8_unicode_ci,
	PRIMARY KEY(`id_service`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `place_name`
(
	`id_place_name` int(11) auto_increment NOT NULL,
	`name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
	PRIMARY KEY(`id_place_name`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `place_name_keyword`
(
	`id_place_name_keyword` int(11) auto_increment NOT NULL,
	`keyword` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
	`place_name_code` int(11) NOT NULL,
	PRIMARY KEY(`id_place_name_keyword`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `street`
(
	`id_street` int(11) auto_increment NOT NULL,
	`name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
	PRIMARY KEY(`id_street`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `street_keyword`
(
	`id_street_keyword` int(11) auto_increment NOT NULL,
	`keyword` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
	`street_code` int(11)  NOT NULL,
	PRIMARY KEY(`id_street_keyword`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `ward`
(
	`id_ward` int(11) auto_increment NOT NULL,
	`name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
	PRIMARY KEY(`id_ward`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `ward_keyword`
(
	`id_ward_keyword` int(11) auto_increment NOT NULL,
	`keyword` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
	`ward_code` int(11)  NOT NULL,
	PRIMARY KEY(`id_ward_keyword`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `district`
(
	`id_district` int(11) auto_increment NOT NULL,
	`name` varchar(255) COLLATE  utf8_unicode_ci NOT NULL,
	PRIMARY KEY(`id_district`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `district_keyword`
(
	`id_district_keyword` int(11) auto_increment NOT NULL,
	`keyword` varchar(100) COLLATE  utf8_unicode_ci NOT NULL,
	`district_code` int(11) NOT NULL,
	PRIMARY KEY(`id_district_keyword`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `province`
(
	`id_province` int(11) auto_increment NOT NULL,
	`name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
	PRIMARY KEY(`id_province`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `province_keyword`
(
	`id_province_keyword` int(11) auto_increment NOT NULL,
	`keyword` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
	`province_code` int(11) NOT NULL,
	PRIMARY KEY(`id_province_keyword`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `comment`
(
	`id_comment` int(11) auto_increment NOT NULL,
	`service_code` int(11)  NOT NULL,
	`comment_user` char(24) COLLATE utf8_unicode_ci NOT NULL,
	`content` text(1500) COLLATE utf8_unicode_ci,
	PRIMARY KEY(`id_comment`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `rating`
(
	`id_rating` int(11) auto_increment NOT NULL,
	`score` int,
	`rating_user` char(24) COLLATE utf8_unicode_ci NOT NULL,
	`service_code` int(11) NOT NULL,
	PRIMARY KEY(`id_rating`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;




/* constraint for all tables */

ALTER TABLE `service_type_keyword`
ADD CONSTRAINT `FK_service_type_keyword_service_code`
FOREIGN KEY (`service_code`)
REFERENCES `service_type`(`id_service_type`);

ALTER TABLE `service`
ADD CONSTRAINT `FK_service_service_code`
FOREIGN KEY (`service_code`)
REFERENCES `service_type`(`id_service_type`);

ALTER TABLE `district_keyword`
ADD CONSTRAINT `FK_district_keyword_district_code`
FOREIGN KEY (`district_code`)
REFERENCES `district`(`id_district`);

ALTER TABLE `service`
ADD CONSTRAINT `FK_service_district_code`
FOREIGN KEY (`district_code`)
REFERENCES `district`(`id_district`);

ALTER TABLE `province_keyword`
ADD CONSTRAINT `FK_province_keyword_province_code`
FOREIGN KEY (`province_code`)
REFERENCES `province`(`id_province`);

ALTER TABLE `service`
ADD CONSTRAINT `FK_service_province_code`
FOREIGN KEY (`province_code`)
REFERENCES `province`(`id_province`);

ALTER TABLE `place_name_keyword`
ADD CONSTRAINT `FK_place_name_keyword_place_name_code`
FOREIGN KEY (`place_name_code`)
REFERENCES `place_name`(`id_place_name`);

ALTER TABLE `service`
ADD CONSTRAINT `FK_service_place_name_code`
FOREIGN KEY (`place_name_code`)
REFERENCES `place_name`(`id_place_name`);


ALTER TABLE `street_keyword`
ADD CONSTRAINT `FK_street_keyword_street_code`
FOREIGN KEY (`street_code`)
REFERENCES `street`(`id_street`);

ALTER TABLE `service`
ADD CONSTRAINT `FK_service_street_code`
FOREIGN KEY (`street_code`)
REFERENCES `street`(`id_street`);

ALTER TABLE `ward_keyword`
ADD CONSTRAINT `FK_ward_keyword_ward_code`
FOREIGN KEY (`ward_code`)
REFERENCES `ward`(`id_ward`);

ALTER TABLE `service`
ADD CONSTRAINT `FK_service_ward_code`
FOREIGN KEY (`ward_code`)
REFERENCES `ward`(`id_ward`);

ALTER TABLE `comment`
ADD CONSTRAINT `FK_comment_comment_user`
FOREIGN KEY (`comment_user`)
REFERENCES `account`(`token_id`);

ALTER TABLE `rating`
ADD CONSTRAINT `FK_rating_rating_user`
FOREIGN KEY (`rating_user`)
REFERENCES `account`(`token_id`);

ALTER TABLE `comment`
ADD CONSTRAINT `FK_comment_service_code`
FOREIGN KEY (`service_code`)
REFERENCES `service`(`id_service`);

ALTER TABLE `rating`
ADD CONSTRAINT `FK_rating_service_code`
FOREIGN KEY (`service_code`)
REFERENCES `service`(`id_service`);

ALTER TABLE `account`
ADD CONSTRAINT `FK_account_level`
FOREIGN KEY (`level`)
REFERENCES `account_level`(`level`);

  
  
  
  
  
/* INSERT DATA INTO ALL TABLES */

INSERT INTO `account_level` (`level`, `describe`) VALUES
(0, 'admin'),
(1, 'user');

INSERT INTO `account` (`token_id`, `username`, `password`, `fullname`, `email`, `avatar` , `level`) VALUES
('58138e0005445', 'admin', 'e10adc3949ba59abbe56e057f20f883e','administrator' ,'' ,'' , 0),
('58138e0005449', 'thanhhieu', 'e10adc3949ba59abbe56e057f20f883e','Nguyễn Thanh Hiếu' ,'' ,'' , 1);



INSERT INTO `service_type` (`id_service_type` ,`name`) VALUES
(1,'Food'),
(2,'Coffee'),
(3,'Rock Club'),
(4,'Movie Theater');


INSERT INTO `district` (`id_district`, `name`) VALUES
(1,'Quận 1'),
(2,'Quận 2'),
(3,'Quận 3'),
(4,'Quận 4'),
(5,'Quận 5'),
(6,'Quận 6'),
(7,'Quận 7'),
(8,'Quận 8'),
(9,'Quận 9'),
(10,'Quận 10'),
(11,'Quận 11'),
(12,'Quận 12'),
(13,'Thủ Đức'),
(14,'Phú Nhuận'),
(15,'Bình Thạnh'),
(16,'Tân Bình'),
(17,'Tân Phú'),
(18,'Bình Tân'),
(19,'Gò Vấp'),
(20,'Bình Chánh'),
(21,'Hóc Môn'),
(22,'Củ Chi'),
(23,'Cần Giờ');


INSERT INTO `place_name` (`id_place_name`, `name`) VALUES
(1,'Cơm Tấm Ba Ghiền'),
(2,'Cuc Gach Quan'),
(3,'Ốc Như'),
(4,'Phở Hòa Pasteur'),
(5,'Bánh Cuốn Thiên Hương'),
(6,'Bản Sonate'),
(7,'Monkey In Black Coffee'),
(8,'Cafe Trầm'),
(9,'Kujuz Tan Dinh'),
(10,'Acoustic'),
(11,'RFC - Rock Fan Club'),
(12,'YoKo'),
(13,'CGV Cinemas Parkson Hung Vuong'),
(14,'MegaGS - Cao Thắng'),
(15,'Galaxy Nguyễn Trãi'),
(16,'BHD Star Cineplex'),
(17,'Cinebox Hòa Bình');


INSERT INTO `street` (`id_street`, `name`) VALUES
(1,'Đặng Văn Ngữ'),
(2,'Thạch Thị Thanh'),
(3,'Điện Biên Phủ'),
(4,'Pasteur'),
(5,'3 Tháng 2'),
(6,'Đặng Dung'),
(7,'Trần Quang Khải'),
(8,'Nguyễn Phi Khanh'),
(9,'Trần Quý Khoách'),
(10,'Ngô Thời Nhiệm'),
(11,'Tú Xương'),
(12,'Nguyễn Thị Diệu'),
(13,'Hồng Bàng'),
(14,'Cao Thắng'),
(15,'Nguyễn Trãi');


INSERT INTO `ward` (`id_ward`, `name`) VALUES
(1,'Phường 1'),
(2,'Phường 2'),
(3,'Phường 3'),
(4,'Phường 4'),
(5,'Phường 5'),
(6,'Phường 6'),
(7,'Phường 7'),
(8,'Phường 8'),
(9,'Phường 9'),
(10,'Phường 10'),
(11,'Phường 11'),
(12,'Phường 12'),
(13,'Phường 13'),
(14,'Phường 14'),
(15,'Phường 15'),
(16,'Phường 16'),
(17,'Phường 17'),
(18,'Phường 18'),
(19,'Phường 19'),
(20,'Phường 20'),
(21,'Phường 21'),
(22,'Phường 22'),
(23,'Phường 23'),
(24,'Phường 24'),
(25,'Phường 25'),
(26,'Phường 26'),
(27,'Phường 27'),
(28,'Phường 28'),
(29,'Phường 29'),
(30,'Phường 30'),
(31,'Nguyễn Cư Trinh'),
(32,'Tân Định'),
(33,'Bến Thành');



INSERT INTO `province` (`id_province`, `name`) VALUES
(1,'Thành phố Hồ Chí Minh');



INSERT INTO `service` (`id_service` , `service_code`, `place_name_code`, `house_number`, `street_code`, `ward_code`, `district_code`, `province_code`,`website`, `kinhdo`, `vido`, `remark`) VALUES
(1,1,1,'84',1,10,14,1,'',10.7944776,106.6692531,''),
(2,1,2,'92B',2,32,1,1,'',10.7908078,106.6914554,''),
(3,1,3,'650/4/29D',3,11,10,1,'',10.7708454,106.6763352,''),
(4,1,4,'260C',4,8,3,1,'',10.7867471,106.6892409,''),
(5,1,5,'179A',5,11,10,1,'',10.7721237,106.6753334,''),
(6,2,6,'52',6,32,1,1,'',10.792398,106.6886789,''),
(7,2,7,'263',7,32,1,1,'',10.7913501,106.6880524,''),
(8,2,8,'111',8,32,1,1,'',10.7916599,106.69244,''),
(9,2,9,'5',9,32,1,1,'',10.793448,106.689241,''),
(10,3,10,'6E 1 ',10,7,3,1,'',10.7813496,106.6896013,''),
(11,3,11,'25A',11,7,3,1,'',10.7822245,106.6881791,''),
(12,3,12,'22A',12,6,3,1,'',10.7766398,106.6892624,''),
(13,4,13,'126',13,6,5,1,'',10.7559287,106.6626763,''),
(14,4,14,'19',14,2,3,1,'',10.7690294,106.683066,''),
(15,4,15,'230',15,31,1,1,'',10.764743,106.6873017,''),
(16,4,16,'3-3C',5,6,10,1,'',10.775918,106.6805096,''),
(17,4,17,'240-242',5,6,10,1,'',10.7721025,106.6739845,'');




INSERT INTO `service_type_keyword` (`id_service_type_keyword`, `keyword`, `service_code`) VALUES
(1,'quán ăn',1),
(2,'quan an',1),
(3,'quán nhậu',1),
(4,'quan nhau',1),
(5,'ăn vặt',1),
(6,'an vat',1),
(7,'bún bò',1),
(8,'bun bo',1),
(9,'mì cay',1),
(10,'mi cay',1),
(11,'BBQ',1),
(12,'barbecue',1),
(13,'lẩu dê',1),
(14,'lau de',1),
(15,'trà sữa',2),
(16,'tra sua',2),
(17,'cà phê',2),
(18,'ca phe',2),
(19,'kem',2),
(20,'aucoustic',3),
(21,'rock',3),
(22,'phòng trà',3),
(23,'phong tra',3),
(24,'Cinema',4),
(25,'CGV',4),
(26,'Galaxy Cinema',4),
(27,'BHD',4),
(28,'rạp phim',4),
(29,'rap phim',4);




INSERT INTO `place_name_keyword` (`id_place_name_keyword`, `keyword`, `place_name_code`) VALUES
(1,'cơm tấm ba ghiền',1),
(2,'com tam ba ghien',1),
(3,'quán cơm gia đình',1),
(4,'ốc, nghêu',3),
(5,'ăn vặt',3),
(6,'ăn vặt',2),
(7,'phở bò',4),
(8,'phở tái',4),
(9,'bánh cuốn',5),
(10,'mib',7),
(11,'trà sữa',7),
(12,'trà đào',7),
(13,'cgv',13),
(14,'galaxy',15),
(15,'bhd',16),
(16,'rạp phim',13),
(17,'rạp phim',14),
(18,'rạp phim',15),
(19,'rạp phim',16),
(20,'rạp phim',17),
(21,'aucoustic',10),
(22,'cà phê',9),
(23,'cà phê',8),
(24,'cơm tấm ba ghiền',1),
(25,'com tam',1),
(26,'quan com gia dinh',1),
(27,'oc, ngheo',3),
(28,'an vat',3),
(29,'an vat',2),
(30,'pho bo',4),
(31,'pho tai',4),
(32,'banh cuon',5),
(33,'tra sua',7),
(34,'tra dao',7),
(35,'rap phim',13),
(36,'rap phim',14),
(37,'rap phim',15),
(38,'rap phim',16),
(39,'rap phim',17),
(40,'ca phe',8),
(41,'ca phe',9),
(42,'club',11);




INSERT INTO `ward_keyword`(`id_ward_keyword`, `keyword`, `ward_code`) VALUES
(1,'chợ bến thành',28),
(2,'hàng xanh',21),
(3,'bến xe miền đông',26),
(4,'cho ben thanh',28),
(5,'hang xanh',21),
(6,'ben xe mien dong',26),
(7,'phường 1',1),
(8,'phường 2',2),
(9,'phường 3',3),
(10,'phường 4',4),
(11,'phường 5',5),
(12,'phường 6',6),
(13,'phường 7',7),
(14,'phường 8',8),
(15,'phường 9',9),
(16,'phường 10',10),
(17,'phường 11',11),
(18,'phường 12',12),
(19,'phường 13',13),
(20,'phường 14',14),
(21,'phường 15',15),
(22,'phường 16',16),
(23,'phường 17',17),
(24,'phường 18',18),
(25,'phường 19',19),
(26,'phường 20',20),
(27,'phường 21',21),
(28,'phường 22',22),
(29,'phường 23',23),
(30,'phường 24',24),
(31,'phường 25',25),
(32,'phường 26',26),
(33,'phường 27',27),
(34,'phường 28',28),
(35,'phường 29',29),
(36,'phường 30',30),
(37,'nguyễn cư trinh',31),
(38,'tân định',32),
(39,'bến thành',33),
(40,'phuong 1',1),
(41,'phuong 2',2),
(42,'phuong 3',3),
(43,'phuong 4',4),
(44,'phuong 5',5),
(45,'phuong 6',6),
(46,'phuong 7',7),
(47,'phuong 8',8),
(48,'phuong 9',9),
(49,'phuong 10',10),
(50,'phuong 11',11),
(51,'phuong 12',12),
(52,'phuong 13',13),
(53,'phuong 14',14),
(54,'phuong 15',15),
(55,'phuong 16',16),
(56,'phuong 17',17),
(57,'phuong 18',18),
(58,'phuong 19',19),
(59,'phuong 20',20),
(60,'phuong 21',21),
(61,'phuong 22',22),
(62,'phuong 23',23),
(63,'phuong 24',24),
(64,'phuong 25',25),
(65,'phuong 26',26),
(66,'phuong 27',27),
(67,'phuong 28',28),
(68,'phuong 29',29),
(69,'phuong 30',30),
(70,'nguyen cu trinh',31),
(71,'tan dinh',32),
(72,'ben thanh',33);



INSERT INTO `street_keyword` (`id_street_keyword`, `keyword`, `street_code`) VALUES
(1,'ngã tư hàng xanh',3),
(2,'maximax',5),
(3,'mega gs',14),
(4,'hùng vương plaza',13),
(5,'nga tu hang xanh',3),
(6,'hung vuong plaza',13),
(7,'đặng văn ngữ',1),
(8,'thạch thị thanh',2),
(9,'điện biên phủ',3),
(10,'pasteur',4),
(11,'3 tháng 2',5),
(12,'đặng dung',6),
(13,'trần quang khải',7),
(14,'nguyễn phi khanh',8),
(15,'trần quý khách',9),
(16,'ngô thời nhiệm',10),
(17,'tú xương',11),
(18,'nguyễn thị diệu',12),
(19,'hồng bàng',13),
(20,'cao thắng',14),
(21,'nguyễn trãi',15),
(22,'dang van ngu',1),
(23,'thach thi thanh',2),
(24,'dien bien phu',3),
(25,'3 thang 2',4),
(26,'42403',4),
(27,'dang dung',6),
(28,'tran quang khai',7),
(29,'nguyen phi khanh',8),
(30,'tran quy khach',9),
(31,'ngo thoi nhiem',10),
(32,'tu xuong',11),
(33,'nguyen thi dieu',12),
(34,'hong bang',13),
(35,'cao thang',14),
(36,'nguyen trai',15);






INSERT INTO `district_keyword` (`id_district_keyword`,`keyword`,`district_code`) VALUES
(1,'bến thành',1),
(2,'bến xe miền đông',15),
(3,'suối tiên',9),
(4,'đầm sen',11),
(5,'cầu vượt lăng chả cá',16),
(6,'tân sơn nhất',16),
(7,'trung sơn',20),
(8,'ben thanh',1),
(9,'ben xe mien dong',15),
(10,'suoi tien',9),
(11,'dam sen',11),
(12,'cau vuot lang cha ca',16),
(13,'tan son nhat',16),
(14,'trung son',20),
(15,'quận 1',1),
(16,'quận 2',2),
(17,'quận 3',3),
(18,'quận 4',4),
(19,'quận 5',5),
(20,'quận 6',6),
(21,'quận 7',7),
(22,'quận 8',8),
(23,'quận 9',9),
(24,'quận 10',10),
(25,'quận 11',11),
(26,'quận 12',12),
(27,'bình thạnh',15),
(28,'tân phú',17),
(29,'tân bình',16),
(30,'gò vấp',19),
(31,'quan 1',1),
(32,'quan 2',2),
(33,'quan 3',3),
(34,'quan 4',4),
(35,'quan 5',5),
(36,'quan 6',6),
(37,'quan 7',7),
(38,'quan 8',8),
(39,'quan 9',9),
(40,'quan 10',10),
(41,'quan 11',11),
(42,'quan 12',12),
(43,'binh thanh',15),
(44,'tan phu',17),
(45,'tan binh',16),
(46,'go vap',19);

INSERT INTO `province_keyword` (`id_province_keyword`, `keyword`, `province_code`) VALUES
(1,'Sài Gòn',1),
(2,'Thành phố Hồ Chí Minh',1),
(3,'sai gon',1),
(4,'tp hcm',1),
(5,'hcm',1);

















