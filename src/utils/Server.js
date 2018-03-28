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
import Storage from './Storage';

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
    add = async (message) => {
        if (!message) throw new TypeError('Нет сообщения - нет задачи.');

        const req = await fetch(CONFIG.api.url, {
            method:  'POST',
            headers: {
                'Authorization': Storage.get('token'),
                'Content-Type':  'application/json',
            },
            body: JSON.stringify({ message }),
        });

        if (req.status !== 200) warn(`Внимание! В ответ на создание задачи сервер вернул не 200, а ${req.status}`, { level: 'not200' });
        else success('Задача успешно добавлена на сервер!', { level: 'ok' });

        const data = await req.json();

        return data;
    }
    remove = async (id) => {
        if (!id) throw new TypeError('Но я не знаю, что мне приказать уничтожить...');

        const res = await fetch(`${CONFIG.api.url}/${id}`, {
            method:  'DELETE',
            headers: {
                'Authorization': Storage.get('token'),
            },
        });

        if (res.status !== 204) warn(`Внимание! В ответ на создание задачи сервер вернул не 204, а ${res.status}`, { level: 'not200' });
        else success('Задача успешно удалена с сервера!', { level: 'ok' });

        return res;
    }
    edit = async (id, message, completed, favorite) => {
        if (!(id && message && completed && favorite)) throw new TypeError('Чего-то не хватает...');

        const res = await fetch(
            `${CONFIG.api.url}`,
            {
                method:  'PUT',
                headers: {
                    'Authorization': Storage.get('token'),
                    'Content-Type':  'application/json',
                },
                body: JSON.stringify({ id, message, completed, favorite }),
            }
        );

        const data = await res.json();

        return data;
    }
    star = (id) => {
        fetch(CONFIG.api.url, {
            method: 'UPDATE',
        })
            .then();
    }
    load = async () => {
        const res = await fetch(
            CONFIG.api.url,
            {
                method:  'GET',
                headers: {
                    'Authorization': Storage.get('token'),
                },
            }
        );

        if (res.status !== 200) warn(`Внимание! В ответ на создание задачи сервер вернул не 200, а ${res.status}`, { level: 'not200' });
        else success('Задачи успешно получены!', { level: 'ok' });

        const data = await res.json();

        return data;
    }
    check = (id) => {
        fetch(CONFIG.api.url, {
            method: 'UPDATE',
        })
            .then();
    }
}

export default new Server();
