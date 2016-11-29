<?php 
	require_once PATH_MODEL."database.php";

	class service extends database
	{
		public $_LIMIT = array('start'=>0, 'limit'=>10);

		function get_all_type_service() {
			$sql = "SELECT * FROM `service_type` ";
			$this->setQuery($sql);
			$result = $this->query();
			$arr = array();
			while($row = mysql_fetch_assoc($result)) {
				$arr[] = $row;
			}
			return $arr;
		}

		function get_all_district() {
			$sql = "SELECT * FROM `district` ";
			$this->setQuery($sql);
			$result = $this->query();
			$arr = array();
			while($row = mysql_fetch_array($result)) {
				$arr[] = $row;
			}
			return $arr;
		}

		function update($id_service, $column_name, $value) {
			$sql = "UPDATE service SET $column_name = '$value' WHERE id_service = '$id_service';";
			$this->setQuery($sql);
			return $this->query();
		}

		function get_data_service_by_type($type, $start=0, $searchby=0) {
			$limit = $this->_LIMIT['limit'];
			$query_limit = 	"LIMIT $start, $limit";
			$query_search = "";

			switch ($searchby) {
				case 1:
					$query_search = "order by ABS(sv.price) ASC";
					break;
				
				default:
					$query_search = "order by rt.mediumscore DESC";
					break;
			}

			$sql = "SELECT sv.id_service, svt.name type, pn.name, sv.house_number, st.name street, w.name ward, dt.name district, pv.name province, sv.website, sv.kinhdo, sv.vido, sv.price price, sv.remark, rt.mediumscore
				FROM service sv 
					INNER JOIN service_type svt ON sv.service_code = svt.id_service_type
				    INNER JOIN place_name pn on sv.place_name_code = pn.id_place_name
				    INNER JOIN street st on sv.street_code = st.id_street
				    INNER JOIN ward w on sv.ward_code = w.id_ward
				    INNER JOIN district dt on sv.district_code = dt.id_district
				    INNER JOIN province pv on sv.province_code = pv.id_province
				    LEFT JOIN (SELECT AVG(score) as mediumscore, service_code from rating group by service_code) rt on sv.service_code = rt.service_code
				WHERE sv.service_code = '$type'
				$query_search
				$query_limit;";

			$this->setQuery($sql);	
			$result = $this->query();
			$arr = array();
			while($row = mysql_fetch_assoc($result)) {
				$arr[] = $row;
			}
			return $arr;    
		}

		function get_data_service_by_condition($service, $location, $start) {
			$limit = $this->_LIMIT['limit'];
			$query_limit = 	"LIMIT $start, $limit";
			$query_where = "";
			if (!empty($service)) {
				if (empty($query_where)) {
					$query_where = "where stk.keyword like '%$service%'";
				} else {
					$query_where = "AND stk.keyword like '%$service%'";
				}
			}

			if (!empty($location)) {
				if (empty($query_where)) {
					$query_where = "where dk.keyword like '$location'";
				} else {
					$query_where = "AND dk.keyword like '$location'";
				}
			}

			$sql = "SELECT DISTINCT sv.id_service, svt.name type, pn.name, sv.house_number, st.name street, w.name ward, dt.name district, pv.name province, sv.website, sv.kinhdo, sv.vido, sv.price price, sv.remark, rt.mediumscore
				FROM service sv 
					INNER JOIN service_type svt ON sv.service_code = svt.id_service_type
				    INNER JOIN place_name pn on sv.place_name_code = pn.id_place_name
				    INNER JOIN street st on sv.street_code = st.id_street
				    INNER JOIN ward w on sv.ward_code = w.id_ward
				    INNER JOIN district dt on sv.district_code = dt.id_district
				    INNER JOIN province pv on sv.province_code = pv.id_province
				    LEFT JOIN (SELECT AVG(score) as mediumscore, service_code from rating group by service_code) rt on sv.service_code = rt.service_code
				    INNER JOIN service_type_keyword stk on stk.service_code = sv.service_code
				    INNER JOIN district_keyword dk on dk.district_code = sv.district_code
				$query_where
				order by rt.mediumscore DESC
				$query_limit;";

			$this->setQuery($sql);	
			$result = $this->query();
			$arr = array();
			while($row = mysql_fetch_assoc($result)) {
				$arr[] = $row;
			}
			return $arr;    
		}

		function loadallimagebyidserver($id_service, $start=0) {
			$limit = $this->_LIMIT['limit'];
			$query_limit = 	"LIMIT $start, $limit";
			$sql = "select link from image_album where service_code = $id_service ORDER BY service_code DESC $query_limit;";
			$this->setQuery($sql);
			$result = $this->query();
			$arr = array();
			while($row = mysql_fetch_assoc($result)) {
				$arr[] = $row['link'];
			}
			return $arr;  
		}

		function getdataservicebyminprice($type, $start=0) {
			$limit = $this->_LIMIT['limit'];
			$query_limit = 	"LIMIT $start, $limit";

			$sql = "SELECT sv.id_service, svt.name type, pn.name, sv.house_number, st.name street, w.name ward, dt.name district, pv.name province, sv.website, sv.kinhdo, sv.vido, sv.price price, sv.remark FROM service sv INNER JOIN service_type svt ON sv.service_code = svt.id_service_type INNER JOIN place_name pn on sv.place_name_code = pn.id_place_name INNER JOIN street st on sv.street_code = st.id_street INNER JOIN ward w on sv.ward_code = w.id_ward INNER JOIN district dt on sv.district_code = dt.id_district INNER JOIN province pv on sv.province_code = pv.id_province WHERE sv.service_code = '$type' ORDER BY sv.price ASC $query_limit;";

				$this->setQuery($sql);
				$result = $this->query();
				$arr = array();
				while($row = mysql_fetch_assoc($result)) {
					$arr[] = $row;
				}
				return $arr;    
		}
		
	}
 ?>