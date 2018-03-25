/**
 * Copyright (c) 2018 PROPHESSOR
 * 
 * Данный файл служит прослойкой между приложением и API сервера.
 * 
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import CONFIG from 'config.js';

class Server {
 star = (id) => {}
 load = () => {
     fetch(CONFIG.api.url, {
		 method: 'GET'
	 })
	 .then()
 }
    check = (id) => {}
    add = (message) => {}
    remove = (id) => {}
    edit = (id, message, checked, stared) => {}
}
