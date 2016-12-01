<?php 
	require_once PATH_MODEL."database.php";
	/**
	* 
	*/
	class rating extends database
	{
		function insert($service_code, $score) {
			if (current_account()) {
				$rating_user = current_account();
				$sql = "INSERT INTO `rating` (`service_code`, `rating_user`, `score`) VALUES ('$service_code', '$rating_user', '$score');";

				$this->setQuery($sql);
				return $this->query();
			}
			return -1;
		}

		function update($service_code, $score) {
			if (current_account()) {
				$rating_user = current_account();
				$sql = "UPDATE `rating` SET `score` = '$score' WHERE `rating`.`service_code` = '$service_code' AND `rating`.`rating_user` = '$rating_user';";
				$this->setQuery($sql);
				return $this->query();
			}
			return -1;
		}

		function set_rating($service_code, $score){
			if (current_account()) {
				if ($this->exists($service_code)) {
					return $this->update($service_code, $score);
				}
				return $this->insert($service_code, $score);
			}
			return -1;
		}

		function exists($service_code) {
			if (current_account()) {
				$rating_user = current_account();

				$sql = "SELECT * FROM `rating` WHERE service_code = '$service_code' AND rating_user = '$rating_user';";
				$this->setQuery($sql);
				$result = $this->query();
				$row = mysql_fetch_assoc($result);
				if ($row) {
					return 1;
				}
			}
			return 0;
		}

		function get_rating_medium($service_code) {
				$sql = "SELECT SUM(score)/COUNT(*) score_medium FROM `rating` WHERE service_code = '$service_code';";
				$this->setQuery($sql);
				$result = $this->query();
				$row = mysql_fetch_assoc($result);
				if ($row) {
					return $row['score_medium'];
				}
			return 0;
		}
	}
 ?>