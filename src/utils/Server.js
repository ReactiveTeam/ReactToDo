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
 star = (id) => {
     fetch(CONFIG.api.url, {
         method: 'UPDATE',
     })
         .then();
 }
 load = () => {
     fetch(CONFIG.api.url, {
		 method: 'GET',
	 })
	 .then();
 }
    check = (id) => {
        fetch(CONFIG.api.url, {
            method: 'UPDATE',
        })
            .then();
    }
    add = (message) => {
        fetch(CONFIG.api.url, {
            method: 'POST',
        })
            .then();
    }
    remove = (id) => {
        fetch(CONFIG.api.url, {
            method: 'DELETE',
        })
            .then();
    }
    edit = (id, message, checked, stared) => {
        fetch(CONFIG.api.url, {
            method: 'UPDATE',
        })
            .then();
    }
}
