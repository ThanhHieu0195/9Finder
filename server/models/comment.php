<?php 
	require_once PATH_MODEL."database.php";
	/**
	* 
	*/
	class comment extends database
	{
		public $_LIMIT = array('start'=>0, 'limit'=>10);

		function insert($service_code, $content, $attached=0) {
			if (current_account()) {
				$comment_user = current_account();
				$sql = "INSERT INTO `comment` (`id_comment`, `service_code`, `comment_user`, `content`, `attached`) VALUES (NULL, '$service_code', '$comment_user', '$content', '$attached');";
				$this->setQuery($sql);
				return $this->query();
			}
			return -1;
		}

		
		// 
		function get_all_comment($service_code, $start=0) {
			$limit = $this->_LIMIT['limit'];
			$query_limit = 	"LIMIT $start, $limit";

			$sql = "SELECT cm.*, ac.username comment_by, ac.avatar FROM comment cm JOIN account ac ON cm.comment_user = ac.token_id WHERE cm.service_code = '$service_code' ORDER BY id_comment DESC $query_limit;";
			$this->setQuery($sql);
			$result = $this->query();
			$arr = array();
			while ($row = mysql_fetch_assoc($result)) {
				$row['image'] = array(); 
				if ($row['attached']) {
					$row['image'] = $this->getAttached($row['id_comment']);
				}

				$arr[] = $row;
			}
			return $arr;
		}

		function getAttached($comment_code) {
			$sql = "select 	id_image_album, link from image_album where comment_code = '$comment_code';";
			$this->setQuery($sql);
			$result = $this->query();
			$arr = array();
			while ($row = mysql_fetch_array($result)) {
				$arr[] = $row;
			}
			return $arr;
		}
		function check_access($id_comment) {
			if (current_account()) {
				$comment_user = current_account();
				$sql = "SELECT * FROM comment WHERE comment_user = '$comment_user' AND id_comment = '$id_comment';";
				$this->setQuery($sql);
				$result = $this->query();
				$row = mysql_fetch_assoc($result);
				if ($row) {
					return 1;
				}
			}
			return 0;
		}

		function delete($id_comment) {
			if ($this->check_access($id_comment)) {
				$comment_user = current_account();
				$sql = "DELETE FROM comment WHERE id_comment = '$id_comment' AND  comment_user = '$comment_user';";
				$this->setQuery($sql);
				return $this->query();
			}
			return -1;
		}
	}
 ?>