/**
 * Copyright (c) 2018 PROPHESSOR
 * 
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */
// import Tasker from '../components/Task/Task';

import Logger from 'prologger';
const logger = new Logger({
    from:       'Storage',
    showColors: false,
    showDate:   false,
});
const { error } = logger;

class Storage {
    storage = {
        tasks: [],
    }

    save = () => {
        if (!window.localStorage)
            return error('Ваш браузер не поддерживает localStorage! Функция кеширования задач отключена! Так же вам придется вводить токен при каждом запуске ;)');

        const data = JSON.stringify(this.storage);


        localStorage.setItem('storage', data);
    }
    load = () => {
        if (!window.localStorage)
            return error('Ваш браузер не поддерживает localStorage! Функция кеширования задач отключена! Так же вам придется вводить токен при каждом запуске ;)');

        let data = localStorage.getItem('storage');

        if (!data) {
            this.save();
            data = {};
        }

        try {
            this.storage = JSON.parse(data);
        } catch (e) {
            this.save();
        }
    }
    get = (item) => this.storage[item]
    set = (item, value) => void (this.storage[item] = value) // eslint-disable-line
}

export default new Storage();
