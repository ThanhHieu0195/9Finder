<?php 
	/**
	* 
	*/
	require_once "controller.php";
	require_once PATH_MODEL."service.php";

	class find_controller extends controller
	{
		function getlisttypeservice() {
			$model = new service();
			$arr = $model->get_all_type_service();
			if (is_array($arr)) {
				$this->data = $arr; 
				return 1;
			}
			return 0;
		}

		function getlistdistrict() {
			$model = new service();
			$arr = $model->get_all_district();
			if (is_array($arr)) {
				$this->data = $arr; 
				return 1;
			}
			return 0;
		}

		function getlistdatabytype() {
			if (isset($this->parameters['id_service_type'])) {
				$service_type = $this->parameters['id_service_type'];
				$model = new service();
				$district_code = '';
				if (isset($this->parameters['district'])) {
					$district_code = $this->parameters['district'];
				}
				$start = 0;
				if (isset($this->parameters['start'])) {
					$start = $this->parameters['start'];
				}

				$arr = $model->get_data_service_by_type($service_type, $district_code, $start);

				if (is_array($arr) && count($arr) > 0) {
					$this->data = $arr; 
					return 1;
				}
			} 
			return 0;
		}

		function getlistminprice() {
			if (isset($this->parameters['id_service_type'])) {
				$service_type = $this->parameters['id_service_type'];
				$model = new service();

				$arr = $model->get_data_service_by_min_price($service_type);

				if (is_array($arr) && count($arr) > 0) {
					$this->data = $arr; 
					return 1;
				}
			} 
			return 0;
		}

		// function getlistmaxrating() {
		// 	if (isset($this->parameters['id_service_type'])) {
		// 		$service_type = $this->parameters['id_service_type'];
		// 		$model = new service();

		// 		$arr = $model->get_data_service_by_max_rating($service_type);

		// 		if (is_array($arr) && count($arr) > 0) {
		// 			$this->data = $arr; 
		// 			return 1;
		// 		}
		// 	} 
		// 	return 0;
		// }
	}
 ?>