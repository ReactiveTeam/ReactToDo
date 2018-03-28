/**
 * Copyright (c) 2018 PROPHESSOR
 * 
 * Данный файл служит прослойкой между приложением и API сервера.
 * 
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import Logger from 'prologger';
import CONFIG from 'config.js';

const logger = new Logger({ from: 'Server', showColors: false });
const { warn, success } = logger;

class Server {

    /**
     * {
     *      "message": "the request has succeeded",
     *      "data": {
     *          "id": "5a7f136331a5d90001271638",
     *          "message": "Hello",
     *          "completed": false,
     *          "favorite": false,
     *          "created": "2018-02-10T15:44:35.284Z"
     *      }
     *  }
     */


    /** Добавляет задачу на сервер
     * @param  {string} message - Текст задачи
     * @returns {Promise} Обещание: {id, message, completed, favorite, created}/{message}
     */
    add = (message) => {
        if (!message) throw new TypeError('Нет сообщения - нет задачи.');

        return new Promise((res, rej) => {
            fetch(CONFIG.api.url, {
                method:  'POST',
                headers: {
                    'Authorization': '',
                    'Content-Type':  'application/json',
                },
                body: JSON.stringify({ message }),
            })
                .then((response) => {
                    if (res.status !== 200) {
                        warn(`Внимание! В ответ на создание задачи сервер вернул не 200, а ${response.status}`, { level: 'not200' });
                        throw response.json();
                    }
                    success('Задача успешно добавлена на сервер!', { level: 'ok' });

                    return response.json();
                })
                .then((response) => res(response))
                .catch((response) => rej(response)); // {message:String}
        });
    }
    remove = (id) => {
        if (!id) throw new TypeError('Но я не знаю, что мне приказать уничтожить...');

        return new Promise((res, rej) => {
            fetch(`${CONFIG.api.url}/${id}`, {
                method:  'DELETE',
                headers: {
                    'Authorization': '',
                },
            })
                .then((response) => {
                    if (res.status !== 204) {
                        warn(`Внимание! В ответ на создание задачи сервер вернул не 204, а ${response.status}`, { level: 'not200' });
                        throw response.json();
                    }
                    success('Задача успешно удалена с сервера!', { level: 'ok' });

                    return response.json();
                })
                .then(() => res())
                .catch((response) => rej(response)); // {message:String}
        });
    }
    edit = (id, message, checked, stared) => {
        fetch(CONFIG.api.url, {
            method: 'UPDATE',
        })
            .then();
    }
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
}

export default new Server();
